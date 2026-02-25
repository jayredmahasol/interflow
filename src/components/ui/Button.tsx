import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-serpent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-dark-serpent dark:focus-visible:ring-paper',
  {
    variants: {
      variant: {
        default: 'bg-castleton-green text-white hover:bg-castleton-green/90 dark:bg-paper dark:text-dark-serpent dark:hover:bg-paper/90',
        destructive: 'bg-red-500 text-white hover:bg-red-500/90 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900/90',
        outline: 'border border-dark-serpent/20 bg-transparent hover:bg-dark-serpent/5 text-dark-serpent dark:border-paper/20 dark:text-paper dark:hover:bg-paper/10',
        secondary: 'bg-saffron text-dark-serpent hover:bg-saffron/80 dark:bg-saffron/80 dark:text-dark-serpent',
        ghost: 'hover:bg-dark-serpent/5 text-dark-serpent dark:text-paper dark:hover:bg-paper/10',
        link: 'text-castleton-green underline-offset-4 hover:underline dark:text-paper',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
