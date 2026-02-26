import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { User, Bell, Lock, Mail, Globe, Shield, Laptop, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import Modal from '@/components/ui/Modal';

const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
      active
        ? "bg-castleton-green/10 text-castleton-green"
        : "text-dark-serpent/70 hover:bg-dark-serpent/5 hover:text-dark-serpent"
    )}
  >
    <Icon className="mr-3 h-5 w-5" />
    {label}
  </button>
);

const SettingsSection = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-dark-serpent/10 bg-white shadow-sm mb-8">
    <div className="border-b border-dark-serpent/10 px-6 py-4">
      <h3 className="text-lg font-semibold text-dark-serpent">
        {title}
      </h3>
      <p className="mt-1 text-sm text-dark-serpent/60">
        {description}
      </p>
    </div>

    <div className="px-6 py-6">
      {children}
    </div>
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
    <span className="text-sm font-medium text-dark-serpent">
      {label}
    </span>
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        defaultChecked={defaultChecked}
      />
      <div className="peer h-6 w-11 rounded-full bg-dark-serpent/20 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-castleton-green peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-castleton-green/20"></div>
    </label>
  </div>
);

const InputField = ({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) => (
  <div className="mb-4">
    <label className="mb-1.5 block text-sm font-medium text-dark-serpent">
      {label}
    </label>
    <input
      type={type}
      defaultValue={defaultValue}
      className="h-10 w-full rounded-md border border-dark-serpent/20 bg-white px-3 text-sm text-dark-serpent focus:border-castleton-green focus:outline-none focus:ring-1 focus:ring-castleton-green"
    />
  </div>
);

const SecurityModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Security Settings" className="max-w-2xl">
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-dark-serpent mb-2">Active Sessions</h4>
        <p className="text-sm text-dark-serpent/60 mb-4">This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-sea-salt border border-dark-serpent/10">
            <div className="flex items-center">
              <Laptop className="w-5 h-5 mr-3 text-dark-serpent/80" />
              <div>
                <p className="text-sm font-medium text-dark-serpent">Chrome on MacOS</p>
                <p className="text-xs text-dark-serpent/60">New York, NY - Current Session</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs">Revoke</Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-sea-salt border border-dark-serpent/10">
            <div className="flex items-center">
              <Laptop className="w-5 h-5 mr-3 text-dark-serpent/80" />
              <div>
                <p className="text-sm font-medium text-dark-serpent">Safari on iPhone</p>
                <p className="text-xs text-dark-serpent/60">Los Angeles, CA - 2 days ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs">Revoke</Button>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-serpent/10 pt-6">
        <h4 className="font-medium text-dark-serpent mb-2">Two-Factor Authentication</h4>
        <p className="text-sm text-dark-serpent/60 mb-4">Add an additional layer of security to your account by enabling two-factor authentication.</p>
        <Toggle label="Enable Two-Factor Authentication" defaultChecked={false} />
      </div>

      <div className="border-t border-dark-serpent/10 pt-6">
        <h4 className="font-medium text-dark-serpent mb-2">Password</h4>
        <p className="text-sm text-dark-serpent/60 mb-4">It's a good idea to use a strong password that you're not using elsewhere.</p>
        <Button variant="outline">
          <KeyRound className="w-4 h-4 mr-2" />
          Change Password
        </Button>
      </div>
    </div>
  </Modal>
);

const Settings = () => {
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-serpent">
          Settings
        </h1>
        <p className="mt-2 text-dark-serpent/60">
          Manage your account and application preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-dark-serpent/10 bg-white shadow-sm p-4">
            <nav className="space-y-1">
              <SidebarItem icon={User} label="General Profile" active />
              <SidebarItem icon={Mail} label="Email Templates" />
              <SidebarItem icon={Shield} label="Security" onClick={() => setIsSecurityModalOpen(true)} />
            </nav>
          </div>
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
              <Button className="bg-castleton-green hover:bg-castleton-green/90">
                Save Changes
              </Button>
            </div>
          </SettingsSection>

          <SettingsSection
            title="Email Automation"
            description="Configure how and when automated emails are sent."
          >
            <div className="space-y-2 divide-y divide-dark-serpent/5">
              <Toggle
                label="Auto-send screening invitation after application"
                defaultChecked
              />
              <Toggle
                label="Send reminder email 24h before deadline"
                defaultChecked
              />
              <Toggle
                label="Notify me when screening is completed"
                defaultChecked
              />
              <Toggle
                label="Auto-reject if score is below 50%"
              />
            </div>
          </SettingsSection>

          <SettingsSection
            title="Team Members"
            description="Manage who has access to this dashboard."
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-md border border-dark-serpent/10 p-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-castleton-green/20 flex items-center justify-center text-castleton-green font-bold text-xs mr-3">
                    AM
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-serpent">
                      Alex Morgan (You)
                    </p>
                    <p className="text-xs text-dark-serpent/60">
                      Admin
                    </p>
                  </div>
                </div>
                <span className="text-xs text-dark-serpent/40">
                  Owner
                </span>
              </div>

              <div className="flex items-center justify-between rounded-md border border-dark-serpent/10 p-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-saffron/20 flex items-center justify-center text-saffron font-bold text-xs mr-3">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-serpent">
                      Jane Doe
                    </p>
                    <p className="text-xs text-dark-serpent/60">
                      Recruiter
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs"
                >
                  Remove
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full mt-2"
              >
                <Globe className="mr-2 h-4 w-4" />
                Invite Team Member
              </Button>
            </div>
          </SettingsSection>
        </div>
      </div>

      <SecurityModal isOpen={isSecurityModalOpen} onClose={() => setIsSecurityModalOpen(false)} />
    </Layout>
  );
};

export default Settings;