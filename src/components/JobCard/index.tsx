import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getStyles } from "./styles";
import { JobCardProps } from "./types";

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  onSave,
  onRemove,
  onApply,
  isDarkMode,
}) => {
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{job.title || "Untitled Job"}</Text>
      <Text style={styles.company}>{job.company || "Unknown Company"}</Text>

      <View style={styles.buttonContainer}>
        {onRemove ? (
          <TouchableOpacity
            style={[styles.button, styles.removeBtn]}
            onPress={onRemove}
          >
            <Text style={styles.buttonText}>Remove Job</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, isSaved ? styles.savedBtn : styles.saveBtn]}
            onPress={onSave}
            disabled={isSaved}
          >
            <Text style={styles.buttonText}>
              {isSaved ? "Saved" : "Save Job"}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.applyBtn]}
          onPress={onApply}
        >
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
