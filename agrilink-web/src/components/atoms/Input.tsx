import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string; className?: string }> = ({ label, className = '', ...rest }) => (
  <label className={`block ${className}`.trim()}>
    {label ? <div className="text-sm text-slate-500">{label}</div> : null}
    <input className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none" {...rest} />
  </label>
);

export default Input;
