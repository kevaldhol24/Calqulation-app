# GitHub Actions Build Setup Guide

This guide will help you set up automated Android builds using GitHub Actions.

## 🚀 Quick Setup

### 1. Get Your Expo Token

1. Visit [expo.dev](https://expo.dev) and log in
2. Go to your account settings → Access Tokens
3. Create a new token with the name "GitHub Actions"
4. Copy the generated token

### 2. Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add a secret named `EXPO_TOKEN` with the token you copied

### 3. Trigger a Build

You can trigger builds in several ways:

#### Automatic Triggers
- Push to `main` or `develop` branches
- Create a pull request to `main`

#### Manual Trigger
1. Go to Actions tab in your repository
2. Select "Build Android APK" workflow
3. Click "Run workflow"
4. Choose build type (APK or AAB)
5. Click "Run workflow"

## 📱 Download Your Built App

1. After the workflow completes, go to the workflow run page
2. Scroll down to the "Artifacts" section
3. Download the `android-apk-*` or `android-aab-*` file
4. Extract the ZIP file to get your APK/AAB

## 🔧 Build Optimization Features

### Bundle Size Optimization
- **Tree shaking**: Removes unused code automatically
- **Asset optimization**: Compresses images and assets
- **Console removal**: Strips console.log statements in production
- **ProGuard**: Minifies and obfuscates Android code

### Performance Improvements
- **Caching**: Dependencies and Gradle cache for faster builds
- **Parallel processing**: Multiple jobs run simultaneously
- **Incremental builds**: Only rebuilds changed components

### Build Types

#### APK (Android Package)
- **Use case**: Testing, side-loading, direct distribution
- **Size**: Larger file size
- **Installation**: Can install directly on devices
- **Trigger**: Default for preview builds

#### AAB (Android App Bundle)
- **Use case**: Google Play Store distribution
- **Size**: Smaller download size (dynamic delivery)
- **Installation**: Requires Google Play or bundletool
- **Trigger**: Manual selection or production builds

## 🛠 Troubleshooting

### Common Issues

#### Build Fails with "Expo Token Invalid"
- Regenerate your Expo token
- Update the `EXPO_TOKEN` secret in GitHub

#### Out of Memory Errors
- The workflow uses optimized memory settings
- If issues persist, consider reducing concurrent processes

#### Gradle Build Failures
- Clear cache by re-running the workflow
- Check if all dependencies are compatible

#### Asset Bundle Too Large
- Review `assetBundlePatterns` in app.json
- Remove unused assets from the assets folder
- Use vector graphics where possible

### Getting Help
- Check the workflow logs for detailed error messages
- Verify all required permissions are set in app.json
- Ensure your app builds locally first with `npm run build:android:local`

## 📊 Build Artifacts Retention

- Artifacts are kept for 30 days
- Download them before they expire
- You can adjust retention in the workflow file

## 🔄 Updating the Workflow

The workflow file is located at `.github/workflows/build-android.yml`. You can:
- Modify build configurations
- Add additional steps (testing, notifications)
- Change artifact retention periods
- Add environment-specific builds

## 💡 Best Practices

1. **Test locally first**: Use `npm run build:android:local` before pushing
2. **Use preview builds**: For testing, use APK builds
3. **Production builds**: Use AAB for store distribution
4. **Branch strategy**: Use feature branches and merge to main/develop
5. **Version management**: Update version in app.json for new releases
