import React from 'react';

export const InlineSpinner = () => <div className="inline-block animate-spin h-4 w-4 border-2 border-slate-400 rounded-full border-t-transparent" />;
export const FullPageSpinner = () => (
  <div className="flex h-full w-full items-center justify-center">
    <InlineSpinner />
  </div>
);

export default InlineSpinner;
