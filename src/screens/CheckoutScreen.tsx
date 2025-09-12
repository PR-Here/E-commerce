import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Card,
  Divider,
  List,
  RadioButton,
  Text,
  TextInput,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../contexts/CartContext';
import { CheckoutForm, RootStackParamList } from '../types';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Checkout'>;

export const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    address: '',
    paymentMethod: 'credit',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentMethodChange = (method: CheckoutForm['paymentMethod']) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return false;
    }
    if (!formData.address.trim()) {
      Alert.alert('Validation Error', 'Please enter your address');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Order Placed!',
        `Thank you for your order, ${formData.name}! Your order total is $${getTotalPrice().toFixed(2)}.`,
        [
          {
            text: 'OK',
            onPress: () => {
              clearCart();
              navigation.navigate('ProductList');
            },
          },
        ]
      );
    }, 2000);
  };

  const renderCartSummary = () => (
    <Card style={styles.summaryCard}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.summaryTitle}>
          Order Summary
        </Text>
        <Divider style={styles.divider} />
        {cartItems.map((item) => (
          <View key={item.product.id} style={styles.summaryItem}>
            <Text variant="bodyMedium" style={styles.summaryItemText}>
              {item.product.title} x {item.quantity}
            </Text>
            <Text variant="bodyMedium" style={styles.summaryItemPrice}>
              ${(item.product.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        <Divider style={styles.divider} />
        <View style={styles.totalRow}>
          <Text variant="titleLarge" style={styles.totalLabel}>
            Total:
          </Text>
          <Text variant="titleLarge" style={styles.totalAmount}>
            ${getTotalPrice().toFixed(2)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Text variant="headlineSmall" style={styles.title}>
        Checkout
      </Text>

      {renderCartSummary()}

      <Card style={styles.formCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Shipping Information
          </Text>

          <TextInput
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Address"
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={3}
          />
        </Card.Content>
      </Card>

      <Card style={styles.formCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Payment Method
          </Text>

          <RadioButton.Group
            onValueChange={handlePaymentMethodChange}
            value={formData.paymentMethod}
          >
            <List.Item
              title="Credit Card"
              description="Pay with your credit card"
              left={(props) => <List.Icon {...props} icon="credit-card" />}
              right={(props) => (
                <RadioButton {...props} value="credit" />
              )}
            />
            <List.Item
              title="Debit Card"
              description="Pay with your debit card"
              left={(props) => <List.Icon {...props} icon="card" />}
              right={(props) => (
                <RadioButton {...props} value="debit" />
              )}
            />
            <List.Item
              title="PayPal"
              description="Pay with PayPal"
              left={(props) => <List.Icon {...props} icon="credit-card" />}
              right={(props) => (
                <RadioButton {...props} value="paypal" />
              )}
            />
            <List.Item
              title="Cash on Delivery"
              description="Pay when you receive the order"
              left={(props) => <List.Icon {...props} icon="cash" />}
              right={(props) => (
                <RadioButton {...props} value="cash" />
              )}
            />
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Back to Cart
        </Button>
        <Button
          mode="contained"
          onPress={handlePlaceOrder}
          style={styles.button}
          loading={loading}
          disabled={loading}
          icon="check"
        >
          Place Order
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    margin: 16,
    fontWeight: 'bold',
  },
  summaryCard: {
    margin: 16,
    elevation: 2,
  },
  summaryTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Inter_700Bold',
  },
  divider: {
    marginVertical: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryItemText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
  summaryItemPrice: {
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#6366F1',
    fontFamily: 'Inter_700Bold',
  },
  formCard: {
    margin: 16,
    marginTop: 0,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Inter_700Bold',
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  button: {
    flex: 1,
  },
});
