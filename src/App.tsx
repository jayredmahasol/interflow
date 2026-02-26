/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApplicantProvider } from '@/context/ApplicantContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Dashboard from '@/pages/Dashboard';
import Screening from '@/pages/Screening';
import Applicants from '@/pages/Applicants';
import Settings from '@/pages/Settings';
import Notifications from '@/pages/Notifications.tsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="internflow-theme">
      <ApplicantProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applicants" element={<Applicants />} />
            <Route path="/screening" element={<Screening />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </Router>
      </ApplicantProvider>
    </ThemeProvider>
  );
}
