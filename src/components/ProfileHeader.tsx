
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProfileHeader = () => {
  const [userName, setUserName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get user data from localStorage
    const storedName = localStorage.getItem('userName');
    const storedProfile = localStorage.getItem('userProfile');
    const storedPremium = localStorage.getItem('isPremium');
    
    if (storedName) setUserName(storedName);
    if (storedProfile) setProfileImage(storedProfile);
    setIsPremium(storedPremium === 'true');
    
    // If no user data, redirect to login
    if (!storedName && !storedProfile) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className="flex items-center">
      <div className="relative">
        <Avatar className="h-10 w-10 border-2 border-ats-purple cursor-pointer">
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
        {isPremium && (
          <Badge variant="outline" className="text-xs border-yellow-400 text-yellow-500">
            Premium
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
