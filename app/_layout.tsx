import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />

      {/* Atualizado para refletir que está dentro da pasta server/ */}
      <Stack.Screen
        name="server/create-server"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}