import { router, useLocalSearchParams } from 'expo-router';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '../../constants/colors';
import { products } from '../../constants/products';

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return <Text>Producto no encontrado.</Text>;
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.emoji}>{product.emoji}</Text>

      <View style={styles.sheet}>
        <Text style={styles.name}>{product.name}</Text>

        <Text style={styles.price}>Bs {product.price}</Text>

        <Text style={styles.description}>
          {product.description}
        </Text>

        <Pressable
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: '/order',
              params: { id: product.id },
            })
          }
        >
          <Text style={styles.buttonText}>Pedir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  emoji: {
    width: '100%',
    height: 280,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 110,
  },
  sheet: {
    flex: 1,
    marginTop: 8,
    padding: 28,
    gap: 8,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.card,
  },
  name: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },
  price: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.primary,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted,
    marginTop: 8,
  },
  button: {
    marginTop: 'auto',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: colors.primary,
    elevation: 4,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.onPrimary,
  },
});