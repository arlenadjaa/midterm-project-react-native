import { Job } from "../types";

export type RootStackParamList = {
  MainTabs: undefined;
  ApplicationForm: { job: Job; fromSaved: boolean };
};

export type BottomTabParamList = {
  "Job Finder": undefined;
  "Saved Jobs": undefined;
};
