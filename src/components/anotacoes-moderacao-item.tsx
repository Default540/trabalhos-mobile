import { Colors, Spacing } from "@/constants/theme";
import { AnotacaoModeracao } from "@/models/usuario";
import { formatarDataHora } from "@/utils/formatar-data";
import { StyleSheet, View, Text } from "react-native";

export function AnotacaoModeracaoItem({ anotacao }: { anotacao: AnotacaoModeracao }) {
    return (
        <View style={styles.item}>
            <Text style={styles.texto}>{anotacao.texto}</Text>
            <Text style={styles.meta}>
                {anotacao.autor} · {formatarDataHora(anotacao.criadaEm)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: Spacing.md,
        borderRadius: Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
        marginBottom: Spacing.sm,
    },
    texto: {
        fontSize: 15,
        color: Colors.text,
    },
    meta: {
        marginTop: Spacing.xs,
        fontSize: 12,
        color: Colors.textSecondary,
    },
});