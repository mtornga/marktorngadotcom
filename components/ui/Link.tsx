import { AnchorHTMLAttributes, ReactNode } from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  external?: boolean;
  unstyled?: boolean;
}

export default function Link({
  href,
  children,
  external = false,
  unstyled = false,
  className,
  ...props
}: LinkProps) {
  const classes = cn(
    !unstyled && 'neo-link',
    className
  );

  // External links
  if (external || href.startsWith('http')) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal Next.js links
  return (
    <NextLink href={href} className={classes} {...props}>
      {children}
    </NextLink>
  );
}
