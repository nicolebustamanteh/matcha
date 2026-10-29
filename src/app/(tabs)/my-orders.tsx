
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { loadOrders, Order } from '../../storage/orders';

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function getOrders() {
        setIsLoading(true);

        try {
          const savedOrders = await loadOrders();

          if (isActive) {
            setOrders(savedOrders);
          }
        } catch (error) {
          console.error('Error al cargar los pedidos:', error);
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      }

      getOrders();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Mis pedidos</Text>

      {isLoading ? (
        <View style={styles.empty}>
          <ActivityIndicator size="large" color={colors.primarySoft} />
          <Text style={styles.emptyText}>Cargando pedidos...</Text>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons
            name="receipt-outline"
            size={64}
            color={colors.primarySoft}
          />
          <Text style={styles.emptyText}>
            Todavía no pediste nada
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderIcon}>
                <Ionicons
                  name="receipt-outline"
                  size={26}
                  color={colors.primarySoft}
                />
              </View>

              <View style={styles.orderInfo}>
                <Text style={styles.productName}>{item.product}</Text>
                <Text style={styles.orderDetails}>
                  {item.date} · {item.name}
                </Text>
              </View>

              <Text style={styles.price}>
                Bs {item.price.toFixed(2)}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.h2,
    color: colors.text,
    marginBottom: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.p,
    color: colors.textMuted,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 24,
    gap: 12,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  orderIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  orderInfo: {
    flex: 1,
    gap: 4,
  },
  productName: {
    fontSize: 15,
    fontFamily: fonts.h2,
    color: colors.text,
  },
  orderDetails: {
    fontSize: 12,
    fontFamily: fonts.p,
    color: colors.textMuted,
  },
  price: {
    fontSize: 14,
    fontFamily: fonts.h2,
    color: colors.text,
  },
});
