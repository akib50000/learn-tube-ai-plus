
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, BrainCircuit, Database, Upload, Users, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Star, Heart, Search } from "lucide-react";

const AITutorBuilder = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  
  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Knowledge base uploaded",
        description: "Your files were successfully uploaded and are being processed.",
        variant: "success",
      });
    }, 2000);
  };
  
  const handleCreateTutor = () => {
    toast({
      title: "AI Tutor created",
      description: "Your AI Tutor is ready to be deployed to your courses.",
      variant: "success",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Tutor Builder</h1>
            <p className="text-muted-foreground">Create intelligent AI tutors for your courses</p>
          </div>
          <Button onClick={handleCreateTutor}>Create New AI Tutor</Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar with options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Knowledge Base
                </CardTitle>
                <CardDescription>
                  Upload your course materials to train your AI tutor.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag & drop files or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Supported formats: PDF, DOCX, TXT, MD (Max: 50MB)
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleUpload} 
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Select Files"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your files will be processed and used to train your AI tutor to answer student questions.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Teaching Style
                </CardTitle>
                <CardDescription>
                  Customize how your AI tutor interacts with students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="personality">Tutor Personality</Label>
                    <select 
                      id="personality" 
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="supportive">Supportive - Encouraging & Patient</option>
                      <option value="socratic">Socratic - Question-based Learning</option>
                      <option value="direct">Direct - Straightforward Instruction</option>
                      <option value="mentor">Mentor - Experienced Guidance</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="communication">Communication Style</Label>
                    <select 
                      id="communication" 
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="formal">Formal & Academic</option>
                      <option value="conversational">Conversational & Friendly</option>
                      <option value="simplified">Simplified & Accessible</option>
                      <option value="technical">Technical & Precise</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="response-length">Response Length</Label>
                    <select 
                      id="response-length" 
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="concise">Concise (1-2 paragraphs)</option>
                      <option value="moderate">Moderate (2-4 paragraphs)</option>
                      <option value="detailed">Detailed (4+ paragraphs)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="preview">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Preview</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4" />
                  <span>Advanced</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Tutor Preview</CardTitle>
                    <CardDescription>
                      See how your AI tutor will interact with students.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-4">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                            S
                          </div>
                          <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">How do I implement a linked list in JavaScript?</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 justify-end">
                          <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">
                              To implement a linked list in JavaScript, you'll first need to create a Node class to represent each element in the list:
                            </p>
                            <pre className="bg-muted p-2 rounded mt-2 text-xs overflow-x-auto">
                              {`class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}`}
                            </pre>
                            <p className="text-sm mt-2">
                              Then, you can create your LinkedList class with methods like append, prepend, and delete. Would you like me to show you those methods as well?
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs">
                            AI
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex">
                        <Input 
                          placeholder="Ask your AI tutor a question..." 
                          className="rounded-r-none"
                        />
                        <Button className="rounded-l-none">Send</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                    <CardDescription>
                      Fine-tune your AI tutor's capabilities and behavior.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Response Patterns</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Use Socratic questioning</span>
                            <input type="checkbox" className="toggle" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Include code examples</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Offer multiple solutions</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Knowledge Sources</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Course materials only</span>
                            <input 
                              type="radio" 
                              name="knowledge" 
                              value="course" 
                              defaultChecked 
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Course materials + Web resources</span>
                            <input 
                              type="radio" 
                              name="knowledge" 
                              value="web" 
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Response Customization</h3>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Label>Welcome Message</Label>
                            <textarea 
                              className="w-full p-2 border rounded-md h-20"
                              defaultValue="Hi there! I'm your AI tutor for this course. Ask me anything about the material, and I'll help you understand it better."
                            ></textarea>
                          </div>
                          <div className="space-y-1">
                            <Label>Fallback Message</Label>
                            <textarea 
                              className="w-full p-2 border rounded-md h-20"
                              defaultValue="I'm not sure about that specific question. Could you rephrase or ask something related to the course material?"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      
                      <Button>Save Advanced Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>
                      Track how your AI tutor is helping students learn.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Total Interactions</h4>
                          <p className="text-3xl font-bold">248</p>
                        </Card>
                        <Card className="p-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Avg. Rating</h4>
                          <p className="text-3xl font-bold">4.7/5</p>
                        </Card>
                        <Card className="p-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Questions Solved</h4>
                          <p className="text-3xl font-bold">87%</p>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Common Questions</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="p-2 bg-muted/30 rounded-md flex justify-between">
                            <span>How do I implement a linked list?</span>
                            <span className="text-muted-foreground">24 times</span>
                          </li>
                          <li className="p-2 bg-muted/30 rounded-md flex justify-between">
                            <span>What's the difference between var, let, and const?</span>
                            <span className="text-muted-foreground">18 times</span>
                          </li>
                          <li className="p-2 bg-muted/30 rounded-md flex justify-between">
                            <span>How does React's virtual DOM work?</span>
                            <span className="text-muted-foreground">15 times</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Student Feedback</h3>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-md">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Very helpful explanations</span>
                              <div className="flex">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              "The AI tutor explained complex concepts in simple terms and provided great examples."
                            </p>
                          </div>
                          <div className="p-3 border rounded-md">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Could use more examples</span>
                              <div className="flex">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <Star className="h-4 w-4" />
                                <Star className="h-4 w-4" />
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              "Good explanations but would have liked more practical examples."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutorBuilder;
