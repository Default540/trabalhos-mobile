import { IServer } from '@/src/@types/discord';
import { Channel } from '@/src/components/Channel';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Animated,
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';

interface ChannelListProps {
    selectedServer: IServer;
    selectedChannelId: string | null;
    setSelectedChannelId: (id: string) => void;
    translateX: Animated.Value;
    panHandlers: any;
}

export default function ChannelList({
    selectedServer,
    selectedChannelId,
    setSelectedChannelId,
    translateX,
    panHandlers,
}: ChannelListProps) {
    const router = useRouter();
    const selectedChannel = selectedServer.channels.find((c) => c.id === selectedChannelId);

    return (
        <Animated.View
            style={[styles.channelContainer, { transform: [{ translateX }] }]}
            {...panHandlers}
        >
            <Text style={styles.serverTitle}>{selectedServer.name}</Text>
            <Text style={styles.sectionHeader}>CANAIS DE TEXTO</Text>

            <FlatList
                data={selectedServer.channels}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Channel
                        channel={item}
                        isSelected={item.id === selectedChannelId}
                        onPress={() => {
                            if (item.type === 'text') {
                                setSelectedChannelId(item.id);
                                router.push({
                                    pathname: '/channel/[id]',
                                    params: {
                                        id: item.id,
                                        name: item.name,
                                    },
                                });
                            }
                        }}
                    />
                )}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    channelContainer: {
        flex: 1,
        backgroundColor: '#2F3136',
        padding: 12,
    },
    serverTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#202225',
        paddingBottom: 12,
    },
    sectionHeader: {
        color: '#8E9297',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    swipeHint: {
        color: '#8E9297',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 12,
    },
});