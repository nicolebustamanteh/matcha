
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { products } from '../../constants/products';

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Matcha</Text>
        <Text style={styles.subtitle}>¿Qué vas a tomar hoy?</Text>

        {products.map((product, index) => (
          <Animated.View
            key={product.id}
            entering={FadeInDown.delay(index * 100)}
          >
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/product/[id]',
                  params: { id: product.id },
                })
              }
              style={styles.pressable}
            >
              {({ pressed }) => (
                <Animated.View
                  style={[
                    styles.card,
                    {
                      transform: [
                        { scale: pressed ? 0.96 : 1 },
                      ],
                      transitionProperty: 'transform',
                      transitionDuration: 150,
                    },
                  ]}
                >
                  <Text style={styles.cardEmoji}>
                    {product.emoji}
                  </Text>

                  <View style={styles.cardInfo}>
                    <Text style={styles.cardName}>
                      {product.name}
                    </Text>
                    <Text style={styles.cardPrice}>
                      Bs {product.price}
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.textMuted}
                  />
                </Animated.View>
              )}
            </Pressable>
          </Animated.View>
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
    fontFamily: fonts.h1,
    letterSpacing: -1,
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.p,
    color: colors.textMuted,
    marginBottom: 12,
  },
  pressable: {
    borderRadius: 28,
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
    fontFamily: fonts.h2,
    color: colors.text,
  },
  cardPrice: {
    fontSize: 20,
    fontFamily: fonts.h2,
    color: colors.primary,
  },
});
