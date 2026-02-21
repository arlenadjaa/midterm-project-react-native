import { StyleSheet } from "react-native";

export const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: isDarkMode ? "#555" : "#ccc",
      backgroundColor: isDarkMode ? "#2c2c2c" : "#f9f9f9",
      color: isDarkMode ? "#ffffff" : "#000000",
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 16,
    },
  });
