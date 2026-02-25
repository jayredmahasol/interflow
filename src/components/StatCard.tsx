import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, trend, trendUp, className }: StatCardProps) => {
  return (
    <div className={cn("rounded-xl border border-dark-serpent/10 bg-white p-6 shadow-sm dark:bg-castleton-green/20 dark:border-paper/10 transition-colors", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-dark-serpent/60 dark:text-paper/60">{title}</p>
          <p className="mt-2 text-3xl font-bold text-dark-serpent dark:text-paper">{value}</p>
        </div>
        <div className="rounded-full bg-paper p-3 dark:bg-paper/10">
          <Icon className="h-6 w-6 text-castleton-green dark:text-paper" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={cn("font-medium", trendUp ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
            {trend}
          </span>
          <span className="ml-2 text-dark-serpent/50 dark:text-paper/40">from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
