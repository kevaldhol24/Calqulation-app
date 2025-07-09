import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Linking,
  RefreshControl,
  StatusBar,
  Alert,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";
import { useCurrency } from "../context/CurrencyContext";
import { CurrencyPicker } from "../components/CurrencyPicker";
import {
  CurrencyOption,
  getDefaultCurrency,
  createCurrencyCookieScript,
  currencyUtils,
} from "../utils/currencyManager";
import { WebViewCookieInjector } from "../utils/webViewCookies";

export default function SettingsScreen() {
  const theme = useTheme();
  const currency = useCurrency();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [autoRefresh, setAutoRefresh] = React.useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh action
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const openURL = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleCurrencyChange = async (selectedCurrency: CurrencyOption) => {
    try {
      await currency.setCurrency(selectedCurrency);

      // Show success message with more detailed info
      Alert.alert(
        "Currency Updated Successfully! 🎉",
        `Your currency preference has been set to ${selectedCurrency.currency} (${selectedCurrency.symbol}). 

✅ All calculator tools will now use ${selectedCurrency.currency}
✅ Your preference has been saved and will persist between app sessions
✅ Open WebViews have been updated automatically

Note: If you don't see the change immediately, try refreshing the calculator page.`,
        [{ text: "Got it!" }]
      );
    } catch (error) {
      console.error("Error updating currency:", error);
      Alert.alert(
        "Update Failed",
        "Failed to update currency preference. Please check your connection and try again.",
        [{ text: "OK" }]
      );
    }
  };

  const settingsOptions = [
    {
      id: "currency",
      title: "Currency",
      description: `Currently set to ${currency.selectedCurrency.currency}`,
      icon: "card",
      type: "currency",
      value: currency.selectedCurrency,
      onValueChange: handleCurrencyChange,
    },
    {
      id: "notifications",
      title: "Push Notifications",
      description: "Receive updates and financial tips",
      icon: "notifications",
      type: "switch",
      value: notifications,
      onValueChange: setNotifications,
    },
    {
      id: "autoRefresh",
      title: "Auto Refresh",
      description: "Automatically refresh data when app opens",
      icon: "refresh",
      type: "switch",
      value: autoRefresh,
      onValueChange: setAutoRefresh,
    },
  ];

  const actionOptions = [
    {
      id: "about",
      title: "About Us",
      description: "Learn more about Calqulation",
      icon: "information-circle",
      onPress: () => openURL("https://www.calqulation.com/about-us"),
    },
    {
      id: "help",
      title: "Help & Support",
      description: "Get help and contact support",
      icon: "help-circle",
      onPress: () => openURL("https://www.calqulation.com/contact"),
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      description: "Read our privacy policy",
      icon: "shield-checkmark",
      onPress: () => openURL("https://www.calqulation.com/privacy-policy"),
    },
    {
      id: "terms",
      title: "Terms of Service",
      description: "Read terms and conditions",
      icon: "document-text",
      onPress: () => openURL("https://www.calqulation.com/terms-of-service"),
    },
    {
      id: "disclaimer",
      title: "Disclaimer",
      description: "Important disclaimer information",
      icon: "warning",
      onPress: () => openURL("https://www.calqulation.com/disclaimer"),
    },
    {
      id: "feedback",
      title: "Send Feedback",
      description: "Help us improve the app",
      icon: "chatbubble",
      onPress: () => openURL("https://www.calqulation.com/contact"),
    },
  ];

  const renderSettingItem = (item: any) => (
    <View
      key={item.id}
      style={[
        styles.settingItem,
        item.type === "currency" && styles.currencySettingItem,
      ]}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={20} color={theme.colors.primary} />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingDescription}>{item.description}</Text>
        </View>
      </View>
      {item.type === "switch" ? (
        <Switch
          value={item.value}
          onValueChange={item.onValueChange}
          trackColor={{ false: "#767577", true: theme.colors.primary }}
          thumbColor={item.value ? "#ffffff" : "#f4f3f4"}
        />
      ) : item.type === "currency" ? (
        <View style={styles.currencyPickerContainer}>
          <CurrencyPicker
            selectedCurrency={item.value}
            onCurrencyChange={item.onValueChange}
            isLoading={currency.isLoading}
          />
        </View>
      ) : null}
    </View>
  );

  const renderActionItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.actionItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={20} color={theme.colors.primary} />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingDescription}>{item.description}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6e11b0"
        translucent
      />
      <LinearGradient
        colors={[
          theme.colors.primary,
          theme.colors.primary,
          theme.colors.secondary,
        ]}
        locations={[0, 0.3, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIconContainer}>
              <Ionicons name="settings" size={24} color="#ffffff" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSubtitle}>
                Customize your app experience
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            {settingsOptions.map(renderSettingItem)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.sectionContent}>
            {actionOptions.map(renderActionItem)}
          </View>
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appName}>Calqulation</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appDescription}>
            Your trusted companion for financial calculations and planning
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.9,
    letterSpacing: -0.2,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  currencySettingItem: {
    flexDirection: "column",
    alignItems: "stretch",
    paddingBottom: 20,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6e11b020",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
  },
  currencyPickerContainer: {
    marginTop: 12,
  },
  appInfo: {
    alignItems: "center",
    padding: 24,
    marginTop: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6e11b0",
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 280,
  },
});
