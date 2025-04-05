
import React from 'react';
import { PremiumIcon } from './icons/PremiumIcon';
import { NotificationIcon } from './icons/NotificationIcon';
import { UserIcon } from './icons/UserIcon';
import { HomeIcon } from './icons/HomeIcon';
import { Globe, FileText, BookmarkCheck, Users, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NavigationBarProps {
  activeTab: 'premium' | 'notifications' | 'dashboard' | 'portzen' | 'home';
  onTabChange: (tab: 'premium' | 'notifications' | 'dashboard' | 'portzen' | 'home') => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeTab, onTabChange }) => {
  const isMobile = useIsMobile();
  
  const handleTabChange = (tab: 'premium' | 'notifications' | 'dashboard' | 'portzen' | 'home') => {
    // Only update if it's a different tab
    if (tab !== activeTab) {
      onTabChange(tab);
    }
  };
  
  return (
    <motion.div 
      className="bottom-nav w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 fixed bottom-0 left-0 right-0 flex justify-around items-center px-4 py-1 z-20"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <NavButton 
        label="Home"
        isActive={activeTab === 'home'}
        onClick={() => handleTabChange('home')}
        icon={<HomeIcon className="w-6 h-6" />}
        path="/"
      />
      
      <NavButton 
        label="Saved"
        isActive={activeTab === 'dashboard'}
        onClick={() => handleTabChange('dashboard')}
        icon={<BookmarkCheck className="w-6 h-6" />}
      />
      
      <NavButton 
        label="Portzen"
        isActive={activeTab === 'portzen'}
        onClick={() => handleTabChange('portzen')}
        icon={<Globe className="w-6 h-6" />}
      />
      
      <NavButton 
        label="Alerts"
        isActive={activeTab === 'notifications'}
        onClick={() => handleTabChange('notifications')}
        icon={<NotificationIcon className="w-6 h-6" />}
      />
      
      <NavButton 
        label="Premium"
        isActive={activeTab === 'premium'}
        onClick={() => handleTabChange('premium')}
        icon={<PremiumIcon className="w-6 h-6" />}
      />
    </motion.div>
  );
};

interface NavButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  path?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ label, isActive, onClick, icon, path }) => {
  const content = (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center h-full w-16 py-2 ${
        isActive ? 'text-ats-purple' : 'text-gray-500'
      }`}
    >
      <motion.div
        initial={false}
        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {icon}
      </motion.div>
      <span className="text-xs mt-1">{label}</span>
      {isActive && (
        <motion.div
          layoutId="navIndicator"
          className="w-4 h-1 bg-ats-purple rounded-full mt-1"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  );
  
  if (path) {
    return <Link to={path}>{content}</Link>;
  }
  
  return content;
};

export default NavigationBar;
