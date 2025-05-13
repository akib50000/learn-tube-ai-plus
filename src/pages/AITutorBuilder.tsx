
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Star, Upload, MessageCircle, Mic, Volume2, X, User, Info, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AITutorBuilder = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('design');
  const [expertName, setExpertName] = useState('');
  const [expertTitle, setExpertTitle] = useState('');
  const [expertDescription, setExpertDescription] = useState('');
  const [expertPhoto, setExpertPhoto] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setExpertPhoto(URL.createObjectURL(file));
        setIsUploading(false);
        toast({
          title: "Photo uploaded",
          description: "Expert photo has been uploaded successfully",
        });
      }, 1500);
    }
  };

  const handleTrainModel = () => {
    if (!expertName || !expertTitle || !expertDescription) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields before training the AI",
        variant: "destructive",
      });
      return;
    }

    setIsTraining(true);
    // Simulate training delay
    setTimeout(() => {
      setIsTraining(false);
      toast({
        title: "AI Expert Created",
        description: `${expertName} has been successfully created as an AI tutor`,
      });
      // In a real application, we would save the tutor data here
    }, 3000);
  };

  const handlePreview = () => {
    toast({
      title: "Preview mode",
      description: "Opening AI tutor preview...",
    });
    // In a real app, we would navigate to a preview page
  };

  const handleSaveAndPublish = () => {
    toast({
      title: "AI Tutor Published",
      description: "Your AI tutor is now live for students",
    });
    navigate('/creator-studio');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">AI Tutor Builder</h1>
            <p className="text-muted-foreground">Create an AI clone of an expert that can teach your students</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview}>Preview</Button>
            <Button onClick={handleSaveAndPublish}>Save and Publish</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="voice">Voice & Interaction</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="design">
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Expert Profile</CardTitle>
                      <CardDescription>Define who your AI tutor represents</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="expert-name">Expert Name</Label>
                        <Input 
                          id="expert-name" 
                          placeholder="e.g., Dr. Jane Smith" 
                          value={expertName}
                          onChange={(e) => setExpertName(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="expert-title">Title/Profession</Label>
                        <Input 
                          id="expert-title" 
                          placeholder="e.g., Professor of Computer Science" 
                          value={expertTitle}
                          onChange={(e) => setExpertTitle(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="expert-description">Expert Bio</Label>
                        <Textarea 
                          id="expert-description" 
                          placeholder="Describe this expert's background, expertise, and teaching style..." 
                          className="min-h-[120px]"
                          value={expertDescription}
                          onChange={(e) => setExpertDescription(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="expert-photo" className="block mb-2">Expert Photo</Label>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                            {expertPhoto ? (
                              <img src={expertPhoto} alt="Expert" className="w-full h-full object-cover" />
                            ) : (
                              <User className="h-12 w-12 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <Input 
                              id="expert-photo" 
                              type="file" 
                              accept="image/*" 
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                            <Button 
                              variant="outline" 
                              onClick={() => document.getElementById('expert-photo')?.click()}
                              disabled={isUploading}
                            >
                              {isUploading ? "Uploading..." : "Upload Photo"}
                            </Button>
                            <p className="text-xs text-muted-foreground mt-1">
                              Recommended: Square, high-quality image
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription>Customize how your AI tutor looks in the interface</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg flex flex-col items-center text-center cursor-pointer hover:bg-accent">
                          <div className="w-full aspect-video rounded-lg mb-2 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <User className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <span className="font-medium">Avatar Only</span>
                        </div>
                        
                        <div className="p-4 border rounded-lg flex flex-col items-center text-center cursor-pointer hover:bg-accent relative">
                          <div className="absolute -top-1 -right-1">
                            <Badge className="bg-primary">Selected</Badge>
                          </div>
                          <div className="w-full aspect-video rounded-lg mb-2 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <div className="absolute w-full h-full flex items-center justify-center">
                              <div className="w-3/4 h-0.5 bg-white/30 rounded-full">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                  <User className="h-8 w-8 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className="font-medium">Avatar with Waveform</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Label className="mb-2 block">Background Style</Label>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="h-20 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 cursor-pointer ring-2 ring-primary ring-offset-2" />
                          <div className="h-20 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 cursor-pointer" />
                          <div className="h-20 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 cursor-pointer" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="content">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Knowledge Base</CardTitle>
                      <CardDescription>Upload materials to train your AI tutor</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                        <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
                        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                          Upload PDFs, documents, presentations, or any other teaching materials to build your AI tutor's knowledge base.
                        </p>
                        <div className="flex flex-col gap-2 items-center">
                          <Input 
                            id="knowledge-files" 
                            type="file" 
                            multiple 
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" 
                            className="hidden" 
                          />
                          <Button onClick={() => document.getElementById('knowledge-files')?.click()}>
                            Select Files
                          </Button>
                          <span className="text-xs text-muted-foreground">Up to 10 files (max 50MB each)</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Label htmlFor="introduction" className="mb-2 block">AI Tutor Introduction</Label>
                        <Textarea 
                          id="introduction" 
                          placeholder="Write a brief introduction that your AI tutor will use when greeting students..." 
                          className="min-h-[120px]"
                        />
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-medium mb-3">Additional Resources</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <Info className="h-4 w-4 text-blue-500" />
                              <span>Link to external resources (URLs)</span>
                            </div>
                            <Button variant="outline" size="sm">Add Link</Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <Info className="h-4 w-4 text-purple-500" />
                              <span>Connect to your course content</span>
                            </div>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Teaching Approach</CardTitle>
                      <CardDescription>Define how your AI tutor should teach</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="teaching-style" className="mb-2 block">Teaching Style</Label>
                          <select id="teaching-style" className="w-full h-10 rounded-md border border-input px-3 py-2">
                            <option value="socratic">Socratic (Question-based)</option>
                            <option value="instructional">Instructional (Direct teaching)</option>
                            <option value="coach">Coaching (Supportive guidance)</option>
                            <option value="mentor">Mentoring (Experience sharing)</option>
                          </select>
                        </div>
                        
                        <div>
                          <Label className="mb-2 block">Response Type</Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="border rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-accent">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <MessageCircle className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Concise</h4>
                                <p className="text-xs text-muted-foreground">Brief, to-the-point answers</p>
                              </div>
                            </div>
                            
                            <div className="border rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-accent bg-accent">
                              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <MessageCircle className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Detailed</h4>
                                <p className="text-xs text-muted-foreground">In-depth explanations</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="tone" className="mb-2 block">Communication Tone</Label>
                          <div className="flex items-center">
                            <span className="text-sm text-muted-foreground mr-2">Casual</span>
                            <Input
                              id="tone"
                              type="range"
                              min="1"
                              max="5"
                              defaultValue="3"
                              className="w-full mx-2"
                            />
                            <span className="text-sm text-muted-foreground ml-2">Formal</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="voice">
                <Card>
                  <CardHeader>
                    <CardTitle>Voice & Interaction Settings</CardTitle>
                    <CardDescription>Configure how students can interact with your AI tutor</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="voice-enabled">Enable Voice Interaction</Label>
                        <p className="text-sm text-muted-foreground">Allow students to speak with your AI tutor</p>
                      </div>
                      <Switch 
                        id="voice-enabled" 
                        checked={voiceEnabled} 
                        onCheckedChange={setVoiceEnabled}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className={cn("space-y-4", !voiceEnabled && "opacity-50 pointer-events-none")}>
                      <div>
                        <Label htmlFor="voice-type" className="mb-2 block">Voice Type</Label>
                        <select id="voice-type" className="w-full h-10 rounded-md border border-input px-3 py-2">
                          <option value="female-professional">Professional Female</option>
                          <option value="female-casual">Casual Female</option>
                          <option value="male-professional">Professional Male</option>
                          <option value="male-casual">Casual Male</option>
                          <option value="neutral">Gender Neutral</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Voice Preview</Label>
                        <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
                          <div className="text-sm">Click to preview the selected voice</div>
                          <Button variant="outline" size="sm">
                            <Volume2 className="h-4 w-4 mr-2" />
                            Play Sample
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="speech-rate" className="mb-2 block">Speech Rate</Label>
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground mr-2">Slower</span>
                          <Input
                            id="speech-rate"
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            defaultValue="1"
                            className="w-full mx-2"
                          />
                          <span className="text-sm text-muted-foreground ml-2">Faster</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="accent" className="mb-2 block">Accent/Region</Label>
                        <select id="accent" className="w-full h-10 rounded-md border border-input px-3 py-2">
                          <option value="us">US English</option>
                          <option value="uk">UK English</option>
                          <option value="au">Australian English</option>
                          <option value="in">Indian English</option>
                          <option value="other">Other (Specify)</option>
                        </select>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Interaction Controls</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Allow Interruptions</Label>
                            <p className="text-sm text-muted-foreground">Let students interrupt the AI while it's speaking</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Show Text Transcript</Label>
                            <p className="text-sm text-muted-foreground">Display text of what the AI is saying</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Text Fallback</Label>
                            <p className="text-sm text-muted-foreground">Allow text input if microphone is unavailable</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Tutor Name & Description</CardTitle>
                      <CardDescription>Set how your AI tutor will appear to students</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="tutor-name">AI Tutor Name</Label>
                        <Input id="tutor-name" placeholder="e.g., Professor AI, Code Coach, etc." />
                      </div>
                      
                      <div>
                        <Label htmlFor="tutor-description">Description</Label>
                        <Textarea 
                          id="tutor-description" 
                          placeholder="Briefly describe what this AI tutor teaches and how it helps students..." 
                          className="min-h-[120px]"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy & Access</CardTitle>
                      <CardDescription>Control who can access this AI tutor</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="visibility" className="mb-2 block">Visibility</Label>
                          <select id="visibility" className="w-full h-10 rounded-md border border-input px-3 py-2">
                            <option value="public">Public - Anyone can access</option>
                            <option value="enrolled">Enrolled Students Only</option>
                            <option value="private">Private - Only with direct link</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Log Student Conversations</Label>
                            <p className="text-sm text-muted-foreground">Save conversations for review</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Allow Anonymous Access</Label>
                            <p className="text-sm text-muted-foreground">Let students use without signing in</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>AI Tutor Preview</CardTitle>
                  <CardDescription>See how your AI tutor will appear to students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 aspect-video relative flex flex-col items-center justify-center p-4 text-white">
                    {expertPhoto ? (
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/70 mb-2">
                        <img src={expertPhoto} alt="Expert" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-2">
                        <User className="h-10 w-10 text-white/70" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold">{expertName || 'Your Expert Name'}</h3>
                    <p className="text-sm text-white/70 mb-4">{expertTitle || 'Expert Title'}</p>

                    <div className="w-full h-12 relative">
                      <div className="absolute w-full top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <div className="w-4/5 h-0.5 bg-white/20 rounded-full">
                          <div className="absolute left-0 top-0 h-0.5 w-1/2 bg-white/60 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center" role="button">
                        <MessageCircle className="h-5 w-5 text-white/80" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center" role="button">
                        <Mic className="h-5 w-5 text-white/80" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-red-500/90 backdrop-blur flex items-center justify-center" role="button">
                        <X className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Training Status</h4>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <span className="flex items-center gap-2">
                        {isTraining ? (
                          <>
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                            <span>Training in progress...</span>
                          </>
                        ) : (
                          <>
                            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                            <span>Not trained yet</span>
                          </>
                        )}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleTrainModel}
                        disabled={isTraining}
                      >
                        {isTraining ? "Training..." : "Train AI"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button className="w-full" onClick={handlePreview}>
                      Preview AI Tutor
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleSaveAndPublish}>
                      Save & Publish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutorBuilder;
