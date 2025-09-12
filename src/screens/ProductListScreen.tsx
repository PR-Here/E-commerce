import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Divider,
  FAB,
  List,
  Modal,
  Portal,
  Searchbar,
  Text
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '../components/ProductCard';
import { ProductSkeleton } from '../components/ProductSkeleton';
import { useCart } from '../contexts/CartContext';
import { ApiService } from '../services/api';
import { Product, RootStackParamList } from '../types';

type ProductListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

export const ProductListScreen: React.FC = () => {
  const navigation = useNavigation<ProductListScreenNavigationProp>();
  const { addToCart, getTotalItems, cartItems } = useCart();
  const insets = useSafeAreaInsets();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadProducts = useCallback(async (pageNum = 1, isRefresh = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const [productsData, categoriesData] = await Promise.all([
        ApiService.fetchProducts(),
        ApiService.fetchCategories(),
      ]);

      if (isRefresh || pageNum === 1) {
        setProducts(productsData);
        setFilteredProducts(productsData);
        setPage(1);
      } else {
        setProducts(prev => [...prev, ...productsData]);
        setFilteredProducts(prev => [...prev, ...productsData]);
        setPage(pageNum);
      }

      if (categories.length === 0) {
        setCategories(['all', ...categoriesData]);
      }

      // Simulate pagination - in real app, you'd pass page parameter to API
      setHasMore(productsData.length > 0);
    } catch (error) {
      Alert.alert('Error', 'Failed to load products. Please try again.');
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [categories.length]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProducts(1, true);
    setRefreshing(false);
  }, [loadProducts]);

  const loadMore = useCallback(async () => {
    if (!loadingMore && hasMore) {
      await loadProducts(page + 1);
    }
  }, [loadProducts, loadingMore, hasMore, page]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setFilterModalVisible(false);
  };

  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      'all': '🛍️',
      'electronics': '📱',
      'jewelery': '💎',
      "men's clothing": '👔',
      "women's clothing": '👗',
    };
    return emojiMap[category] || '📦';
  };


  const renderProduct = ({ item }: { item: Product }) => {
    const isInCart = cartItems.some(cartItem => cartItem.product.id === item.id);

    return (
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item)}
        onAddToCart={() => handleAddToCart(item)}
        isInCart={isInCart}
      />
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text variant="headlineSmall" style={styles.emptyTitle}>
        No products found
      </Text>
      <Text variant="bodyMedium" style={styles.emptyMessage}>
        Try adjusting your search or filter criteria
      </Text>
    </View>
  );

  const renderSkeletonGrid = () => (
    <View style={styles.skeletonGrid}>
      {Array(6).fill(null).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </View>
  );


  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <Text variant="bodyMedium" style={styles.loadingText}>
          Loading more products...
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <Searchbar
            placeholder="Search products..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
            inputStyle={styles.searchInput}
            iconColor="#6366F1"
          />
        </View>

        {/* Category Stories Section - Fixed Header */}
        <View style={styles.storiesSection}>
          <Text variant="titleMedium" style={styles.storiesTitle}>
            Shop by Category
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesScrollContainer}
          >
            {categories?.map((category, index) => (
              <View key={category} style={styles.storyContainer}>
                <View
                  style={[
                    styles.storyCircle,
                    selectedCategory === category && styles.storyCircleSelected
                  ]}
                  onTouchEnd={() => handleCategoryFilter(category)}
                >
                  <Text style={[
                    styles.storyEmoji,
                    selectedCategory === category && styles.storyEmojiSelected
                  ]}>
                    {getCategoryEmoji(category)}
                  </Text>
                </View>
                <Text style={[
                  styles.storyLabel,
                  selectedCategory === category && styles.storyLabelSelected
                ]}>
                  {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Skeleton Grid */}
        {renderSkeletonGrid()}
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Search Section */}
      <View style={styles.searchSection}>
        <Searchbar
          placeholder="Search products..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
          iconColor="#6366F1"
        />
      </View>

      {/* Category Stories Section - Fixed Header */}
      <View style={styles.storiesSection}>
        <Text variant="titleMedium" style={styles.storiesTitle}>
          Shop by Category
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesScrollContainer}
        >
          {categories?.map((category, index) => (
            <View key={category} style={styles.storyContainer}>
              <View
                style={[
                  styles.storyCircle,
                  selectedCategory === category && styles.storyCircleSelected
                ]}
                onTouchEnd={() => handleCategoryFilter(category)}
              >
                <Text style={[
                  styles.storyEmoji,
                  selectedCategory === category && styles.storyEmojiSelected
                ]}>
                  {getCategoryEmoji(category)}
                </Text>
              </View>
              <Text style={[
                styles.storyLabel,
                selectedCategory === category && styles.storyLabelSelected
              ]}>
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={renderEmptyState}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Floating Action Buttons */}
      <View style={[styles.fabContainer, { bottom: insets.bottom + 16 }]}>
        <FAB
          icon="filter"
          style={styles.filterFab}
          onPress={() => setFilterModalVisible(true)}
          size="small"
        />
        <FAB
          icon="cart"
          style={styles.cartFab}
          onPress={() => navigation.navigate('Cart')}
          label={getTotalItems() > 0 ? getTotalItems().toString() : undefined}
        />
      </View>

      <Portal>
        <Modal
          visible={filterModalVisible}
          onDismiss={() => setFilterModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Filter by Category
          </Text>
          <Divider style={styles.divider} />
          {categories.map((category) => (
            <List.Item
              key={category}
              title={category === 'all' ? 'All Categories' : category}
              onPress={() => handleCategoryFilter(category)}
              right={selectedCategory === category ? (props) => <List.Icon {...props} icon="check" /> : undefined}
            />
          ))}
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  filterIcon: {
    position: 'absolute',
    right: 20,
    zIndex: 1000,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    bottom: 20,
  },
  searchSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  searchbar: {
    elevation: 3,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderRadius: 16,
  },
  searchInput: {
    fontFamily: 'Inter_400Regular',
  },
  stickyCategoryContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  storiesSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
  },
  stickyStoriesSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  storiesTitle: {
    color: '#1F2937',
    marginBottom: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  storiesScrollContainer: {
    paddingRight: 20,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  storyCircle: {
    width: 60,
    height: 60,
    borderRadius: 99,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  storyCircleSelected: {
    backgroundColor: '#6366F1',
    borderColor: '#4F46E5',
    elevation: 4,
    shadowOpacity: 0.2,
  },
  storyEmoji: {
    fontSize: 18,
  },
  storyEmojiSelected: {
    fontSize: 20,
  },
  storyLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
    maxWidth: 50,
  },
  storyLabelSelected: {
    color: '#6366F1',
    fontFamily: 'Inter_600SemiBold',
  },
  flatListContainer: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  fabContainer: {
    position: 'absolute',
    right: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  filterFab: {
    backgroundColor: '#F3F4F6',
    marginBottom: 10,
    borderRadius: 20,
    elevation: 4,
  },
  cartFab: {
    backgroundColor: '#6366F1',
    borderRadius: 28,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    marginBottom: 8,
    textAlign: 'center',
    color: '#1F2937',
    fontFamily: 'Inter_600SemiBold',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 24,
    margin: 20,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  modalTitle: {
    marginBottom: 20,
    color: '#1F2937',
    fontFamily: 'Inter_600SemiBold',
  },
  divider: {
    marginBottom: 20,
  },
  footerLoader: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
  },
  skeletonGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
});
