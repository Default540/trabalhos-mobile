import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState, useEffect } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IMessage } from '@/src/@types/discord';
import { MOCK_MESSAGES } from '@/src/mock/discordData';

export default function ChannelChatScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ id?: string | string[]; name?: string | string[] }>();

    const channelId = Array.isArray(params.id) ? params.id[0] : params.id || 'c1';
    const channelName = Array.isArray(params.name) ? params.name[0] : params.name;

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList>(null);

    // Atualiza as mensagens sempre que o ID do canal na rota mudar
    useEffect(() => {
        setMessages(MOCK_MESSAGES[channelId] || []);
    }, [channelId]);

    const handleSendMessage = () => {
        if (inputText.trim() === '') return;

        const newMessage: IMessage = {
            id: String(Date.now()),
            user: 'Você',
            avatarUrl: 'https://via.placeholder.com/50/57F287/FFFFFF?text=EU',
            timestamp: 'Hoje às ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: inputText,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputText('');

        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                {/* CABEÇALHO */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerHashtag}>#</Text>
                    <Text style={styles.headerTitle}>{channelName || 'canal'}</Text>
                </View>

                {/* LISTA DE MENSAGENS COM FLATLIST */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.messageList}
                    showsVerticalScrollIndicator={true}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Nenhuma mensagem por aqui ainda. Seja o primeiro a falar!</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.messageContainer}>
                            <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageHeader}>
                                    <Text style={styles.userName}>{item.user}</Text>
                                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                                </View>
                                <Text style={styles.text}>{item.text}</Text>
                            </View>
                        </View>
                    )}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={`Conversar em #${channelName || 'canal'}`}
                        placeholderTextColor="#72767D"
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                        <Text style={styles.sendButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#2F3136',
    },
    container: {
        flex: 1,
        backgroundColor: '#36393F',
        width: '100%',
        flexDirection: 'column',
    },
    header: {
        height: 56,
        backgroundColor: '#2F3136',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#202225',
    },
    backButton: { marginRight: 16 },
    backButtonText: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
    headerHashtag: { color: '#72767D', fontSize: 20, fontWeight: 'bold', marginRight: 6 },
    headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
    messageList: {
        padding: 16,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
        backgroundColor: '#5865F2',
    },
    messageContent: { flex: 1 },
    messageHeader: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
    userName: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15, marginRight: 8 },
    timestamp: { color: '#72767D', fontSize: 12 },
    text: { color: '#DCDDDE', fontSize: 15, lineHeight: 20 },
    emptyContainer: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: '#72767D',
        fontSize: 14,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#2F3136',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#40444B',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        color: '#FFFFFF',
        fontSize: 15,
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: '#5865F2',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    sendButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
});