# Calqulation Mobile App

A React Native (Expo) mobile application that wraps the Calqulation website in a WebView for Android and iOS devices.

## Features

- 🌐 **Full-screen WebView** loading https://www.calqulation.com
- ⚡ **Splash Screen** with app branding
- 🔄 **Loading Indicators** while content loads
- 📱 **Responsive Design** for mobile devices
- 🛜 **Internet Permissions** properly configured
- 🎨 **Clean UI** with error handling
- 🔧 **Production Ready** code structure

## Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd calqulation
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
