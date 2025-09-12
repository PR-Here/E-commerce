import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Card,
  Divider,
  FAB,
  IconButton,
  Text,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../contexts/CartContext';
import { RootStackParamList } from '../types';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

export const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const insets = useSafeAreaInsets();

  const handleRemoveItem = (productId: number) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => removeFromCart(productId) },
      ]
    );
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: clearCart },
      ]
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add some products first!');
      return;
    }
    navigation.navigate('Checkout');
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <Card style={styles.cartItem}>
      <View style={styles.itemContainer}>
        <Image resizeMode="contain" source={{ uri: item.product.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text variant="titleMedium" style={styles.itemTitle} numberOfLines={2}>
            {item.product.title}
          </Text>
          <Text variant="bodyMedium" style={styles.itemPrice}>
            ${item.product.price.toFixed(2)} each
          </Text>
          <View style={styles.ratingContainer}>
            <Text variant="bodySmall" style={styles.ratingText}>
              ⭐ {item.product.rating.rate.toFixed(1)} ({item.product.rating.count})
            </Text>
          </View>
          <View style={styles.quantityContainer}>
            <IconButton
              icon="minus"
              size={20}
              onPress={() => handleQuantityChange(item.product.id, item.quantity - 1)}
              iconColor="#6366F1"
              style={styles.quantityButton}
            />
            <Text variant="titleMedium" style={styles.quantity}>
              {item.quantity}
            </Text>
            <IconButton
              icon="plus"
              size={20}
              onPress={() => handleQuantityChange(item.product.id, item.quantity + 1)}
              iconColor="#6366F1"
              style={styles.quantityButton}
            />
          </View>
        </View>
        <View style={styles.itemActions}>
          <Text variant="titleLarge" style={styles.itemTotal}>
            ${(item.product.price * item.quantity).toFixed(2)}
          </Text>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => handleRemoveItem(item.product.id)}
            iconColor="#EF4444"
            style={styles.deleteButton}
          />
        </View>
      </View>
    </Card>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Text variant="headlineSmall" style={styles.emptyTitle}>
        Your cart is empty
      </Text>
      <Text variant="bodyMedium" style={styles.emptyMessage}>
        Add some products to get started!
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('ProductList')}
        style={styles.shopButton}
        icon="shopping"
      >
        Start Shopping
      </Button>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        {renderEmptyCart()}
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerTitle}>
            Shopping Cart
          </Text>
          <Text variant="bodyMedium" style={styles.headerSubtitle}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </Text>
        </View>
        <Button
          mode="outlined"
          onPress={handleClearCart}
          textColor="#EF4444"
          icon="delete-sweep"
          style={styles.clearButton}
          labelStyle={styles.clearButtonText}
        >
          Clear All
        </Button>
      </View>

      {/* Cart Items List */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Total Summary Card */}
      <Card style={styles.totalCard}>
        <Card.Content style={styles.totalCardContent}>
          <View style={styles.totalRow}>
            <Text variant="titleLarge" style={styles.totalLabel}>
              Subtotal
            </Text>
            <Text variant="titleLarge" style={styles.totalAmount}>
              ${getTotalPrice().toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text variant="bodyMedium" style={styles.shippingLabel}>
              Shipping
            </Text>
            <Text variant="bodyMedium" style={styles.shippingAmount}>
              Free
            </Text>
          </View>
          <Divider style={styles.totalDivider} />
          <View style={styles.totalRow}>
            <Text variant="headlineSmall" style={styles.finalTotalLabel}>
              Total
            </Text>
            <Text variant="headlineSmall" style={styles.finalTotalAmount}>
              ${getTotalPrice().toFixed(2)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <FAB
        icon="credit-card"
        label="Checkout"
        style={[styles.checkoutFab, { bottom: insets.bottom + 16 }]}
        onPress={handleCheckout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold',
    color: '#1F2937',
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 24,
  },
  headerSubtitle: {
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
  },
  clearButton: {
    borderColor: '#EF4444',
    borderRadius: 12,
  },
  clearButtonText: {
    fontFamily: 'Inter_500Medium',
  },
  listContainer: {
    padding: 16,
  },
  cartItem: {
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    marginBottom: 4,
    fontFamily: 'Inter_600SemiBold',
    color: '#1F2937',
    lineHeight: 20,
  },
  itemPrice: {
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Inter_500Medium',
  },
  ratingContainer: {
    marginBottom: 8,
  },
  ratingText: {
    color: '#F59E0B',
    fontFamily: 'Inter_400Regular',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 4,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    margin: 0,
  },
  quantity: {
    marginHorizontal: 12,
    minWidth: 30,
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
    color: '#1F2937',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemTotal: {
    color: '#6366F1',
    marginBottom: 8,
    fontFamily: 'Inter_700Bold',
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 20,
  },
  totalCard: {
    margin: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  totalCardContent: {
    padding: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontFamily: 'Inter_600SemiBold',
    color: '#6B7280',
    fontWeight: 'bold',
    fontSize: 24,
  },
  totalAmount: {
    color: '#1F2937',
    fontFamily: 'Inter_600SemiBold',
    fontWeight: 'bold',
  
  },
  shippingLabel: {
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
  },
  shippingAmount: {
    fontFamily: 'Inter_500Medium',
    color: '#10B981',
  },
  totalDivider: {
    marginVertical: 12,
    backgroundColor: '#E5E7EB',
  },
  finalTotalLabel: {
    fontFamily: 'Inter_700Bold',
    color: '#1F2937',
  },
  finalTotalAmount: {
    color: '#6366F1',
    fontFamily: 'Inter_700Bold',
  },
  checkoutFab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#6366F1',
    borderRadius: 28,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
    color: '#1F2937',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 24,
    fontFamily: 'Inter_400Regular',
  },
  shopButton: {
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: '#6366F1',
  },
});
