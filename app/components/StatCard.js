import Card, { CardBody } from './ui/Card';

export default function StatCard({
  icon,
  label,
  value,
  accent = 'from-slate-100 to-slate-200',
  iconBg = 'bg-slate-500',
  dotColor,
}) {
  const renderIcon = () => {
    if (typeof icon === 'function') {
      const IconComponent = icon;
      return <IconComponent size={22} className="text-white" />;
    }
    return icon;
  };

  const iconBgClass = iconBg || 'bg-slate-500';

  return (
    <Card className="overflow-hidden rounded-xl border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
            <p className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">{value}</p>
          </div>
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${iconBgClass}`}>
            {renderIcon()}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
