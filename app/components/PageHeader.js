'use client';

export default function PageHeader({ title, subtitle, actionButton, className = '' }) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">{title}</h1>
        {subtitle && <p className="text-sm text-[#6b7280] mt-1">{subtitle}</p>}
      </div>
      {actionButton && <div className="flex items-center gap-3">{actionButton}</div>}
    </div>
  );
}
