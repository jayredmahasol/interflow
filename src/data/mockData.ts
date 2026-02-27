import { Applicant } from '../types';

export const mockApplicants: Applicant[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    role: 'Frontend Engineering Intern',
    appliedDate: '2025-02-20',
    status: 'To Be Reviewed',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: 'Product Design Intern',
    appliedDate: '2025-02-18',
    status: 'Screening Sent',
    lastContacted: '2025-02-19',
  },
  {
    id: '3',
    name: 'Jordan Smith',
    email: 'jordan.smith@example.com',
    role: 'Data Science Intern',
    appliedDate: '2025-02-15',
    status: 'Screening Completed',
    screeningScore: 85,
    lastContacted: '2025-02-17',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Backend Engineering Intern',
    appliedDate: '2025-02-22',
    status: 'To Be Reviewed',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'Product Management Intern',
    appliedDate: '2025-02-10',
    status: 'Interview Scheduled',
    screeningScore: 92,
    lastContacted: '2025-02-21',
  },
];
