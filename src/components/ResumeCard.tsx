
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, Star, ExternalLink, Briefcase, GraduationCap, Share2, ChevronDown } from 'lucide-react';
import { ResumeData } from '@/utils/mockData';
import { databaseService } from '@/services/databaseService';
import { toast } from "@/hooks/use-sonner";
import ResumeToggle from './ResumeToggle';
import { motion } from 'framer-motion';

interface ResumeCardProps {
  resume: ResumeData;
  isPremium?: boolean;
  isCompact?: boolean;
  isEditable?: boolean;
  hideAtsScore?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: (id: string) => void;
  onToggleActive?: (id: string, isActive: boolean) => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  isPremium = false,
  isCompact = false,
  isEditable = false,
  hideAtsScore = false,
  isExpanded = false,
  onToggleExpand,
  onToggleActive
}) => {
  const [isLiked, setIsLiked] = useState(resume.isLiked || false);
  const [likes, setLikes] = useState(resume.likes || 0);
  
  const handleLike = async () => {
    const success = await databaseService.toggleResumeLike(resume.id);
    if (success) {
      setIsLiked(!isLiked);
      setLikes(prev => isLiked ? prev - 1 : prev + 1);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const portfolioLink = `https://portzen.vercel.app/${resume.fullName.toLowerCase().replace(/\s+/g, '-')}`;
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${resume.fullName}'s Resume`,
        text: `Check out ${resume.fullName}'s resume`,
        url: portfolioLink,
      })
      .then(() => toast("Resume shared successfully!"))
      .catch((error) => console.error('Error sharing resume:', error));
    } else {
      navigator.clipboard.writeText(portfolioLink)
        .then(() => toast("Resume link copied to clipboard!"))
        .catch((error) => console.error('Error copying link:', error));
    }
  };

  return (
    <Card className={`w-full transition-shadow hover:shadow-md ${isCompact ? 'max-w-xs' : 'max-w-full'} flex flex-col h-full`}>
      <CardHeader className={`pb-2 ${isPremium ? 'bg-gradient-to-r from-ats-purple to-ats-pink text-white' : ''}`}>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={resume.avatarUrl} />
              <AvatarFallback>{getInitials(resume.fullName)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className={`font-semibold ${isPremium ? 'text-white' : ''}`}>
                {resume.fullName}
              </h3>
              <p className={`text-sm ${isPremium ? 'text-gray-100' : 'text-gray-500'}`}>
                {resume.jobTitle}
              </p>
            </div>
          </div>
          
          {isEditable && onToggleActive && (
            <ResumeToggle 
              resume={resume} 
              isActive={resume.isActive || false}
              onToggle={onToggleActive}
            />
          )}
          
          {!isEditable && !hideAtsScore && (
            <div className="flex flex-col items-end">
              <Badge 
                variant={isPremium ? "outline" : "default"} 
                className={`${isPremium ? 'border-white text-white' : ''}`}
              >
                ATS Score: {resume.atsScore}%
              </Badge>
              <span className={`text-xs mt-1 ${isPremium ? 'text-gray-100' : 'text-gray-500'}`}>
                {formatDate(resume.createdAt)}
              </span>
            </div>
          )}
          
          {!isEditable && hideAtsScore && (
            <span className={`text-xs ${isPremium ? 'text-gray-100' : 'text-gray-500'}`}>
              {formatDate(resume.createdAt)}
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className={`p-4 ${isCompact ? 'space-y-2' : 'space-y-4'} flex-1`}>
        {/* Always visible content - Summary and Key Skills */}
        <div>
          <h4 className="font-semibold text-sm">Summary</h4>
          <p className="text-sm text-gray-600">{resume.summary}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-sm">Portfolio</h4>
          <a 
            href={portfolioLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            {portfolioLink} <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        
        <div>
          <h4 className="font-semibold text-sm">Key Skills</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {resume.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* In-card toggle button for mobile experience */}
        <div className="flex justify-center mt-2">
          {onToggleExpand && (
            <motion.button
              onClick={() => onToggleExpand(resume.id)}
              className="text-sm flex items-center gap-1 text-gray-500 py-1 px-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? 'Collapse resume' : 'View full resume'}
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              />
            </motion.button>
          )}
        </div>
        
        {/* Expanded content - only visible when expanded */}
        {isExpanded && (
          <>
            <Separator />
            
            {/* Experience Section */}
            <div>
              <h4 className="font-semibold text-sm flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Experience
              </h4>
              <div className="space-y-2 mt-1">
                {resume.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{exp.title}</p>
                      <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-xs text-gray-600">{exp.company}, {exp.location}</p>
                    <ul className="text-xs text-gray-600 list-disc ml-4 mt-1">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Education Section */}
            <div>
              <h4 className="font-semibold text-sm flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                Education
              </h4>
              <div className="space-y-2 mt-1">
                {resume.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{edu.degree}</p>
                      <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <p className="text-xs text-gray-600">{edu.institution}, {edu.location}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Certifications Section */}
            {resume.certifications && resume.certifications.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm">Certifications</h4>
                <ul className="text-xs text-gray-600 list-disc ml-4 mt-1">
                  {resume.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </CardContent>
      
      {/* Action Footer */}
      <CardFooter className="pt-2 flex justify-between items-center border-t p-4">
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-xs gap-1 ${isLiked ? 'text-blue-600' : 'text-gray-500'}`}
            onClick={handleLike}
          >
            <ThumbsUp className="h-3 w-3" />
            <span>{likes > 0 ? likes : ''} {isLiked ? 'Liked' : 'Like'}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 text-gray-500"
            onClick={handleShare}
          >
            <Share2 className="h-3 w-3" />
            <span>Share</span>
          </Button>
        </div>
        
        {isPremium && (
          <Badge variant="outline" className="text-xs border-yellow-400 text-yellow-500">
            <Star className="h-3 w-3 mr-1 fill-yellow-400" /> Premium
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResumeCard;
