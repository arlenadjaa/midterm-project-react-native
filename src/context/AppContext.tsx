import React, { createContext, ReactNode, useState } from "react";
import { Job } from "../types";
import { AppContextType } from "./types";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const saveJob = (job: Job) => {
    // Prevent duplicates based on title and company in case UUIDs regenerate on re-fetch
    const isDuplicate = savedJobs.some(
      (j) => j.title === job.title && j.company === job.company,
    );
    if (!isDuplicate) {
      setSavedJobs((prev) => [...prev, job]);
    }
  };

  const removeJob = (jobId: string) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  return (
    <AppContext.Provider
      value={{ isDarkMode, toggleTheme, savedJobs, saveJob, removeJob }}
    >
      {children}
    </AppContext.Provider>
  );
};
