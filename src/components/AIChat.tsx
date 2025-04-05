
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from 'lucide-react';
import { mockResumes } from '@/utils/mockData';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatProps {
  onClose: () => void;
  onShowResumes: (keyword: string) => void;
}

const AIChat: React.FC<AIChatProps> = ({ onClose, onShowResumes }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AI assistant. Ask me about developers or how I can help with your resume.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: message,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    // Check for developer-related keywords
    const lowerCaseMessage = message.toLowerCase();
    const developerKeywords = [
      { key: 'web developer', response: 'web development' },
      { key: 'app developer', response: 'app development' },
      { key: 'frontend', response: 'frontend' },
      { key: 'backend', response: 'backend' },
      { key: 'fullstack', response: 'fullstack' },
      { key: 'cloud', response: 'cloud' },
      { key: 'react', response: 'React' },
      { key: 'javascript', response: 'JavaScript' },
      { key: 'developer', response: 'development' },
    ];
    
    // Simulate AI thinking
    setTimeout(() => {
      let aiResponse = '';
      let foundKeyword = '';
      
      // Check if the message contains any developer keywords
      const matchedKeyword = developerKeywords.find(item => 
        lowerCaseMessage.includes(item.key)
      );
      
      if (matchedKeyword) {
        foundKeyword = matchedKeyword.response;
        aiResponse = `I've found some profiles specializing in ${matchedKeyword.response}. Let me show you the available developers.`;
        
        // Trigger showing relevant resumes
        setTimeout(() => {
          onShowResumes(foundKeyword);
        }, 500);
      } else if (lowerCaseMessage.includes('resume') || lowerCaseMessage.includes('cv')) {
        aiResponse = "I can help optimize your resume! Try using action verbs, quantify your achievements, and ensure your skills section aligns with the job descriptions you're targeting.";
      } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        aiResponse = "Hello! How can I assist you today? You can ask me about different types of developers or for resume advice.";
      } else {
        aiResponse = "I'm not sure I understand. You can ask me about developers (like 'Show me web developers'), or ask for resume tips.";
      }
      
      // Add AI response
      const aiMessage: Message = {
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-ats-purple">AI Assistant</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser 
                    ? 'bg-ats-purple text-white rounded-tr-none' 
                    : 'bg-gray-100 dark:bg-gray-700 rounded-tl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 mr-2"
        />
        <Button 
          onClick={handleSend} 
          size="sm"
          className="bg-ats-purple hover:bg-ats-dark"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default AIChat;
