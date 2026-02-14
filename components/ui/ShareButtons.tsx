'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
    title: string;
    url?: string; // Optional, defaults to current window location
    isReadable?: boolean;
}

export default function ShareButtons({ title, url, isReadable = false }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const getUrl = () => {
        if (typeof window !== 'undefined') {
            return url || window.location.href;
        }
        return '';
    };

    const handleCopy = async () => {
        const link = getUrl();
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const shareLinks = [
        {
            name: 'Email',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ),
            href: (link: string) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(link)}`,
        },
        {
            name: 'X',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zl-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            href: (link: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(link)}`,
        },
        {
            name: 'Reddit',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
            ),
            href: (link: string) => `https://www.reddit.com/submit?url=${encodeURIComponent(link)}&title=${encodeURIComponent(title)}`,
        },
    ];

    return (
        <div className={cn("flex flex-wrap gap-4 items-center mt-12 py-8 border-t", isReadable ? "border-zinc-200" : "border-neo-text border-t-4")}>
            <span className={cn("font-heading font-bold uppercase tracking-wider text-sm mr-2", isReadable ? "text-zinc-500" : "text-neo-text")}>
                Share this post:
            </span>

            {/* Copy Link Button */}
            <button
                onClick={handleCopy}
                className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all",
                    isReadable
                        ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-md"
                        : "bg-white border-2 border-neo-text shadow-neo-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                )}
                aria-label="Copy link to clipboard"
            >
                {copied ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Copied!
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                        Copy Link
                    </>
                )}
            </button>

            {/* Social Buttons */}
            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={getUrl() ? link.href(getUrl()) : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all",
                        isReadable
                            ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-md"
                            : "bg-white border-2 border-neo-text shadow-neo-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                    )}
                    onClick={(e) => {
                        if (!getUrl()) e.preventDefault();
                    }}
                >
                    {link.icon}
                    {link.name}
                </a>
            ))}
        </div>
    );
}
