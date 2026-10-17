import { StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';
import type { Anotacao } from '@/models/usuario';
import { formatarDataHora } from '@/utils/formatar-data';

interface AnotacaoItemProps {
  anotacao: Anotacao;
}

export function AnotacaoItem({ anotacao }: AnotacaoItemProps) {

  return (
    <View style={styles.item}>
      <Text style={styles.texto}>{anotacao.texto}</Text>
      <Text style={styles.meta}>{formatarDataHora(anotacao.criadaEm)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    gap: Spacing.xs,
    padding: Spacing.md,
    borderRadius: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  texto: {
    fontSize: 16,
    color: Colors.text,
  },
  meta: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
