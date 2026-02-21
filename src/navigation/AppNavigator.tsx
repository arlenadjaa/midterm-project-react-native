import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { AppContext } from "../context/AppContext";

import { ApplicationFormScreen } from "../screens/ApplicationForm";
import { JobFinderScreen } from "../screens/JobFinder";
import { SavedJobsScreen } from "../screens/SavedJobs";
import { BottomTabParamList, RootStackParamList } from "./types";

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Component for the Theme Toggle Button
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(AppContext)!;
  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
      <Text style={{ color: isDarkMode ? "#fff" : "#000", fontSize: 24 }}>
        {isDarkMode ? "☀️" : "🌙"}
      </Text>
    </TouchableOpacity>
  );
};

const TabNavigator = () => {
  const { isDarkMode } = useContext(AppContext)!;
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => <ThemeToggle />,
        headerStyle: { backgroundColor: isDarkMode ? "#1e1e1e" : "#fff" },
        headerTintColor: isDarkMode ? "#fff" : "#000",
        tabBarStyle: { backgroundColor: isDarkMode ? "#1e1e1e" : "#fff" },
        tabBarActiveTintColor: "#007BFF",
      }}
    >
      <Tab.Screen name="Job Finder" component={JobFinderScreen} />
      <Tab.Screen name="Saved Jobs" component={SavedJobsScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { isDarkMode } = useContext(AppContext)!;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: isDarkMode ? "#1e1e1e" : "#fff" },
          headerTintColor: isDarkMode ? "#fff" : "#000",
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ApplicationForm"
          component={ApplicationFormScreen}
          options={{ title: "Apply Now" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
