import { StyleSheet } from "react-native";

export const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDarkMode ? "#333" : "#ddd",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDarkMode ? "#ffffff" : "#000000",
      marginBottom: 4,
    },
    company: {
      fontSize: 14,
      color: isDarkMode ? "#bbbbbb" : "#555555",
      marginBottom: 12,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
      alignItems: "center",
      flex: 1,
      marginHorizontal: 4,
    },
    applyBtn: {
      backgroundColor: "#007BFF",
    },
    saveBtn: {
      backgroundColor: "#28A745",
    },
    savedBtn: {
      backgroundColor: "#6C757D",
    },
    removeBtn: {
      backgroundColor: "#DC3545",
    },
    buttonText: {
      color: "#ffffff",
      fontWeight: "bold",
    },
  });
