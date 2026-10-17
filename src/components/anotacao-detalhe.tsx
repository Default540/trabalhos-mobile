import { Colors, Spacing } from "@/constants/theme";
import { Anotacao } from "@/models/usuario";
import { formatarDataHora } from "@/utils/formatar-data";
import { Text } from 'react-native'
import { StyleSheet, View } from "react-native";

export function AnotacaoDetalhe({ anotacao }: { anotacao: Anotacao }) {
    return (
        <View style={styles.container}>
            <Text style={styles.texto} selectable>{anotacao.texto}</Text>
            <Text style={styles.meta}>Criada em {formatarDataHora(anotacao.criadaEm)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing.lg,
        backgroundColor: Colors.background,
    },
    texto: {
        fontSize: 16,
        color: Colors.text,
    },
    meta: {
        marginTop: Spacing.md,
        fontSize: 12,
        color: Colors.textSecondary,
    },
});