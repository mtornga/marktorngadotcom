import React from 'react';
import { cn } from '@/lib/utils';

interface HoverPhotoProps {
    src: string;
    alt: string;
    children: React.ReactNode;
    align?: 'center' | 'left' | 'right';
    className?: string;
}

export default function HoverPhoto({
    src,
    alt,
    children,
    align = 'center',
    className,
}: HoverPhotoProps) {
    return (
        <span
            className={cn("hover-photo", className)}
            aria-label={`Hover to view ${alt}`}
        >
            {children}
            <span className="hover-photo__icon"></span>
            <img className="hover-photo__card" src={src} alt={alt} />
        </span>
    );
}
