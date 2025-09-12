import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, onAddToCart, isInCart = false }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart();
    setIsAdded(true);

    // Reset the added state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const isProductInCart = isInCart || isAdded;

  return (
    <Card style={styles.card} onPress={onPress}>
      <Image resizeMode="contain" source={{ uri: product.image }} style={styles.image} />
      <Card.Content style={styles.content}>
        <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text variant="headlineSmall" style={styles.price}>
          ${product.price.toFixed(2)}
        </Text>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingChip}>
            <Text style={styles.ratingChipText}>⭐</Text>
            <Text style={styles.ratingChipText}>{product.rating.rate.toFixed(1)}</Text>
          </View>
          <Text variant="bodySmall" style={styles.ratingCount}>
            ({product.rating.count})
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={handleAddToCart}
          disabled={isInCart}
          style={[
            styles.addButton,
            isProductInCart && styles.addButtonAdded,
            isInCart && styles.addButtonDisabled
          ]}
          icon={isProductInCart ? "check" : "cart-plus"}
          buttonColor={isProductInCart ? "#10B981" : "#6366F1"}
        >
          {isProductInCart ? "Added!" : "Add to Cart"}
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    marginBottom: 6,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    color: '#1F2937',
    lineHeight: 18,
    fontSize: 14,
  },
  price: {
    color: '#6366F1',
    fontWeight: 'bold',
    marginBottom: 6,
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingChip: {
    marginRight: 6,
    backgroundColor: '#FEF3C7',
    height: 28,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  ratingChipText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#92400E',
    marginLeft: 2,
  },
  ratingCount: {
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  addButton: {
    marginTop: 6,
    borderRadius: 8,
    backgroundColor: '#6366F1',
    height: 36,
  },
  addButtonAdded: {
    backgroundColor: '#10B981',
  },
  addButtonDisabled: {
    backgroundColor: '#E5E7EB',
    opacity: 0.6,
  },
});
