import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface ThemedAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  icon?: string;
}

export const ThemedAlert: React.FC<ThemedAlertProps> = ({
  visible,
  title,
  message,
  onClose,
  icon = "checkmark-circle",
}) => {
  const { theme } = useTheme();

  const styles = createStyles(theme);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={icon as any} size={48} color={theme.colors.primary} />
          </View>
          
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get("window");

const createStyles = (theme: any) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  alertContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 24,
    width: width - 40,
    maxWidth: 400,
    alignItems: "center",
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
