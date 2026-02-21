import { StyleSheet } from "react-native";

export const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#F5F5F5",
      padding: 16,
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyText: {
      textAlign: "center",
      color: isDarkMode ? "#aaaaaa" : "#555555",
      marginTop: 20,
    },
  });
