'use client';

import { FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

export function ErrorMessage({ message, type = 'error' }) {
  if (!message) return null;
  const getIcon = () => {
    switch (type) {
      case 'success': return <FiCheckCircle className="text-green-500" size={16} />;
      case 'warning': return <FiAlertCircle className="text-yellow-500" size={16} />;
      case 'info': return <FiInfo className="text-blue-500" size={16} />;
      default: return <FiAlertCircle className="text-red-500" size={16} />;
    }
  };
  const getStyles = () => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-red-50 border-red-200 text-red-800';
    }
  };
  return (
    <div className={`flex items-center gap-2 rounded-md border p-3 mb-3 text-sm ${getStyles()}`}>
      {getIcon()}
      <span className="flex-1">{message}</span>
    </div>
  );
}

export function SuccessMessage({ message, type = 'success' }) {
  return <ErrorMessage message={message} type={type} />;
}

export function LoadingSpinner({ size = 16, className = '' }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-[var(--admin-primary)] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
