import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useApplicants } from '@/context/ApplicantContext';
import ApplicantRow from '@/components/ApplicantRow';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Search, Filter, Download, Plus, ChevronDown } from 'lucide-react';
import { Applicant } from '@/types';
import { format } from 'date-fns';

const SearchInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-serpent/40 dark:text-paper/40" />
    <input
      {...props}
      className="h-10 w-full rounded-md border border-dark-serpent/20 bg-white pl-10 pr-4 text-sm placeholder:text-dark-serpent/40 focus:border-castleton-green focus:outline-none focus:ring-1 focus:ring-castleton-green dark:bg-dark-serpent/50 dark:border-paper/20 dark:text-paper dark:placeholder:text-paper/40"
    />
  </div>
);

const Applicants = () => {
  const { applicants } = useApplicants();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Status');
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusOptions = [
    'All Status',
    'To Be Reviewed',
    'Screening Sent',
    'Screening Completed',
    'Interview Scheduled',
    'Rejected',
    'Offer Sent',
  ];

  const filteredApplicants = applicants.filter(app => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All Status' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-serpent dark:text-paper">
              Applicants
            </h1>
            <p className="mt-2 text-dark-serpent/60 dark:text-paper/60">
              Manage and track all candidates.
            </p>
          </div>

          <Button className="bg-castleton-green hover:bg-castleton-green/90 dark:bg-paper dark:text-dark-serpent dark:hover:bg-paper/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4 rounded-xl border border-dark-serpent/10 bg-white p-4 shadow-sm dark:bg-castleton-green/20 dark:border-paper/10">
          
          <div className="flex flex-1 items-center gap-4">

            {/* Search */}
            <div className="w-72">
              <SearchInput
                placeholder="Search by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Custom Filter Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-dark-serpent/60 dark:text-paper/60" />

                <button
                  onClick={() => setOpenFilter(!openFilter)}
                  className="flex items-center gap-2 h-10 rounded-md border border-dark-serpent/20 bg-white px-3 text-sm text-dark-serpent hover:border-castleton-green focus:outline-none focus:ring-1 focus:ring-castleton-green dark:bg-dark-serpent/50 dark:border-paper/20 dark:text-paper"
                >
                  {statusFilter}
                  <ChevronDown className="h-4 w-4 opacity-60" />
                </button>
              </div>

              {openFilter && (
                <div className="absolute mt-2 w-48 rounded-md border border-dark-serpent/10 bg-white shadow-lg z-50 dark:bg-dark-serpent dark:border-paper/10">
                  {statusOptions.map((status) => (
                    <div
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setOpenFilter(false);
                      }}
                      className="cursor-pointer px-3 py-2 text-sm text-dark-serpent hover:bg-castleton-green/10 hover:text-castleton-green dark:text-paper dark:hover:bg-paper/10"
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <Button variant="outline" className="dark:text-paper dark:border-paper/20 dark:hover:bg-paper/10">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-dark-serpent/10 bg-white shadow-sm overflow-hidden dark:bg-castleton-green/20 dark:border-paper/10">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-sea-salt text-xs font-medium uppercase tracking-wider text-dark-serpent/60 dark:bg-dark-serpent/40 dark:text-paper/60">
                <th className="px-6 py-3">Applicant</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Applied Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-dark-serpent/5 dark:divide-paper/5 bg-white dark:bg-transparent">
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-dark-serpent/60 dark:text-paper/60">
                    No applicants found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((applicant) => (
                  <ApplicantRow key={applicant.id} applicant={applicant} onViewDetails={handleViewDetails} />
                ))
              )}
            </tbody>
          </table>

          <div className="border-t border-dark-serpent/10 bg-sea-salt px-6 py-4 dark:bg-dark-serpent/40 dark:border-paper/10">
            <p className="text-sm text-dark-serpent/60 dark:text-paper/60">
              Showing {filteredApplicants.length} of {applicants.length} applicants
            </p>
          </div>
        </div>

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

      </div>
    </Layout>
  );
};

export default Applicants;
