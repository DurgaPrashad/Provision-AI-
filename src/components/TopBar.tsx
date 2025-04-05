import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import ProfileMenu from './ProfileMenu';
import { useIsMobile } from '@/hooks/use-mobile';

interface TopBarProps {
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const isMobile = useIsMobile();
  
  const categories = [
    'all', 
    'web app', 
    'mobile', 
    'cloud', 
    'data science', 
    'ui/ux', 
    'backend', 
    'frontend',
    'devops'
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setFilterOpen(false);
    onFilter(filter);
  };

  return (
    <div className="top-bar w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <ProfileMenu />
      </div>
      
      <div className="flex items-center flex-1 px-2 max-w-md ml-auto">
        <div className="relative flex-1">
          <Input
            className="pl-10 pr-4 py-2 rounded-full text-sm"
            placeholder={isMobile ? "Search..." : "Search resumes..."}
            value={searchQuery}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        
        <div className="relative ml-2">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setFilterOpen(!filterOpen)}
            aria-label="Filter"
          >
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          {filterOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20">
              {categories.map((filter) => (
                <button
                  key={filter}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    activeFilter === filter 
                      ? 'bg-ats-purple text-white' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
