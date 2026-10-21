
import { Stack } from 'expo-router';
import { colors } from '../constants/colors';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        title: '',
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerStyle: { backgroundColor: colors.background },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.onPrimary,
        }}
      />
      <Stack.Screen name="order" options={{ title: 'Tu pedido' }} />
      <Stack.Screen
        name="order-confirmed"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
