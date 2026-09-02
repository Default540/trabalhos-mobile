# Trabalho Prático I — Reprodução de Interface Mobile (Discord)

Reimplementação de três telas do aplicativo **Discord** utilizando React Native, Expo e TypeScript.

## 1. Aplicativo de referência

**Discord** — plataforma de comunicação em servidores organizados por canais de texto e voz.

## 2. Telas implementadas

| # | Tela | Arquivo | Descrição |
| --- | ------ | --------- | ----------- |
| 1 | **Servidores e Canais** | `app/(tabs)/index.tsx` | Tela inicial. Mostra a barra lateral com os servidores do usuário (`SideBar` + `Server`) e, ao selecionar um servidor, a lista de canais de texto/voz daquele servidor (`ChannelList` + `Channel`). Permite deslizar (swipe) para abrir o canal selecionado. |
| 2 | **Chat do Canal** | `app/(tabs)/channel/[id].tsx` | Exibe as mensagens mockadas do canal selecionado em uma `FlatList`, com cabeçalho mostrando o nome do canal (recebido via parâmetro de rota) e um campo para enviar novas mensagens (adicionadas ao estado local). |
| 3 | **Criar Servidor** | `app/server/create-server.tsx` | Formulário (modal) para criar um novo servidor, com campos controlados por estado e ação de conclusão com feedback visual. |

### Fluxo de navegação

```
Servidores e Canais → (tocar em um canal) → Chat do Canal
Servidores e Canais → (tocar em "+") → Criar Servidor
```

## 3. Instruções de execução

Pré-requisitos: Node.js instalado.

```bash
# instalar dependências
npm install

# iniciar o projeto
npx expo start
```

No terminal, escolha abrir no **Android/iOS/Expo Go** (escaneando o QR Code) ou pressione `w` para abrir no navegador.

O aplicativo funciona **sem conexão com a internet** — todos os dados (servidores, canais e mensagens) são mockados localmente. Apenas os ícones/avatares (imagens remotas) podem não carregar em modo avião; a interface e a navegação continuam funcionando normalmente.

## 4. Screenshots

> Adicionar aqui os prints das três telas antes da entrega, por exemplo:
>
> ![Servidores e Canais](./screenshots/tela-servidores.png)
> ![Chat do Canal](./screenshots/tela-chat.png)
> ![Criar Servidor](./screenshots/tela-criar-servidor.png)

## 5. Funcionalidades implementadas

- Listagem de servidores na barra lateral, com seleção do servidor ativo.
- Listagem de canais (texto/voz) do servidor selecionado, usando `FlatList`.
- Navegação para o chat de um canal com passagem de parâmetros (`id` e `name` do canal).
- Chat com histórico de mensagens mockado por canal e envio de novas mensagens (mantidas apenas em estado local, sem persistência).
- Gesto de deslizar (swipe) na tela inicial para abrir o canal selecionado.
- Formulário de criação de servidor com campos controlados por `useState` e validação simples (nome obrigatório).
- Navegação de ida e volta entre todas as telas (`router.back()`).

## 6. Dados mockados

Todos os dados estão em `src/mock/discordData.ts`:

- `MOCK_SERVERS`: lista de servidores, cada um com `id`, `name`, `iconUrl` e sua lista de `channels` (`IServer` / `IChannel`, definidos em `src/@types/discord.tsx`).
- `MOCK_MESSAGES`: mensagens mockadas por canal, indexadas pelo `id` do canal (`IMessage`).

Nenhum dado é escrito diretamente no JSX das telas — tudo vem dessas estruturas tipadas.

## 7. Componentização

| Componente | Local | Reutilizado em |
| --- | --- | --- |
| `SideBar` | `src/components/SideBar.tsx` | Tela de Servidores e Canais |
| `Server` | `src/components/Server.tsx` | Renderiza cada ícone de servidor dentro da `SideBar` |
| `ChannelList` | `src/components/ChannelList.tsx` | Tela de Servidores e Canais |
| `Channel` | `src/components/Channel.tsx` | Cada item de canal dentro da `ChannelList` (recebe `channel`, `isSelected` e `onPress` via props) |

Os tipos dos dados (`IServer`, `IChannel`, `IMessage`) e das *props* de cada componente estão definidos em TypeScript, sem uso de `any`.

## 8. Tecnologias

- React Native + Expo
- TypeScript
- Expo Router (navegação em pilha + tabs)
- React Native Reanimated / Gesture Handler (gesto de swipe)

## 9. Fora do escopo

Conforme o enunciado, não foram implementados: backend, banco de dados, autenticação real, integração com APIs externas, pagamentos, persistência remota ou publicação em lojas.
