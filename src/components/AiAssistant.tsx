import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-sonner";

interface AiAssistantProps {
  onSuggestion: (suggestion: string) => void;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ onSuggestion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Optimize your skills section for keywords",
    "Add quantifiable achievements to your experience",
    "Improve your professional summary",
    "Add relevant certifications",
    "Tailor your resume for a specific job posting"
  ];

  const generateSuggestion = (type: string) => {
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let suggestion = '';
      
      switch (type) {
        case 'skills':
          suggestion = "Consider adding industry-specific skills like 'Cloud Architecture', 'CI/CD', and 'Agile Methodologies' to increase your resume's ATS ranking.";
          break;
        case 'experience':
          suggestion = "Improve your work experience by adding measurable achievements. For example: 'Increased application performance by 40% through code optimization'.";
          break;
        case 'summary':
          suggestion = "For your professional summary, start with your years of experience, mention your specialization, and include 2-3 key achievements.";
          break;
        case 'certifications':
          suggestion = "Adding relevant certifications like AWS, Azure, or Google Cloud can significantly boost your ATS score for technical roles.";
          break;
        case 'tailor':
          suggestion = "Review the job description and incorporate key terms from it into your resume to improve ATS matching.";
          break;
        default:
          suggestion = "Make sure your resume includes relevant keywords for your target position.";
      }
      
      onSuggestion(suggestion);
      toast("AI Suggestion Generated");
      setLoading(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-2 w-64 border border-gray-200 dark:border-gray-700 animate-fade-in">
          <h3 className="font-medium mb-2 text-ats-purple">AI Assistant</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">What would you like help with?</p>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => generateSuggestion(suggestion.split(' ')[1])}
                disabled={loading}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full w-12 h-12 p-0 shadow-lg ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-ats-purple to-ats-pink'
        }`}
      >
        {isOpen ? (
          <span className="text-xl">×</span>
        ) : (
          <span className="text-xl">AI</span>
        )}
      </Button>
    </div>
  );
};

export default AiAssistant;
