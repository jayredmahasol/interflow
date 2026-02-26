import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import {
  User,
  Bell,
  Lock,
  Mail,
  Globe,
  Shield,
  Laptop,
  KeyRound,
} from 'lucide-react';

/* ================= REUSABLE COMPONENTS ================= */

const SettingsSection = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6 rounded-xl border border-dark-serpent/10 bg-white p-6 shadow-sm dark:border-paper/10 dark:bg-castleton-green/20">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-dark-serpent dark:text-paper">
        {title}
      </h3>
      <p className="text-sm text-dark-serpent/60 dark:text-paper/60">
        {description}
      </p>
    </div>
    {children}
  </div>
);

const Toggle = ({
  label,
  defaultChecked = false,
}: {
  label: string;
  defaultChecked?: boolean;
}) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm font-medium text-dark-serpent dark:text-paper">
      {label}
    </span>
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        defaultChecked={defaultChecked}
      />
      <div className="peer h-6 w-11 rounded-full bg-dark-serpent/20 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-castleton-green peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-castleton-green/20 dark:bg-paper/20 dark:after:bg-dark-serpent dark:peer-checked:bg-paper"></div>
    </label>
  </div>
);

const InputField = ({
  label,
  defaultValue,
  type = 'text',
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) => (
  <div className="mb-4">
    <label className="mb-1.5 block text-sm font-medium text-dark-serpent dark:text-paper">
      {label}
    </label>
    <input
      type={type}
      defaultValue={defaultValue}
      className="h-10 w-full rounded-md border border-dark-serpent/20 bg-white px-3 text-sm text-dark-serpent focus:border-castleton-green focus:outline-none focus:ring-1 focus:ring-castleton-green dark:border-paper/20 dark:bg-dark-serpent/50 dark:text-paper"
    />
  </div>
);

/* ================= SECURITY MODAL ================= */

const SecurityModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Security Settings"
    className="max-w-2xl"
  >
    <div className="space-y-6">

      {/* Active Sessions */}
      <div>
        <h4 className="font-medium text-dark-serpent mb-2">
          Active Sessions
        </h4>

        <p className="text-sm text-dark-serpent/60 mb-4">
          This is a list of devices that have logged into your account. 
          Revoke any sessions that you do not recognize.
        </p>

        <div className="space-y-3">

          <div className="flex items-center justify-between p-3 rounded-lg bg-sea-salt border border-dark-serpent/10">
            <div className="flex items-center">
              <Laptop className="w-5 h-5 mr-3 text-dark-serpent/80" />
              <div>
                <p className="text-sm font-medium text-dark-serpent">
                  Chrome on MacOS
                </p>
                <p className="text-xs text-dark-serpent/60">
                  New York, NY - Current Session
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
            >
              Remove
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-sea-salt border border-dark-serpent/10">
            <div className="flex items-center">
              <Laptop className="w-5 h-5 mr-3 text-dark-serpent/80" />
              <div>
                <p className="text-sm font-medium text-dark-serpent">
                  Safari on iPhone
                </p>
                <p className="text-xs text-dark-serpent/60">
                  Los Angeles, CA - 2 days ago
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
            >
              Remove
            </Button>
          </div>

        </div>
      </div>

      {/* Two Factor */}
      <div className="border-t border-dark-serpent/10 pt-6">
        <h4 className="font-medium text-dark-serpent mb-2">
          Two-Factor Authentication
        </h4>

        <p className="text-sm text-dark-serpent/60 mb-4">
          Add an additional layer of security to your account by enabling two-factor authentication.
        </p>

        <Toggle
          label="Enable Two-Factor Authentication"
          defaultChecked={false}
        />
      </div>

      {/* Password */}
      <div className="border-t border-dark-serpent/10 pt-6">
        <h4 className="font-medium text-dark-serpent mb-2">
          Password
        </h4>

        <p className="text-sm text-dark-serpent/60 mb-4">
          It's a good idea to use a strong password that you're not using elsewhere.
        </p>

        <Button variant="outline">
          <KeyRound className="w-4 h-4 mr-2" />
          Change Password
        </Button>
      </div>

    </div>
  </Modal>
);

/* ================= SETTINGS PAGE ================= */

const Settings = () => {
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-serpent dark:text-paper">
          Settings
        </h1>
        <p className="mt-2 text-dark-serpent/60 dark:text-paper/60">
          Manage your account and application preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Sidebar Navigation */}
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

            <button
              onClick={() => setIsSecurityOpen(true)}
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent dark:text-paper/70 dark:hover:bg-paper/5 dark:hover:text-paper"
            >
              <Shield className="mr-3 h-5 w-5" />
              Security
            </button>

          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">

          {/* PROFILE SECTION */}
          <SettingsSection
            title="Profile Information"
            description="Update your personal details and public profile."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField label="First Name" defaultValue="Alex" />
              <InputField label="Last Name" defaultValue="Morgan" />
            </div>

            <InputField
              label="Email Address"
              defaultValue="alex.morgan@internflow.ai"
              type="email"
            />

            <InputField
              label="Job Title"
              defaultValue="Senior Technical Recruiter"
            />

            <div className="mt-4 flex justify-end">
              <Button className="bg-castleton-green hover:bg-castleton-green/90 dark:bg-paper dark:text-dark-serpent dark:hover:bg-paper/90">
                Save Changes
              </Button>
            </div>
          </SettingsSection>

          {/* EMAIL AUTOMATION */}
          <SettingsSection
            title="Email Automation"
            description="Configure how and when automated emails are sent."
          >
            <div className="space-y-2 divide-y divide-dark-serpent/5 dark:divide-paper/5">
              <Toggle label="Auto-send screening invitation after application" defaultChecked />
              <Toggle label="Send reminder email 24h before deadline" defaultChecked />
              <Toggle label="Notify me when screening is completed" defaultChecked />
              <Toggle label="Auto-reject if score is below 50%" />
            </div>
          </SettingsSection>

          {/* TEAM MEMBERS */}
          <SettingsSection
            title="Team Members"
            description="Manage who has access to this dashboard."
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-md border border-dark-serpent/10 p-3 dark:border-paper/10">
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-castleton-green/20 text-xs font-bold text-castleton-green dark:bg-paper/20 dark:text-paper">
                    AM
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-serpent dark:text-paper">
                      Alex Morgan (You)
                    </p>
                    <p className="text-xs text-dark-serpent/60 dark:text-paper/60">
                      Admin
                    </p>
                  </div>
                </div>
                <span className="text-xs text-dark-serpent/40 dark:text-paper/40">
                  Owner
                </span>
              </div>

              <div className="flex items-center justify-between rounded-md border border-dark-serpent/10 p-3 dark:border-paper/10">
                <div className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-saffron/20 text-xs font-bold text-saffron">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-serpent dark:text-paper">
                      Jane Doe
                    </p>
                    <p className="text-xs text-dark-serpent/60 dark:text-paper/60">
                      Recruiter
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-xs dark:text-paper/70 dark:hover:bg-paper/10 dark:hover:text-paper">
                  Remove
                </Button>
              </div>

              <Button variant="outline" className="mt-2 w-full dark:border-paper/20 dark:text-paper dark:hover:bg-paper/10">
                <Globe className="mr-2 h-4 w-4" />
                Invite Team Member
              </Button>
            </div>
          </SettingsSection>

        </div>
      </div>

      <SecurityModal
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
      />

    </Layout>
  );
};

export default Settings;