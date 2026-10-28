
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="order"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="order-confirmed"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
