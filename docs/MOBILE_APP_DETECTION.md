# Mobile App Detection Headers

This document explains how the Calqulation website can detect when it's being accessed from the mobile app and customize the UI accordingly.

## Custom Headers Sent by Mobile App

When the Calqulation mobile app loads any page from the website, it sends the following custom headers:

### Headers List

| Header Name | Value | Description |
|-------------|-------|-------------|
| `X-App-Source` | `CalqulationMobileApp` | Identifies the source as the official Calqulation mobile app |
| `X-App-Platform` | `React-Native` | Indicates the app is built with React Native |
| `X-App-Version` | `1.0.0` | Current version of the mobile app |
| `X-Mobile-App` | `true` | Simple boolean flag for quick mobile app detection |
| `X-App-Name` | `Calqulation` | The name of the mobile application |
| `User-Agent` | `CalqulationMobileApp/1.0.0 (React Native WebView)` | Custom user agent string |

## Website Implementation Examples

### 1. Server-Side Detection (PHP Example)

```php
<?php
// Check if request is from mobile app
$isMobileApp = isset($_SERVER['HTTP_X_MOBILE_APP']) && $_SERVER['HTTP_X_MOBILE_APP'] === 'true';
$appSource = $_SERVER['HTTP_X_APP_SOURCE'] ?? '';

if ($isMobileApp && $appSource === 'CalqulationMobileApp') {
    // Load mobile app specific UI elements
    $showMobileAppBanner = false; // Don't show "Download our app" banner
    $mobileOptimizedLayout = true;
    $hideNavigationElements = true; // Hide website navigation since app has its own
}
?>
```

### 2. Client-Side Detection (JavaScript Example)

Since headers are not directly accessible in browser JavaScript, you can use server-side detection to pass this information to the frontend:

```javascript
// Server passes the mobile app detection to frontend
window.isMobileApp = <?php echo $isMobileApp ? 'true' : 'false'; ?>;
window.appVersion = '<?php echo $_SERVER['HTTP_X_APP_VERSION'] ?? ''; ?>';

if (window.isMobileApp) {
    // Hide elements that are not needed in mobile app
    document.querySelector('.download-app-banner')?.remove();
    document.querySelector('.main-navigation')?.remove();
    
    // Add mobile app specific styles
    document.body.classList.add('mobile-app-view');
    
    // Optimize for mobile app experience
    adjustUIForMobileApp();
}

function adjustUIForMobileApp() {
    // Remove or hide unnecessary elements
    const elementsToHide = [
        '.header-navigation',
        '.footer-links',
        '.cookie-banner',
        '.newsletter-signup'
    ];
    
    elementsToHide.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = 'none';
        }
    });
    
    // Adjust spacing and layout
    document.body.style.paddingTop = '0'; // Remove top padding if header is hidden
    
    // Focus on content area
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.maxWidth = '100%';
        mainContent.style.padding = '20px';
    }
}
```

### 3. CSS-Based Adjustments

```css
/* Mobile app specific styles */
.mobile-app-view .header-navigation,
.mobile-app-view .footer,
.mobile-app-view .sidebar {
    display: none !important;
}

.mobile-app-view .main-content {
    padding: 20px;
    max-width: 100%;
    margin: 0;
}

.mobile-app-view .calculator-container {
    border: none;
    box-shadow: none;
    border-radius: 0;
}
```

## Recommended UI Adjustments for Mobile App

When the website detects it's being loaded in the mobile app, consider these optimizations:

### Elements to Hide/Remove:
- Main website navigation (app has its own navigation)
- "Download our app" banners or CTAs
- Website header/footer
- Cookie consent banners (handled by app)
- Newsletter signup forms
- Social media sharing buttons (can be handled by app)

### Elements to Optimize:
- **Full-width layouts**: Remove max-width constraints
- **Simplified forms**: Focus on core functionality
- **Larger touch targets**: Optimize for touch interaction
- **Reduced padding/margins**: Maximize content area
- **Hide breadcrumbs**: App navigation handles this

### Content Focus:
- Prioritize calculator functionality
- Remove secondary navigation elements
- Focus on core content without distractions
- Optimize form layouts for mobile interaction

## Implementation Priority

1. **High Priority**: Hide main navigation and app download banners
2. **Medium Priority**: Optimize layout spacing and remove non-essential elements
3. **Low Priority**: Advanced mobile-specific features and animations

## Testing

To test the implementation:

1. Check server logs for the custom headers when accessing from the mobile app
2. Use browser developer tools to simulate the headers for testing
3. Verify that the UI changes are applied correctly
4. Test across different pages (SIP Calculator, EMI Calculator, Blog)

## Notes

- Headers are sent with every request from the mobile app
- The `X-Mobile-App: true` header is the simplest way to detect mobile app usage
- Version information can be used for feature compatibility
- Consider implementing graceful fallbacks if header detection fails
