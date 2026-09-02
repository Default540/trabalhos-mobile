import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateServerScreen() {
    const router = useRouter();
    const [serverName, setServerName] = useState('');

    const handleCreate = () => {
        if (serverName.trim() === '') return;
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Criar Servidor</Text>
                <View style={styles.spacer} />
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>NOME DO SERVIDOR</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Servidor do João"
                    placeholderTextColor="#72767D"
                    value={serverName}
                    onChangeText={setServerName}
                />

                <TouchableOpacity
                    style={[styles.button, !serverName.trim() && styles.buttonDisabled]}
                    onPress={handleCreate}
                    disabled={!serverName.trim()}
                >
                    <Text style={styles.buttonText}>Criar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#313338',
    },
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#202225',
    },
    cancelText: {
        color: '#DCDDDE',
        fontSize: 16,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    spacer: {
        width: 60,
    },
    form: {
        padding: 24,
    },
    label: {
        color: '#B9BBBE',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#1E1F22',
        color: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#5865F2',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#4e5058',
        opacity: 0.5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});