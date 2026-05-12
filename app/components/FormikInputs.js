'use client';

import React from 'react';
import { Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { FiAlertCircle } from 'react-icons/fi';

export function FormikInput({ name, type = 'text', placeholder, icon, label, required = false, disabled = false, ...props }) {
  const IconComponent = icon;
  return (
    <div className="relative">
      {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-[var(--admin-primary)] focus-within:border-[var(--admin-primary)]">
        {IconComponent && <div className="absolute left-0 pl-3 flex items-center pointer-events-none">{IconComponent}</div>}
        <Field
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border-0 rounded-md focus:outline-none focus:ring-0 sm:text-sm`}
          {...props}
        />
      </div>
      <FormikErrorMessage name={name}>
        {(msg) => (
          <div className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <FiAlertCircle size={12} />
            <span>{msg}</span>
          </div>
        )}
      </FormikErrorMessage>
    </div>
  );
}

export function FormikTextarea({ name, placeholder, label, rows = 3, required = false, disabled = false, ...props }) {
  return (
    <div className="relative">
      {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <Field
        as="textarea"
        name={name}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)] sm:text-sm"
        {...props}
      />
      <FormikErrorMessage name={name}>
        {(msg) => (
          <div className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <FiAlertCircle size={12} />
            <span>{msg}</span>
          </div>
        )}
      </FormikErrorMessage>
    </div>
  );
}
