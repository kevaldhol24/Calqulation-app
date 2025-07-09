# Calqulation Mobile App

A React Native (Expo) mobile application that provides easy access to financial calculation tools with a native mobile experience.

## 🚀 Features

- 🏠 **Custom Home Screen** with tool overview and branding
- 📊 **SIP Calculator** - Calculate your SIP investments and returns
- 💰 **Advanced EMI Tool** - Calculate loan EMI and total interest
- 📱 **Offline EMI Calculator** - Basic EMI calculation without internet
- 📚 **Financial Blog** - Access to latest financial insights
- ⚙️ **Settings Screen** - App preferences and information
- � **Multi-Currency Support** - Support for 8 popular currencies (INR, USD, EUR, GBP, JPY, CAD, AUD, KRW)
- 💾 **Persistent Currency Preference** - Your currency choice is saved and persists across app sessions
- 🔄 **Live Currency Updates** - Currency changes are applied to all open WebViews immediately
- �📱 **Bottom Tab Navigation** - Easy navigation between sections
- 🌐 **WebView Integration** - Seamless integration with Calqulation website
- ⚡ **Splash Screen** with app branding
- 🔄 **Loading States** for all screens
- 📱 **Responsive Design** for different screen sizes
- 🎨 **Modern UI** with consistent design language and centralized theming
- 🛜 **Offline Error Handling** with user-friendly messages

## 📱 App Structure

### Navigation
- **Home**: Custom native home screen showcasing financial tools
  - **Loan Comparison**: WebView loading https://www.calqulation.com/tool/loan-comparison
  - **Personal Loan Calculator**: WebView loading https://www.calqulation.com/tool/personal-loan-calculator
  - **Car Loan Calculator**: WebView loading https://www.calqulation.com/tool/car-loan-calculator
  - **Offline EMI Calculator**: Native calculator that works offline
- **SIP Calculator**: WebView loading https://www.calqulation.com/tool/sip-calculator
- **EMI Calculator**: WebView loading https://www.calqulation.com/tool/emi-calculator
- **Blog**: WebView loading https://www.calqulation.com/blog
- **Settings**: Native settings screen for app preferences

### Key Technologies
- React Native with Expo SDK 53
- TypeScript for type safety
- React Navigation 6 for bottom tabs and stack navigation
- react-native-webview for web content
- Expo Vector Icons for consistent iconography
- React Native Safe Area Context for proper screen handling
- AsyncStorage for persistent currency preferences

## Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/calqulation-app.git
   cd calqulation-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

## Development

### Running the App

**For Development:**
```bash
# Start Expo development server
npx expo start

# Run on Android device/emulator
npx expo start --android

# Run on iOS device/simulator (macOS only)
npx expo start --ios

# Run on web browser
npx expo start --web
```

### Project Structure
```
calqulation-app/
├── screens/              # App screens
│   ├── HomeScreen.tsx    # Custom home screen
│   ├── SIPCalculatorScreen.tsx
│   ├── EMICalculatorScreen.tsx
│   ├── BlogScreen.tsx
│   ├── SettingsScreen.tsx
│   └── index.ts          # Screen exports
├── navigation/           # Navigation configuration
│   └── AppNavigator.tsx  # Bottom tab navigator
├── assets/              # Images and icons
├── App.tsx              # Main app component
├── app.json             # Expo configuration
└── package.json         # Dependencies and scripts
```
npx expo run:android

# Run on iOS device/simulator (macOS only)
npx expo run:ios

# Run in web browser
npx expo start --web
```

**Using Expo Go App:**
1. Install Expo Go on your mobile device
2. Scan the QR code from the terminal
3. The app will load directly on your device

### Project Structure

```
calqulation/
├── App.tsx                 # Main application component
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── assets/                # App icons and images
│   ├── icon.png          # App icon
│   ├── splash-icon.png   # Splash screen image
│   ├── adaptive-icon.png # Android adaptive icon
│   └── favicon.png       # Web favicon
└── .github/
    └── copilot-instructions.md
```

## Building for Production

### 1. Using EAS Build (Recommended)

**Install EAS CLI:**
```bash
npm install -g eas-cli
```

**Login to Expo:**
```bash
eas login
```

**Configure EAS:**
```bash
eas build:configure
```

**Build Android APK:**
```bash
# Build APK for Play Store
eas build --platform android --profile production

# Build APK for direct distribution
eas build --platform android --profile preview
```

**Build iOS (macOS only):**
```bash
eas build --platform ios --profile production
```

### 2. Local Build (Alternative)

**Android:**
```bash
# Generate Android Bundle (AAB) for Play Store
npx expo run:android --variant release

# Generate APK for direct distribution
cd android
./gradlew assembleRelease
```

**iOS (macOS only):**
```bash
npx expo run:ios --configuration Release
```

## App Configuration

### App Identity
- **Name:** Calqulation
- **Package ID:** com.calqulation.app
- **Version:** 1.0.0

### Permissions
- `android.permission.INTERNET`
- `android.permission.ACCESS_NETWORK_STATE`

### Supported Platforms
- ✅ Android (API level 21+)
- ✅ iOS (iOS 13.4+)
- ✅ Web (for testing)

## Deployment to Play Store

1. **Build the app:**
   ```bash
   eas build --platform android --profile production
   ```

2. **Download the AAB file** from the EAS dashboard

3. **Upload to Google Play Console:**
   - Create a new app in Google Play Console
   - Upload the AAB file
   - Fill in app details, screenshots, and store listing
   - Submit for review

## Environment Variables

No environment variables are required for this app as it loads a public website.

## Troubleshooting

### Common Issues

**WebView not loading:**
- Check internet connectivity
- Verify the URL is accessible
- Check if the website allows embedding in WebViews

**Build errors:**
- Clear cache: `npx expo start --clear`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Update Expo CLI: `npm install -g @expo/cli@latest`

**Android build issues:**
- Ensure Android Studio is properly installed
- Check Java version compatibility
- Verify Android SDK is configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
