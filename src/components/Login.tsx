
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [step, setStep] = useState<"login" | "profile">("login");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // In a real implementation, this would authenticate with Google
    // For demo purposes, we'll just move to the profile step
    toast("Google login successful!");
    setStep("profile");
  };

  const handleDemoLogin = () => {
    toast("Demo login successful!");
    setStep("profile");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmitProfile = () => {
    if (!name.trim()) {
      toast("Please enter your name");
      return;
    }
    
    if (!profileImage) {
      toast("Please upload a profile photo");
      return;
    }

    // In a real app, save user profile data to database/localStorage
    localStorage.setItem("userName", name);
    localStorage.setItem("userProfile", profileImage);
    localStorage.setItem("isPremium", "false"); // default to non-premium
    
    toast("Profile created successfully!");
    navigate("/");
  };

  if (step === "login") {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome to ATS Resume</CardTitle>
            <CardDescription className="text-center">
              Sign in to manage your resumes and applications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleGoogleLogin} 
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
            >
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </Button>
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <Button 
              onClick={handleDemoLogin} 
              className="w-full" 
              variant="secondary"
            >
              Use Demo Account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Complete Your Profile</CardTitle>
          <CardDescription className="text-center">
            Before you continue, please provide some basic information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <div 
              className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-2 border-2 border-ats-purple"
              style={{ backgroundImage: profileImage ? `url(${profileImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {!profileImage && (
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              )}
            </div>
            <label className="cursor-pointer bg-ats-purple hover:bg-ats-dark text-white py-1 px-3 rounded-full text-sm">
              Upload Photo
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <Input
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmitProfile} 
            className="w-full bg-ats-purple hover:bg-ats-dark"
          >
            Complete Setup
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
