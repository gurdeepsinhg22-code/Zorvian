'use client';

import { usePathname } from 'next/navigation';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

export default function SidebarItem({
  item,
  pathname,
  currentFullPath = '',
  onClick,
  isExpanded,
  onToggleExpand,
  level = 0,
}) {
  const getBasePath = (path) => (path ? path.split('?')[0] : '');
  const pathHasQuery = (path) => path && path.includes('?');
  const isActive = item.path && (
    pathHasQuery(item.path)
      ? currentFullPath === item.path
      : (pathname === item.path || (getBasePath(item.path) && pathname.startsWith(getBasePath(item.path)) && (item.path !== '/dashboard' || pathname === '/dashboard')))
  );
  const hasActiveChild = item.children?.some((child) =>
    child.path && (
      pathHasQuery(child.path)
        ? currentFullPath === child.path
        : (pathname === child.path || pathname.startsWith(getBasePath(child.path)))
    )
  );

  const handleClick = () => {
    if (item.expandable && onToggleExpand) {
      onToggleExpand(item.key);
    } else if (item.path && onClick) {
      onClick(item.path);
    }
  };

  const baseClasses = 'flex items-center gap-3 w-full text-left rounded-lg px-3 py-2.5 transition-all duration-200 ease-out';
  const activeClasses = 'bg-[var(--admin-primary)]/15 text-[var(--admin-primary)] border-l-[3px] border-l-[var(--admin-primary)]';
  const inactiveClasses = level > 0
    ? 'text-white/70 hover:text-white hover:bg-white/[0.06] border-l-[3px] border-l-transparent'
    : 'text-white/85 hover:text-white hover:bg-white/[0.06] border-l-[3px] border-l-transparent';

  if (item.expandable && item.children?.length) {
    const isOpen = isActive || hasActiveChild || isExpanded;
    return (
      <div>
        <button
          type="button"
          onClick={handleClick}
          className={`${baseClasses} ${isOpen ? activeClasses : inactiveClasses}`}
          aria-expanded={isExpanded}
          aria-haspopup="true"
        >
          <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.06] text-white/80">
            {item.icon}
          </span>
          <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
          <span className="shrink-0 text-white/50 transition-transform duration-200">
            {isExpanded ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ease-out ${
            isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-0.5" role="list">
            {item.children.map((child) => (
              <li key={child.key}>
                <SidebarItem
                  item={child}
                  pathname={pathname}
                  currentFullPath={currentFullPath}
                  onClick={onClick}
                  level={level + 1}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {item.icon ? (
        <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.06] text-white/80">
          {item.icon}
        </span>
      ) : level > 0 ? (
        <span className="shrink-0 w-8" aria-hidden />
      ) : null}
      <span className={`flex-1 truncate ${level > 0 ? 'text-sm' : 'text-sm font-medium'}`}>
        {item.label}
      </span>
    </button>
  );
}
