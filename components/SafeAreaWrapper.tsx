import React, { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  style?: any;
  onLayout?: () => void;
}

export const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({ children, style, onLayout }) => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // Force a re-render when app becomes active to refresh safe area
        setAppState(nextAppState);
      } else {
        setAppState(nextAppState);
      }
    });

    return () => subscription?.remove();
  }, [appState]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1 }, style]} key={appState} onLayout={onLayout}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
