
// This service handles database operations
// In production, it would connect to MongoDB

import { ResumeData } from '@/utils/mockData';

// Simulate localStorage as a temporary database for the MVP
// This would be replaced with MongoDB in production
class DatabaseService {
  private storageKey = 'resumeScrollify_data';
  
  // Get all resumes
  async getResumes(): Promise<ResumeData[]> {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data).resumes || [] : [];
    } catch (error) {
      console.error('Error getting resumes:', error);
      return [];
    }
  }
  
  // Save a resume
  async saveResume(resume: ResumeData): Promise<ResumeData> {
    try {
      const data = localStorage.getItem(this.storageKey);
      const parsed = data ? JSON.parse(data) : { resumes: [] };
      
      // Generate ID if not present
      if (!resume.id) {
        resume.id = Date.now().toString();
      }
      
      // Add timestamp
      resume.createdAt = new Date().toISOString();
      
      // Add to start of array to show newest first
      parsed.resumes = [resume, ...(parsed.resumes || [])];
      
      localStorage.setItem(this.storageKey, JSON.stringify(parsed));
      return resume;
    } catch (error) {
      console.error('Error saving resume:', error);
      throw new Error('Failed to save resume');
    }
  }
  
  // Get a single resume by ID
  async getResumeById(id: string): Promise<ResumeData | null> {
    try {
      const resumes = await this.getResumes();
      return resumes.find(resume => resume.id === id) || null;
    } catch (error) {
      console.error('Error getting resume by ID:', error);
      return null;
    }
  }
  
  // Update resume
  async updateResume(resume: ResumeData): Promise<ResumeData> {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) throw new Error('No data found');
      
      const parsed = JSON.parse(data);
      const resumes = parsed.resumes || [];
      
      const index = resumes.findIndex((r: ResumeData) => r.id === resume.id);
      if (index === -1) throw new Error('Resume not found');
      
      // Update the resume
      resumes[index] = resume;
      
      parsed.resumes = resumes;
      localStorage.setItem(this.storageKey, JSON.stringify(parsed));
      
      return resume;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw new Error('Failed to update resume');
    }
  }
  
  // Update likes for a resume
  async toggleResumeLike(id: string): Promise<boolean> {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return false;
      
      const parsed = JSON.parse(data);
      const resumes = parsed.resumes || [];
      
      const resumeIndex = resumes.findIndex((r: ResumeData) => r.id === id);
      if (resumeIndex === -1) return false;
      
      // Toggle liked status and increment/decrement likes count
      const resume = resumes[resumeIndex];
      resume.isLiked = !resume.isLiked;
      resume.likes = resume.likes || 0;
      resume.likes += resume.isLiked ? 1 : -1;
      
      parsed.resumes = resumes;
      localStorage.setItem(this.storageKey, JSON.stringify(parsed));
      
      return true;
    } catch (error) {
      console.error('Error toggling resume like:', error);
      return false;
    }
  }
  
  // Clear all data (for testing)
  async clearAllData(): Promise<void> {
    localStorage.removeItem(this.storageKey);
  }
}

export const databaseService = new DatabaseService();
