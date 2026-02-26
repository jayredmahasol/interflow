import React from 'react';
import { LayoutDashboard, Users, Mail, Settings, LogOut, FileText, Moon, Sun, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';

const Sidebar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r border-dark-serpent/10 bg-paper dark:bg-dark-serpent dark:border-paper/10 transition-colors duration-300">
      <div className="flex h-16 items-center px-6 border-b border-dark-serpent/10 dark:border-paper/10">
        <div className="h-8 w-8 rounded-lg bg-castleton-green flex items-center justify-center mr-3">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-dark-serpent dark:text-paper">InternFlow</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          <Link 
            to="/" 
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive('/') 
                ? "bg-dark-serpent/10 text-dark-serpent dark:bg-paper/10 dark:text-paper" 
                : "text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent dark:text-paper/70 dark:hover:bg-paper/5 dark:hover:text-paper"
            )}
          >
            <LayoutDashboard className={cn("mr-3 h-5 w-5 flex-shrink-0 transition-colors", isActive('/') ? "text-dark-serpent dark:text-paper" : "text-dark-serpent/50 group-hover:text-dark-serpent/70 dark:text-paper/50 dark:group-hover:text-paper/70")} />
            Dashboard
          </Link>
          <Link 
            to="/applicants" 
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive('/applicants') 
                ? "bg-dark-serpent/10 text-dark-serpent dark:bg-paper/10 dark:text-paper" 
                : "text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent dark:text-paper/70 dark:hover:bg-paper/5 dark:hover:text-paper"
            )}
          >
            <Users className={cn("mr-3 h-5 w-5 flex-shrink-0 transition-colors", isActive('/applicants') ? "text-dark-serpent dark:text-paper" : "text-dark-serpent/50 group-hover:text-dark-serpent/70 dark:text-paper/50 dark:group-hover:text-paper/70")} />
            Applicants
          </Link>
          <Link 
            to="/screening" 
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive('/screening') 
                ? "bg-dark-serpent/10 text-dark-serpent dark:bg-paper/10 dark:text-paper" 
                : "text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent dark:text-paper/70 dark:hover:bg-paper/5 dark:hover:text-paper"
            )}
          >
            <Mail className={cn("mr-3 h-5 w-5 flex-shrink-0 transition-colors", isActive('/screening') ? "text-dark-serpent dark:text-paper" : "text-dark-serpent/50 group-hover:text-dark-serpent/70 dark:text-paper/50 dark:group-hover:text-paper/70")} />
            Screening
          </Link>
          <Link 
            to="/notifications" 
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive('/notifications') 
                ? "bg-dark-serpent/10 text-dark-serpent dark:bg-paper/10 dark:text-paper" 
                : "text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent dark:text-paper/70 dark:hover:bg-paper/5 dark:hover:text-paper"
            )}
          >
            <Bell className={cn("mr-3 h-5 w-5 flex-shrink-0 transition-colors", isActive('/notifications') ? "text-dark-serpent dark:text-paper" : "text-dark-serpent/50 group-hover:text-dark-serpent/70 dark:text-paper/50 dark:group-hover:text-paper/70")} />
            Notifications
          </Link>
          <Link 
            to="/settings" 
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive('/settings') 
                ? "bg-dark-serpent/10 text-dark-serpent dark:bg-paper/10 dark:text-paper" 
                : "text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent dark:text-paper/70 dark:hover:bg-paper/5 dark:hover:text-paper"
            )}
          >
            <Settings className={cn("mr-3 h-5 w-5 flex-shrink-0 transition-colors", isActive('/settings') ? "text-dark-serpent dark:text-paper" : "text-dark-serpent/50 group-hover:text-dark-serpent/70 dark:text-paper/50 dark:group-hover:text-paper/70")} />
            Settings
          </Link>
        </nav>
      </div>

      <div className="border-t border-dark-serpent/10 dark:border-paper/10 p-4 space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent dark:text-paper/70 dark:hover:bg-paper/5 dark:hover:text-paper"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="mr-3 h-5 w-5 flex-shrink-0" />
          ) : (
            <Moon className="mr-3 h-5 w-5 flex-shrink-0" />
          )}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
        <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent dark:text-paper/70 dark:hover:bg-paper/5 dark:hover:text-paper">
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-dark-serpent/50 group-hover:text-dark-serpent/70 dark:text-paper/50 dark:group-hover:text-paper/70" />
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
