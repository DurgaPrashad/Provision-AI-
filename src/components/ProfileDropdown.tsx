
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, User, FileText, LogOut, Plus, Settings, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileDropdownProps {
  userName: string;
  profileImage: string | null;
  isPremium: boolean;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ 
  userName, 
  profileImage,
  isPremium 
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div 
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar className="h-10 w-10 border-2 border-ats-purple">
            <AvatarImage src={profileImage || "https://i.pravatar.cc/150?img=32"} alt="Profile" />
            <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          {isPremium && (
            <motion.span 
              className="absolute -top-1 -right-1"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </motion.span>
          )}
        </motion.div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56 z-50" align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          <div className="flex-1 truncate">
            <p className="text-sm font-medium">{userName || 'User'}</p>
            {isPremium && (
              <Badge variant="outline" className="text-xs border-yellow-400 text-yellow-500">
                Premium
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigate('/create-resume')}>
          <Plus className="mr-2 h-4 w-4" />
          <span>Create Resume</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigate('/')}>
          <FileText className="mr-2 h-4 w-4" />
          <span>My Resumes {isPremium ? '(0/5)' : '(0/2)'}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigate('/dashboard')}>
          <BookOpen className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer text-red-500 focus:text-red-500" 
          onClick={() => {
            localStorage.clear();
            handleNavigate('/login');
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
