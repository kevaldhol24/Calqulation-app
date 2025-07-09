# Currency Management & WebView Cookies

This document explains how the currency preference system and WebView cookie management works in the Calqulation mobile app.

## Overview

The app now includes a comprehensive currency management system that allows users to select their preferred currency from the Settings page. When a currency is selected, it automatically sets the appropriate cookie in all WebView instances to ensure the Calqulation website displays calculations in the selected currency.

## Features

### Currency Picker
- **Location**: Settings page under "Preferences" section
- **Default**: Indian Rupee (INR)
- **Available Currencies**: 
  - 🇮🇳 INR - Indian Rupee
  - 🇺🇸 USD - US Dollar
  - 🇬🇧 GBP - British Pound
  - 🇪🇺 EUR - Euro
  - 🇯🇵 JPY - Japanese Yen
  - 🇨🇦 CAD - Canadian Dollar
  - 🇦🇺 AUD - Australian Dollar
  - 🇰🇷 KRW - South Korean Won

### Cookie Synchronization
- Automatically sets currency cookie in all WebView instances
- Cookie format matches Calqulation website requirements
- 10-year expiration for persistent preference
- Works across all calculator tools (SIP, EMI, etc.)

## Technical Implementation

### Files Structure

```
utils/
├── currencyManager.ts      # Currency data and cookie creation
└── webViewCookies.ts      # WebView cookie injection utilities

components/
└── CurrencyPicker.tsx     # Currency selection modal

screens/
├── SettingsScreen.tsx     # Settings with currency picker
├── BlogScreen.tsx         # WebView with cookie injection
├── SIPCalculatorScreen.tsx # WebView with cookie injection
└── EMICalculatorScreen.tsx # WebView with cookie injection
```

### Currency Data Format

The currency cookie is set with the following JSON structure (matching Calqulation.com format):

```javascript
{
  "label": "₹ INR - Indian Rupee",
  "symbol": "₹", 
  "currency": "INR",
  "iso": "en-IN",
  "flag": "IN",
  "style": "currency",
  "currencyDisplay": "symbol",
  "maximumFractionDigits": 2
}
```

### Cookie Implementation

The cookie is set using JavaScript injection with these parameters:
- **Name**: `currency`
- **Value**: JSON stringified currency object
- **Path**: `/`
- **Domain**: `.calqulation.com` (and fallback without domain)
- **Expires**: 10 years from current date
- **SameSite**: `Lax`

### WebView Registration

Each WebView screen automatically:
1. Registers with the `WebViewCookieInjector` on mount
2. Injects default currency cookie on load
3. Receives currency updates when changed in Settings
4. Unregisters on unmount

## Usage

### For Users
1. Open the app and go to Settings
2. Find "Currency" in the Preferences section
3. Tap on the currency picker to see available options
4. Select your preferred currency
5. The change is immediately applied to all calculator tools

### For Developers

#### Adding New Currencies
Edit `utils/currencyManager.ts` and add to the `CURRENCIES` array:

```typescript
{
  label: "¥ CNY - Chinese Yuan",
  symbol: "¥",
  currency: "CNY", 
  iso: "zh-CN",
  flag: "CN",
  style: "currency",
  currencyDisplay: "symbol",
  maximumFractionDigits: 2,
}
```

#### Adding New WebView Screens
1. Import the required utilities:
```typescript
import { WebViewCookieInjector } from '../utils/webViewCookies';
import { getDefaultCurrency, createCurrencyCookieScript } from '../utils/currencyManager';
```

2. Register/unregister the WebView:
```typescript
useEffect(() => {
  if (webViewRef.current) {
    WebViewCookieInjector.registerWebView(webViewRef.current);
  }
  
  return () => {
    if (webViewRef.current) {
      WebViewCookieInjector.unregisterWebView(webViewRef.current);
    }
  };
}, []);
```

3. Inject currency cookie on load:
```typescript
const handleWebViewLoad = () => {
  if (webViewRef.current) {
    const defaultCurrency = getDefaultCurrency();
    const cookieScript = createCurrencyCookieScript(defaultCurrency);
    webViewRef.current.injectJavaScript(cookieScript);
  }
};
```

## Benefits

1. **Seamless User Experience**: Currency preference is automatically applied across all tools
2. **Persistent Settings**: Currency preference survives app restarts
3. **Website Integration**: The Calqulation website automatically uses the selected currency
4. **Scalable Architecture**: Easy to add new currencies or WebView screens
5. **Real-time Updates**: Currency changes are immediately reflected in all open WebViews

## Future Enhancements

1. **AsyncStorage Integration**: Persist currency preference locally
2. **Currency Exchange Rates**: Display live exchange rates
3. **Regional Detection**: Auto-detect user's region for default currency
4. **Custom Currency Formatting**: Allow users to customize number formatting
5. **Currency History**: Track user's currency usage patterns

## Troubleshooting

### Currency Not Applied
- Ensure WebView has internet connection
- Check browser console for cookie setting errors
- Verify WebView is registered with cookie injector

### Cookie Not Persisting
- Check domain settings in cookie script
- Verify cookie expiration date
- Ensure SameSite policy compatibility

### UI Issues
- Verify all currency data includes required fields
- Check flag emoji support on target devices
- Test modal behavior on different screen sizes
