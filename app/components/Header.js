'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiLogOut, FiSettings, FiChevronDown, FiMenu, FiX, FiExternalLink, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

function getBreadcrumbs(pathname) {
  const base = { label: 'Dashboard', href: '/dashboard' };
  if (pathname === '/dashboard') return [base];
  if (pathname === '/dashboard/users')
    return [base, { label: 'User Management', href: null }, { label: 'Users', href: '/dashboard/users' }];
  if (pathname === '/dashboard/user-roles')
    return [base, { label: 'User Management', href: null }, { label: 'User Roles', href: '/dashboard/user-roles' }];
  if (pathname === '/dashboard/roles') return [base, { label: 'Roles', href: '/dashboard/roles' }];
  if (pathname === '/dashboard/blogs') return [base, { label: 'Blogs', href: '/dashboard/blogs' }];
  if (pathname === '/dashboard/blogs/new')
    return [base, { label: 'Blogs', href: '/dashboard/blogs' }, { label: 'Add Blog', href: '/dashboard/blogs/new' }];
  if (pathname.startsWith('/dashboard/blogs/') && pathname !== '/dashboard/blogs')
    return [base, { label: 'Blogs', href: '/dashboard/blogs' }, { label: 'Edit', href: pathname }];
  if (pathname === '/dashboard/settings') return [base, { label: 'Settings', href: '/dashboard/settings' }];
  return [base];
}

export default function Header({
  isMobileMenuOpen = false,
  onMobileMenuToggle = null,
}) {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const breadcrumbs = getBreadcrumbs(pathname || '/dashboard');
  const showBreadcrumbs = breadcrumbs.length > 1;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const headerBase = 'sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm';
  const contentBase = 'flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6';

  if (loading) {
    return (
      <header className={headerBase}>
        <div className={contentBase}>
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onMobileMenuToggle}
              className="flex items-center justify-center w-10 h-10 md:hidden rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            <div className="flex-1 min-w-0" aria-hidden="true" />
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-200 animate-pulse" />
        </div>
      </header>
    );
  }

  return (
    <header className={headerBase}>
      <div className={contentBase}>
        <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
          <button
            onClick={onMobileMenuToggle}
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 md:hidden rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
          {showBreadcrumbs && (
          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1 flex-nowrap text-sm">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                {i > 0 && (
                  <FiChevronRight size={14} className="flex-shrink-0 text-slate-400" aria-hidden />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-slate-600 hover:text-[var(--admin-primary)] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-700 font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
          )}
        </div>

        <div className="relative flex items-center gap-2 flex-shrink-0" ref={userMenuRef}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-[var(--admin-primary)] hover:bg-slate-50 rounded-lg transition-colors"
          >
            <FiExternalLink size={16} />
            View site
          </a>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 rounded-xl px-2 py-2 sm:px-3 hover:bg-slate-50 transition-colors duration-200 group"
            type="button"
            aria-expanded={showUserMenu}
            aria-haspopup="true"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--admin-primary)] text-sm font-semibold text-white shadow-sm ring-2 ring-white group-hover:ring-slate-100 transition-shadow">
              {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="hidden sm:flex flex-col items-start text-left">
              <span className="text-sm font-medium text-slate-900 leading-tight">
                {user?.name || 'Admin'}
              </span>
              <span className="text-xs text-slate-500 capitalize leading-tight">
                {user?.role || 'Admin'}
              </span>
            </div>
            <FiChevronDown
              className={`shrink-0 text-slate-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
              size={18}
            />
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 top-full mt-2 w-64 min-w-[14rem] rounded-xl border border-slate-200/80 bg-white py-2 shadow-xl shadow-slate-200/50 z-50"
              role="menu"
            >
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-xs text-slate-500 truncate mt-0.5">{user?.email || ''}</p>
                <span className="inline-block mt-1.5 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  {user?.role || 'Admin'}
                </span>
              </div>
              <div className="py-1">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  role="menuitem"
                >
                  <FiSettings size={18} className="text-slate-400" />
                  Settings
                </Link>
                <button
                  onClick={() => { setShowUserMenu(false); logout(); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  role="menuitem"
                >
                  <FiLogOut size={18} className="text-red-400" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
