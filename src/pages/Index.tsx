
import React, { useState, useEffect } from 'react';
import { ResumeData, mockResumes } from '../utils/mockData';
import { loadResumesFromDatabase } from '../utils/resumeUtils';
import ResumeScroll from '../components/ResumeScroll';
import NavigationBar from '../components/NavigationBar';
import TopBar from '../components/TopBar';
import Notifications from '../components/Notifications';
import SavedResumes from '../components/SavedResumes';
import { toast } from "@/hooks/use-sonner";
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import AIChat from '../components/AIChat';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'premium' | 'notifications' | 'dashboard' | 'portzen' | 'home'>('home');
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check login status
    const userName = localStorage.getItem('userName');
    const userProfile = localStorage.getItem('userProfile');
    
    if (userName && userProfile) {
      setIsLoggedIn(true);
    } else {
      navigate('/login');
      return;
    }
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        const loadedResumes = await loadResumesFromDatabase();
        
        if (loadedResumes.length > 0) {
          // Check if any resume is already marked as active
          const hasActiveResume = loadedResumes.some(resume => resume.isActive === true);
          
          // If no resume is active, mark the first one as active
          if (!hasActiveResume && loadedResumes.length > 0) {
            loadedResumes[0].isActive = true;
          }
          setResumes(loadedResumes);
        } else {
          // Mark the first mock resume as active if using mock data
          const updatedMockResumes = [...mockResumes];
          if (updatedMockResumes.length > 0) {
            updatedMockResumes[0].isActive = true;
          }
          setResumes(updatedMockResumes);
        }
      } catch (error) {
        console.error("Error loading resumes:", error);
        // Mark the first mock resume as active
        const updatedMockResumes = [...mockResumes];
        if (updatedMockResumes.length > 0) {
          updatedMockResumes[0].isActive = true;
        }
        setResumes(updatedMockResumes);
        toast("Error loading resumes. Using sample data instead.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [navigate]);

  const handleClosePortzen = () => {
    setActiveTab('home');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleShowResumes = (keyword: string) => {
    setActiveFilter(keyword);
    setActiveTab('home');
  };

  // Filter resumes based on search query and active filter
  const filteredResumes = resumes.filter(resume => {
    // Search filtering
    const matchesSearch = searchQuery === '' || 
      resume.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resume.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resume.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Only show active resumes on home page unless there's a search or filter
    let matchesHomeFilter = true;
    if (activeTab === 'home' && searchQuery === '' && activeFilter === 'all') {
      matchesHomeFilter = resume.isActive === true;
    }
    
    // Filter type filtering
    let matchesFilter = true;
    if (activeFilter === 'liked') {
      matchesFilter = resume.isLiked === true;
    } else if (activeFilter !== 'all') {
      // Match resumes with skills or job titles containing the filter keyword
      matchesFilter = 
        resume.skills.some(skill => skill.toLowerCase().includes(activeFilter.toLowerCase())) ||
        resume.jobTitle.toLowerCase().includes(activeFilter.toLowerCase());
    }
    
    return matchesSearch && matchesFilter && matchesHomeFilter;
  });

  if (!isLoggedIn) {
    return null; // This will redirect to login via the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {activeTab !== 'portzen' && (
        <TopBar onSearch={handleSearch} onFilter={handleFilter} />
      )}
      
      <div className="flex-1 pb-16">
        {activeTab === 'home' && (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ats-purple"></div>
              </div>
            ) : (
              <ResumeScroll resumes={filteredResumes} />
            )}
          </>
        )}
        
        {activeTab === 'dashboard' && (
          <SavedResumes resumes={resumes} />
        )}
        
        {activeTab === 'notifications' && (
          <Notifications />
        )}
        
        {activeTab === 'premium' && (
          <div className="p-4 max-w-md mx-auto">
            <div className="bg-gradient-to-r from-ats-purple to-ats-pink text-white rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
              <p className="mb-6">Get exclusive access to premium features:</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Store up to 5 resumes (instead of 2)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Exclusive gradient designs for resumes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Advanced ATS optimization with industry-specific keywords</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Priority visibility to recruiters in your field</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Detailed analytics on your resume performance</span>
                </li>
              </ul>
              
              <button 
                className="w-full py-3 bg-white text-ats-purple font-bold rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => {
                  localStorage.setItem('isPremium', 'true');
                  toast("Welcome to Premium! Refresh to see your new features.");
                  setTimeout(() => window.location.reload(), 2000);
                }}
              >
                Upgrade Now - $9.99/month
              </button>
            </div>
          </div>
        )}

        {activeTab === 'portzen' && (
          <div className="relative w-full h-screen pb-16">
            <button 
              onClick={handleClosePortzen}
              className="absolute top-2 left-2 z-50 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg"
              aria-label="Close Portzen"
            >
              <X className="w-6 h-6 text-ats-purple" />
            </button>
            <iframe 
              src="https://portzen.vercel.app/" 
              title="Portzen Website"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-forms"
            />
          </div>
        )}
      </div>
      
      {!showAIChat && (
        <Button
          onClick={() => setShowAIChat(true)}
          className="fixed bottom-20 right-4 z-40 rounded-full w-12 h-12 p-0 shadow-lg bg-gradient-to-r from-ats-purple to-ats-pink"
        >
          <span className="text-xl">AI</span>
        </Button>
      )}
      
      {showAIChat && (
        <AIChat 
          onClose={() => setShowAIChat(false)} 
          onShowResumes={handleShowResumes}
        />
      )}
      
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
