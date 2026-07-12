import React from 'react';

export const Card: React.FC<React.PropsWithChildren<{ title?: string; description?: string; className?: string }>> = ({ children, title, description, className = '' }) => (
  <div className={`rounded-3xl border border-slate-200 bg-white p-6 ${className}`.trim()}>
    {title ? <h2 className="text-lg font-semibold text-slate-900">{title}</h2> : null}
    {description ? <p className="text-sm text-slate-500">{description}</p> : null}
    <div className="mt-4">{children}</div>
  </div>
);

export default Card;
