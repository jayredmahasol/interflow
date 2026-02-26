import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { User, Bell, Lock, Mail, Globe, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const SettingsSection = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
  <div className="rounded-xl border border-dark-serpent/10 bg-white p-6 shadow-sm mb-6 dark:bg-castleton-green/20 dark:border-paper/10">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-dark-serpent dark:text-paper">{title}</h3>
      <p className="text-sm text-dark-serpent/60 dark:text-paper/60">{description}</p>
    </div>
    {children}
  </div>
);

const Toggle = ({ label, defaultChecked = false }: { label: string, defaultChecked?: boolean }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm font-medium text-dark-serpent dark:text-paper">{label}</span>
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" className="peer sr-only" defaultChecked={defaultChecked} />
      <div className="peer h-6 w-11 rounded-full bg-dark-serpent/20 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-castleton-green peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-castleton-green/20 dark:bg-paper/20 dark:after:bg-dark-serpent dark:peer-checked:bg-paper"></div>
    </label>
  </div>
);

const InputField = ({ label, defaultValue, type = "text" }: { label: string, defaultValue: string, type?: string }) => (
  <div className="mb-4">
    <label className="mb-1.5 block text-sm font-medium text-dark-serpent dark:text-paper">{label}</label>
    <input 
      type={type} 
      defaultValue={defaultValue}
      className="h-10 w-full rounded-md border border-dark-serpent/20 bg-white px-3 text-sm text-dark-serpent focus:border-castleton-green focus:outline-none focus:ring-1 focus:ring-castleton-green dark:bg-dark-serpent/50 dark:border-paper/20 dark:text-paper"
    />
  </div>
);

const Settings = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-serpent dark:text-paper">Settings</h1>
        <p className="mt-2 text-dark-serpent/60 dark:text-paper/60">Manage your account and application preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Sidebar Navigation for Settings */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            <button className="flex w-full items-center rounded-md bg-castleton-green/10 px-3 py-2 text-sm font-medium text-castleton-green dark:bg-paper/10 dark:text-paper">
              <User className="mr-3 h-5 w-5" />
              General Profile
            </button>
            <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent dark:text-paper/70 dark:hover:bg-paper/5 dark:hover:text-paper">
              <Bell className="mr-3 h-5 w-5" />
              Notifications
            </button>
            <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent dark:text-paper/70 dark:hover:bg-paper/5 dark:hover:text-paper">
              <Mail className="mr-3 h-5 w-5" />
              Email Templates
            </button>
            <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent dark:text-paper/70 dark:hover:bg-paper/5 dark:hover:text-paper">
              <Shield className="mr-3 h-5 w-5" />
              Security
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <SettingsSection 
            title="Profile Information" 
            description="Update your personal details and public profile."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField label="First Name" defaultValue="Alex" />
              <InputField label="Last Name" defaultValue="Morgan" />
            </div>
            <InputField label="Email Address" defaultValue="alex.morgan@internflow.ai" type="email" />
            <InputField label="Job Title" defaultValue="Senior Technical Recruiter" />
            <div className="mt-4 flex justify-end">
              <Button className="bg-castleton-green hover:bg-castleton-green/90 dark:bg-paper dark:text-dark-serpent dark:hover:bg-paper/90">Save Changes</Button>
            </div>
          </SettingsSection>

          <SettingsSection 
            title="Email Automation" 
            description="Configure how and when automated emails are sent."
          >
            <div className="space-y-2 divide-y divide-dark-serpent/5 dark:divide-paper/5">
              <Toggle label="Auto-send screening invitation after application" defaultChecked={true} />
              <Toggle label="Send reminder email 24h before deadline" defaultChecked={true} />
              <Toggle label="Notify me when screening is completed" defaultChecked={true} />
              <Toggle label="Auto-reject if score is below 50%" defaultChecked={false} />
            </div>
          </SettingsSection>

          <SettingsSection 
            title="Team Members" 
            description="Manage who has access to this dashboard."
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-md border border-dark-serpent/10 p-3 dark:border-paper/10">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-castleton-green/20 flex items-center justify-center text-castleton-green font-bold text-xs mr-3 dark:bg-paper/20 dark:text-paper">
                    AM
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-serpent dark:text-paper">Alex Morgan (You)</p>
                    <p className="text-xs text-dark-serpent/60 dark:text-paper/60">Admin</p>
                  </div>
                </div>
                <span className="text-xs text-dark-serpent/40 dark:text-paper/40">Owner</span>
              </div>
              <div className="flex items-center justify-between rounded-md border border-dark-serpent/10 p-3 dark:border-paper/10">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-saffron/20 flex items-center justify-center text-saffron font-bold text-xs mr-3">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-serpent dark:text-paper">Jane Doe</p>
                    <p className="text-xs text-dark-serpent/60 dark:text-paper/60">Recruiter</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-xs dark:text-paper/70 dark:hover:text-paper dark:hover:bg-paper/10">Remove</Button>
              </div>
              <Button variant="outline" className="w-full mt-2 dark:text-paper dark:border-paper/20 dark:hover:bg-paper/10">
                <Globe className="mr-2 h-4 w-4" />
                Invite Team Member
              </Button>
            </div>
          </SettingsSection>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
