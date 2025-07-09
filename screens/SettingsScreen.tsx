import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [autoRefresh, setAutoRefresh] = React.useState(true);

  const settingsOptions = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      description: 'Receive updates and financial tips',
      icon: 'notifications',
      type: 'switch',
      value: notifications,
      onValueChange: setNotifications,
    },
    {
      id: 'darkMode',
      title: 'Dark Mode',
      description: 'Use dark theme for the app',
      icon: 'moon',
      type: 'switch',
      value: darkMode,
      onValueChange: setDarkMode,
    },
    {
      id: 'autoRefresh',
      title: 'Auto Refresh',
      description: 'Automatically refresh data when app opens',
      icon: 'refresh',
      type: 'switch',
      value: autoRefresh,
      onValueChange: setAutoRefresh,
    },
  ];

  const actionOptions = [
    {
      id: 'about',
      title: 'About',
      description: 'App version and information',
      icon: 'information-circle',
      onPress: () => console.log('About pressed'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: 'help-circle',
      onPress: () => console.log('Help pressed'),
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'Read our privacy policy',
      icon: 'shield-checkmark',
      onPress: () => console.log('Privacy pressed'),
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      description: 'Read terms and conditions',
      icon: 'document-text',
      onPress: () => console.log('Terms pressed'),
    },
    {
      id: 'feedback',
      title: 'Send Feedback',
      description: 'Help us improve the app',
      icon: 'chatbubble',
      onPress: () => console.log('Feedback pressed'),
    },
  ];

  const renderSettingItem = (item: any) => (
    <View key={item.id} style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={20} color="#6a4c93" />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingDescription}>{item.description}</Text>
        </View>
      </View>
      {item.type === 'switch' ? (
        <Switch
          value={item.value}
          onValueChange={item.onValueChange}
          trackColor={{ false: '#767577', true: '#6a4c93' }}
          thumbColor={item.value ? '#ffffff' : '#f4f3f4'}
        />
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
          <Ionicons name={item.icon} size={20} color="#6a4c93" />
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your app experience</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6a4c93',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
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
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6a4c9320',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  appInfo: {
    alignItems: 'center',
    padding: 24,
    marginTop: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a4c93',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
});
