import React from 'react';
import Layout from '@/components/Layout';

const Notifications = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-serpent">Notifications</h1>
        <p className="mt-2 text-dark-serpent/60">Manage your notification preferences.</p>
      </div>
      <div className="rounded-xl border border-dark-serpent/10 bg-white shadow-sm p-6">
        <p>Notification settings will be available here soon.</p>
      </div>
    </Layout>
  );
};

export default Notifications;
