import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'accent';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
}

export default function Badge({
  children,
  variant = 'default',
  className,
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-white',
    primary: 'bg-neo-primary text-white border-neo-primary',
    secondary: 'bg-neo-secondary text-neo-text border-neo-text',
    accent: 'bg-neo-accent text-neo-text border-neo-text',
  };

  return (
    <span
      className={cn(
        'neo-badge',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
