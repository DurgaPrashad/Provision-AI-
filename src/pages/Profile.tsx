
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from 'lucide-react';
import { toast } from "@/hooks/use-sonner";
import NavigationBar from '@/components/NavigationBar';
import TopBar from '@/components/TopBar';

const Profile = () => {
  const [userName, setUserName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'premium' | 'notifications' | 'dashboard' | 'portzen' | 'home'>('home');
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status
    const storedName = localStorage.getItem('userName');
    const storedProfile = localStorage.getItem('userProfile');
    const storedPremium = localStorage.getItem('isPremium');
    
    if (storedName) setUserName(storedName);
    if (storedProfile) setProfileImage(storedProfile);
    setIsPremium(storedPremium === 'true');
    
    if (!storedName && !storedProfile) {
      navigate('/login');
    }
  }, [navigate]);

  const handleUpdateProfile = () => {
    if (userName.trim()) {
      localStorage.setItem('userName', userName);
      toast("Profile updated successfully");
    } else {
      toast("Name cannot be empty");
    }
  };

  const handleUpgradeToPremium = () => {
    localStorage.setItem('isPremium', 'true');
    setIsPremium(true);
    toast("Upgraded to Premium!");
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="min-h-screen pb-20">
      <TopBar onSearch={() => {}} onFilter={() => {}} />
      
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24 border-2 border-ats-purple">
              <AvatarImage src={profileImage || "https://i.pravatar.cc/150?img=32"} alt="Profile" />
              <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            {isPremium && (
              <span className="absolute -top-1 -right-1">
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              </span>
            )}
          </div>
          
          <div className="w-full max-w-xs space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input 
                id="name" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                placeholder="Your name"
              />
            </div>
            
            <Button 
              onClick={handleUpdateProfile} 
              className="w-full bg-ats-purple hover:bg-ats-dark"
            >
              Update Profile
            </Button>
            
            {!isPremium && (
              <div className="mt-8 p-4 border rounded-lg border-yellow-400">
                <h2 className="text-lg font-semibold mb-2">Premium Benefits</h2>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>Store up to 5 resumes (instead of 2)</li>
                  <li>Exclusive gradient designs for resumes</li>
                  <li>Priority visibility to recruiters</li>
                  <li>Advanced AI resume optimization</li>
                </ul>
                <Button 
                  onClick={handleUpgradeToPremium} 
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-white"
                >
                  Upgrade to Premium - $9.99/month
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Profile;
