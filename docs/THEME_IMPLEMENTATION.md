# Theme Implementation Guide

This document explains how the dark theme system has been implemented in the Calqulation mobile app.

## Overview

The app now supports three theme modes:
- **System**: Follows the device's system theme (automatic)
- **Light**: Always uses light theme 
- **Dark**: Always uses dark theme

The theme preference is stored locally and synchronized with the WebView via localStorage injection.

## Key Components

### 1. Theme Manager (`utils/themeManager.ts`)
- Manages theme persistence using AsyncStorage
- Provides theme resolution logic (system → light/dark)
- Creates JavaScript injection scripts for WebView localStorage

### 2. Theme Context (`context/ThemeContext.tsx`)
- React context for theme state management
- Provides both light and dark theme objects
- Handles system theme changes
- Automatically injects theme into WebViews

### 3. Theme Picker (`components/ThemePicker.tsx`)
- UI component for theme selection
- Modal interface with three options
- Icons for each theme mode

### 4. WebView Integration
- Themes are injected into WebView localStorage as `theme` key
- Values: `"system"`, `"light"`, `"dark"`
- Additional `resolvedTheme` key with actual theme: `"light"` or `"dark"`
- Automatic injection on theme changes and app startup

## Usage

### In Components
```tsx
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, selectedThemeOption, isDark, setTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Hello World</Text>
    </View>
  );
}
```

### Theme Properties
Both `lightTheme` and `darkTheme` objects include:
- `colors`: All color definitions
- `spacing`: Consistent spacing values
- `borderRadius`: Border radius values
- `fontSize`: Typography sizes
- `fontWeight`: Font weights
- `gradients`: Gradient color arrays
- `shadows`: Shadow style objects

### Settings Integration
Theme selection is available in the Settings screen with:
- Current theme display
- Easy theme switching
- Automatic WebView updates
- Success feedback

## WebView Communication

The theme system communicates with the website via:

1. **localStorage injection**:
   ```javascript
   localStorage.setItem('theme', 'system|light|dark');
   localStorage.setItem('resolvedTheme', 'light|dark');
   ```

2. **Custom events**:
   ```javascript
   window.dispatchEvent(new CustomEvent('themeChanged', {
     detail: { mode: 'system', resolvedTheme: 'light' }
   }));
   ```

3. **CSS class application**:
   ```javascript
   document.documentElement.setAttribute('data-theme', 'light|dark');
   document.documentElement.classList.add('light-theme|dark-theme');
   ```

## Website Implementation Requirements

For the theme system to work properly, the Calqulation website should:

1. **Listen for theme events**:
   ```javascript
   window.addEventListener('themeChanged', (event) => {
     const { mode, resolvedTheme } = event.detail;
     applyTheme(resolvedTheme);
   });
   ```

2. **Check localStorage on load**:
   ```javascript
   const theme = localStorage.getItem('theme') || 'system';
   const resolvedTheme = localStorage.getItem('resolvedTheme') || 'light';
   applyTheme(resolvedTheme);
   ```

3. **Support CSS theme classes**:
   ```css
   .light-theme {
     /* Light theme styles */
   }
   
   .dark-theme {
     /* Dark theme styles */
   }
   
   [data-theme="light"] {
     /* Alternative light theme styles */
   }
   
   [data-theme="dark"] {
     /* Alternative dark theme styles */
   }
   ```

## File Structure

```
utils/
  └── themeManager.ts          # Theme utilities and persistence
context/
  └── ThemeContext.tsx         # React context for theme state
components/
  └── ThemePicker.tsx          # Theme selection component
screens/
  └── SettingsScreen.tsx       # Theme setting in app settings
```

## Future Enhancements

Possible improvements for the theme system:
- Custom color schemes
- High contrast mode
- Theme scheduling (auto dark at night)
- Per-tool theme preferences
- Theme preview in settings
