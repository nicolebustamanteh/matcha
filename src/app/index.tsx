import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { products } from '../constants/products';

export default function Index() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Matcha</Text>
        <Text style={styles.subtitle}>¿Qué vas a tomar hoy?</Text>

        {products.map((product) => (
          <Link
            key={product.id}
            href={{
              pathname: '/product/[id]',
              params: { id: product.id },
            }}
            asChild
          >
            <Pressable style={styles.card}>
              <Text style={styles.cardEmoji}>{product.emoji}</Text>

              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{product.name}</Text>
                <Text style={styles.cardPrice}>Bs {product.price}</Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textMuted}
              />
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 14,
    borderRadius: 28,
    backgroundColor: colors.card,
    elevation: 2,
  },
  cardEmoji: {
    width: 84,
    height: 84,
    borderRadius: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 42,
    backgroundColor: colors.primarySoft,
    overflow: 'hidden',
  },
  cardInfo: {
    flex: 1,
    gap: 6,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
});