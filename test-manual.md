# Manual Testing Checklist for FakeStoreApp

## Pre-Testing Setup
1. Ensure the app is running: `npm start`
2. Open the app on iOS Simulator, Android Emulator, or physical device
3. Verify the app loads without errors

## Core Functionality Tests

### 1. Product List Screen
- [ ] **App Launch**: App opens and shows product list
- [ ] **Product Loading**: Products load from Fake Store API
- [ ] **Product Display**: Products show with images, titles, prices, and ratings
- [ ] **Search Functionality**: 
  - [ ] Type in search bar to filter products
  - [ ] Search works for product titles and descriptions
  - [ ] Clear search shows all products again
- [ ] **Category Filtering**:
  - [ ] Tap "Filter" chip to open category modal
  - [ ] Select different categories (electronics, jewelry, etc.)
  - [ ] Verify products filter correctly by category
  - [ ] Select "All Categories" to show all products
- [ ] **Pull-to-Refresh**:
  - [ ] Pull down on product list to refresh
  - [ ] Verify loading indicator appears
  - [ ] Verify products reload successfully
- [ ] **Add to Cart**:
  - [ ] Tap "Add to Cart" button on any product
  - [ ] Verify cart icon in header shows count (1)
  - [ ] Add multiple products to cart
  - [ ] Verify cart count updates correctly

### 2. Product Detail Screen
- [ ] **Navigation**: Tap on any product to open detail screen
- [ ] **Product Information**: 
  - [ ] Product image displays correctly
  - [ ] Product title, price, and description show
  - [ ] Rating stars display correctly
  - [ ] Category chip shows
- [ ] **Quantity Selection**:
  - [ ] Tap "Quantity: 1" button
  - [ ] Modal opens for quantity selection
  - [ ] Change quantity and tap "Done"
  - [ ] Verify quantity updates on screen
- [ ] **Add to Cart from Detail**:
  - [ ] Tap "Add to Cart" button
  - [ ] Verify success message appears
  - [ ] Go back to product list
  - [ ] Verify cart count includes the added quantity

### 3. Cart Screen
- [ ] **Navigation**: Tap cart icon in header to open cart
- [ ] **Cart Display**:
  - [ ] All added products show in cart
  - [ ] Product images, titles, and prices display
  - [ ] Quantities show correctly
  - [ ] Individual item totals calculate correctly
- [ ] **Quantity Management**:
  - [ ] Use +/- buttons to change quantities
  - [ ] Verify quantities update in real-time
  - [ ] Set quantity to 0 to remove item
  - [ ] Verify item is removed from cart
- [ ] **Remove Items**:
  - [ ] Tap delete icon on any item
  - [ ] Confirm removal in alert dialog
  - [ ] Verify item is removed from cart
- [ ] **Clear Cart**:
  - [ ] Tap "Clear All" button
  - [ ] Confirm in alert dialog
  - [ ] Verify cart is empty
- [ ] **Total Calculation**:
  - [ ] Verify total price calculates correctly
  - [ ] Add/remove items and verify total updates
- [ ] **Empty Cart State**:
  - [ ] Clear all items from cart
  - [ ] Verify "Your cart is empty" message shows
  - [ ] Tap "Start Shopping" to go back to product list

### 4. Checkout Screen
- [ ] **Navigation**: Tap "Checkout" FAB in cart screen
- [ ] **Order Summary**:
  - [ ] All cart items show in summary
  - [ ] Quantities and prices display correctly
  - [ ] Total price matches cart total
- [ ] **Form Validation**:
  - [ ] Try to place order without filling name
  - [ ] Verify validation error appears
  - [ ] Try to place order without filling address
  - [ ] Verify validation error appears
- [ ] **Shipping Information**:
  - [ ] Enter name in "Full Name" field
  - [ ] Enter address in "Address" field
- [ ] **Payment Method Selection**:
  - [ ] Select different payment methods
  - [ ] Verify selection updates correctly
- [ ] **Order Placement**:
  - [ ] Fill all required fields
  - [ ] Tap "Place Order" button
  - [ ] Verify loading state appears
  - [ ] Verify success message with order details
  - [ ] Verify cart is cleared after successful order
  - [ ] Verify navigation back to product list

### 5. Navigation Tests
- [ ] **Header Navigation**:
  - [ ] Cart icon shows correct count
  - [ ] Tap cart icon from any screen
  - [ ] Back button works from all screens
- [ ] **Screen Transitions**:
  - [ ] Smooth transitions between screens
  - [ ] Proper screen titles in headers
  - [ ] Deep linking works (if applicable)

### 6. Persistence Tests
- [ ] **Cart Persistence**:
  - [ ] Add items to cart
  - [ ] Close and reopen the app
  - [ ] Verify cart items are still there
  - [ ] Verify cart count is correct
- [ ] **State Persistence**:
  - [ ] Navigate between screens
  - [ ] Verify cart state persists across navigation
  - [ ] Verify search and filter states reset appropriately

### 7. Error Handling Tests
- [ ] **Network Errors**:
  - [ ] Turn off internet connection
  - [ ] Try to refresh product list
  - [ ] Verify error message appears
  - [ ] Turn internet back on and verify recovery
- [ ] **Empty States**:
  - [ ] Search for non-existent product
  - [ ] Verify "No products found" message
  - [ ] Clear search to show all products again

### 8. UI/UX Tests
- [ ] **Loading States**:
  - [ ] Skeleton loaders show while loading products
  - [ ] Loading indicators work during refresh
- [ ] **Responsive Design**:
  - [ ] App works on different screen sizes
  - [ ] Text is readable and buttons are tappable
- [ ] **Accessibility**:
  - [ ] All interactive elements are accessible
  - [ ] Screen reader compatibility (if available)

## Performance Tests
- [ ] **App Performance**:
  - [ ] App launches quickly
  - [ ] Smooth scrolling through product list
  - [ ] No memory leaks during extended use
- [ ] **Image Loading**:
  - [ ] Product images load efficiently
  - [ ] No broken image placeholders

## Final Verification
- [ ] **Complete User Journey**:
  - [ ] Browse products
  - [ ] Search and filter products
  - [ ] View product details
  - [ ] Add multiple items to cart
  - [ ] Manage cart quantities
  - [ ] Complete checkout process
  - [ ] Verify order success and cart clearing

## Test Results
- [ ] All core functionality works as expected
- [ ] No crashes or major bugs encountered
- [ ] UI is responsive and user-friendly
- [ ] Cart persistence works correctly
- [ ] All assignment requirements are met

## Notes
- Test on both iOS and Android if possible
- Test with different network conditions
- Verify all error states are handled gracefully
- Ensure the app meets the assignment requirements
