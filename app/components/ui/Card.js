export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-lg border border-[#e5e7eb] bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ title, subtitle, right, className = '', titleClassName = '' }) {
  return (
    <div className={`flex items-center justify-between p-4 ${className}`}>
      <div>
        {title ? <h3 className={`text-sm font-semibold text-[#111827] ${titleClassName}`}>{title}</h3> : null}
        {subtitle ? <p className="text-xs text-[#6b7280]">{subtitle}</p> : null}
      </div>
      {right}
    </div>
  );
}
