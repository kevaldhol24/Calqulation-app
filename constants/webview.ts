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

export const WEBVIEW_BASE_URL = 'https://www.calqulation.com';
// export const WEBVIEW_BASE_URL = 'http://localhost:3000'; // For local development, change to production URL before deployment

/**
 * URLs for different sections of the website
 */
export const WEBVIEW_URLS = {
  SIP_CALCULATOR: `${WEBVIEW_BASE_URL}/tool/sip-calculator`,
  EMI_CALCULATOR: `${WEBVIEW_BASE_URL}/tool/emi-calculator`,
  BLOG: `${WEBVIEW_BASE_URL}/blog`,
  HOME: `${WEBVIEW_BASE_URL}`
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
