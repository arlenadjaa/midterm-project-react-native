import React from "react";
import { TextInput } from "react-native";
import { getStyles } from "./styles";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  isDarkMode: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  isDarkMode,
}) => {
  const styles = getStyles(isDarkMode);

  return (
    <TextInput
      style={styles.input}
      placeholder="Search jobs..."
      placeholderTextColor={isDarkMode ? "#888" : "#999"}
      value={value}
      onChangeText={onChangeText}
    />
  );
};
