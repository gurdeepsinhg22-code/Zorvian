'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { SIDEBAR_MENU } from '../config/sidebar.config';
import { filterMenu, adjustMenuPaths } from '../utils/sidebarFilter';
import SidebarItem from './SidebarItem';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';

export default function Sidebar({
  className = '',
  isMobileMenuOpen = false,
  onMobileMenuToggle = null,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, hasRole, hasPermission } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState({});

  useEffect(() => {
    if (pathname === '/dashboard/users' || pathname === '/dashboard/user-roles') {
      setExpandedMenus((prev) => ({ ...prev, user_management: true }));
    }
  }, [pathname]);

  const currentFullPath = useMemo(() => {
    const q = searchParams.toString();
    return pathname + (q ? `?${q}` : '');
  }, [pathname, searchParams]);

  const menu = useMemo(() => {
    if (!user) return [];
    const filtered = filterMenu(SIDEBAR_MENU, { user, hasRole, hasPermission, pathname });
    return adjustMenuPaths(filtered);
  }, [user, hasRole, hasPermission, pathname]);

  const handleNavigation = (path) => {
    if (onMobileMenuToggle) onMobileMenuToggle();
    router.push(path);
  };

  const toggleMenuExpansion = (menuKey) => {
    setExpandedMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile: floating menu button when sidebar is closed */}
      {!isMobileMenuOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-[45] flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--admin-sidebar)] text-white shadow-lg hover:bg-[var(--admin-sidebar)]/90 transition-colors"
          onClick={() => onMobileMenuToggle?.()}
          aria-label="Open menu"
        >
          <FiMenu size={22} />
        </button>
      )}

      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 md:hidden z-40 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => onMobileMenuToggle?.()}
        aria-hidden="true"
      />
      <aside
        className={`
        fixed inset-y-0 left-0 z-50
        w-72 flex flex-col
        bg-[var(--admin-sidebar)]
        transform transition-transform duration-300 ease-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
        md:min-h-screen
        ${className}
      `}
      >
        {/* Brand / Logo - h-16 matches Header height for smooth top border */}
        <div className="flex-shrink-0 h-16 px-4 flex items-center justify-center border-b border-white/[0.06]">
          <Link
            href="/dashboard"
            className="block w-full h-10 max-w-[180px]"
            onClick={() => onMobileMenuToggle?.()}
          >
            <span className="relative block w-full h-full">
              <Image
                src="/assets/images/med_logo.png"
                alt="Medhostech"
                fill
                sizes="(max-width: 768px) 288px, 272px"
                className="object-contain object-center brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,180,216,0.2)]"
              />
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 scrollbar-thin scrollbar-thin-sidebar">
          <ul className="space-y-1" role="list">
            {menu.map((item) => (
              <li key={item.key}>
                <SidebarItem
                  item={item}
                  pathname={pathname}
                  currentFullPath={currentFullPath}
                  onClick={handleNavigation}
                  isExpanded={expandedMenus[item.key]}
                  onToggleExpand={toggleMenuExpansion}
                />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
