import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { Header } from '@/components/header';
import { MensagemErro } from '@/components/mensagem-erro';
import { PrimaryButton } from '@/components/primary-button';
import { Colors, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import type { AnotacaoModeracao } from '@/models/usuario';
import { api } from '@/services/api';
import { AnotacaoModeracaoItem } from '@/components/anotacoes-moderacao-item';

export default function ModeratorScreen() {
  const { token } = useAuth();

  const [carregando, setCarregando] = useState(true);
  const [anotacoes, setAnotacoes] = useState<AnotacaoModeracao[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setErro(null);
    setCarregando(true);
    try {
      setAnotacoes(await api.listarAnotacoesModeracao(token));
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível carregar.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <FlatList
      style={styles.tela}
      contentContainerStyle={styles.conteudo}
      data={anotacoes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AnotacaoModeracaoItem anotacao={item} />}
      ItemSeparatorComponent={() => <View style={styles.separador} />}
      ListHeaderComponent={
        <View style={styles.cabecalho}>
          <Header title="Anotações" subtitle="Todas as anotações na memória do servidor" />
          <MensagemErro>{erro}</MensagemErro>
          <PrimaryButton
            label={carregando ? 'Atualizando…' : 'Atualizar'}
            variant="secondary"
            onPress={carregar}
            disabled={carregando}
          />
        </View>
      }
      ListEmptyComponent={carregando ? <EmptyState titulo="Carregando…" /> : null}
    />
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  conteudo: {
    padding: Spacing.lg,
  },
  cabecalho: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  separador: {
    height: Spacing.sm,
  },
});
