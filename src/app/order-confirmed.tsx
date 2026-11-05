
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import NotifyCard from '../components/NotifyCard';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';

export default function OrderConfirmed() {
  const { name, product, note } = useLocalSearchParams<{
    name: string;
    product: string;
    note?: string;
  }>();

  const scale = useSharedValue(0);

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withSpring(1);

    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );
  }, []);

  return (
    <View style={styles.screen}>
      <Animated.View style={checkStyle}>
        <Ionicons
          name="checkmark-circle"
          size={110}
          color={colors.primary}
        />
      </Animated.View>

      <Text style={styles.title}>
        ¡Pedido listo, {name}!
      </Text>

      <Text style={styles.subtitle}>
        Tu {product} ya se está preparando.
      </Text>

      {note ? (
        <Text style={styles.note}>Nota: {note}</Text>
      ) : null}

      <NotifyCard />

      <Pressable
        style={styles.button}
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.buttonText}>Volver al menú</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.h1,
    letterSpacing: -0.5,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.p,
    lineHeight: 24,
    color: colors.textMuted,
    textAlign: 'center',
  },
  note: {
    fontSize: 14,
    fontFamily: fonts.p,
    color: colors.textMuted,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 30,
    backgroundColor: colors.primary,
    elevation: 4,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: fonts.h2,
    letterSpacing: 0.3,
    color: colors.onPrimary,
  },
});
