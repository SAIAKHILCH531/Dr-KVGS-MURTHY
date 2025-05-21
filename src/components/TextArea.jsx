import React from 'react';

const TextArea = ({ 
  label,
  value,
  onChange,
  className,
  error,
  rows = 3,
  ...props
}) => {
  const baseClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]";
  const errorClasses = error ? "border-red-500" : "";
  const finalClasses = `${baseClasses} ${errorClasses} ${className || ''}`;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        className={finalClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TextArea;