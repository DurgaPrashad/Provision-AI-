
import { ResumeData } from './mockData';
import { databaseService } from '@/services/databaseService';

export const calculateAtsScore = (resume: Partial<ResumeData>): number => {
  // This would be replaced with an actual ATS scoring algorithm
  // For now, we're using a simple scoring system
  let score = 0;
  
  // Check for essential resume components
  if (resume.fullName) score += 10;
  if (resume.email) score += 5;
  if (resume.phone) score += 5;
  if (resume.location) score += 5;
  if (resume.summary && resume.summary.length > 50) score += 10;
  
  // Score based on skills
  if (resume.skills && resume.skills.length > 0) {
    score += Math.min(resume.skills.length * 2, 15);
  }
  
  // Score based on experience
  if (resume.experience && resume.experience.length > 0) {
    score += Math.min(resume.experience.length * 10, 30);
    
    // Add points for detailed descriptions
    resume.experience.forEach(exp => {
      if (exp.description && exp.description.length > 0) {
        score += Math.min(exp.description.length * 2, 10);
      }
    });
  }
  
  // Score based on education
  if (resume.education && resume.education.length > 0) {
    score += Math.min(resume.education.length * 5, 10);
  }
  
  // Score based on certifications
  if (resume.certifications && resume.certifications.length > 0) {
    score += Math.min(resume.certifications.length * 2, 10);
  }
  
  // Normalize score to a max of 100
  return Math.min(score, 100);
};

export const generateAiResumeContent = async (resumeData: Partial<ResumeData>): Promise<ResumeData> => {
  // Calculate ATS score
  const atsScore = calculateAtsScore(resumeData);
  
  // Create the final resume object
  const finalResume: ResumeData = {
    ...(resumeData as ResumeData),
    atsScore,
    id: resumeData.id || Math.random().toString(36).substring(2, 9),
    likes: 0,
    isLiked: false,
  };

  // Save to database in production environment
  try {
    await databaseService.saveResume(finalResume);
  } catch (error) {
    console.error("Error saving resume to database:", error);
    // Continue anyway so the user gets their resume
  }
  
  return finalResume;
};

export const getScoreColor = (score: number): string => {
  if (score >= 90) return 'text-green-500';
  if (score >= 75) return 'text-blue-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
};

export const getScoreRing = (score: number): string => {
  if (score >= 90) return 'ring-green-500';
  if (score >= 75) return 'ring-blue-500';
  if (score >= 60) return 'ring-yellow-500';
  return 'ring-red-500';
};

// New functions for the enhanced application

export const loadResumesFromDatabase = async (): Promise<ResumeData[]> => {
  try {
    // In production, this would call our MongoDB service
    return await databaseService.getResumes();
  } catch (error) {
    console.error("Error loading resumes:", error);
    return [];
  }
};

export const toggleResumeLike = async (resumeId: string): Promise<boolean> => {
  try {
    // In production, this would call our MongoDB service
    return await databaseService.toggleResumeLike(resumeId);
  } catch (error) {
    console.error("Error toggling resume like:", error);
    return false;
  }
};
