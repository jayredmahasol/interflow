import React from 'react';
import { Applicant } from '@/types';
import { Badge } from './ui/Badge';
import { format } from 'date-fns';

interface ApplicantRowProps {
  applicant: Applicant;
  onViewDetails?: (applicant: Applicant) => void;
}

const statusColorMap: Record<string, "default" | "secondary" | "destructive" | "outline" | "warning" | "neutral"> = {
  'To Be Reviewed': 'neutral',
  'Screening Sent': 'warning',
  'Screening Completed': 'secondary',
  'Interview Scheduled': 'default',
  'Rejected': 'destructive',
  'Offer Sent': 'default', // Or a special gold/success color if available
};

const ApplicantRow: React.FC<ApplicantRowProps> = ({
  applicant,
  onViewDetails,
}) => {
  return (
    <tr
      className="align-middle border-b border-dark-serpent/5 transition-colors hover:bg-paper/50 dark:border-paper/5 dark:hover:bg-paper/5 cursor-pointer"
      onClick={() => onViewDetails?.(applicant)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onViewDetails?.(applicant);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-castleton-green/10 font-bold text-castleton-green dark:bg-paper/10 dark:text-paper">
            {applicant.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-dark-serpent dark:text-paper">{applicant.name}</p>
            <p className="truncate text-sm text-dark-serpent/60 dark:text-paper/60">{applicant.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-dark-serpent dark:text-paper">{applicant.role}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-dark-serpent/60 dark:text-paper/60">{format(new Date(applicant.appliedDate), 'MMM d, yyyy')}</p>
      </td>
      <td className="px-6 py-4">
        <Badge variant={statusColorMap[applicant.status] || 'outline'}>
          {applicant.status}
        </Badge>
      </td>
    </tr>
  );
};

export default ApplicantRow;
