
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';

export default function OrderConfirmed() {
  const { name, product, note } = useLocalSearchParams<{
    name: string;
    product: string;
    note?: string;
  }>();

  return (
    <View style={styles.screen}>
      <Ionicons
        name="checkmark-circle"
        size={110}
        color={colors.primary}
      />

      <Text style={styles.title}>
        ¡Pedido listo, {name}!
      </Text>

      <Text style={styles.subtitle}>
        Tu {product} ya se está preparando.
      </Text>

      {note ? (
        <Text style={styles.note}>Nota: {note}</Text>
      ) : null}

      <Pressable
        style={styles.button}
        onPress={() => router.dismissAll()}
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
    marginTop: 32,
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
