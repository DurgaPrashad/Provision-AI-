
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeForm from '@/components/ResumeForm';
import { ResumeData } from '@/utils/mockData';
import NavigationBar from '@/components/NavigationBar';
import TopBar from '@/components/TopBar';
import { databaseService } from '@/services/databaseService';
import { toast } from "@/hooks/use-sonner";
import { Button } from "@/components/ui/button";

const CreateResume = () => {
  const [activeTab, setActiveTab] = useState<'premium' | 'notifications' | 'dashboard' | 'portzen' | 'home'>('home');
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [savedResumesCount, setSavedResumesCount] = useState<number>(0);
  const [maxResumes, setMaxResumes] = useState<number>(2);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status
    const storedName = localStorage.getItem('userName');
    const storedProfile = localStorage.getItem('userProfile');
    const storedPremium = localStorage.getItem('isPremium');
    
    if (!storedName || !storedProfile) {
      navigate('/login');
      return;
    }
    
    setIsPremium(storedPremium === 'true');
    setMaxResumes(storedPremium === 'true' ? 5 : 2);
    
    // Get current resume count
    const loadResumes = async () => {
      try {
        const resumes = await databaseService.getResumes();
        setSavedResumesCount(resumes.length);
        
        // Update localStorage for other components
        localStorage.setItem('savedResumesCount', resumes.length.toString());
      } catch (error) {
        console.error("Error loading resumes:", error);
      }
    };
    
    loadResumes();
  }, [navigate]);

  const handleResumeCreated = async (resume: ResumeData) => {
    // Check if user has reached the limit
    if (savedResumesCount >= maxResumes) {
      if (!isPremium) {
        toast("You've reached your free resume limit. Upgrade to Premium for more!");
        return;
      } else {
        toast("You've reached the maximum number of resumes allowed.");
        return;
      }
    }
    
    try {
      // If this is the first resume, make it active
      if (savedResumesCount === 0) {
        resume.isActive = true;
      }
      
      // Save the resume
      await databaseService.saveResume(resume);
      
      // Update count
      setSavedResumesCount(prev => {
        const newCount = prev + 1;
        localStorage.setItem('savedResumesCount', newCount.toString());
        return newCount;
      });
      
      toast("Resume created successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.error("Error saving resume:", error);
      toast("Error creating resume. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <TopBar onSearch={() => {}} onFilter={() => {}} />
      
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Create New Resume</h1>
        
        {savedResumesCount >= maxResumes ? (
          <div className="text-center p-6 bg-gray-100 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-2">Resume Limit Reached</h2>
            <p className="mb-4">
              You've created {savedResumesCount} out of {maxResumes} allowed resumes.
            </p>
            {!isPremium && (
              <div className="mt-4">
                <p className="mb-2">Upgrade to Premium to create up to 5 resumes!</p>
                <Button 
                  onClick={() => navigate('/profile')}
                  className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700"
                >
                  Upgrade Now
                </Button>
              </div>
            )}
          </div>
        ) : (
          <ResumeForm onResumeCreated={handleResumeCreated} />
        )}
      </div>
      
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default CreateResume;
