import React from 'react';

interface AvatarProps {
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'idcard';
  className?: string;
}

const COLOR_PAIRS = [
  { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200' },
  { bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-200' },
  { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
  { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-200' },
  { bg: 'bg-slate-200', text: 'text-slate-800', border: 'border-slate-300' },
];

export const Avatar: React.FC<AvatarProps> = ({
  firstName,
  lastName,
  size = 'md',
  className = '',
}) => {
  const initials = `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase() || 'ST';

  // Deterministic color assignment based on name
  const charCodeSum = (firstName + lastName)
    .split('')
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const color = COLOR_PAIRS[charCodeSum % COLOR_PAIRS.length];

  let sizeClasses = 'w-9 h-9 text-xs rounded-full';
  if (size === 'sm') sizeClasses = 'w-7 h-7 text-[10px] rounded-full';
  if (size === 'md') sizeClasses = 'w-9 h-9 text-xs rounded-full';
  if (size === 'lg') sizeClasses = 'w-12 h-12 text-sm rounded-xl font-bold';
  if (size === 'xl') sizeClasses = 'w-16 h-16 text-xl rounded-xl font-bold';
  if (size === 'idcard') sizeClasses = 'w-24 h-28 text-2xl rounded-xl font-black';

  return (
    <div
      className={`shrink-0 flex items-center justify-center font-bold tracking-tight select-none border shadow-xs ${color.bg} ${color.text} ${color.border} ${sizeClasses} ${className}`}
      title={`${firstName} ${lastName}`}
      aria-label={`${firstName} ${lastName}`}
    >
      <span>{initials}</span>
    </div>
  );
};
