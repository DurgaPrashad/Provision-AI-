
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-sonner";
import { ResumeData } from '@/utils/mockData';
import { databaseService } from '@/services/databaseService';

interface ResumeToggleProps {
  resume: ResumeData;
  isActive: boolean;
  onToggle: (id: string, isActive: boolean) => void;
}

const ResumeToggle: React.FC<ResumeToggleProps> = ({ resume, isActive, onToggle }) => {
  const handleToggle = async (checked: boolean) => {
    try {
      // Get all resumes
      const allResumes = await databaseService.getResumes();
      
      // If turning this resume on, we need to turn off all others
      if (checked) {
        // First turn off all resumes
        for (const res of allResumes) {
          if (res.id !== resume.id && res.isActive) {
            res.isActive = false;
            await databaseService.updateResume(res);
          }
        }
        
        // Then turn on this one
        resume.isActive = true;
        await databaseService.updateResume(resume);
        toast("Resume activated! It will now be visible on your home page.");
      } else {
        // Just turn off this one
        resume.isActive = false;
        await databaseService.updateResume(resume);
        toast("Resume deactivated!");
      }
      
      // Notify parent component
      onToggle(resume.id, checked);
    } catch (error) {
      console.error("Error toggling resume:", error);
      toast("Error updating resume status. Please try again.");
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Switch 
        checked={isActive} 
        onCheckedChange={handleToggle}
        className={`${isActive ? 'bg-green-500' : 'bg-gray-300'}`}
      />
      <span className="text-sm font-medium">
        {isActive ? 'Active' : 'Inactive'}
      </span>
    </div>
  );
};

export default ResumeToggle;
