import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    PanResponder,
    StyleSheet,
    View,
} from 'react-native';
import { MOCK_SERVERS } from '../../src/mock/discordData';
import SideBar from '@/src/components/SideBar';
import ChannelList from '@/src/components/ChannelList';

const SWIPE_THRESHOLD = -80;

export default function HomeScreen() {
    const router = useRouter();

    const [selectedServerId, setSelectedServerId] = useState<string>(MOCK_SERVERS[0].id);
    const [selectedChannelId, setSelectedChannelId] = useState<string | null>(MOCK_SERVERS[0].channels[0].id);

    const selectedServer = MOCK_SERVERS.find((s) => s.id === selectedServerId) || MOCK_SERVERS[0];
    const selectedChannel = selectedServer.channels.find((c: { id: string }) => c.id === selectedChannelId);

    const translateX = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gesture) => {
                return !!selectedChannelId && Math.abs(gesture.dx) > Math.abs(gesture.dy) && Math.abs(gesture.dx) > 10;
            },
            onPanResponderMove: (_, gesture) => {

                if (gesture.dx < 0) {
                    translateX.setValue(gesture.dx);
                }
            },
            onPanResponderRelease: (_, gesture) => {

                if (gesture.dx < SWIPE_THRESHOLD && selectedChannel) {
                    router.push({
                        pathname: '/channel/[id]',
                        params: {
                            id: selectedChannel.id,
                            name: selectedChannel.name,
                        },
                    });
                }

                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            },
        })
    ).current;

    return (
        <View style={styles.container}>

            <SideBar
                selectedServerId={selectedServerId}
                onSelectServer={(id) => {
                    setSelectedServerId(id);
                    setSelectedChannelId(null);
                }}
            />

            <ChannelList
                selectedServer={selectedServer}
                selectedChannelId={selectedChannelId}
                setSelectedChannelId={setSelectedChannelId}
                translateX={translateX}
                panHandlers={panResponder.panHandlers}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#202225',
        paddingTop: 40
    },
    serverSidebar: {
        width: 72,
        backgroundColor: '#202225',
        alignItems: 'center',
        paddingTop: 12,
    },
    serverIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginBottom: 12,
        overflow: 'hidden',
    },
    activeServer: {
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#5865F2',
    },
    serverIcon: {
        width: '100%',
        height: '100%',
    },
    addServerButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#36393F',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    addServerText: {
        color: '#57F287',
        fontSize: 24,
        fontWeight: 'bold',
    },
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