import React, { useState } from 'react';
import { Applicant } from '@/types';
import { useApplicants } from '@/context/ApplicantContext';
import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import ApplicantRow from '@/components/ApplicantRow';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { generateScreeningEmail, generateFollowUpEmail } from '@/services/ai';
import { Users, Mail, CheckCircle, Clock, Loader2, Send } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const { applicants, updateApplicantStatus } = useApplicants();
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailContent, setEmailContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState<'screening' | 'followup' | 'details'>('details');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendScreening = async (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setModalType('screening');
    setIsLoading(true);
    setIsModalOpen(true);
    
    try {
      const content = await generateScreeningEmail(applicant.name, applicant.role);
      setEmailContent(content);
    } catch (error) {
      console.error("Failed to generate email", error);
      setEmailContent("Error generating email content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setModalType('details');
    setIsModalOpen(true);
  };

  const handleFollowUp = async (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setModalType('followup');
    setIsLoading(true);
    setIsModalOpen(true);
    
    try {
      const content = await generateFollowUpEmail(applicant.name, applicant.role, applicant.status);
      setEmailContent(content);
    } catch (error) {
      console.error("Failed to generate email", error);
      setEmailContent("Error generating email content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSend = () => {
    if (!selectedApplicant) return;

    const newStatus = modalType === 'screening' ? 'Screening Sent' : selectedApplicant.status;
    
    updateApplicantStatus(selectedApplicant.id, newStatus as Applicant['status'], {
      lastContacted: new Date().toISOString()
    });
    
    setIsModalOpen(false);
    setSelectedApplicant(null);
    setEmailContent('');
  };

  const stats = {
    total: applicants.length,
    screened: applicants.filter(a => a.status === 'Screening Completed').length,
    pending: applicants.filter(a => a.status === 'Applied').length,
    interview: applicants.filter(a => a.status === 'Interview Scheduled').length,
  };

  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-serpent dark:text-paper">Dashboard</h1>
          <p className="mt-2 text-dark-serpent/60 dark:text-paper/60">Overview of intern applications and screening status.</p>
        </div>
        <Button onClick={() => alert("Feature coming soon: Import CSV")} className="bg-castleton-green hover:bg-castleton-green/90 dark:bg-paper dark:text-dark-serpent dark:hover:bg-paper/90">
          Import Applicants
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total Applicants" value={stats.total} icon={Users} trend="+12%" trendUp={true} />
        <StatCard title="Pending Review" value={stats.pending} icon={Clock} trend="-5%" trendUp={true} />
        <StatCard title="Screening Completed" value={stats.screened} icon={CheckCircle} trend="+8%" trendUp={true} />
        <StatCard title="Interviews Scheduled" value={stats.interview} icon={Mail} trend="+2%" trendUp={true} />
      </div>

      <div className="rounded-xl border border-dark-serpent/10 bg-white shadow-sm overflow-hidden dark:bg-castleton-green/20 dark:border-paper/10">
        <div className="border-b border-dark-serpent/10 dark:border-paper/10 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-dark-serpent dark:text-paper">Recent Applicants</h2>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search applicants..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 text-sm border border-dark-serpent/20 rounded-md focus:outline-none focus:ring-2 focus:ring-castleton-green/50 dark:bg-dark-serpent/50 dark:border-paper/20 dark:text-paper dark:placeholder:text-paper/40"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-sea-salt text-xs font-medium uppercase tracking-wider text-dark-serpent/60 dark:bg-dark-serpent/40 dark:text-paper/60">
                <th className="px-6 py-3">Applicant</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Applied Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-serpent/5 dark:divide-paper/5 bg-white dark:bg-transparent">
              {applicants
                .filter(app => 
                  app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  app.role.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((applicant) => (
                <ApplicantRow 
                  key={applicant.id} 
                  applicant={applicant} 
                  onSendScreening={handleSendScreening}
                  onFollowUp={handleFollowUp}
                  onViewDetails={handleViewDetails}
                />
              ))}
              {applicants.filter(app => 
                  app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  app.role.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-dark-serpent/60 dark:text-paper/60">
                    No applicants found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Email Preview or Details */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === 'details' ? 'Applicant Details' : 'Review Email Draft'}
        className="max-w-2xl"
      >
        {modalType === 'details' && selectedApplicant ? (
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
        ) : (
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-castleton-green mb-4 dark:text-paper" />
                <p className="text-dark-serpent/60 dark:text-paper/60">Generating personalized email draft...</p>
              </div>
            ) : (
              <>
                <div className="rounded-md bg-sea-salt p-4 border border-dark-serpent/10 dark:bg-paper/5 dark:border-paper/10">
                  <p className="text-sm font-mono whitespace-pre-wrap text-dark-serpent/80 leading-relaxed dark:text-paper/80">
                    {emailContent}
                  </p>
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t border-dark-serpent/10 dark:border-paper/10">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)} className="dark:text-paper dark:border-paper/20 dark:hover:bg-paper/10">Cancel</Button>
                  <Button onClick={handleConfirmSend} className="bg-castleton-green hover:bg-castleton-green/90 dark:bg-paper dark:text-dark-serpent dark:hover:bg-paper/90">
                    <Send className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Dashboard;
