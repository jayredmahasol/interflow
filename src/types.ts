export type ApplicationStatus = 
  | 'Applied'
  | 'Screening Sent'
  | 'Screening Completed'
  | 'Interview Scheduled'
  | 'Rejected'
  | 'Offer Sent';

export interface Applicant {
  id: string;
  name: string;
  email: string;
  role: string;
  appliedDate: string;
  status: ApplicationStatus;
  screeningScore?: number;
  lastContacted?: string;
  notes?: string;
}
