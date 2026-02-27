import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Applicant } from '@/types';
import { mockApplicants } from '@/data/mockData';

interface ApplicantContextType {
  applicants: Applicant[];
  updateApplicantStatus: (id: string, status: Applicant['status'], additionalData?: Partial<Applicant>) => void;
  addApplicant: (applicant: Applicant) => void;
  deleteApplicant: (id: string) => void;
}

const ApplicantContext = createContext<ApplicantContextType | undefined>(undefined);

export const ApplicantProvider = ({ children }: { children: ReactNode }) => {
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants);

  const updateApplicantStatus = (id: string, status: Applicant['status'], additionalData?: Partial<Applicant>) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status, ...additionalData } : app
      )
    );
  };

  const addApplicant = (applicant: Applicant) => {
    setApplicants((prev) => [...prev, { ...applicant, status: 'To Be Reviewed' }]);
  };

  const deleteApplicant = (id: string) => {
    setApplicants((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <ApplicantContext.Provider value={{ applicants, updateApplicantStatus, addApplicant, deleteApplicant }}>
      {children}
    </ApplicantContext.Provider>
  );
};

export const useApplicants = () => {
  const context = useContext(ApplicantContext);
  if (context === undefined) {
    throw new Error('useApplicants must be used within an ApplicantProvider');
  }
  return context;
};
