import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useApplicants } from '@/context/ApplicantContext';
import ApplicantRow from '@/components/ApplicantRow';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { Applicant } from '@/types';

// Simple Input component since we don't have one yet
const SearchInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-serpent/40" />
    <input
      {...props}
      className="h-10 w-full rounded-md border border-dark-serpent/20 bg-white pl-10 pr-4 text-sm placeholder:text-dark-serpent/40 focus:border-castleton-green focus:outline-none focus:ring-1 focus:ring-castleton-green"
    />
  </div>
);

const Applicants = () => {
  const { applicants, updateApplicantStatus } = useApplicants();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handlers (reusing logic or placeholders)
  const handleSendScreening = (applicant: Applicant) => {
    console.log('Send screening to', applicant.name);
    // In a real app, this would open the modal
  };

  const handleFollowUp = (applicant: Applicant) => {
    console.log('Follow up with', applicant.name);
  };

  const handleViewDetails = (applicant: Applicant) => {
    console.log('View details for', applicant.name);
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-serpent">Applicants</h1>
            <p className="mt-2 text-dark-serpent/60">Manage and track all candidates.</p>
          </div>
          <Button className="bg-castleton-green hover:bg-castleton-green/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between gap-4 rounded-xl border border-dark-serpent/10 bg-white p-4 shadow-sm">
          <div className="flex flex-1 items-center gap-4">
            <div className="w-72">
              <SearchInput 
                placeholder="Search by name, email, or role..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-dark-serpent/60" />
              <select 
                className="h-10 rounded-md border border-dark-serpent/20 bg-white px-3 text-sm text-dark-serpent focus:border-castleton-green focus:outline-none focus:ring-1 focus:ring-castleton-green"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Screening Sent">Screening Sent</option>
                <option value="Screening Completed">Screening Completed</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer Sent">Offer Sent</option>
              </select>
            </div>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-dark-serpent/10 bg-white shadow-sm overflow-hidden">
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
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-dark-serpent/60">
                    No applicants found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((applicant) => (
                  <ApplicantRow 
                    key={applicant.id} 
                    applicant={applicant} 
                    onSendScreening={handleSendScreening}
                    onFollowUp={handleFollowUp}
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </tbody>
          </table>
          <div className="border-t border-dark-serpent/10 bg-sea-salt px-6 py-4">
            <p className="text-sm text-dark-serpent/60">
              Showing {filteredApplicants.length} of {applicants.length} applicants
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Applicants;
