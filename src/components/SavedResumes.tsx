
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeCard from './ResumeCard';
import { ResumeData, mockResumes } from '../utils/mockData';

interface SavedResumesProps {
  resumes: ResumeData[];
}

const SavedResumes: React.FC<SavedResumesProps> = ({ resumes }) => {
  const [activeTab, setActiveTab] = useState("liked");
  
  // Filter resumes that are liked
  const likedResumes = resumes.filter(resume => resume.isLiked);
  
  // For demo purposes, let's just use a subset of resumes as "saved"
  const savedResumes = resumes.slice(0, 2);
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <Tabs defaultValue="liked" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="liked" className="flex-1">Liked Resumes</TabsTrigger>
          <TabsTrigger value="saved" className="flex-1">Saved Designs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="liked" className="space-y-4">
          {likedResumes.length > 0 ? (
            likedResumes.map((resume) => (
              <div key={resume.id} className="mb-4">
                <ResumeCard resume={resume} hideAtsScore={false} />
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">You haven't liked any resumes yet.</p>
              <p className="text-sm text-gray-400 mt-2">
                Like resumes to save them for future reference
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-ats-purple rounded-lg p-4 text-center">
              <h3 className="font-bold">Modern Template</h3>
              <p className="text-xs text-gray-500 mt-1">Free</p>
              <div className="mt-3 bg-gray-100 h-32 rounded flex items-center justify-center">
                <span className="text-sm text-gray-400">Preview</span>
              </div>
            </div>
            
            <div className="border-2 border-ats-purple rounded-lg p-4 text-center">
              <h3 className="font-bold">Classic Template</h3>
              <p className="text-xs text-gray-500 mt-1">Free</p>
              <div className="mt-3 bg-gray-100 h-32 rounded flex items-center justify-center">
                <span className="text-sm text-gray-400">Preview</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="font-bold mb-3">Premium Templates</h3>
            <div className="grid grid-cols-2 gap-4 opacity-60">
              <div className="border-2 border-gray-300 rounded-lg p-4 text-center relative">
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                  <span className="text-white font-bold">Premium</span>
                </div>
                <h3 className="font-bold">Executive Template</h3>
                <p className="text-xs text-gray-500 mt-1">Premium</p>
                <div className="mt-3 bg-gray-100 h-32 rounded"></div>
              </div>
              
              <div className="border-2 border-gray-300 rounded-lg p-4 text-center relative">
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                  <span className="text-white font-bold">Premium</span>
                </div>
                <h3 className="font-bold">Creative Template</h3>
                <p className="text-xs text-gray-500 mt-1">Premium</p>
                <div className="mt-3 bg-gray-100 h-32 rounded"></div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedResumes;
