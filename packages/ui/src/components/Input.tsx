import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  const base = 'border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500';
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <input className={`${base} ${className}`} {...props} />
    </label>
  );
};