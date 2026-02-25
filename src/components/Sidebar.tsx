import React from 'react';
import { LayoutDashboard, Users, Mail, Settings, LogOut, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  return (
    <div className="flex h-screen w-64 flex-col border-r border-dark-serpent/10 bg-paper">
      <div className="flex h-16 items-center px-6 border-b border-dark-serpent/10">
        <div className="h-8 w-8 rounded-lg bg-castleton-green flex items-center justify-center mr-3">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-dark-serpent">InternFlow</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          <a href="#" className="group flex items-center rounded-md bg-dark-serpent/5 px-3 py-2 text-sm font-medium text-dark-serpent">
            <LayoutDashboard className="mr-3 h-5 w-5 flex-shrink-0 text-dark-serpent/70" />
            Dashboard
          </a>
          <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent">
            <Users className="mr-3 h-5 w-5 flex-shrink-0 text-dark-serpent/50 group-hover:text-dark-serpent/70" />
            Applicants
          </a>
          <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent">
            <Mail className="mr-3 h-5 w-5 flex-shrink-0 text-dark-serpent/50 group-hover:text-dark-serpent/70" />
            Screening
          </a>
          <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent">
            <Settings className="mr-3 h-5 w-5 flex-shrink-0 text-dark-serpent/50 group-hover:text-dark-serpent/70" />
            Settings
          </a>
        </nav>
      </div>

      <div className="border-t border-dark-serpent/10 p-4">
        <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent">
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-dark-serpent/50 group-hover:text-dark-serpent/70" />
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
