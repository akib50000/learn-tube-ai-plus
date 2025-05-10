import { useState } from 'react';
import { Send, Plus, MessageSquare, Lightbulb, BookOpen, FileText, Code, CheckCircle, Lock, Download, RefreshCw as Refresh } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

interface AiSuggestion {
  id: string;
  title: string;
  type: 'exercise' | 'review' | 'code';
}

interface LearningPath {
  id: string;
  title: string;
  completed: boolean;
  locked?: boolean;
}

interface AiChatInterfaceProps {
  suggestions?: AiSuggestion[];
  learningPath?: LearningPath[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hi there! I'm your AI learning assistant. How can I help you today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

const defaultSuggestedQuestions = [
  "Explain the concept I'm currently learning",
  "Give me practice problems on this topic",
  "Summarize the key points in this lesson",
  "How does this concept apply to real-world scenarios?",
];

const AiChatInterface = ({ suggestions = [], learningPath = [] }: AiChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'suggestions' | 'notes'>('chat');
  const [generatedNotes, setGeneratedNotes] = useState<string>('');
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);

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

  const handleGenerateNotes = () => {
    setIsGeneratingNotes(true);
    
    // Simulate notes generation
    setTimeout(() => {
      setGeneratedNotes(`# AI Fundamentals Notes

## Key Concepts
- Artificial Intelligence: Systems that can perform tasks requiring human intelligence
- Machine Learning: Subset of AI focused on learning from data
- Deep Learning: Subset of ML using neural networks with multiple layers

## Types of Machine Learning
1. Supervised Learning
   - Uses labeled data
   - Examples: Classification, Regression

2. Unsupervised Learning
   - Uses unlabeled data
   - Examples: Clustering, Dimensionality Reduction

3. Reinforcement Learning
   - Learning through trial and error
   - Uses rewards and penalties

## Neural Networks
- Input Layer: Receives data
- Hidden Layers: Process information
- Output Layer: Produces result
- Activation Functions: ReLU, Sigmoid, Tanh

## Important Algorithms
- Linear Regression
- Decision Trees
- Support Vector Machines
- k-Means Clustering

## Review Questions
1. What are the three main types of machine learning?
2. How does a neural network process information?
3. What is the difference between AI, ML, and DL?`);
      
      setIsGeneratingNotes(false);
    }, 2000);
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
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'chat' | 'suggestions' | 'notes')} className="flex-1 flex flex-col">
        <TabsList className="w-full">
          <TabsTrigger value="chat" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-1" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex-1">
            <Lightbulb className="h-4 w-4 mr-1" />
            Suggestions
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex-1">
            <FileText className="h-4 w-4 mr-1" />
            Notes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'px-4 py-3 rounded-lg',
                    message.sender === 'user' 
                      ? 'bg-blue-100 dark:bg-blue-900/20 ml-6' 
                      : 'bg-gray-100 dark:bg-gray-800 mr-6'
                  )}
                >
                  <p>{message.content}</p>
                  <time className="text-xs text-gray-500 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </time>
                </div>
              ))}
              
              {isTyping && (
                <div className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 mr-6">
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
              {defaultSuggestedQuestions.map((question) => (
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
        </TabsContent>
        
        <TabsContent value="suggestions" className="flex-1 overflow-hidden p-0 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-sm uppercase tracking-wider">Practice Suggestions</h3>
                <div className="space-y-2">
                  {suggestions.map(suggestion => (
                    <Card key={suggestion.id} className="overflow-hidden">
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {suggestion.type === 'exercise' && <BookOpen className="h-4 w-4 text-yellow-500" />}
                          {suggestion.type === 'review' && <Lightbulb className="h-4 w-4 text-blue-500" />}
                          {suggestion.type === 'code' && <Code className="h-4 w-4 text-green-500" />}
                          <span>{suggestion.title}</span>
                        </div>
                        <Badge variant="outline">{suggestion.type}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                  {suggestions.length === 0 && (
                    <p className="text-sm text-gray-500">No suggestions available yet.</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 text-sm uppercase tracking-wider">Learning Path</h3>
                <div className="space-y-2">
                  {learningPath.map(path => (
                    <Card key={path.id} className={path.locked ? 'opacity-60' : ''}>
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {path.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : path.locked ? (
                            <Lock className="h-4 w-4 text-gray-400" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-blue-500" />
                          )}
                          <span>{path.title}</span>
                        </div>
                        <Badge variant={path.completed ? "success" : path.locked ? "outline" : "secondary"}>
                          {path.completed ? 'Completed' : path.locked ? 'Locked' : 'Next'}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                  {learningPath.length === 0 && (
                    <p className="text-sm text-gray-500">No learning path available.</p>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="notes" className="flex-1 overflow-hidden p-0 m-0">
          <div className="h-full flex flex-col">
            {!generatedNotes ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-4">
                  <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Generate Study Notes</h3>
                  <p className="text-gray-500 mb-4">
                    Let AI create structured notes based on the current lesson
                  </p>
                  <Button
                    onClick={handleGenerateNotes}
                    disabled={isGeneratingNotes}
                    className="bg-learntube-red hover:bg-learntube-dark-red"
                  >
                    {isGeneratingNotes ? 'Generating...' : 'Generate Notes'}
                  </Button>
                </div>
              </div>
            ) : (
              <ScrollArea className="flex-1 p-4">
                <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                  {generatedNotes}
                </div>
              </ScrollArea>
            )}
            
            {generatedNotes && (
              <div className="border-t p-3 flex justify-end">
                <Button variant="outline" size="sm" className="mr-2">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setGeneratedNotes('')}>
                  <Refresh className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiChatInterface;
