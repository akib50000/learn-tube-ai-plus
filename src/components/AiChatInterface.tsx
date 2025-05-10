
import { useState } from 'react';
import { Send, Plus, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hi there! I'm your AI learning assistant. How can I help you today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  "Explain the concept I'm currently learning",
  "Give me practice problems on this topic",
  "Summarize the key points in this lesson",
  "How does this concept apply to real-world scenarios?",
];

const AiChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response after a brief delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'll help you with "${inputValue}". This is a simulated AI response that would provide relevant information based on the learning content and your specific question.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-learntube-dark-gray rounded-lg border overflow-hidden">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-learntube-red" />
          <h3 className="font-medium">AI Learning Assistant</h3>
        </div>
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4" />
          <span className="ml-1">New Chat</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn('ai-chat-message', message.sender === 'user' ? 'user' : 'ai')}
            >
              <p>{message.content}</p>
              <time className="text-xs text-gray-500 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </time>
            </div>
          ))}
          
          {isTyping && (
            <div className="ai-chat-message ai">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestedQuestions.map((question) => (
            <Button 
              key={question} 
              variant="outline" 
              size="sm"
              onClick={() => handleSuggestedQuestion(question)}
              className="text-xs"
            >
              {question}
            </Button>
          ))}
        </div>
        
        <form 
          className="flex gap-2" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask something about the course..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AiChatInterface;
