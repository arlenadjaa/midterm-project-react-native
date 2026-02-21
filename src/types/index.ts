export interface Job {
  id: string; // Assigned via uuid
  title: string;
  company: string;
  salary?: string;
  location?: string;
  description?: string;
}
