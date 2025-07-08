import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const CALQULATION_URL = 'https://www.calqulation.com';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [webViewLoading, setWebViewLoading] = useState(true);
  const [error, setError] = useState("");
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // For now, just simulate a short loading time
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        setIsLoading(false);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const handleWebViewLoad = () => {
    setWebViewLoading(false);
  };

  const handleWebViewError = () => {
    setWebViewLoading(false);
    setError('Failed to load website. Please check your internet connection.');
  };

  if (!appIsReady) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.splashContainer}>
          <StatusBar style="light" />
          <Text style={styles.splashText}>Calqulation</Text>
          <ActivityIndicator size="large" color="#4CAF50" style={styles.splashLoader} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style="light" />
        
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.retryText}>Pull to refresh to try again</Text>
          </View>
        ) : (
          <>
            <WebView
              source={{ uri: CALQULATION_URL }}
              style={styles.webview}
              onLoad={handleWebViewLoad}
              onError={handleWebViewError}
              onHttpError={handleWebViewError}
              startInLoadingState={true}
              scalesPageToFit={true}
              bounces={false}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsBackForwardNavigationGestures={true}
              renderLoading={() => (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#4CAF50" />
                  <Text style={styles.loadingText}>Loading Calqulation...</Text>
                </View>
              )}
            />
            
            {webViewLoading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Loading Calqulation...</Text>
              </View>
            )}
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  webview: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 30,
    textShadowColor: 'rgba(76, 175, 80, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  splashLoader: {
    marginTop: 20,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  errorText: {
    fontSize: 18,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  retryText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
});
