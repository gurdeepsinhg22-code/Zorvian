const DEFAULT_KEYWORDS = [
  'Marketing',
  'digital',
  'strategy',
  'optimization',
  'seo',
  'design',
];

function Row({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="marketing-marquee-track gap-10 pr-10 sm:gap-14 sm:pr-14">
      {doubled.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="shrink-0 text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 sm:text-base"
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export default function KeywordMarqueeSection({ keywords = DEFAULT_KEYWORDS }) {
  return (
    <section
      className="relative border-y border-slate-200/80 bg-slate-50 py-5 sm:py-6"
      aria-label="Service keywords"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent sm:w-24" />
      <div className="overflow-hidden">
        <Row items={keywords} />
      </div>
    </section>
  );
}
