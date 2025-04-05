
import React, { useRef, useState } from 'react';
import { ResumeData } from '../utils/mockData';
import ResumeCard from './ResumeCard';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResumeScrollProps {
  resumes: ResumeData[];
}

const ResumeScroll: React.FC<ResumeScrollProps> = ({ resumes }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [expandedResume, setExpandedResume] = useState<string | null>(null);

  // Toggle resume expansion
  const toggleResumeExpansion = (resumeId: string) => {
    setExpandedResume(expandedResume === resumeId ? null : resumeId);
  };

  // If there are no resumes, display a message
  if (resumes.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-muted-foreground">No resumes found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="resume-container max-w-md mx-auto">
      {isMobile ? (
        // Mobile vertical scrolling experience (TikTok-style)
        <div ref={scrollRef} className="resume-scroll-snap">
          {resumes.map((resume) => (
            <div key={resume.id} className="resume-scroll-item">
              <div className="mb-2 flex justify-center">
                <motion.button
                  onClick={() => toggleResumeExpansion(resume.id)}
                  className="text-sm flex items-center gap-1 text-muted-foreground"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {expandedResume === resume.id ? 'Tap to collapse' : 'Tap to view full resume'}
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${expandedResume === resume.id ? 'rotate-180' : ''}`} 
                  />
                </motion.button>
              </div>
              <ResumeCard 
                key={resume.id} 
                resume={resume} 
                hideAtsScore={true}
                isPremium={resume.id === "2" || resume.id === "4"} // Demo premium resumes
                isExpanded={expandedResume === resume.id}
                onToggleExpand={() => toggleResumeExpansion(resume.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        // Desktop experience with carousel and hidden scrollbars
        <ScrollArea className="h-full overflow-hidden no-scrollbar">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {resumes.map((resume) => (
                <CarouselItem key={resume.id} className="pl-1 basis-full">
                  <div className="mb-2 flex justify-center">
                    <motion.button
                      onClick={() => toggleResumeExpansion(resume.id)}
                      className="text-sm flex items-center gap-1 text-muted-foreground"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {expandedResume === resume.id ? 'Tap to collapse' : 'Tap to view full resume'}
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform ${expandedResume === resume.id ? 'rotate-180' : ''}`} 
                      />
                    </motion.button>
                  </div>
                  <ResumeCard 
                    resume={resume} 
                    hideAtsScore={true}
                    isPremium={resume.id === "2" || resume.id === "4"} // Demo premium resumes
                    isExpanded={expandedResume === resume.id}
                    onToggleExpand={() => toggleResumeExpansion(resume.id)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </ScrollArea>
      )}
    </div>
  );
};

export default ResumeScroll;
