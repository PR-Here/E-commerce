import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Card,
  Chip,
  Divider,
  IconButton,
  Text,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageCarousel } from '../components/ImageCarousel';
import { useCart } from '../contexts/CartContext';
import { RootStackParamList } from '../types';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

export const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  const { product } = route.params;
  const { addToCart } = useCart();
  const insets = useSafeAreaInsets();

  const [quantity, setQuantity] = useState(1);

  // Generate multiple images for carousel (simulating different angles/views)
  const getProductImages = useCallback(() => {
    const baseImage = product.image;
    // For demo purposes, we'll create variations of the same image
    // In a real app, you'd have multiple actual product images
    return [
      baseImage,
      baseImage.replace('https://fakestoreapi.com/img/', 'https://picsum.photos/400/400?random='),
      baseImage.replace('https://fakestoreapi.com/img/', 'https://picsum.photos/400/400?random='),
      baseImage.replace('https://fakestoreapi.com/img/', 'https://picsum.photos/400/400?random='),
    ];
  }, [product.image]);

  const handleAddToCart = useCallback(() => {
    addToCart(product, quantity);
    Alert.alert('Success', 'Product added to cart!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Cart'),
      },
    ]);
    setQuantity(1);
  }, [addToCart, product, quantity, navigation]);

  const handleIncreaseQuantity = useCallback(() => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  }, [quantity]);

  const handleDecreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  const renderStars = useCallback((rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆');
    }

    return stars.join('');
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageCarousel
          images={getProductImages()}
          height={350}
        />

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.headerSection}>
              <Text variant="headlineSmall" style={styles.title}>
                {product.title}
              </Text>

              <View style={styles.priceContainer}>
                <Text variant="headlineMedium" style={styles.price}>
                  ${product.price.toFixed(2)}
                </Text>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingIcon}>⭐</Text>
                  <Text style={styles.ratingText}>
                    {product.rating.rate.toFixed(1)}
                  </Text>
                  <Text style={styles.ratingCount}>
                    ({product.rating.count})
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.categorySection}>
              <Chip
                icon="tag"
                style={styles.categoryChip}
                textStyle={styles.categoryChipText}
              >
                {product.category}
              </Chip>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.descriptionSection}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Description
              </Text>
              <Text variant="bodyMedium" style={styles.description}>
                {product.description}
              </Text>
            </View>

            <View style={styles.ratingSection}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Customer Reviews
              </Text>
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  <Text variant="bodyLarge" style={styles.stars}>
                    {renderStars(product.rating.rate)}
                  </Text>
                  <Text variant="bodyMedium" style={styles.ratingValue}>
                    {product.rating.rate.toFixed(1)}
                  </Text>
                </View>
                <Text variant="bodyMedium" style={styles.ratingDescription}>
                  Based on {product.rating.count} customer reviews
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.quantityContainer}>
          <Text variant="titleMedium" style={styles.quantityLabel}>
            Quantity: ${(Number(product.price) * quantity).toFixed(2)}
          </Text>
          <View style={styles.quantityControls}>
            <IconButton
              icon="minus"
              size={24}
              iconColor="#FFFFFF"
              onPress={handleDecreaseQuantity}
              disabled={quantity <= 1}
              style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
            />
            <Text variant="titleLarge" style={styles.quantityText}>
              {quantity}
            </Text>
            <IconButton
              icon="plus"
              size={24}
              iconColor="#FFFFFF"
              onPress={handleIncreaseQuantity}
              disabled={quantity >= 99}
              style={[styles.quantityButton, quantity >= 99 && styles.quantityButtonDisabled]}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <IconButton
            icon="plus"
            size={32}
            iconColor="#FFFFFF"
          />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
  scrollContent: {
    paddingBottom: 120, // Space for fixed button
  },
  card: {
    margin: 20,
    marginTop: -20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  cardContent: {
    padding: 24,
  },
  headerSection: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 16,
    fontFamily: 'Inter_700Bold',
    color: '#1F2937',
    lineHeight: 28,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    color: '#6366F1',
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ratingIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    color: '#92400E',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    marginRight: 4,
  },
  ratingCount: {
    color: '#92400E',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E7FF',
  },
  categoryChipText: {
    color: '#3730A3',
    fontFamily: 'Inter_500Medium',
  },
  divider: {
    marginVertical: 20,
    backgroundColor: '#E5E7EB',
    height: 1,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#1F2937',
    fontSize: 18,
  },
  description: {
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
    color: '#4B5563',
    fontSize: 16,
  },
  ratingSection: {
    marginBottom: 8,
  },
  ratingContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    color: '#F59E0B',
    fontSize: 20,
    marginRight: 8,
    fontFamily: 'Inter_500Medium',
  },
  ratingValue: {
    color: '#1F2937',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
  ratingDescription: {
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end', // Align to bottom
    padding: 24,
    backgroundColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  quantityContainer: {
    flex: 3,
    marginRight: 12,
    alignItems: 'center',
  },
  quantityLabel: {
    color: '#6B7280',
    fontFamily: 'Inter_500Medium',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 56, // Match button height
  },
  quantityButton: {
    margin: 0,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  quantityButtonDisabled: {
    backgroundColor: '#E5E7EB',
    elevation: 0,
    shadowOpacity: 0,
  },
  quantityText: {
    color: '#1F2937',
    fontFamily: 'Inter_700Bold',
    marginHorizontal: 20,
    minWidth: 40,
    textAlign: 'center',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  },
});
