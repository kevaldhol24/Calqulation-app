/**
 * WebView Configuration Constants
 * 
 * This file contains centralized configuration for all WebView components
 * including custom headers that allow the website to detect mobile app usage
 */

export const WEBVIEW_HEADERS = {
  'X-App-Source': 'CalqulationMobileApp',
  'X-App-Platform': 'React-Native',
  'X-App-Version': '1.0.0',
  'User-Agent': 'CalqulationMobileApp/1.0.0 (React Native WebView)',
  'X-Mobile-App': 'true', // Simple boolean flag for easy detection
  'X-App-Name': 'Calqulation'
};

/**
 * URLs for different sections of the website
 */
export const WEBVIEW_URLS = {
  SIP_CALCULATOR: 'https://www.calqulation.com/tool/sip-calculator',
  EMI_CALCULATOR: 'https://www.calqulation.com/tool/emi-calculator',
  BLOG: 'https://www.calqulation.com/blog',
  HOME: 'https://www.calqulation.com'
};

/**
 * Common WebView configuration
 */
export const WEBVIEW_CONFIG = {
  startInLoadingState: true,
  scalesPageToFit: true,
  bounces: true,
  javaScriptEnabled: true,
  domStorageEnabled: true,
  allowsBackForwardNavigationGestures: true,
  pullToRefreshEnabled: true,
};
