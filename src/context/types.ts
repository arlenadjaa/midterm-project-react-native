import { Job } from "../types";

export interface AppContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  savedJobs: Job[];
  saveJob: (job: Job) => void;
  removeJob: (jobId: string) => void;
}
