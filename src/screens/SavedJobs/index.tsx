import React, { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { JobCard } from "../../components/JobCard";
import { AppContext } from "../../context/AppContext";
import { getStyles } from "./styles";

export const SavedJobsScreen = ({ navigation }: any) => {
  const { isDarkMode, savedJobs, removeJob } = useContext(AppContext)!;
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            isSaved={true}
            isDarkMode={isDarkMode}
            onRemove={() => removeJob(item.id)}
            onApply={() =>
              navigation.navigate("ApplicationForm", {
                job: item,
                fromSaved: true,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {"You haven't saved any jobs yet."}
          </Text>
        }
      />
    </View>
  );
};
