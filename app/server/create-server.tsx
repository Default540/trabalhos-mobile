import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServerCategory, CATEGORIES } from '@/src/@types/server';

export default function CreateServerScreen() {
    const router = useRouter();
    const [serverName, setServerName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<ServerCategory>(ServerCategory.Gaming);
    const [isPrivate, setIsPrivate] = useState(false);

    const handleCreate = () => {
        if (serverName.trim() === '') return;

        console.log({
            name: serverName,
            category: selectedCategory,
            isPrivate,
        });

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

            <ScrollView contentContainerStyle={styles.form}>
                <Text style={styles.label}>NOME DO SERVIDOR</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Servidor do João"
                    placeholderTextColor="#72767D"
                    value={serverName}
                    onChangeText={setServerName}
                />

                <Text style={styles.label}>CATEGORIA</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
                    {CATEGORIES.map((category) => {
                        const isSelected = selectedCategory === category;
                        return (
                            <TouchableOpacity
                                key={category}
                                onPress={() => setSelectedCategory(category as ServerCategory)}
                                style={[styles.chip, isSelected && styles.chipSelected]}
                            >
                                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <View style={styles.switchRow}>
                    <View style={styles.switchTextContainer}>
                        <Text style={styles.labelSwitch}>SERVIDOR PRIVADO</Text>
                        <Text style={styles.subLabelSwitch}>Apenas membros convidados poderão entrar</Text>
                    </View>
                    <Switch
                        value={isPrivate}
                        onValueChange={setIsPrivate}
                        trackColor={{ false: '#4e5058', true: '#5865F2' }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#4e5058"
                    />
                </View>

                <TouchableOpacity
                    style={[styles.button, !serverName.trim() && styles.buttonDisabled]}
                    onPress={handleCreate}
                    disabled={!serverName.trim()}
                >
                    <Text style={styles.buttonText}>Criar</Text>
                </TouchableOpacity>
            </ScrollView>
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
    chipsContainer: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    chip: {
        backgroundColor: '#2b2d31',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#1e1f22',
    },
    chipSelected: {
        backgroundColor: '#5865F2',
        borderColor: '#5865F2',
    },
    chipText: {
        color: '#949ba4',
        fontSize: 14,
        fontWeight: '600',
    },
    chipTextSelected: {
        color: '#FFFFFF',
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2b2d31',
        padding: 16,
        borderRadius: 8,
        marginBottom: 32,
    },
    switchTextContainer: {
        flex: 1,
        marginRight: 16,
    },
    labelSwitch: {
        color: '#B9BBBE',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    subLabelSwitch: {
        color: '#949ba4',
        fontSize: 12,
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