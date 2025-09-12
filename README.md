# FakeStoreApp

A React Native mobile app that implements a complete e-commerce experience using the Fake Store API. Built with Expo, React Navigation, React Native Paper, and Context API for state management.

## Features

### Core Functionality
- ✅ **Product List**: Browse products from Fake Store API with search and filter capabilities
- ✅ **Product Detail**: View detailed product information with quantity selection
- ✅ **Shopping Cart**: Add/remove items with persistent storage using AsyncStorage
- ✅ **Checkout Process**: Complete order form with shipping and payment information
- ✅ **React Navigation**: Native stack navigation with header and cart icon
- ✅ **State Management**: Context API with cart persistence across app sessions

### UI/UX Features
- ✅ **React Native Paper**: Modern Material Design components
- ✅ **Search & Filter**: Real-time product search and category filtering
- ✅ **Pull-to-Refresh**: Refresh product list with pull gesture
- ✅ **Skeleton Loaders**: Loading states while fetching data
- ✅ **Responsive Design**: Optimized for mobile devices
- ✅ **Cart Badge**: Real-time cart item count in header

### Technical Features
- ✅ **TypeScript**: Full type safety throughout the app
- ✅ **AsyncStorage**: Persistent cart storage across app sessions
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **Unit Tests**: Jest tests for CartContext reducer
- ✅ **Clean Architecture**: Organized folder structure and separation of concerns

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ProductCard.tsx
│   └── ProductSkeleton.tsx
├── contexts/            # Context providers
│   └── CartContext.tsx
├── navigation/          # Navigation configuration
│   └── AppNavigator.tsx
├── screens/            # Screen components
│   ├── ProductListScreen.tsx
│   ├── ProductDetailScreen.tsx
│   ├── CartScreen.tsx
│   └── CheckoutScreen.tsx
├── services/           # API services
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions and themes
│   └── theme.ts
└── __tests__/          # Unit tests
    ├── setup.ts
    └── CartContext.test.tsx
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FakeStoreApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - For iOS: `npm run ios` or scan QR code with Expo Go app
   - For Android: `npm run android` or scan QR code with Expo Go app
   - For Web: `npm run web`

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run on web browser
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage
The app includes comprehensive unit tests for the CartContext reducer, covering:
- Adding items to cart
- Updating quantities
- Removing items
- Clearing cart
- Total price calculations
- Total item count calculations

## API Integration

The app integrates with the [Fake Store API](https://fakestoreapi.com) to fetch:
- Product listings
- Product details
- Product categories
- Category-specific products

## State Management

The app uses React Context API for state management with the following features:
- **CartContext**: Manages shopping cart state
- **AsyncStorage Persistence**: Cart data persists across app sessions
- **Real-time Updates**: UI updates immediately when cart changes

## Navigation

The app uses React Navigation v6 with:
- **Native Stack Navigator**: For screen transitions
- **Header Configuration**: Custom headers with cart icon
- **Type Safety**: Full TypeScript support for navigation

## UI Components

Built with React Native Paper for consistent Material Design:
- **Cards**: Product display and information
- **Buttons**: Actions and navigation
- **Text Inputs**: Search and form inputs
- **Chips**: Categories and tags
- **FABs**: Floating action buttons
- **Modals**: Quantity selection and filters

## Assignment Requirements Checklist

### ✅ Core Requirements
- [x] Product list from Fake Store API
- [x] Product detail screen
- [x] Shopping cart with persistence
- [x] React Navigation implementation
- [x] Clean UI with React Native Paper
- [x] Context API for state management
- [x] Search and filter functionality
- [x] Pull-to-refresh capability
- [x] Checkout form with validation
- [x] Cart item removal and total calculation

### ✅ Technical Requirements
- [x] Expo managed React Native project
- [x] TypeScript implementation
- [x] AsyncStorage for persistence
- [x] Error handling and loading states
- [x] Responsive design
- [x] Unit tests with Jest
- [x] Clean code architecture

### ✅ Optional Enhancements
- [x] Skeleton loaders for better UX
- [x] Quantity selection from product detail
- [x] Offline caching considerations
- [x] Comprehensive error handling
- [x] Modern UI/UX patterns

## Manual Testing Checklist

### Product List Screen
- [ ] Products load from API
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Pull-to-refresh works
- [ ] Skeleton loaders show during loading
- [ ] Empty state displays when no results

### Product Detail Screen
- [ ] Product information displays correctly
- [ ] Quantity selection works
- [ ] Add to cart functionality works
- [ ] Navigation back works

### Cart Screen
- [ ] Cart items display correctly
- [ ] Quantity updates work
- [ ] Remove item functionality works
- [ ] Total price calculates correctly
- [ ] Clear cart functionality works
- [ ] Empty cart state displays

### Checkout Screen
- [ ] Form validation works
- [ ] Payment method selection works
- [ ] Order summary displays correctly
- [ ] Order placement works
- [ ] Cart clears after successful order

### Navigation
- [ ] All screen transitions work
- [ ] Cart icon shows correct count
- [ ] Back navigation works
- [ ] Header titles display correctly

### Persistence
- [ ] Cart persists across app restarts
- [ ] Cart data loads on app start
- [ ] Cart updates save immediately

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Dependency conflicts**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **iOS simulator issues**
   ```bash
   npx expo run:ios
   ```

4. **Android build issues**
   ```bash
   npx expo run:android
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.