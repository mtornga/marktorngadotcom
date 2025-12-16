import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  shadowOffset?: number;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className,
  hover = true,
  shadowOffset = 8,
  padding = 'md',
  ...props
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'neo-card',
        paddingClasses[padding],
        !hover && 'hover:shadow-none hover:transform-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
