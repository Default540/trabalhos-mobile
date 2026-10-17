import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import type { Sessao, Usuario } from '@/models/usuario';
import { api, ApiError, definirAoExpirar } from '@/services/api';
import { apagarToken, lerToken, salvarToken } from '@/services/sessao-storage';

// CONTEXTO DE AUTENTICAÇÃO — src/contexts/auth-context.tsx
//
// O problema: quem está logado interessa a MUITAS telas (o cabeçalho mostra
// o nome, o layout decide quais rotas existem, a lista busca dados com o
// token). Passar isso por props, tela a tela, não escala — e o layout raiz
// nem tem como passar props para as telas do Expo Router.
//
// A solução da Context API tem três peças:
//
//   1. createContext()  — cria o "canal";
//   2. <AuthProvider>   — o componente que GUARDA o estado e o coloca no canal,
//                         envolvendo a parte da árvore que precisa dele;
//   3. useAuth()        — o hook que qualquer componente abaixo do provider
//                         usa para LER o canal.
//
// Quando o valor do provider muda (alguém entrou ou saiu), todos os
// componentes que chamaram useAuth() são re-renderizados — como se o estado
// fosse deles.

// O que fica disponível para quem chamar useAuth().
interface AuthContextValue {
  // null = ninguém logado. É este valor que os layouts consultam para
  // decidir quais rotas estão acessíveis.
  usuario: Usuario | null;
  // O token vai no cabeçalho de toda requisição autenticada.
  token: string | null;
  carregando: boolean;      // login/cadastro em andamento
  restaurando: boolean;     // lendo a sessão salva na abertura
  sessaoExpirada: boolean;
  entrar: (email: string, senha: string) => Promise<void>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<void>;
  sair: () => Promise<void>;
}

// 1. O canal. O valor inicial (null) só é visto por quem chamar useAuth()
// FORA de um provider — e o hook trata isso como erro de programação.
const AuthContext = createContext<AuthContextValue | null>(null);

// 2. O provider: um componente comum, com useState comum. A única diferença
// para qualquer outro componente é que ele entrega o estado via contexto,
// e não via props.
export function AuthProvider({ children }: { children: ReactNode }) {
  // Token e usuário mudam sempre juntos, então vivem em um único estado.
  const [sessao, setSessao] = useState<Sessao | null>(null);
  
  const [carregando, setCarregando] = useState(false);
  const [restaurando, setRestaurando] = useState(true);
  const [sessaoExpirada, setSessaoExpirada] = useState(false);


  useEffect(() => {
    let ativo = true;
    async function restaurar() {
      try {
        const salvo = await lerToken();
        if (!salvo) return;
        const usuario = await api.restaurar(salvo);
        if (ativo) setSessao({ token: salvo, usuario });
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) await apagarToken();
        // status 0 (servidor fora do ar): mantém o token salvo e mostra o login
      } finally {
        if (ativo) setRestaurando(false);
      }
    }
    restaurar();
    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    definirAoExpirar(() => {
      setSessao(null);
      setSessaoExpirada(true);
      apagarToken();
    });
    return () => definirAoExpirar(null);
  }, []);

  async function iniciarSessao(obter: () => Promise<Sessao>) {
    setCarregando(true);
    try {
      const nova = await obter();
      await salvarToken(nova.token);
      setSessaoExpirada(false);
      setSessao(nova);
    } finally {
      setCarregando(false);
    }
  }
  
  const entrar = (email: string, senha: string) => iniciarSessao(() => api.login(email, senha));

  const cadastrar = (nome: string, email: string, senha: string) =>
    iniciarSessao(() => api.cadastrar(nome, email, senha));

  async function sair() {
    if (sessao) await api.sair(sessao.token).catch(() => { });
    await apagarToken();
    setSessaoExpirada(false);
    setSessao(null);
  }

  // No React 19 o próprio contexto é o provider. Antes se escrevia
  // <AuthContext.Provider value={...}> — as duas formas funcionam.
  return (
    <AuthContext
      value={{
        usuario: sessao?.usuario ?? null,
        token: sessao?.token ?? null,
        entrar,
        cadastrar,
        sair,
        carregando,
        restaurando,
        sessaoExpirada,
      }}>
      {children}
    </AuthContext>
  );
}

// 3. O hook. Encapsula o useContext e falha cedo, com uma mensagem clara,
// se alguém esquecer o provider — em vez de um "cannot read property
// 'usuario' of null" em uma tela qualquer.
export function useAuth(): AuthContextValue {
  const contexto = useContext(AuthContext);
  if (contexto === null) {
    throw new Error('useAuth() só pode ser usado dentro de <AuthProvider>.');
  }
  return contexto;
}
