import { AnotacaoDetalhe } from "@/components/anotacao-detalhe";
import { EmptyState } from "@/components/empty-state";
import { MensagemErro } from "@/components/mensagem-erro";
import { Colors, Spacing } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { Anotacao } from "@/models/usuario";
import { api } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function AnotacaoDetalheScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { token } = useAuth();

    const [anotacao, setAnotacao] = useState<Anotacao | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        let ativo = true;
        async function carregar() {
            setErro(null);
            setCarregando(true);
            try {
                const dados = await api.obterAnotacao(token, id);
                if (ativo) setAnotacao(dados);
            } catch (e) {
                if (ativo) setErro(e instanceof Error ? e.message : 'Não foi possível carregar.');
            } finally {
                if (ativo) setCarregando(false);
            }
        }
        carregar();
        return () => {
            ativo = false;
        };
    }, [id, token]);

    if (carregando) return <EmptyState titulo="Carregando…" />;
    if (erro) return <View style={styles.tela}><MensagemErro>{erro}</MensagemErro></View>;
    if (!anotacao) return null;
    return <AnotacaoDetalhe anotacao={anotacao} />;
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        padding: Spacing.lg,
        backgroundColor: Colors.background,
    },
});