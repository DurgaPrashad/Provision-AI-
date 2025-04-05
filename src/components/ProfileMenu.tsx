
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, FileEdit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileIcon } from './icons/ProfileIcon';
import { toast } from "@/hooks/use-sonner";

const ProfileMenu = () => {
  const [userName, setUserName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [savedResumes, setSavedResumes] = useState<number>(0);
  const [maxResumes, setMaxResumes] = useState<number>(2);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get user data from localStorage
    const storedName = localStorage.getItem('userName');
    const storedProfile = localStorage.getItem('userProfile');
    const storedPremium = localStorage.getItem('isPremium');
    const savedResumesCount = localStorage.getItem('savedResumesCount');
    
    if (storedName) setUserName(storedName);
    if (storedProfile) setProfileImage(storedProfile);
    setIsPremium(storedPremium === 'true');
    setSavedResumes(savedResumesCount ? parseInt(savedResumesCount) : 0);
    setMaxResumes(storedPremium === 'true' ? 5 : 2);
    
    // If no user data, redirect to login
    if (!storedName && !storedProfile) {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('isPremium');
    toast("Logged out successfully");
    navigate('/login');
  };
  
  const handleUpgradeToPremium = () => {
    localStorage.setItem('isPremium', 'true');
    setIsPremium(true);
    setMaxResumes(5);
    toast("Upgraded to Premium!");
    setTimeout(() => window.location.reload(), 1000);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-ats-purple">
              <AvatarImage src={profileImage || "https://i.pravatar.cc/150?img=32"} alt="Profile" />
              <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            {isPremium && (
              <span className="absolute -top-1 -right-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </span>
            )}
          </div>
          
          <div className="ml-2 hidden md:block">
            <p className="text-sm font-medium line-clamp-1">{userName || 'User'}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span className="font-medium">{userName}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <ProfileIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          <ProfileIcon className="mr-2 h-4 w-4" />
          <span>Resumes ({savedResumes}/{maxResumes})</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/create-resume')}>
          <FileEdit className="mr-2 h-4 w-4" />
          <span>Create Resume</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {!isPremium && (
          <DropdownMenuItem onClick={handleUpgradeToPremium}>
            <Star className="mr-2 h-4 w-4" />
            <span>Upgrade to Premium</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
