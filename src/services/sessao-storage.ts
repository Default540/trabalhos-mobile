import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = 'aula06:token';

export async function salvarToken(token: string) {
    await AsyncStorage.setItem(CHAVE, token);
}

export async function lerToken(): Promise<string | null> {
    try {
        return await AsyncStorage.getItem(CHAVE);
    } catch {
        return null;
    }
}

export async function apagarToken() {
    try {
        await AsyncStorage.removeItem(CHAVE);
    } catch {
        // sem storage, não há o que apagar
    }
}