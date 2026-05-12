'use client';

import { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  scroll = true,
  fullScreen = false,
  size = 'default',
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = { small: 'max-w-md', default: 'max-w-4xl', large: 'max-w-7xl' };
  const maxWidthClass = sizeClasses[size] || sizeClasses.default;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className={`relative flex flex-col bg-white shadow-xl w-full ${maxWidthClass} max-h-[90vh] rounded-lg ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4 flex-shrink-0">
          <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className={`flex-1 min-h-0 p-4 ${scroll ? 'overflow-y-auto scrollbar-thin' : 'overflow-hidden'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
