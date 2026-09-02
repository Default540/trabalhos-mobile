import { IServer, IMessage } from '../@types/discord';

export const MOCK_SERVERS: IServer[] = [
    {
        id: '1',
        name: 'Devs React Native',
        iconUrl: 'https://github.com/github.png',
        channels: [
            { id: 'c1', name: 'geral', type: 'text' },
            { id: 'c2', name: 'dúvidas-typescript', type: 'text' },
            { id: 'c3', name: 'vagas', type: 'text' },
            { id: 'c4', name: 'Geral Voz', type: 'voice' },
        ],
    },
    {
        id: '2',
        name: 'Comunidade Gaming',
        iconUrl: 'https://avatars.githubusercontent.com/u/124599?v=4',
        channels: [
            { id: 'c5', name: 'chat-geral', type: 'text' },
            { id: 'c6', name: 'memes', type: 'text', unread: true },
            { id: 'c7', name: 'Sala 1', type: 'voice' },
        ],
    },
    {
        id: '3',
        name: 'Lofi & Estudos',
        iconUrl: 'https://images.pexels.com/photos/28434497/pexels-photo-28434497.jpeg',
        channels: [
            { id: 'c8', name: 'pomodoro', type: 'text' },
            { id: 'c9', name: 'recomendacoes-som', type: 'text' },
            { id: 'c10', name: 'Sala de Leitura 📖', type: 'voice' },
        ],
    },
    {
        id: '4',
        name: 'Designers & Criativos',
        iconUrl: 'https://plus.unsplash.com/premium_photo-1785149414940-e4d0d947045d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        channels: [
            { id: 'c11', name: 'feedback-ui', type: 'text' },
            { id: 'c12', name: 'paleta-de-cores', type: 'text' },
            { id: 'c13', name: 'Criativo Voz', type: 'voice' },
        ],
    },
];

export const MOCK_MESSAGES: Record<string, IMessage[]> = {
    c1: [
        {
            id: 'm1',
            user: 'LucasDev',
            avatarUrl: 'https://via.placeholder.com/50/EB459E/FFFFFF?text=L',
            timestamp: 'Hoje às 14:20',
            text: 'Pessoal, o requisito de ter 3 telas no React Native exige Expo Router?',
        },
        {
            id: 'm2',
            user: 'AnaCode',
            avatarUrl: 'https://via.placeholder.com/50/5865F2/FFFFFF?text=A',
            timestamp: 'Hoje às 14:22',
            text: 'Pode ser Expo Router ou React Navigation! O importante é a navegação funcionar bem.',
        },
        {
            id: 'm3',
            user: 'Professor',
            avatarUrl: 'https://via.placeholder.com/50/FEE75C/000000?text=P',
            timestamp: 'Hoje às 14:25',
            text: 'Exatamente. Não se esqueçam de tipar todas as props e dados mockados.',
        },
    ],
    c2: [
        {
            id: 'm4',
            user: 'LucasDev',
            avatarUrl: 'https://via.placeholder.com/50/EB459E/FFFFFF?text=L',
            timestamp: 'Ontem às 18:00',
            text: 'Como vocês costumam evitar o uso de `any` nas rotas do Expo Router?',
        },
        {
            id: 'm5',
            user: 'CarlosTS',
            avatarUrl: 'https://via.placeholder.com/50/57F287/FFFFFF?text=C',
            timestamp: 'Ontem às 18:05',
            text: 'Dá uma olhada na documentação sobre tipagem estática de rotas do Expo. Ajuda bastante!',
        },
    ],
    c5: [
        {
            id: 'm6',
            user: 'GamerX',
            avatarUrl: 'https://via.placeholder.com/50/57F287/FFFFFF?text=GX',
            timestamp: 'Hoje às 10:00',
            text: 'Visão galera, alguém vai jogar um Valorant mais tarde?',
        },
        {
            id: 'm7',
            user: 'NoxPlayer',
            avatarUrl: 'https://via.placeholder.com/50/EB459E/FFFFFF?text=N',
            timestamp: 'Hoje às 10:15',
            text: 'Por mim topo! Só fechar o trampo às 18h.',
        },
    ],
    c6: [
        {
            id: 'm8',
            user: 'InternetExplorer',
            avatarUrl: 'https://via.placeholder.com/50/FEE75C/000000?text=IE',
            timestamp: 'Ontem às 22:40',
            text: 'Galera, achei esse bug aqui no layout que é puro meme',
        },
    ],
    c8: [
        {
            id: 'm9',
            user: 'BotPomodoro',
            avatarUrl: 'https://via.placeholder.com/50/5865F2/FFFFFF?text=BOT',
            timestamp: 'Hoje às 09:00',
            text: 'Ciclo de foco iniciado! 25 minutos de estudo concentrado.',
        },
    ],
    c11: [
        {
            id: 'm10',
            user: 'BiaDesign',
            avatarUrl: 'https://via.placeholder.com/50/EB459E/FFFFFF?text=B',
            timestamp: 'Hoje às 11:30',
            text: 'O que acharam desse tom de azul escuro para o fundo do tema escuro?',
        },
    ],
};