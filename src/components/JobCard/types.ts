import { Job } from "../../types";

export interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onSave?: () => void;
  onRemove?: () => void;
  onApply: () => void;
  isDarkMode: boolean;
}
