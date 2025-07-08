# Copilot Instructions for Calqulation Mobile App

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is an Expo React Native application that wraps the Calqulation website (https://www.calqulation.com) in a WebView for mobile devices.

## Key Technologies
- Expo SDK 53.0.0
- React Native
- TypeScript
- react-native-webview
- expo-splash-screen

## Project Structure
- **App.tsx**: Main application component with WebView implementation
- **app.json**: Expo configuration file
- **assets/**: Contains app icons and splash screen images

## Development Guidelines
- Use TypeScript for all new code
- Follow React Native best practices
- Ensure proper error handling for network requests
- Maintain responsive design for different screen sizes
- Test on both Android and iOS (if possible)

## WebView Configuration
- Target URL: https://www.calqulation.com
- Enable JavaScript and DOM storage
- Include proper loading states and error handling
- Support for pull-to-refresh functionality

## Build Configuration
- Android package: com.calqulation.app
- iOS bundle identifier: com.calqulation.app
- Required permissions: INTERNET, ACCESS_NETWORK_STATE
