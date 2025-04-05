
import React from 'react';

interface IconProps {
  className?: string;
}

export const NotificationIcon: React.FC<IconProps> = ({ className }) => (
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
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3.5 8 3 10H3c-.5-2 3-3 3-10Z" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
