import { useRouter } from 'expo-router';
import { useState } from 'react';

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { IServer } from '../@types/discord';

interface ServerProps {
    servers: IServer[];
    selectedServerId: string;
    onSelectServer: (serverId: string) => void;
}

export default function Server({ servers, selectedServerId, onSelectServer }: ServerProps) {
    const router = useRouter();
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const handleImageError = (serverId: string) => {
        setImageErrors((prev) => ({ ...prev, [serverId]: true }));
    };

    return (
        <>
            {
                servers.map((server) => {
                    const isSelected = selectedServerId === server.id;
                    const hasError = imageErrors[server.id];

                    const initials = server.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')
                        .substring(0, 2)
                        .toUpperCase();

                    return (
                        <TouchableOpacity
                            key={`server-${server.id}`}
                            onPress={() => onSelectServer(server.id)}
                            style={[
                                styles.serverIconContainer,
                                isSelected && styles.activeServer,
                            ]}
                            activeOpacity={0.7}
                        >
                            {!hasError ? (
                                <Image
                                    source={{ uri: server.iconUrl }}
                                    style={styles.serverIcon}
                                    onError={() => handleImageError(server.id)}
                                />
                            ) : (
                                <Text style={styles.serverInitials}>{initials}</Text>
                            )}
                        </TouchableOpacity>
                    );
                })
            }

            < TouchableOpacity
                style={styles.addServerButton}
                onPress={() => router.push('/server/create-server')
                }
                activeOpacity={0.7}
            >
                <Text style={styles.addServerText}>+</Text>
            </TouchableOpacity >
        </>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 24,
    },
    serverIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginBottom: 12,
        backgroundColor: '#36393F',
        alignItems: 'center',
    },
    activeServer: {
        borderWidth: 2,
        borderColor: '#5865F2',
    },
    serverIcon: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
    },
    serverInitials: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
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
});