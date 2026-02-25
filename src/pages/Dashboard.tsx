import React, { useState } from 'react';
import { Applicant } from '@/types';
import { mockApplicants } from '@/data/mockData';
import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import ApplicantRow from '@/components/ApplicantRow';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { generateScreeningEmail, generateFollowUpEmail } from '@/services/ai';
import { Users, Mail, CheckCircle, Clock, Loader2, Send } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants);
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

    // Simulate sending email and updating status
    const updatedApplicants = applicants.map(app => 
      app.id === selectedApplicant.id 
        ? { 
            ...app, 
            status: modalType === 'screening' ? 'Screening Sent' as const : app.status,
            lastContacted: new Date().toISOString() 
          } 
        : app
    );
    
    setApplicants(updatedApplicants);
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
          <h1 className="text-3xl font-bold text-dark-serpent">Dashboard</h1>
          <p className="mt-2 text-dark-serpent/60">Overview of intern applications and screening status.</p>
        </div>
        <Button onClick={() => alert("Feature coming soon: Import CSV")}>
          Import Applicants
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total Applicants" value={stats.total} icon={Users} trend="+12%" trendUp={true} />
        <StatCard title="Pending Review" value={stats.pending} icon={Clock} trend="-5%" trendUp={true} />
        <StatCard title="Screening Completed" value={stats.screened} icon={CheckCircle} trend="+8%" trendUp={true} />
        <StatCard title="Interviews Scheduled" value={stats.interview} icon={Mail} trend="+2%" trendUp={true} />
      </div>

      <div className="rounded-xl border border-dark-serpent/10 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-dark-serpent/10 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-dark-serpent">Recent Applicants</h2>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search applicants..." 
              className="px-3 py-1.5 text-sm border border-dark-serpent/20 rounded-md focus:outline-none focus:ring-2 focus:ring-castleton-green/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-sea-salt text-xs font-medium uppercase tracking-wider text-dark-serpent/60">
                <th className="px-6 py-3">Applicant</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Applied Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-serpent/5 bg-white">
              {applicants
                .filter(applicant => 
                  applicant.name.toLowerCase().startsWith(searchQuery.toLowerCase())
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
                <label className="text-xs font-medium text-dark-serpent/60 uppercase">Name</label>
                <p className="text-dark-serpent font-medium">{selectedApplicant.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-dark-serpent/60 uppercase">Email</label>
                <p className="text-dark-serpent font-medium">{selectedApplicant.email}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-dark-serpent/60 uppercase">Role</label>
                <p className="text-dark-serpent font-medium">{selectedApplicant.role}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-dark-serpent/60 uppercase">Applied Date</label>
                <p className="text-dark-serpent font-medium">{format(new Date(selectedApplicant.appliedDate), 'PPP')}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-dark-serpent/60 uppercase">Status</label>
                <p className="text-dark-serpent font-medium">{selectedApplicant.status}</p>
              </div>
              {selectedApplicant.screeningScore && (
                <div>
                  <label className="text-xs font-medium text-dark-serpent/60 uppercase">Screening Score</label>
                  <p className="text-dark-serpent font-medium">{selectedApplicant.screeningScore}%</p>
                </div>
              )}
            </div>
            <div className="flex justify-end pt-4 border-t border-dark-serpent/10">
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-castleton-green mb-4" />
                <p className="text-dark-serpent/60">Generating personalized email draft...</p>
              </div>
            ) : (
              <>
                <div className="rounded-md bg-sea-salt p-4 border border-dark-serpent/10">
                  <p className="text-sm font-mono whitespace-pre-wrap text-dark-serpent/80 leading-relaxed">
                    {emailContent}
                  </p>
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t border-dark-serpent/10">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleConfirmSend} className="bg-castleton-green hover:bg-castleton-green/90">
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
