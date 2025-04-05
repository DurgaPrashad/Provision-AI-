
import React from 'react';

interface IconProps {
  className?: string;
}

export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
    <circle cx="12" cy="9" r="3" />
    <path d="M17.83 15a3 3 0 0 0-2.83-2H9a3 3 0 0 0-2.83 2" />
  </svg>
);
