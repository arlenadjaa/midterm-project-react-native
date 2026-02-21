import { StyleSheet } from "react-native";

export const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#ffffff",
      padding: 20,
    },
    label: {
      color: isDarkMode ? "#ffffff" : "#000000",
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? "#444" : "#ccc",
      backgroundColor: isDarkMode ? "#1e1e1e" : "#fafafa",
      color: isDarkMode ? "#ffffff" : "#000000",
      padding: 10,
      borderRadius: 6,
      marginBottom: 5,
    },
    textArea: {
      height: 100,
      textAlignVertical: "top",
    },
    errorText: {
      color: "#DC3545",
      fontSize: 12,
      marginBottom: 10,
    },
    submitBtn: {
      backgroundColor: "#007BFF",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
    },
    submitBtnText: {
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
