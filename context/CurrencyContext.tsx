import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  CurrencyOption,
  currencyUtils,
  getDefaultCurrency,
  createCurrencyCookieScript,
} from "../utils/currencyManager";
import { WebViewCookieInjector } from "../utils/webViewCookies";

interface CurrencyContextType {
  selectedCurrency: CurrencyOption;
  isLoading: boolean;
  setCurrency: (currency: CurrencyOption) => Promise<void>;
  initializeCurrency: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
    getDefaultCurrency()
  );
  const [isLoading, setIsLoading] = useState(true);

  const initializeCurrency = async () => {
    try {
      setIsLoading(true);
      const storedCurrency = await currencyUtils.getStoredCurrency();
      setSelectedCurrency(storedCurrency);

      // Inject the currency cookie into any already-registered WebViews
      const cookieScript = createCurrencyCookieScript(storedCurrency);
      WebViewCookieInjector.injectIntoAllWebViews(cookieScript);
    } catch (error) {
      console.error("Error initializing currency:", error);
      setSelectedCurrency(getDefaultCurrency());
    } finally {
      setIsLoading(false);
    }
  };

  const setCurrency = async (currency: CurrencyOption) => {
    try {
      setSelectedCurrency(currency);

      // Store the currency preference
      await currencyUtils.storeCurrency(currency);

      // Create and inject the currency cookie script into all WebViews and reload them
      const cookieScript = createCurrencyCookieScript(currency);
      WebViewCookieInjector.injectIntoAllWebViewsAndReload(cookieScript);

      console.log("Currency updated to:", currency.currency);
    } catch (error) {
      console.error("Error setting currency:", error);
    }
  };

  useEffect(() => {
    initializeCurrency();
  }, []);

  const value: CurrencyContextType = {
    selectedCurrency,
    isLoading,
    setCurrency,
    initializeCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
