import React, { useContext, useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { AppContext } from "../../context/AppContext";
import { getStyles } from "./styles";
import { FormErrors, validateApplicationForm } from "./validation";

export const ApplicationFormScreen = ({ route, navigation }: any) => {
  const { job, fromSaved } = route.params;
  const { isDarkMode } = useContext(AppContext)!;
  const styles = getStyles(isDarkMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = () => {
    const validationErrors = validateApplicationForm(
      name,
      email,
      contact,
      reason,
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // Show Feedback & Redirect logic
    Alert.alert(
      "Success!",
      `Your application for ${job.title} at ${job.company} has been submitted.`,
      [
        {
          text: "Okay",
          onPress: () => {
            // Clear Form
            setName("");
            setEmail("");
            setContact("");
            setReason("");

            // Redirection Rules
            if (fromSaved) {
              // Redirect to Job Finder screen if opened from Saved Jobs
              navigation.navigate("Job Finder");
            } else {
              navigation.goBack();
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="John Doe"
        placeholderTextColor="#888"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="john@example.com"
        placeholderTextColor="#888"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.input}
        value={contact}
        onChangeText={setContact}
        keyboardType="numeric"
        placeholder="09123456789"
        placeholderTextColor="#888"
      />
      {errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>}

      <Text style={styles.label}>Why should we hire you?</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={reason}
        onChangeText={setReason}
        multiline
        placeholder="Describe your skills..."
        placeholderTextColor="#888"
      />
      {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>Confirm Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
