import React, { useState } from 'react';
import { Applicant } from '@/types';
import { useApplicants } from '@/context/ApplicantContext';
import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import ApplicantRow from '@/components/ApplicantRow';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Users, Mail, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const { applicants } = useApplicants();
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewDetails = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  const reviewApplicants = applicants.filter((app) => app.status === 'To Be Reviewed');
  const filteredApplicants = reviewApplicants.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: applicants.length,
    toBeReviewed: applicants.filter(a => a.status === 'To Be Reviewed').length,
    screened: applicants.filter(a => a.status === 'Screening Completed').length,
    interview: applicants.filter(a => a.status === 'Interview Scheduled').length,
  };

  return (
    <Layout>
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-serpent dark:text-paper">Dashboard</h1>
            <p className="mt-2 text-dark-serpent/60 dark:text-paper/60">Overview of intern applications and screening status.</p>
          </div>
          <Button onClick={() => alert("Feature coming soon: Import CSV")} className="bg-castleton-green hover:bg-castleton-green/90 dark:bg-paper dark:text-dark-serpent dark:hover:bg-paper/90 sm:w-auto">
            Import Applicants
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Applicants" value={stats.total} icon={Users} trend="+12%" trendUp={true} />
          <StatCard title="To Be Reviewed" value={stats.toBeReviewed} icon={Clock} trend="-5%" trendUp={true} />
          <StatCard title="Screening Completed" value={stats.screened} icon={CheckCircle} trend="+8%" trendUp={true} />
          <StatCard title="Interviews Scheduled" value={stats.interview} icon={Mail} trend="+2%" trendUp={true} />
        </div>

        <div className="overflow-hidden rounded-2xl border border-dark-serpent/10 bg-white shadow-[0_10px_30px_rgba(18,38,32,0.08)] dark:bg-castleton-green/20 dark:border-paper/10">
          <div className="flex flex-col gap-3 border-b border-dark-serpent/10 px-6 py-5 dark:border-paper/10 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-dark-serpent dark:text-paper">Recent Applicants</h2>
            <div className="w-full sm:w-auto">
              <input 
                type="text" 
                placeholder="Search applicants..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-dark-serpent/20 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-castleton-green/50 dark:bg-dark-serpent/50 dark:border-paper/20 dark:text-paper dark:placeholder:text-paper/40 sm:w-64"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed text-left">
              <thead>
                <tr className="bg-sea-salt text-xs font-medium uppercase tracking-wider text-dark-serpent/60 dark:bg-dark-serpent/40 dark:text-paper/60">
                  <th className="px-6 py-3.5">Applicant</th>
                  <th className="px-6 py-3.5">Role</th>
                  <th className="px-6 py-3.5">Applied Date</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-serpent/5 bg-white dark:divide-paper/5 dark:bg-transparent">
                {filteredApplicants.map((applicant) => (
                  <ApplicantRow 
                    key={applicant.id} 
                    applicant={applicant} 
                    onViewDetails={handleViewDetails}
                  />
                ))}
                {filteredApplicants.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-dark-serpent/60 dark:text-paper/60">
                      No applicants found matching "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Email Preview or Details */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedApplicant(null);
        }}
        title="Applicant Details"
        className="max-w-2xl"
      >
        {selectedApplicant ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-dark-serpent/60 uppercase dark:text-paper/60">Name</label>
                <p className="text-dark-serpent font-medium dark:text-paper">{selectedApplicant.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-dark-serpent/60 uppercase dark:text-paper/60">Email</label>
                <p className="text-dark-serpent font-medium dark:text-paper">{selectedApplicant.email}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-dark-serpent/60 uppercase dark:text-paper/60">Role</label>
                <p className="text-dark-serpent font-medium dark:text-paper">{selectedApplicant.role}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-dark-serpent/60 uppercase dark:text-paper/60">Applied Date</label>
                <p className="text-dark-serpent font-medium dark:text-paper">{format(new Date(selectedApplicant.appliedDate), 'PPP')}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-dark-serpent/60 uppercase dark:text-paper/60">Status</label>
                <p className="text-dark-serpent font-medium dark:text-paper">{selectedApplicant.status}</p>
              </div>
              {selectedApplicant.screeningScore && (
                <div>
                  <label className="text-xs font-medium text-dark-serpent/60 uppercase dark:text-paper/60">Screening Score</label>
                  <p className="text-dark-serpent font-medium dark:text-paper">{selectedApplicant.screeningScore}%</p>
                </div>
              )}
            </div>
            <div className="flex justify-end pt-4 border-t border-dark-serpent/10 dark:border-paper/10">
              <Button onClick={() => setIsModalOpen(false)} className="dark:bg-paper dark:text-dark-serpent dark:hover:bg-paper/90">Close</Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </Layout>
  );
};

export default Dashboard;
