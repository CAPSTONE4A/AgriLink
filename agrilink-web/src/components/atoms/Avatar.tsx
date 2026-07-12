import React from 'react';

export const Avatar: React.FC<{ name?: string; imageUrl?: string; className?: string }> = ({ name = 'User', imageUrl, className = '' }) => (
  <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-700">
      {imageUrl ? <img src={imageUrl} alt={name} className="h-10 w-10 rounded-full object-cover" /> : name.charAt(0)}
    </div>
    <div className="text-sm text-slate-700">{name}</div>
  </div>
);

export default Avatar;
