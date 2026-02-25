import React from 'react';
import { Applicant } from '@/types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Mail, FileText, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface ApplicantRowProps {
  applicant: Applicant;
  onSendScreening: (applicant: Applicant) => void;
  onFollowUp: (applicant: Applicant) => void;
  onViewDetails: (applicant: Applicant) => void;
}

const statusColorMap: Record<string, "default" | "secondary" | "destructive" | "outline" | "warning" | "neutral"> = {
  'Applied': 'neutral',
  'Screening Sent': 'warning',
  'Screening Completed': 'secondary',
  'Interview Scheduled': 'default',
  'Rejected': 'destructive',
  'Offer Sent': 'default', // Or a special gold/success color if available
};

const ApplicantRow: React.FC<ApplicantRowProps> = ({ applicant, onSendScreening, onFollowUp, onViewDetails }) => {
  return (
    <tr className="border-b border-dark-serpent/5 dark:border-paper/5 hover:bg-paper/50 dark:hover:bg-paper/5 transition-colors">
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-castleton-green/10 dark:bg-paper/10 flex items-center justify-center text-castleton-green dark:text-paper font-bold mr-3">
            {applicant.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-dark-serpent dark:text-paper">{applicant.name}</p>
            <p className="text-sm text-dark-serpent/60 dark:text-paper/60">{applicant.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <p className="text-sm text-dark-serpent dark:text-paper">{applicant.role}</p>
      </td>
      <td className="py-4 px-6">
        <p className="text-sm text-dark-serpent/60 dark:text-paper/60">{format(new Date(applicant.appliedDate), 'MMM d, yyyy')}</p>
      </td>
      <td className="py-4 px-6">
        <Badge variant={statusColorMap[applicant.status] || 'outline'}>
          {applicant.status}
        </Badge>
      </td>
      <td className="py-4 px-6 text-right">
        <div className="flex justify-end space-x-2">
          {applicant.status === 'Applied' && (
            <Button size="sm" variant="outline" onClick={() => onSendScreening(applicant)} className="dark:text-paper dark:border-paper/20 dark:hover:bg-paper/10">
              <Mail className="mr-2 h-4 w-4" />
              Send Screening
            </Button>
          )}
          {(applicant.status === 'Screening Sent' || applicant.status === 'Screening Completed') && (
            <Button size="sm" variant="outline" onClick={() => onFollowUp(applicant)} className="dark:text-paper dark:border-paper/20 dark:hover:bg-paper/10">
              <Clock className="mr-2 h-4 w-4" />
              Follow Up
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={() => onViewDetails(applicant)} className="dark:text-paper/70 dark:hover:text-paper dark:hover:bg-paper/10">
            Details
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ApplicantRow;
