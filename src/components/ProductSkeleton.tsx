import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';

export const ProductSkeleton = () => {
  return (
    <Card style={styles.card}>
      <View style={styles.imageContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
      <Card.Content style={styles.content}>
        <View style={styles.title} />
        <View style={styles.price} />
        <View style={styles.rating} />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    height: 20,
    marginBottom: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  price: {
    height: 18,
    width: '30%',
    marginBottom: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  rating: {
    height: 14,
    width: '50%',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
});
