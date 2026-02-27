import React from 'react';
import { Applicant } from '@/types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Trash2, Clock, CalendarCheck2, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface ApplicantRowProps {
  applicant: Applicant;
  onProceed?: (applicant: Applicant) => void;
  onFollowUp?: (applicant: Applicant) => void;
  onScheduleInterview?: (applicant: Applicant) => void;
  onReject?: (applicant: Applicant) => void;
  onDelete?: (applicant: Applicant) => void;
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
  onProceed,
  onFollowUp,
  onScheduleInterview,
  onReject,
  onDelete,
  onViewDetails,
}) => {
  return (
    <tr className="align-middle border-b border-dark-serpent/5 transition-colors hover:bg-paper/50 dark:border-paper/5 dark:hover:bg-paper/5">
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
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
          {applicant.status === 'To Be Reviewed' && (
            <>
              {onProceed && (
                <Button
                  size="sm"
                  onClick={() => onProceed(applicant)}
                  className="bg-castleton-green hover:bg-castleton-green/90 dark:bg-paper dark:text-dark-serpent dark:hover:bg-paper/90"
                >
                  Proceed
                </Button>
              )}
              {onDelete && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onDelete(applicant)}
                  aria-label="Delete applicant"
                  title="Delete applicant"
                  className="h-8 w-8 border-red-500/40 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-400/40 dark:text-red-300 dark:hover:bg-red-900/20 dark:hover:text-red-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </>
          )}

          {applicant.status === 'Screening Sent' && (
            <>
              {onFollowUp && (
                <Button size="sm" variant="outline" onClick={() => onFollowUp(applicant)} className="dark:text-paper dark:border-paper/20 dark:hover:bg-paper/10">
                  <Clock className="mr-2 h-4 w-4" />
                  Follow Up
                </Button>
              )}
              {onDelete && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onDelete(applicant)}
                  aria-label="Delete applicant"
                  title="Delete applicant"
                  className="h-8 w-8 border-red-500/40 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-400/40 dark:text-red-300 dark:hover:bg-red-900/20 dark:hover:text-red-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </>
          )}

          {applicant.status === 'Screening Completed' && (
            <>
              {onScheduleInterview && (
                <Button size="sm" variant="outline" onClick={() => onScheduleInterview(applicant)} className="dark:text-paper dark:border-paper/20 dark:hover:bg-paper/10">
                  <CalendarCheck2 className="mr-2 h-4 w-4" />
                  Schedule Interview
                </Button>
              )}
              {onReject && (
                <Button size="sm" variant="destructive" onClick={() => onReject(applicant)}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              )}
            </>
          )}

          {applicant.status === 'Interview Scheduled' && onViewDetails && (
            <Button size="sm" variant="ghost" onClick={() => onViewDetails(applicant)} className="dark:text-paper/70 dark:hover:text-paper dark:hover:bg-paper/10">
              Details
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ApplicantRow;
