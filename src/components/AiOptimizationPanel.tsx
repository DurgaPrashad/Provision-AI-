
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-sonner";
import { CheckIcon, XIcon, RefreshCwIcon } from "lucide-react";

interface AiOptimizationPanelProps {
  keywordSuggestions?: string[];
  formatSuggestions?: string[];
  improvementTips?: string[];
  enhancedSummary?: string;
  atsScore: number;
  onApplySuggestion: (type: 'summary' | 'keywords', data: any) => void;
  isGenerating: boolean;
}

const AiOptimizationPanel: React.FC<AiOptimizationPanelProps> = ({
  keywordSuggestions,
  formatSuggestions,
  improvementTips,
  enhancedSummary,
  atsScore,
  onApplySuggestion,
  isGenerating
}) => {
  const [showPanel, setShowPanel] = useState(false);
  
  const getScoreColor = () => {
    if (atsScore >= 90) return 'text-green-500';
    if (atsScore >= 75) return 'text-blue-500';
    if (atsScore >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleApplySummary = () => {
    if (enhancedSummary) {
      onApplySuggestion('summary', enhancedSummary);
      toast("Enhanced summary applied!");
    }
  };

  const handleApplyKeywords = () => {
    if (keywordSuggestions && keywordSuggestions.length > 0) {
      onApplySuggestion('keywords', keywordSuggestions);
      toast("Suggested keywords applied!");
    }
  };

  if (!showPanel) {
    return (
      <div className="fixed bottom-20 left-4 z-40">
        <Button 
          onClick={() => setShowPanel(true)}
          className="rounded-full shadow-lg bg-gradient-to-r from-ats-purple to-ats-pink text-white"
        >
          <span className="text-sm font-bold mr-1">AI</span>
          <span className="text-xs">Optimize</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-16 z-40 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-ats-purple to-ats-pink text-white rounded-t-lg">
          <h3 className="font-bold">AI Resume Optimization</h3>
          <div className="flex items-center space-x-2">
            <div className={`font-bold ${getScoreColor()}`}>
              ATS Score: {atsScore}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20" 
              onClick={() => setShowPanel(false)}
            >
              <XIcon size={18} />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-grow overflow-auto p-4">
          {isGenerating ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCwIcon className="animate-spin mr-2" />
              <span>Analyzing your resume...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {enhancedSummary && (
                <div className="p-3 border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-900 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-blue-700 dark:text-blue-400">Enhanced Summary</h4>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-300"
                      onClick={handleApplySummary}
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-sm">{enhancedSummary}</p>
                </div>
              )}
              
              {keywordSuggestions && keywordSuggestions.length > 0 && (
                <div className="p-3 border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-green-700 dark:text-green-400">Suggested Keywords</h4>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 text-xs bg-green-100 hover:bg-green-200 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300"
                      onClick={handleApplyKeywords}
                    >
                      Apply All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {keywordSuggestions.map((keyword, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {formatSuggestions && formatSuggestions.length > 0 && (
                <div className="p-3 border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-900 rounded-md">
                  <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-2">Format Suggestions</h4>
                  <ul className="space-y-1 text-sm">
                    {formatSuggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon size={16} className="mr-1 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {improvementTips && improvementTips.length > 0 && (
                <div className="p-3 border border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-900 rounded-md">
                  <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-2">ATS Improvement Tips</h4>
                  <ul className="space-y-1 text-sm">
                    {improvementTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon size={16} className="mr-1 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default AiOptimizationPanel;
