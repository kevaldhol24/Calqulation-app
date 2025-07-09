import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import {
  HomeScreen,
  SIPCalculatorScreen,
  EMICalculatorScreen,
  BlogScreen,
  SettingsScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'SIP Calculator') {
              iconName = focused ? 'trending-up' : 'trending-up-outline';
            } else if (route.name === 'EMI Calculator') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            } else if (route.name === 'Blog') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else {
              iconName = 'home-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6a4c93',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            paddingBottom: 8,
            paddingTop: 8,
            height: 65,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen 
          name="SIP Calculator" 
          component={SIPCalculatorScreen}
          options={{
            tabBarLabel: 'SIP',
          }}
        />
        <Tab.Screen 
          name="EMI Calculator" 
          component={EMICalculatorScreen}
          options={{
            tabBarLabel: 'EMI',
          }}
        />
        <Tab.Screen 
          name="Blog" 
          component={BlogScreen}
          options={{
            tabBarLabel: 'Blog',
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
