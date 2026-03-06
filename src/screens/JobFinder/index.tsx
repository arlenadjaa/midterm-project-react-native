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
      const response = await fetch("https://empllo.com/api/v1", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Server responded with a ${response.status} status.`);
      }

      const data = await response.json();

      const jobsArray = Array.isArray(data)
        ? data
        : data.jobs || data.data || [];

      if (jobsArray.length === 0) {
        throw new Error("API connected successfully, but returned 0 jobs.");
      }

      // Map the API response using the EXACT keys from your JSON printout
      const jobsWithIds: Job[] = jobsArray.map((job: any) => {
        // Bonus: Safely format salary if they provided it
        let salaryText = "Salary not specified";
        if (job.minSalary && job.maxSalary) {
          salaryText = `${job.currency || "$"}${job.minSalary} - ${job.maxSalary}`;
        }

        // Bonus: Grab the first location if it exists
        let locationText = "Remote / Unspecified";
        if (job.locations && job.locations.length > 0) {
          locationText = job.locations[0];
        }

        return {
          id: uuid.v4() as string,
          title: job.title || "Unknown Title",

          // THE FIX: We now use job.companyName exactly as the API provided it!
          company: job.companyName || "Unknown Company",

          salary: salaryText,
          location: locationText,
          description: job.description || "",
        };
      });

      setJobs(jobsWithIds);
    } catch (error) {
      console.log("API Fetch Error:", error);

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
        {
          id: uuid.v4() as string,
          title: "React Native Developer",
          company: "Mobile Inc",
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
