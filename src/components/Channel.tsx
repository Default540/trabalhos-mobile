import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IChannel } from '../@types/discord';

interface ChannelProps {
    channel: IChannel;
    onPress: () => void;
    isSelected: boolean;
}

export const Channel: React.FC<ChannelProps> = ({ channel, onPress, isSelected }) => {
    const prefix = channel.type === 'text' ? '#' : '🔊';

    return (
        <TouchableOpacity style={[styles.container, isSelected && styles.selectedContainer]} onPress={onPress} activeOpacity={0.7}>
            <Text style={[styles.prefix, isSelected && styles.selectedText]}>{prefix}</Text>
            <Text style={[styles.name, isSelected && styles.selectedText]}>
                {channel.name}
            </Text>
            {channel.unread && <View style={[styles.badge, isSelected && styles.selectedBadge]} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginVertical: 2,
    },
    prefix: {
        fontSize: 18,
        color: '#8E9297',
        marginRight: 10,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 16,
        color: '#8E9297',
        flex: 1,
        fontWeight: '500',
    },
    badge: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    selectedContainer: {
        backgroundColor: '#40444B',
    },
    selectedText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    selectedBadge: {
        backgroundColor: '#FFFFFF',
    },
});