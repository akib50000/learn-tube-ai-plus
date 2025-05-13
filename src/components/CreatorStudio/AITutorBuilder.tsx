
import React from 'react';
import { 
  Plus, 
  Brain, 
  FileText, 
  Code, 
  MessagesSquare, 
  Image as ImageIcon,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AITutorChat from '@/components/AITutorChat';

interface AITutorBuilderProps {
  isTrainingTutor: boolean;
  showAITutorChat: boolean;
  setShowAITutorChat: (show: boolean) => void;
  handleTrainTutor: () => void;
}

const AITutorBuilder: React.FC<AITutorBuilderProps> = ({
  isTrainingTutor,
  showAITutorChat,
  setShowAITutorChat,
  handleTrainTutor,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Tutor Builder</h1>
        <Button className="bg-learntube-red hover:bg-learntube-dark-red">
          <Plus className="h-4 w-4 mr-2" />
          Create AI Tutor
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Configure Your AI Tutor</CardTitle>
              <CardDescription>Customize how your AI tutor behaves and interacts with students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Tutor Name</Label>
                  <Input defaultValue="Professor AI" className="mb-1" />
                  <p className="text-xs text-gray-500">This is how your tutor will introduce itself to students</p>
                </div>
                
                <div>
                  <Label>Personality</Label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                    <option value="friendly">Friendly and Supportive</option>
                    <option value="professional">Professional and Formal</option>
                    <option value="socratic">Socratic (Question-based teaching)</option>
                    <option value="challenging">Challenging and Rigorous</option>
                    <option value="custom">Custom...</option>
                  </select>
                </div>
                
                <div>
                  <Label>Teaching Style</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button variant="outline" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Text-based explanations
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Visual learning
                    </Button>
                    <Button variant="outline" className="justify-start bg-blue-50">
                      <Code className="h-4 w-4 mr-2" />
                      Code examples
                    </Button>
                    <Button variant="outline" className="justify-start bg-blue-50">
                      <MessagesSquare className="h-4 w-4 mr-2" />
                      Interactive Q&A
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>Knowledge Base</Label>
                  <div className="border rounded-lg p-4 mt-2">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Course Materials</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Materials
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Course Textbook.pdf</span>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">×</Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Lecture Slides.pptx</span>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">×</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="bg-learntube-red hover:bg-learntube-dark-red"
                  onClick={handleTrainTutor}
                  disabled={isTrainingTutor}
                >
                  {isTrainingTutor ? "Training..." : "Train AI Tutor"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your AI tutor will appear to students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <Brain className="h-20 w-20 text-gray-300" />
              </div>
              <Button 
                className="w-full"
                onClick={() => setShowAITutorChat(true)}
              >
                <Play className="h-4 w-4 mr-2" />
                Test AI Tutor
              </Button>
            </CardContent>
          </Card>
          
          {showAITutorChat && (
            <Dialog open={showAITutorChat} onOpenChange={setShowAITutorChat}>
              <DialogContent className="sm:max-w-[600px] h-[80vh]">
                <DialogHeader>
                  <DialogTitle>AI Tutor Preview</DialogTitle>
                  <DialogDescription>
                    Interact with your AI tutor to test its capabilities
                  </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                  <AITutorChat />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITutorBuilder;
