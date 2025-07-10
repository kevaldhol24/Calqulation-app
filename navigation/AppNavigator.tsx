import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStackNavigator from "./HomeStackNavigator";
import {
  SIPCalculatorScreen,
  EMICalculatorScreen,
  BlogScreen,
  SettingsScreen,
} from "../screens";
import { useTheme } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { theme, isDark } = useTheme();

  // Create a custom theme for React Navigation
  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "SIP Calculator") {
              iconName = focused ? "trending-up" : "trending-up-outline";
            } else if (route.name === "EMI Calculator") {
              iconName = focused ? "calculator" : "calculator-outline";
            } else if (route.name === "Blog") {
              iconName = focused ? "library" : "library-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else {
              iconName = "home-outline";
            }

            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
            paddingBottom: 8,
            paddingTop: 8,
            height: 70,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
            marginTop: 4,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name="SIP Calculator"
          component={SIPCalculatorScreen}
          options={{
            tabBarLabel: "SIP",
          }}
        />
        <Tab.Screen
          name="EMI Calculator"
          component={EMICalculatorScreen}
          options={{
            tabBarLabel: "EMI",
          }}
        />
        <Tab.Screen
          name="Blog"
          component={BlogScreen}
          options={{
            tabBarLabel: "Blog",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Settings",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
