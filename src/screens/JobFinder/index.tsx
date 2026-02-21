import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import uuid from "react-native-uuid";
import { JobCard } from "../../components/JobCard";
import { SearchBar } from "../../components/SearchBar";
import { AppContext } from "../../context/AppContext";
import { Job } from "../../types";
import { getStyles } from "./styles";

export const JobFinderScreen = ({ navigation }: any) => {
  const { isDarkMode, savedJobs, saveJob } = useContext(AppContext)!;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("https://empllo.com/api/v1");
      const data = await response.json();

      const jobsArray = Array.isArray(data) ? data : data.data || [];

      const jobsWithIds: Job[] = jobsArray.map((job: any) => ({
        ...job,
        id: uuid.v4() as string,
      }));
      setJobs(jobsWithIds);
    } catch (error) {
      console.log("API Error, using fallback data.", error);
      // Fallback data if API fails to load
      setJobs([
        {
          id: uuid.v4() as string,
          title: "Software Engineer",
          company: "Tech Corp",
        },
        {
          id: uuid.v4() as string,
          title: "UI/UX Designer",
          company: "Design Pro",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        isDarkMode={isDarkMode}
      />
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSaved = savedJobs.some(
            (j) => j.title === item.title && j.company === item.company,
          );
          return (
            <JobCard
              job={item}
              isSaved={isSaved}
              isDarkMode={isDarkMode}
              onSave={() => saveJob(item)}
              onApply={() =>
                navigation.navigate("ApplicationForm", {
                  job: item,
                  fromSaved: false,
                })
              }
            />
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No jobs found.</Text>
        }
      />
    </View>
  );
};
