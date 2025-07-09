import { useCallback, useState } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export const useWebViewBackNavigation = (webViewRef: React.RefObject<WebView | null>) => {
  const [canGoBack, setCanGoBack] = useState(false);

  // Handle hardware back button
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true; // Prevent default behavior
        }
        return false; // Allow default behavior (navigate back in app)
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [canGoBack, webViewRef])
  );

  const handleNavigationStateChange = useCallback((navState: any) => {
    setCanGoBack(navState.canGoBack);
  }, []);

  return {
    canGoBack,
    handleNavigationStateChange,
  };
};
