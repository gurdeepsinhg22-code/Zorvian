import { FiHome, FiShield, FiUsers, FiFileText, FiPackage } from 'react-icons/fi';

/**
 * Admin portal sidebar menu
 */
export const SIDEBAR_MENU = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <FiHome size={20} />,
    path: '/dashboard',
  },
  {
    key: 'products',
    label: 'Products',
    icon: <FiPackage size={20} />,
    path: '/dashboard/products',
  },
  {
    key: 'blogs',
    label: 'Blogs',
    icon: <FiFileText size={20} />,
    path: '/dashboard/blogs',
  },
  {
    key: 'roles',
    label: 'Roles',
    icon: <FiShield size={20} />,
    path: '/dashboard/roles',
  },
  {
    key: 'user_management',
    label: 'User Management',
    icon: <FiUsers size={20} />,
    expandable: true,
    children: [
      { key: 'users', label: 'Users', icon: null, path: '/dashboard/users' },
      { key: 'user_roles', label: 'User Roles', icon: null, path: '/dashboard/user-roles' },
    ],
  },
];
