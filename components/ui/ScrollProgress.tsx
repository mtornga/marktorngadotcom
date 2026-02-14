'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setPercent(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            role="progressbar"
            aria-valuenow={Math.round(percent)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="fixed top-0 left-0 w-full z-[9999] h-2 bg-transparent pointer-events-none"
        >
            <div
                className="h-full bg-neo-primary transition-all duration-100 ease-out"
                style={{ width: `${percent}%` }}
            />
        </div>
    );
}
