# 🏗️ APK Build Guide for Calqulation App

This guide will walk you through building an APK file for the Google Play Store.

## Prerequisites

1. **Expo Account**: Sign up at https://expo.dev
2. **EAS CLI**: Install globally
   ```bash
   npm install -g eas-cli
   ```

## Step-by-Step Build Process

### 1. Login to EAS
```bash
eas login
```

### 2. Configure EAS Build
```bash
eas build:configure
```
This will create an `eas.json` file with build configurations.

### 3. Build APK for Play Store

**For Production (Google Play Store):**
```bash
eas build --platform android --profile production
```

**For Testing (Direct Install):**
```bash
eas build --platform android --profile preview
```

### 4. Download Your APK
1. Go to https://expo.dev/accounts/[your-username]/projects/calqulation/builds
2. Download the completed build
3. You'll get an `.aab` file for Play Store or `.apk` for direct installation

## Alternative: Local Build

If you prefer building locally:

### 1. Install Android Studio
- Download from https://developer.android.com/studio
- Install with Android SDK

### 2. Generate Keystore
```bash
keytool -genkey -v -keystore calqulation-key.keystore -alias calqulation -keyalg RSA -keysize 2048 -validity 10000
```

### 3. Build APK
```bash
npx expo run:android --variant release
```

## Play Store Upload

1. **Create App in Google Play Console**
   - Go to https://play.google.com/console
   - Create new app
   - Fill basic information

2. **Upload Build**
   - Go to "Production" → "Releases"
   - Upload your `.aab` file
   - Add release notes

3. **Store Listing**
   - Add app description
   - Upload screenshots (required)
   - Set pricing (free)
   - Add app icon

4. **Review & Publish**
   - Complete all required sections
   - Submit for review
   - Wait for Google's approval (usually 1-3 days)

## Required Assets for Play Store

### Screenshots
- **Phone Screenshots**: 2-8 screenshots (1080x1920 or similar)
- **Tablet Screenshots**: Optional but recommended

### App Icon
- Already included in `assets/icon.png`
- Must be 512x512 PNG

### Feature Graphic
- 1024x500 PNG
- Optional but recommended for better visibility

## Build Configuration (eas.json)

```json
{
  "cli": {
    "version": ">= 7.8.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

## Version Management

To update your app version:

1. **Update `app.json`:**
   ```json
   {
     "expo": {
       "version": "1.0.1",
       "android": {
         "versionCode": 2
       }
     }
   }
   ```

2. **Rebuild and upload new version**

## Common Issues & Solutions

### Build Failures
- **Memory issues**: Use EAS build service instead of local
- **Dependency conflicts**: Run `npm install` and try again

### Play Store Rejections
- **Missing privacy policy**: Add if your app collects data
- **Target API level**: Ensure you're targeting recent Android API

### Testing
- **Use internal testing**: Upload to Play Console internal testing first
- **Test on real devices**: Always test on actual Android devices

## Cost Information

- **EAS Build**: Free tier includes limited builds, paid plans available
- **Google Play**: One-time $25 registration fee
- **App Store (iOS)**: $99/year (if you plan to support iOS later)

## Support

- **Expo Documentation**: https://docs.expo.dev/
- **EAS Build Docs**: https://docs.expo.dev/build/introduction/
- **Play Console Help**: https://support.google.com/googleplay/android-developer/

---

**Ready to build?** Run `eas build --platform android --profile production` and you're on your way to the Play Store! 🚀
