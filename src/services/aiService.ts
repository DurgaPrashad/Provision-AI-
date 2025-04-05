
// This service handles AI-driven resume optimization and feedback

interface AiOptimizationResponse {
  enhancedSummary?: string;
  keywordSuggestions?: string[];
  formatSuggestions?: string[];
  atsScore: number;
  improvementTips: string[];
}

/**
 * Analyzes a resume and provides optimization suggestions
 * In a production app, this would call an AI API (OpenAI, etc.)
 */
export const analyzeResume = async (resumeData: any): Promise<AiOptimizationResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // This is a placeholder implementation that would be replaced with actual AI API calls
  const suggestedKeywords = getSuggestedKeywords(resumeData.jobTitle || '');
  const missingKeywords = suggestedKeywords.filter(
    keyword => !resumeData.skills?.includes(keyword) && 
               !resumeData.summary?.toLowerCase().includes(keyword.toLowerCase())
  );
  
  // Generate improvement tips based on the resume content
  const improvementTips = generateImprovementTips(resumeData, missingKeywords);
  
  // Generate enhanced summary if the current one is short or missing
  let enhancedSummary;
  if (!resumeData.summary || resumeData.summary.length < 100) {
    enhancedSummary = generateEnhancedSummary(resumeData);
  }
  
  return {
    enhancedSummary,
    keywordSuggestions: missingKeywords,
    formatSuggestions: getFormatSuggestions(resumeData),
    atsScore: calculatePreliminaryAtsScore(resumeData),
    improvementTips
  };
};

/**
 * Suggests relevant keywords based on job title
 */
const getSuggestedKeywords = (jobTitle: string): string[] => {
  const jobTitleLower = jobTitle.toLowerCase();
  
  // Common tech keywords that apply to many roles
  const commonKeywords = [
    'team management', 'problem-solving', 'communication', 
    'collaboration', 'leadership', 'project management'
  ];
  
  // Role-specific keywords
  if (jobTitleLower.includes('developer') || jobTitleLower.includes('engineer')) {
    return [
      ...commonKeywords,
      'API integration', 'continuous integration', 'agile methodology',
      'unit testing', 'code review', 'debugging', 'software development lifecycle',
      'version control', 'CI/CD', 'cloud services'
    ];
  } else if (jobTitleLower.includes('designer')) {
    return [
      ...commonKeywords,
      'user experience', 'wireframing', 'prototyping', 'user research',
      'visual design', 'design systems', 'accessibility', 'user testing'
    ];
  } else if (jobTitleLower.includes('product')) {
    return [
      ...commonKeywords,
      'product strategy', 'user stories', 'market research', 'product roadmap',
      'stakeholder management', 'feature prioritization', 'A/B testing'
    ];
  } else if (jobTitleLower.includes('manager')) {
    return [
      ...commonKeywords,
      'team leadership', 'performance evaluation', 'strategic planning',
      'resource allocation', 'budget management', 'stakeholder communication'
    ];
  } else {
    return commonKeywords;
  }
};

/**
 * Generates formatting suggestions based on resume structure
 */
const getFormatSuggestions = (resumeData: any): string[] => {
  const suggestions: string[] = [];
  
  if (!resumeData.summary || resumeData.summary.length < 50) {
    suggestions.push('Add a more detailed professional summary (100-150 words)');
  }
  
  if (!resumeData.experience || resumeData.experience.length === 0) {
    suggestions.push('Add work experience with detailed accomplishments');
  } else {
    // Check if experience entries have enough descriptions
    const experienceWithFewBullets = resumeData.experience.filter(
      (exp: any) => !exp.description || exp.description.length < 3
    );
    
    if (experienceWithFewBullets.length > 0) {
      suggestions.push('Add more bullet points (3-5) to your work experience descriptions');
    }
    
    // Check for quantifiable achievements
    const hasQuantifiableResults = resumeData.experience.some((exp: any) => {
      return exp.description?.some((desc: string) => 
        /\d+%|\d+ percent|increased|decreased|improved|reduced|generated|\$\d+|\d+ million|\d+ thousand/i.test(desc)
      );
    });
    
    if (!hasQuantifiableResults) {
      suggestions.push('Add quantifiable achievements (%, $, metrics) to demonstrate impact');
    }
  }
  
  if (!resumeData.skills || resumeData.skills.length < 5) {
    suggestions.push('List at least 8-10 relevant skills');
  }
  
  return suggestions;
};

/**
 * Generates resume improvement tips based on content analysis
 */
const generateImprovementTips = (resumeData: any, missingKeywords: string[]): string[] => {
  const tips: string[] = [];
  
  if (missingKeywords.length > 0) {
    tips.push(`Consider adding these keywords: ${missingKeywords.slice(0, 3).join(', ')}`);
  }
  
  // Check for education section
  if (!resumeData.education || resumeData.education.length === 0) {
    tips.push('Add your educational background for a complete profile');
  }
  
  // Check summary length
  if (!resumeData.summary || resumeData.summary.length < 70) {
    tips.push('Expand your professional summary to highlight your expertise');
  }
  
  // Experience description quality
  if (resumeData.experience && resumeData.experience.length > 0) {
    const experienceWithWeakDescriptions = resumeData.experience.filter((exp: any) => {
      return exp.description?.some((desc: string) => 
        desc.length < 40 || /^responsible for|^worked on|^helped with/i.test(desc)
      );
    });
    
    if (experienceWithWeakDescriptions.length > 0) {
      tips.push('Use strong action verbs and focus on achievements rather than responsibilities');
    }
  }
  
  // Check for certifications
  if (!resumeData.certifications || resumeData.certifications.length === 0) {
    tips.push('Add relevant certifications to boost your credibility');
  }
  
  return tips;
};

/**
 * Calculates a preliminary ATS score before the full analysis
 */
const calculatePreliminaryAtsScore = (resumeData: any): number => {
  let score = 60; // Base score
  
  // Add points for having key sections
  if (resumeData.summary && resumeData.summary.length > 70) score += 5;
  if (resumeData.skills && resumeData.skills.length >= 5) score += 5;
  if (resumeData.experience && resumeData.experience.length >= 2) score += 5;
  if (resumeData.education && resumeData.education.length >= 1) score += 5;
  if (resumeData.certifications && resumeData.certifications.length >= 1) score += 5;
  
  // Add points for detailed experience descriptions
  if (resumeData.experience && resumeData.experience.length > 0) {
    const hasDetailedDescriptions = resumeData.experience.some((exp: any) => 
      exp.description && exp.description.length >= 3 && 
      exp.description.some((desc: string) => desc.length > 40)
    );
    
    if (hasDetailedDescriptions) score += 5;
  }
  
  // Add points for quantifiable achievements
  if (resumeData.experience && resumeData.experience.length > 0) {
    const hasQuantifiableResults = resumeData.experience.some((exp: any) => {
      return exp.description?.some((desc: string) => 
        /\d+%|\d+ percent|increased|decreased|improved|reduced|generated|\$\d+|\d+ million|\d+ thousand/i.test(desc)
      );
    });
    
    if (hasQuantifiableResults) score += 10;
  }
  
  return Math.min(score, 100); // Cap at 100
};

/**
 * Generate an enhanced professional summary
 */
const generateEnhancedSummary = (resumeData: any): string => {
  const { jobTitle, skills = [], experience = [] } = resumeData;
  
  const yearsOfExperience = experience.length > 0 
    ? `with ${experience.length > 3 ? 'over ' + experience.length : experience.length}+ years of experience` 
    : '';
  
  const topSkills = skills.slice(0, 3).join(', ');
  
  const experienceHighlight = experience.length > 0 
    ? `Previously at ${experience[0].company}` 
    : '';
  
  return `${jobTitle ? `Experienced ${jobTitle} ` : 'Professional '}${yearsOfExperience}${
    topSkills ? `, specializing in ${topSkills}` : ''
  }. ${experienceHighlight}. Committed to delivering high-quality results through effective problem-solving and collaboration.`;
};
