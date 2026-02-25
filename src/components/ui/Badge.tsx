import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-dark-serpent focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-castleton-green text-white hover:bg-castleton-green/80',
        secondary: 'border-transparent bg-saffron text-dark-serpent hover:bg-saffron/80',
        destructive: 'border-transparent bg-red-500 text-white hover:bg-red-500/80',
        outline: 'text-dark-serpent',
        warning: 'border-transparent bg-earth-yellow text-dark-serpent hover:bg-earth-yellow/80',
        neutral: 'border-transparent bg-sea-salt text-dark-serpent hover:bg-sea-salt/80 border-dark-serpent/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string;
  children?: React.ReactNode;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
