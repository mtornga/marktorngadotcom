import React from 'react';
import { cn } from '@/lib/utils';

interface FigureProps {
    src: string;
    alt: string;
    caption?: string;
    layout?: 'left' | 'right' | 'center' | 'pair' | 'small';
    secondSrc?: string;
    secondAlt?: string;
    className?: string;
}

export default function Figure({
    src,
    alt,
    caption,
    layout = 'center',
    secondSrc,
    secondAlt,
    className,
}: FigureProps) {
    // Map layout props to existing CSS classes for now to maintain identical styling
    // Ideally, we would move the CSS into Tailwind classes here over time
    const layoutClass = {
        left: 'figure-left',
        right: 'figure-right',
        center: 'figure-center mx-auto max-w-4xl my-8',
        pair: 'figure-pair',
        small: 'figure-small mx-auto max-w-2xl my-8',
    }[layout];

    const captionClass = "text-sm text-center mt-2 italic text-gray-600 dark:text-gray-400";

    if (layout === 'pair' && secondSrc) {
        return (
            <figure className={cn('figure-pair', className)}>
                <img src={src} alt={alt} className="rounded-lg shadow-neo-sm border-2 border-neo-border" />
                <img src={secondSrc} alt={secondAlt || alt} className="rounded-lg shadow-neo-sm border-2 border-neo-border" />
                {caption && <figcaption className={captionClass}>{caption}</figcaption>}
            </figure>
        );
    }

    return (
        <figure className={cn(layoutClass, className)}>
            <img
                src={src}
                alt={alt}
                className={cn(
                    "rounded-lg shadow-neo-sm border-2 border-neo-border w-full h-auto",
                    layout === 'small' ? 'max-w-full' : ''
                )}
            />
            {caption && <figcaption className={captionClass}>{caption}</figcaption>}
        </figure>
    );
}
