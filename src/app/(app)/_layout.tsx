import { Stack } from 'expo-router';

import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { podeModerar } from '@/models/usuario';

// LAYOUT DO GRUPO (app) — src/app/(app)/_layout.tsx
//
// Tudo aqui dentro já está protegido pelo layout raiz: se este componente
// renderiza, existe um usuário logado.
//
// Mas "logado" não é a única pergunta. A tela de administração depende de
// QUEM está logado — e a resposta também está no contexto. O mesmo
// Stack.Protected, com outra condição.
export default function AppLayout() {
  const { usuario } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.text,
        contentStyle: { backgroundColor: Colors.background },
      }}>
      <Stack.Screen name="index" options={{ title: 'Início' }} />
      <Stack.Screen name="anotacoes/index" options={{ title: 'Minhas anotações' }} />
      <Stack.Screen name="anotacoes/[id]" options={{ title: 'Anotação' }} />
      <Stack.Screen name="perfil" options={{ title: 'Perfil' }} />

      <Stack.Protected guard={usuario !== null && podeModerar(usuario.papel)}>
        <Stack.Screen name="moderacao" options={{ title: 'Moderação' }} />
      </Stack.Protected>

      <Stack.Protected guard={usuario?.papel === 'admin'}>
        <Stack.Screen name="admin" options={{ title: 'Administração' }} />
      </Stack.Protected>
    </Stack>
  );
}
