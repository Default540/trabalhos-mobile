export interface IChannel {
    id: string;
    name: string;
    type: 'text' | 'voice';
    unread?: boolean;
}

export interface IServer {
    id: string;
    name: string;
    iconUrl: string;
    channels: IChannel[];
}

export interface IMessage {
    id: string;
    user: string;
    avatarUrl: string;
    timestamp: string;
    text: string;
}