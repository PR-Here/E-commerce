import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useCallback, useState } from 'react';
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
import * as Yup from 'yup';
import { useCart } from '../contexts/CartContext';
import { CheckoutForm, RootStackParamList } from '../types';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Checkout'>;

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  address: Yup.string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must be less than 200 characters')
    .required('Address is required'),
  paymentMethod: Yup.string()
    .oneOf(['credit', 'debit', 'paypal', 'cash'], 'Invalid payment method')
    .required('Payment method is required'),
});

export const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);

  const initialValues: CheckoutForm = {
    name: '',
    address: '',
    paymentMethod: 'credit',
  };

  const handlePlaceOrder = useCallback(async (values: CheckoutForm) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Order Placed!',
        `Thank you for placing your order! Your order total is $${getTotalPrice().toFixed(2)}. and will be delivered to ${values.address}`,
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
  }, [getTotalPrice, clearCart, navigation]);

  const renderCartSummary = useCallback(() => (
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
  ), [cartItems, getTotalPrice]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handlePlaceOrder}
    >
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, isValid }) => (
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
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                style={styles.input}
                mode="outlined"
                error={touched.name && !!errors.name}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <TextInput
                label="Address"
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                style={styles.input}
                mode="outlined"
                multiline
                numberOfLines={3}
                error={touched.address && !!errors.address}
              />
              {touched.address && errors.address && (
                <Text style={styles.errorText}>{errors.address}</Text>
              )}
            </Card.Content>
          </Card>

          <Card style={styles.formCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Payment Method
              </Text>

              <RadioButton.Group
                onValueChange={(value) => setFieldValue('paymentMethod', value)}
                value={values.paymentMethod}
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
              {touched.paymentMethod && errors.paymentMethod && (
                <Text style={styles.errorText}>{errors.paymentMethod}</Text>
              )}
            </Card.Content>
          </Card>

          <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 16 }]}>
            <Button
              mode="outlined"
              onPress={handleGoBack}
              style={styles.button}
            >
              Back to Cart
            </Button>
            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={styles.button}
              loading={loading}
              icon="check"
            >
              Place Order
            </Button>
          </View>
        </ScrollView>
      )}
    </Formik>
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
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 12,
    fontFamily: 'Inter_400Regular',
  },
});
