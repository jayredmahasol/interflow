import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Bell, CheckCircle, User, FileText, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const initialNotifications = [
  {
    id: '1',
    title: 'New Application Received',
    description: 'Sarah Jenkins applied for Frontend Developer role.',
    time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: 'application',
    read: false,
  },
  {
    id: '2',
    title: 'Screening Completed',
    description: 'Michael Chen scored 92% on the Python Assessment.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    type: 'screening',
    read: false,
  },
  {
    id: '3',
    title: 'Interview Reminder',
    description: 'Interview with Jessica Lee starts in 1 hour.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    type: 'interview',
    read: true,
  },
  {
    id: '4',
    title: 'New Application Received',
    description: 'David Kim applied for Backend Developer role.',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    type: 'application',
    read: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'screening':
        return <FileText className="h-5 w-5 text-castleton-green" />;
      case 'interview':
        return <Clock className="h-5 w-5 text-saffron" />;
      default:
        return <Bell className="h-5 w-5 text-dark-serpent" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-serpent dark:text-paper">
            Notifications
          </h1>
          <p className="mt-2 text-dark-serpent/60 dark:text-paper/60">
            You have {unreadCount} unread notifications.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            onClick={markAllAsRead}
            className="dark:text-paper dark:border-paper/20 dark:hover:bg-paper/10"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-4 max-w-3xl">
        {notifications.length === 0 ? (
          <div className="rounded-xl border border-dark-serpent/10 bg-white p-12 text-center dark:bg-castleton-green/20 dark:border-paper/10">
            <Bell className="mx-auto h-12 w-12 text-dark-serpent/20 dark:text-paper/20" />
            <h3 className="mt-4 text-lg font-medium text-dark-serpent dark:text-paper">
              No notifications
            </h3>
            <p className="mt-2 text-dark-serpent/60 dark:text-paper/60">
              You're all caught up!
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "relative flex items-start space-x-4 rounded-xl border p-4 transition-colors",
                notification.read
                  ? "bg-white border-dark-serpent/10 dark:bg-castleton-green/10 dark:border-paper/5"
                  : "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
              )}
            >
              <div
                className={cn(
                  "rounded-full p-2",
                  notification.read
                    ? "bg-sea-salt dark:bg-paper/5"
                    : "bg-white dark:bg-paper/10"
                )}
              >
                {getIcon(notification.type)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-dark-serpent dark:text-paper">
                    {notification.title}
                  </h4>
                  <span className="text-xs text-dark-serpent/40 dark:text-paper/40">
                    {format(new Date(notification.time), 'h:mm a')}
                  </span>
                </div>

                <p className="mt-1 text-sm text-dark-serpent/70 dark:text-paper/70">
                  {notification.description}
                </p>

                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="mt-2 text-xs font-medium text-castleton-green hover:underline dark:text-green-400"
                  >
                    Mark as read
                  </button>
                )}
              </div>

              <button
                onClick={() => deleteNotification(notification.id)}
                className="absolute top-4 right-4 text-dark-serpent/20 hover:text-dark-serpent/60 dark:text-paper/20 dark:hover:text-paper/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Notifications;