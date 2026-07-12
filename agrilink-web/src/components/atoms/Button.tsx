import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'outline' | 'solid';
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'solid', ...rest }) => {
  const base = 'inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold';
  const variantClass = variant === 'outline' ? 'border border-slate-200 bg-white text-slate-700' : 'bg-green-700 text-white';
  return (
    <button className={`${base} ${variantClass} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
};

export default Button;
