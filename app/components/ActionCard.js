'use client';

import { useRouter } from 'next/navigation';
import Card, { CardBody } from './ui/Card';

export default function ActionCard({ icon, title, subtitle, borderColor = '#e5e7eb', iconBg = '#f3f4f6', path }) {
  const router = useRouter();

  const handleClick = () => {
    if (path) router.push(path);
  };

  return (
    <div
      className={`h-full w-[240px] rounded-lg bg-white shadow-sm ${path ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={handleClick}
      onKeyDown={(e) => path && e.key === 'Enter' && handleClick()}
      role={path ? 'button' : undefined}
      tabIndex={path ? 0 : undefined}
    >
      <div
        className="flex h-full flex-col items-center gap-3 rounded-md p-4"
        style={{ border: `2px dashed ${borderColor}` }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-md text-[#111827]" style={{ backgroundColor: iconBg }}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#111827]">{title}</p>
          <p className="text-xs text-[#6b7280] mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
