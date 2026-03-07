import React from "react";
// Don't forget to import Image from 'react-native'!
import { Image, Text, TouchableOpacity, View } from "react-native";
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

  // Get the first letter of the company name for the fallback logo
  const companyInitial = job.company
    ? job.company.charAt(0).toUpperCase()
    : "?";

  return (
    <View style={styles.card}>
      {/* Top Section: Text on Left, Logo on Right */}
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{job.title || "Untitled Job"}</Text>
          <Text style={styles.company}>{job.company || "Unknown Company"}</Text>
        </View>

        {/* Logo Rendering Logic */}
        {job.companyLogo ? (
          <Image
            source={{ uri: job.companyLogo }}
            style={styles.logo}
            resizeMode="contain"
          />
        ) : (
          <View style={[styles.logo, styles.placeholderLogo]}>
            <Text style={styles.placeholderText}>{companyInitial}</Text>
          </View>
        )}
      </View>

      {/* Bottom Section: Buttons */}
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
