import { ReactNode } from 'react';

/**
 * Neo-brutalist code/prompt block sized for projection.
 * Pass code as a JS string expression (not raw JSX text) so exact whitespace
 * and quote characters survive — several slides depend on showing literal strings.
 */
const SIZES = {
  // Default: short snippets, as large as the room can take.
  md: 'text-sm sm:text-base md:text-xl',
  // For blocks with long literal lines that must not wrap or scroll on a projector.
  sm: 'text-xs sm:text-sm md:text-lg',
} as const;

export default function CodeBlock({
  children,
  caption,
  tone = 'dark',
  size = 'md',
  wrap = false,
  className = '',
}: {
  children: ReactNode;
  caption?: string;
  tone?: 'dark' | 'light';
  size?: keyof typeof SIZES;
  /**
   * Wrap long lines with a hanging indent instead of scrolling them off the
   * edge. Preferred over shrinking type when a block has one long literal line
   * — nothing on a projector should require horizontal scrolling.
   */
  wrap?: boolean;
  className?: string;
}) {
  const toneClasses =
    tone === 'dark'
      ? 'bg-neo-text text-neo-bg'
      : 'bg-neo-surface text-neo-text';

  return (
    <div className={className}>
      {caption && (
        <div className="inline-block border-4 border-neo-text bg-neo-accent px-3 py-1 font-mono text-sm md:text-base font-bold -mb-1 relative z-10">
          {caption}
        </div>
      )}
      <pre
        className={`${toneClasses} border-4 border-neo-text shadow-neo p-5 md:p-8 font-mono ${SIZES[size]} leading-relaxed ${
          wrap ? 'whitespace-pre-wrap' : 'overflow-x-auto whitespace-pre'
        }`}
      >
        <code className={wrap ? 'block pl-8 -indent-8' : undefined}>
          {children}
        </code>
      </pre>
    </div>
  );
}

/** Highlighted span inside a CodeBlock — the part the audience should look at. */
export function Hi({ children }: { children: ReactNode }) {
  return (
    <span className="bg-neo-secondary text-neo-text px-2 font-bold">
      {children}
    </span>
  );
}

