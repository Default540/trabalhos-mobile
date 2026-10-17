import { Colors } from "@/constants/theme";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function TelaDeEspera({ mensagem }: { mensagem: string }) {
    return (
        <View style= { styles.tela } >

            <ActivityIndicator size="large" color = { Colors.primary } />
            <Text style={ styles.mensagem }> { mensagem } </Text>
            
        </View>
  );
}

const styles = StyleSheet.create({
  tela:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.background
  },
  mensagem: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.text
  }
});
