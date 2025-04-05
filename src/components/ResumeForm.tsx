import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { generateAiResumeContent } from '@/utils/resumeUtils';
import { analyzeResume } from '@/services/aiService';
import { ResumeData } from '@/utils/mockData';
import { toast } from "@/hooks/use-sonner";
import AiOptimizationPanel from './AiOptimizationPanel';

interface ResumeFormProps {
  onResumeCreated: (resume: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onResumeCreated }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  
  const [formData, setFormData] = useState<Partial<ResumeData>>({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    skills: [],
    languages: [],
    experience: [
      {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ['']
      }
    ],
    education: [
      {
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: ''
      }
    ],
    certifications: [],
  });

  useEffect(() => {
    const analyzeTimeout = setTimeout(async () => {
      if (
        formData.fullName && 
        formData.jobTitle && 
        ((formData.skills && formData.skills.length > 0) || 
         (formData.experience && formData.experience.length > 0 && formData.experience[0].title))
      ) {
        setIsAnalyzing(true);
        try {
          const results = await analyzeResume(formData);
          setAiSuggestions(results);
        } catch (error) {
          console.error("Error analyzing resume:", error);
        } finally {
          setIsAnalyzing(false);
        }
      }
    }, 2000);

    return () => clearTimeout(analyzeTimeout);
  }, [formData.fullName, formData.jobTitle, formData.skills, formData.experience, formData.summary]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      skills
    }));
  };

  const handleLanguagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const languages = e.target.value.split(',').map(lang => lang.trim()).filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      languages
    }));
  };

  const handleCertificationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const certifications = e.target.value.split(',').map(cert => cert.trim()).filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      certifications
    }));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newExperience = [...(prev.experience || [])];
      newExperience[index] = {
        ...newExperience[index],
        [field]: value
      };
      return {
        ...prev,
        experience: newExperience
      };
    });
  };

  const handleExperienceDescriptionChange = (expIndex: number, descIndex: number, value: string) => {
    setFormData((prev) => {
      const newExperience = [...(prev.experience || [])];
      const newDescription = [...(newExperience[expIndex].description || [])];
      newDescription[descIndex] = value;
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        description: newDescription
      };
      return {
        ...prev,
        experience: newExperience
      };
    });
  };

  const addExperienceDescription = (expIndex: number) => {
    setFormData((prev) => {
      const newExperience = [...(prev.experience || [])];
      const newDescription = [...(newExperience[expIndex].description || []), ''];
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        description: newDescription
      };
      return {
        ...prev,
        experience: newExperience
      };
    });
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newEducation = [...(prev.education || [])];
      newEducation[index] = {
        ...newEducation[index],
        [field]: value
      };
      return {
        ...prev,
        education: newEducation
      };
    });
  };

  const nextStep = () => {
    if (step === 1 && (!formData.fullName || !formData.jobTitle || !formData.email)) {
      toast("Please fill in all required fields");
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // In a real app, this would send data to a backend API
      // For now, we'll just simulate the AI generation
      setTimeout(async () => {
        const resume = await generateAiResumeContent(formData);
        onResumeCreated(resume);
        setIsGenerating(false);
        toast("Resume created successfully!");
        // Reset form
        setFormData({
          fullName: '',
          jobTitle: '',
          email: '',
          phone: '',
          location: '',
          summary: '',
          skills: [],
          languages: [],
          experience: [
            {
              title: '',
              company: '',
              location: '',
              startDate: '',
              endDate: '',
              description: ['']
            }
          ],
          education: [
            {
              degree: '',
              institution: '',
              location: '',
              startDate: '',
              endDate: ''
            }
          ],
          certifications: [],
        });
        setStep(1);
      }, 2000);
    } catch (error) {
      console.error("Error generating resume:", error);
      toast("Error creating resume. Please try again.");
      setIsGenerating(false);
    }
  };

  const handleApplySuggestion = (type: 'summary' | 'keywords', data: any) => {
    if (type === 'summary') {
      setFormData(prev => ({
        ...prev,
        summary: data
      }));
    } else if (type === 'keywords') {
      setFormData(prev => {
        const currentSkills = prev.skills || [];
        const newSkills = [...currentSkills];
        
        // Add suggested keywords that don't already exist in skills
        data.forEach((keyword: string) => {
          if (!newSkills.includes(keyword)) {
            newSkills.push(keyword);
          }
        });
        
        return {
          ...prev,
          skills: newSkills
        };
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-ats-dark mb-2">Create Your ATS Resume</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {step === 1 && "Start by entering your basic information"}
          {step === 2 && "Tell us about your skills and experience"}
          {step === 3 && "Finally, add your education and certifications"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                placeholder="Senior Developer"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john.doe@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="San Francisco, CA"
              />
            </div>
            
            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={4}
                placeholder="Brief overview of your professional background and strengths"
              />
            </div>
          </div>
        )}
        
        {/* Step 2: Skills and Experience */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Textarea
                id="skills"
                name="skills"
                value={formData.skills?.join(', ')}
                onChange={handleSkillsChange}
                rows={3}
                placeholder="React, TypeScript, UI/UX Design, Project Management"
              />
            </div>
            
            <div>
              <Label htmlFor="languages">Programming Languages (comma separated)</Label>
              <Textarea
                id="languages"
                name="languages"
                value={formData.languages?.join(', ')}
                onChange={handleLanguagesChange}
                rows={2}
                placeholder="JavaScript, Python, Java, Swift"
              />
            </div>
            
            <div className="space-y-4">
              <Label>Work Experience</Label>
              {formData.experience?.map((exp, index) => (
                <div key={index} className="space-y-3 p-3 border border-gray-200 rounded-md">
                  <div>
                    <Label htmlFor={`exp-title-${index}`}>Job Title</Label>
                    <Input
                      id={`exp-title-${index}`}
                      value={exp.title}
                      onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                      placeholder="Senior Developer"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`exp-company-${index}`}>Company</Label>
                    <Input
                      id={`exp-company-${index}`}
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      placeholder="Acme Inc."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`exp-location-${index}`}>Location</Label>
                    <Input
                      id={`exp-location-${index}`}
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                      placeholder="New York, NY"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`exp-start-${index}`}>Start Date</Label>
                      <Input
                        id={`exp-start-${index}`}
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        placeholder="Jan 2020"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                      <Input
                        id={`exp-end-${index}`}
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Description (Achievements/Responsibilities)</Label>
                    {exp.description?.map((desc, descIndex) => (
                      <div key={descIndex} className="mb-2">
                        <Input
                          value={desc}
                          onChange={(e) => handleExperienceDescriptionChange(index, descIndex, e.target.value)}
                          placeholder={`Achievement or responsibility ${descIndex + 1}`}
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addExperienceDescription(index)}
                      className="mt-1"
                    >
                      + Add Another Achievement
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    experience: [
                      ...(prev.experience || []),
                      {
                        title: '',
                        company: '',
                        location: '',
                        startDate: '',
                        endDate: '',
                        description: ['']
                      }
                    ]
                  }));
                }}
              >
                + Add Another Experience
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Education and Certifications */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-4">
              <Label>Education</Label>
              {formData.education?.map((edu, index) => (
                <div key={index} className="space-y-3 p-3 border border-gray-200 rounded-md">
                  <div>
                    <Label htmlFor={`edu-degree-${index}`}>Degree/Program</Label>
                    <Input
                      id={`edu-degree-${index}`}
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`edu-institution-${index}`}>Institution</Label>
                    <Input
                      id={`edu-institution-${index}`}
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      placeholder="University of Technology"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`edu-location-${index}`}>Location</Label>
                    <Input
                      id={`edu-location-${index}`}
                      value={edu.location}
                      onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                      placeholder="Boston, MA"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`edu-start-${index}`}>Start Date</Label>
                      <Input
                        id={`edu-start-${index}`}
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                        placeholder="Sep 2016"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`edu-end-${index}`}>End Date</Label>
                      <Input
                        id={`edu-end-${index}`}
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                        placeholder="May 2020"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    education: [
                      ...(prev.education || []),
                      {
                        degree: '',
                        institution: '',
                        location: '',
                        startDate: '',
                        endDate: ''
                      }
                    ]
                  }));
                }}
              >
                + Add Another Education
              </Button>
            </div>
            
            <div>
              <Label htmlFor="certifications">Certifications (comma separated)</Label>
              <Textarea
                id="certifications"
                name="certifications"
                value={formData.certifications?.join(', ')}
                onChange={handleCertificationsChange}
                rows={3}
                placeholder="AWS Certified Developer, Google Professional Cloud Architect"
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button type="button" onClick={prevStep} variant="outline">
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < 3 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isGenerating} className="bg-gradient-to-r from-ats-purple to-ats-pink text-white">
              {isGenerating ? "Generating Resume..." : "Generate ATS Resume"}
            </Button>
          )}
        </div>
      </form>

      {/* AI Optimization Panel */}
      {aiSuggestions && (
        <AiOptimizationPanel
          keywordSuggestions={aiSuggestions.keywordSuggestions}
          formatSuggestions={aiSuggestions.formatSuggestions}
          improvementTips={aiSuggestions.improvementTips}
          enhancedSummary={aiSuggestions.enhancedSummary}
          atsScore={aiSuggestions.atsScore}
          onApplySuggestion={handleApplySuggestion}
          isGenerating={isAnalyzing}
        />
      )}
    </div>
  );
};

export default ResumeForm;
