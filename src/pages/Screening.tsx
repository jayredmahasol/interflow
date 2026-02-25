import React, { useState } from 'react';
import { useApplicants } from '@/context/ApplicantContext';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Applicant } from '@/types';
import { CheckCircle, Clock, XCircle, FileText, Send, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Screening = () => {
  const { applicants, updateApplicantStatus } = useApplicants();
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const pendingApplicants = applicants.filter(a => 
    a.status === 'Screening Sent' && 
    (a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
     a.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const completedApplicants = applicants.filter(a => 
    a.status === 'Screening Completed' &&
    (a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
     a.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const avgScore = completedApplicants.length > 0
    ? Math.round(completedApplicants.reduce((acc, curr) => acc + (curr.screeningScore || 0), 0) / completedApplicants.length)
    : 0;

  const handleSendReminder = (id: string) => {
    // In a real app, this would trigger an API call
    updateApplicantStatus(id, 'Screening Sent', { lastContacted: new Date().toISOString() });
    alert("Reminder sent!");
  };

  const handleMoveToInterview = (id: string) => {
    updateApplicantStatus(id, 'Interview Scheduled');
  };

  const handleReject = (id: string) => {
    updateApplicantStatus(id, 'Rejected');
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-serpent dark:text-paper">Screening Portal</h1>
        <p className="mt-2 text-dark-serpent/60 dark:text-paper/60">Manage technical assessments and review results.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
        <div className="rounded-xl border border-dark-serpent/10 bg-white p-6 shadow-sm dark:bg-castleton-green/20 dark:border-paper/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-serpent/60 dark:text-paper/60">Pending Assessment</p>
              <p className="mt-2 text-3xl font-bold text-dark-serpent dark:text-paper">{pendingApplicants.length}</p>
            </div>
            <div className="rounded-full bg-saffron/20 p-3">
              <Clock className="h-6 w-6 text-saffron" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-dark-serpent/10 bg-white p-6 shadow-sm dark:bg-castleton-green/20 dark:border-paper/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-serpent/60 dark:text-paper/60">Completed</p>
              <p className="mt-2 text-3xl font-bold text-dark-serpent dark:text-paper">{completedApplicants.length}</p>
            </div>
            <div className="rounded-full bg-castleton-green/10 p-3 dark:bg-paper/10">
              <CheckCircle className="h-6 w-6 text-castleton-green dark:text-paper" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-dark-serpent/10 bg-white p-6 shadow-sm dark:bg-castleton-green/20 dark:border-paper/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-serpent/60 dark:text-paper/60">Avg. Score</p>
              <p className="mt-2 text-3xl font-bold text-dark-serpent dark:text-paper">{avgScore}%</p>
            </div>
            <div className="rounded-full bg-earth-yellow/20 p-3">
              <FileText className="h-6 w-6 text-earth-yellow" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-dark-serpent/10 dark:border-paper/10 gap-4">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('pending')}
            className={cn(
              "pb-4 text-sm font-medium transition-colors relative",
              activeTab === 'pending' 
                ? "text-castleton-green dark:text-paper" 
                : "text-dark-serpent/60 hover:text-dark-serpent dark:text-paper/60 dark:hover:text-paper"
            )}
          >
            Pending Assessment
            {activeTab === 'pending' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-castleton-green dark:bg-paper" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={cn(
              "pb-4 text-sm font-medium transition-colors relative",
              activeTab === 'completed' 
                ? "text-castleton-green dark:text-paper" 
                : "text-dark-serpent/60 hover:text-dark-serpent dark:text-paper/60 dark:hover:text-paper"
            )}
          >
            Completed Reviews
            {activeTab === 'completed' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-castleton-green dark:bg-paper" />
            )}
          </button>
        </div>
        <div className="pb-2">
          <input 
            type="text" 
            placeholder="Search applicants..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 text-sm border border-dark-serpent/20 rounded-md focus:outline-none focus:ring-2 focus:ring-castleton-green/50 dark:bg-dark-serpent/50 dark:border-paper/20 dark:text-paper dark:placeholder:text-paper/40"
          />
        </div>
      </div>

      {/* Content */}
      <div className="rounded-xl border border-dark-serpent/10 bg-white shadow-sm overflow-hidden dark:bg-castleton-green/20 dark:border-paper/10">
        {activeTab === 'pending' ? (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-sea-salt text-xs font-medium uppercase tracking-wider text-dark-serpent/60 dark:bg-dark-serpent/40 dark:text-paper/60">
                <th className="px-6 py-3">Applicant</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Sent Date</th>
                <th className="px-6 py-3">Last Contacted</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-serpent/5 dark:divide-paper/5 bg-white dark:bg-transparent">
              {pendingApplicants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-dark-serpent/60 dark:text-paper/60">
                    No applicants currently pending assessment.
                  </td>
                </tr>
              ) : (
                pendingApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-paper/50 dark:hover:bg-paper/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-dark-serpent dark:text-paper">{applicant.name}</div>
                      <div className="text-sm text-dark-serpent/60 dark:text-paper/60">{applicant.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-serpent dark:text-paper">{applicant.role}</td>
                    <td className="px-6 py-4 text-sm text-dark-serpent/60 dark:text-paper/60">
                      {/* Assuming appliedDate is proxy for sent date for mock data */}
                      {format(new Date(applicant.appliedDate), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-serpent/60 dark:text-paper/60">
                      {applicant.lastContacted ? format(new Date(applicant.lastContacted), 'MMM d, yyyy') : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="outline" onClick={() => handleSendReminder(applicant.id)} className="dark:text-paper dark:border-paper/20 dark:hover:bg-paper/10">
                        <Send className="mr-2 h-4 w-4" />
                        Remind
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-sea-salt text-xs font-medium uppercase tracking-wider text-dark-serpent/60 dark:bg-dark-serpent/40 dark:text-paper/60">
                <th className="px-6 py-3">Applicant</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-serpent/5 dark:divide-paper/5 bg-white dark:bg-transparent">
              {completedApplicants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-dark-serpent/60 dark:text-paper/60">
                    No completed assessments to review.
                  </td>
                </tr>
              ) : (
                completedApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-paper/50 dark:hover:bg-paper/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-dark-serpent dark:text-paper">{applicant.name}</div>
                      <div className="text-sm text-dark-serpent/60 dark:text-paper/60">{applicant.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-serpent dark:text-paper">{applicant.role}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className={cn(
                          "text-lg font-bold mr-2",
                          (applicant.screeningScore || 0) >= 80 ? "text-castleton-green dark:text-green-400" :
                          (applicant.screeningScore || 0) >= 60 ? "text-earth-yellow" : "text-red-500 dark:text-red-400"
                        )}>
                          {applicant.screeningScore}%
                        </span>
                        {(applicant.screeningScore || 0) >= 80 && <Badge variant="default">High</Badge>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary">Needs Review</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="destructive" onClick={() => handleReject(applicant.id)}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                        <Button size="sm" className="bg-castleton-green hover:bg-castleton-green/90 dark:bg-paper dark:text-dark-serpent dark:hover:bg-paper/90" onClick={() => handleMoveToInterview(applicant.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Interview
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Screening;
