/**
 * Canonical content width for marketing sections (matches --marketing-container).
 */
export default function Container({ children, className = '' }) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--marketing-container,72rem)] px-4 sm:px-6 lg:px-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
