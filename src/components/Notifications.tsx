
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from 'lucide-react';
import { toast } from "@/hooks/use-sonner";

const mockNotifications = [
  {
    id: '1',
    sender: 'Alex Johnson',
    message: 'Your resume looks great! I shared it with my recruiter.',
    time: '2h ago',
    avatar: 'https://i.pravatar.cc/150?img=32'
  },
  {
    id: '2',
    sender: 'Sarah Lee',
    message: 'Can you update your marketing experience section?',
    time: '1d ago',
    avatar: 'https://i.pravatar.cc/150?img=60'
  },
  {
    id: '3', 
    sender: 'Michael Chen',
    message: 'Your ATS score has improved! Nice work on the skills section.',
    time: '2d ago',
    avatar: 'https://i.pravatar.cc/150?img=11'
  }
];

const Notifications = () => {
  const [message, setMessage] = React.useState('');
  const [recipient, setRecipient] = React.useState('');

  const handleSendMessage = () => {
    if (!message || !recipient) {
      toast("Please enter both recipient and message");
      return;
    }
    
    toast("Message sent successfully!");
    setMessage('');
    setRecipient('');
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">New Message</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="recipient">
              Recipient
            </label>
            <Input
              id="recipient"
              placeholder="Enter username or email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Message
            </label>
            <div className="flex">
              <Input
                id="message"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 rounded-r-none"
              />
              <Button 
                onClick={handleSendMessage} 
                className="rounded-l-none bg-ats-purple hover:bg-ats-purple/90"
              >
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Recent Notifications</h2>
        
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className="flex gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Avatar>
                <AvatarImage src={notification.avatar} alt={notification.sender} />
                <AvatarFallback>{notification.sender.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{notification.sender}</h3>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {notification.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
