import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { ThemeOption, themeOptions } from "../utils/themeManager";

interface ThemePickerProps {
  selectedTheme: ThemeOption;
  onThemeSelect: (theme: ThemeOption) => void;
  disabled?: boolean;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({
  selectedTheme,
  onThemeSelect,
  disabled = false,
}) => {
  const { theme, isDark } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const getThemeIcon = (mode: string) => {
    switch (mode) {
      case 'system':
        return 'phone-portrait-outline';
      case 'light':
        return 'sunny-outline';
      case 'dark':
        return 'moon-outline';
      default:
        return 'phone-portrait-outline';
    }
  };

  const renderThemeItem = ({ item }: { item: ThemeOption }) => {
    const isSelected = item.mode === selectedTheme.mode;
    
    return (
      <TouchableOpacity
        style={[
          styles.themeItem,
          {
            backgroundColor: theme.colors.surface,
            borderColor: isSelected ? theme.colors.primary : theme.colors.border,
          },
          isSelected && styles.selectedTheme,
        ]}
        onPress={() => {
          onThemeSelect(item);
          setModalVisible(false);
        }}
      >
        <View style={styles.themeItemContent}>
          <View style={styles.themeItemLeft}>
            <Ionicons
              name={getThemeIcon(item.mode)}
              size={24}
              color={isSelected ? theme.colors.primary : theme.colors.text}
            />
            <View style={styles.themeItemText}>
              <Text
                style={[
                  styles.themeLabel,
                  {
                    color: isSelected ? theme.colors.primary : theme.colors.text,
                    fontWeight: isSelected ? "600" : "500",
                  },
                ]}
              >
                {item.label}
              </Text>
              <Text
                style={[
                  styles.themeDescription,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {item.description}
              </Text>
            </View>
          </View>
          {isSelected && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={theme.colors.primary}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.themePicker,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <View style={styles.themePickerContent}>
          <View style={styles.themePickerLeft}>
            <Ionicons
              name={getThemeIcon(selectedTheme.mode)}
              size={20}
              color={theme.colors.primary}
            />
            <Text style={[styles.selectedThemeText, { color: theme.colors.text }]}>
              {selectedTheme.label}
            </Text>
          </View>
          <Ionicons
            name="chevron-down"
            size={20}
            color={theme.colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContainer}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                  Select Theme
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              <FlatList
                data={themeOptions}
                renderItem={renderThemeItem}
                keyExtractor={(item) => item.mode}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.themeList}
              />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  themePicker: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  themePickerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  themePickerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  selectedThemeText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
  },
  themeList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  themeItem: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
  },
  selectedTheme: {
    borderWidth: 2,
  },
  themeItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  themeItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  themeItemText: {
    marginLeft: 12,
    flex: 1,
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  themeDescription: {
    fontSize: 14,
    marginTop: 2,
  },
});
