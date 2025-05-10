import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/hooks/use-theme';
import {
  Video,
  Upload,
  Book,
  Settings,
  BarChart,
  Plus,
  Users,
  FileText,
  Brain,
  MessagesSquare,
  Sparkles,
  Code,
  Image,
  ListFilter,
  Link,
  FileVideo,
  CheckCircle,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';

// Sample creator courses data
const creatorCourses = [
  {
    id: 'course-1',
    title: 'Introduction to Web Development',
    status: 'published',
    students: 345,
    rating: 4.8,
    revenue: 4250,
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
    lastUpdated: '2 days ago',
    progress: 100
  },
  {
    id: 'course-2',
    title: 'Advanced React Patterns',
    status: 'draft',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
    lastUpdated: '5 days ago',
    progress: 65
  },
  {
    id: 'course-3',
    title: 'UX Research Methods',
    status: 'draft',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
    lastUpdated: 'Just now',
    progress: 25
  }
];

// Sample content tools data
const contentTools = [
  {
    id: 'tool-1',
    title: 'AI Content Planner',
    description: 'Generate course outlines and topic suggestions based on keywords',
    icon: Sparkles,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'tool-2',
    title: 'Video Editor',
    description: 'Trim, annotate, and add captions to your lecture videos',
    icon: FileVideo,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'tool-3',
    title: 'Exercise Builder',
    description: 'Create interactive exercises with various question types',
    icon: FileText,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'tool-4',
    title: 'Assessment Creator',
    description: 'Build quizzes and assessments with auto-grading',
    icon: CheckCircle,
    color: 'bg-amber-100 text-amber-600'
  },
  {
    id: 'tool-5',
    title: 'Resource Manager',
    description: 'Organize PDFs, links, and other learning materials',
    icon: Link,
    color: 'bg-red-100 text-red-600'
  },
  {
    id: 'tool-6',
    title: 'AI Tutor Builder',
    description: 'Create custom AI tutors for your courses',
    icon: Brain,
    color: 'bg-indigo-100 text-indigo-600'
  }
];

// Sample exercise templates based on categories
const exerciseTemplates = [
  {
    category: 'Technology',
    icon: Code,
    templates: [
      'Live code editor with test cases',
      'Algorithm challenge',
      'Debug existing code',
      'API integration practice'
    ]
  },
  {
    category: 'Design',
    icon: Image,
    templates: [
      'Image annotation exercise',
      'Color palette matching',
      'UI component critique',
      'Responsive design challenge'
    ]
  },
  {
    category: 'Language',
    icon: MessagesSquare,
    templates: [
      'Listening comprehension',
      'Vocabulary flashcards',
      'Grammar exercises',
      'Conversation practice'
    ]
  },
  {
    category: 'Business',
    icon: BarChart,
    templates: [
      'Case study analysis',
      'Drag-and-drop flowcharts',
      'Market analysis exercise',
      'Financial modeling'
    ]
  }
];

const CreatorStudio = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contentToolsTab, setContentToolsTab] = useState('planner');
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const form = useForm();
  
  const handleGenerateOutline = () => {
    setIsGeneratingOutline(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGeneratingOutline(false);
    }, 2000);
  };
  
  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <div className="flex flex-1 bg-gray-50 dark:bg-learntube-darker-gray">
          {/* Creator Studio Sidebar */}
          <div className="w-64 bg-white dark:bg-learntube-dark-gray border-r hidden md:block p-4">
            <h2 className="font-bold text-xl mb-6">Creator Studio</h2>
            
            <nav className="space-y-1">
              <Button
                variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('dashboard')}
              >
                <BarChart className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'courses' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('courses')}
              >
                <Video className="h-4 w-4 mr-2" />
                My Courses
              </Button>
              <Button
                variant={activeTab === 'ai-tools' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('ai-tools')}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Content Tools
              </Button>
              <Button
                variant={activeTab === 'ai-tutor' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('ai-tutor')}
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Tutor Builder
              </Button>
              <Button
                variant={activeTab === 'exercises' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('exercises')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Exercise Builder
              </Button>
              <Button
                variant={activeTab === 'analytics' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('analytics')}
              >
                <BarChart className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button
                variant={activeTab === 'community' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('community')}
              >
                <Users className="h-4 w-4 mr-2" />
                Community
              </Button>
              <Button
                variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </nav>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden p-4 w-full border-b bg-white dark:bg-learntube-dark-gray">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="ai-tools">Tools</TabsTrigger>
                <TabsTrigger value="ai-tutor">AI Tutor</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 p-4 md:p-8 overflow-auto">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Creator Dashboard</h1>
                  <Button className="bg-learntube-red hover:bg-learntube-dark-red">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Course
                  </Button>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">345</div>
                      <p className="text-xs text-green-600">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Course Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.8</div>
                      <p className="text-xs text-green-600">+0.2 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$4,250</div>
                      <p className="text-xs text-green-600">+8% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Course Completion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">72%</div>
                      <p className="text-xs text-green-600">+5% from last month</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Recent Courses */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Courses</CardTitle>
                    <CardDescription>Manage and track your course portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {creatorCourses.map(course => (
                        <div 
                          key={course.id}
                          className="border rounded-lg overflow-hidden bg-white dark:bg-learntube-dark-gray"
                        >
                          <div className="aspect-video relative">
                            <img 
                              src={course.thumbnail} 
                              alt={course.title} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute top-2 right-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                course.status === 'published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {course.status === 'published' ? 'Published' : 'Draft'}
                              </span>
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium mb-2 line-clamp-1">{course.title}</h3>
                            
                            {course.progress < 100 && (
                              <div className="mb-2">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Completion</span>
                                  <span>{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} />
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <span>Updated {course.lastUpdated}</span>
                              {course.students && <span>{course.students} students</span>}
                            </div>
                            
                            <div className="mt-3 flex">
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="text-xs w-full bg-learntube-red hover:bg-learntube-dark-red"
                              >
                                {course.status === 'published' ? 'Edit Course' : 'Continue Editing'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Create New Course Card */}
                      <div className="border rounded-lg overflow-hidden bg-white dark:bg-learntube-dark-gray border-dashed border-gray-300 flex flex-col items-center justify-center p-6 h-full min-h-[200px]">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                          <Plus className="h-6 w-6 text-gray-500" />
                        </div>
                        <h3 className="font-medium mb-2">Create New Course</h3>
                        <p className="text-sm text-gray-500 text-center mb-4">Start building your next amazing learning experience</p>
                        <Button className="bg-learntube-red hover:bg-learntube-dark-red">
                          Get Started
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* AI Content Tools Tab */}
            {activeTab === 'ai-tools' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">AI Content Tools</h1>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-learntube-red hover:bg-learntube-dark-red">
                        <Plus className="h-4 w-4 mr-2" />
                        New Content
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Generate New Content</DialogTitle>
                        <DialogDescription>
                          Use AI to generate course outlines, exercises, or assessments.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(handleGenerateOutline)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="topic"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Course Topic/Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Introduction to Machine Learning" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    What is the main topic of your course?
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="keywords"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Keywords</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., algorithms, data science, neural networks" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Separate keywords with commas
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="level"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Difficulty Level</FormLabel>
                                  <FormControl>
                                    <select 
                                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2" 
                                      {...field}
                                    >
                                      <option value="beginner">Beginner</option>
                                      <option value="intermediate">Intermediate</option>
                                      <option value="advanced">Advanced</option>
                                    </select>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <Button 
                              type="submit" 
                              className="w-full bg-learntube-red hover:bg-learntube-dark-red"
                              disabled={isGeneratingOutline}
                            >
                              {isGeneratingOutline ? 'Generating...' : 'Generate Course Outline'}
                            </Button>
                          </form>
                        </Form>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>AI-Powered Course Creation</CardTitle>
                    <CardDescription>Use our suite of AI tools to quickly create engaging courses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {contentTools.map((tool) => (
                        <div key={tool.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tool.color}`}>
                              <tool.icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-medium">{tool.title}</h3>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{tool.description}</p>
                          <Button variant="outline" size="sm">Launch Tool</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Video-to-Course Generator</CardTitle>
                    <CardDescription>Upload a video lecture and let AI generate a complete course module</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium mb-2">Drop your video file here</h3>
                      <p className="text-gray-500 mb-4 max-w-md mx-auto">
                        Upload a lecture video and our AI will automatically extract chapters, create a transcript, generate slides, and build a course outline.
                      </p>
                      <div className="flex flex-col gap-2 items-center">
                        <Button className="bg-learntube-red hover:bg-learntube-dark-red">
                          Upload Video
                        </Button>
                        <span className="text-xs text-gray-500">MP4, MOV or AVI (max. 2GB)</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 border-t pt-6">
                      <h3 className="font-medium mb-3">What you'll get:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="border rounded p-3 text-center">
                          <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                          <span className="text-sm">Transcript</span>
                        </div>
                        <div className="border rounded p-3 text-center">
                          <ListFilter className="h-6 w-6 mx-auto mb-2 text-green-500" />
                          <span className="text-sm">Chapters</span>
                        </div>
                        <div className="border rounded p-3 text-center">
                          <Image className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                          <span className="text-sm">Visual Slides</span>
                        </div>
                        <div className="border rounded p-3 text-center">
                          <FileText className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                          <span className="text-sm">Exercises</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Exercise Builder Tab */}
            {activeTab === 'exercises' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Interactive Exercise Builder</h1>
                  <Button className="bg-learntube-red hover:bg-learntube-dark-red">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Exercise
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Exercise Templates</CardTitle>
                      <CardDescription>Pre-built templates for different course categories</CardDescription>
                    </CardHeader>
                    <CardContent className="max-h-[400px] overflow-y-auto space-y-4">
                      {exerciseTemplates.map((category, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                              <category.icon className="h-4 w-4" />
                            </div>
                            <h3 className="font-medium">{category.category}</h3>
                          </div>
                          <div className="space-y-2">
                            {category.templates.map((template, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <Plus className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{template}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Question Types</CardTitle>
                      <CardDescription>Drag and drop question types to build your exercise</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                          <h3 className="font-medium mb-1">Multiple Choice</h3>
                          <p className="text-xs text-gray-500">Select one or multiple correct answers</p>
                        </div>
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                          <h3 className="font-medium mb-1">Code Challenge</h3>
                          <p className="text-xs text-gray-500">Write and test code solutions</p>
                        </div>
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                          <h3 className="font-medium mb-1">Drag and Drop</h3>
                          <p className="text-xs text-gray-500">Match or order items visually</p>
                        </div>
                        <div className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                          <h3 className="font-medium mb-1">Fill in the Blanks</h3>
                          <p className="text-xs text-gray-500">Complete text with missing words</p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 mb-4">
                        <h3 className="font-medium mb-3">Exercise Settings</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Time Limit</span>
                            <div className="flex items-center gap-2">
                              <Input type="number" className="w-16 h-8" defaultValue="10" />
                              <span className="text-sm text-gray-500">minutes</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Grading</span>
                            <select className="h-8 rounded-md border border-input bg-background px-2">
                              <option>Auto-graded</option>
                              <option>Manual review</option>
                              <option>Both</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Attempts</span>
                            <Input type="number" className="w-16 h-8" defaultValue="2" />
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full">Preview Exercise</Button>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Certification Setup</CardTitle>
                    <CardDescription>Create certificates for course completion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="aspect-[8.5/11] bg-gray-50 border rounded-lg flex items-center justify-center mb-3">
                          <div className="w-[80%] h-[80%] border border-dashed border-gray-300 flex items-center justify-center">
                            <div className="text-center">
                              <h3 className="text-xl font-serif mb-1">Certificate of Completion</h3>
                              <p className="text-sm text-gray-500">Your certificate template will appear here</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Button variant="outline" size="sm">Upload Template</Button>
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <Label>Certificate Title</Label>
                          <Input defaultValue="Certificate of Completion" />
                        </div>
                        
                        <div>
                          <Label>Issuing Criteria</Label>
                          <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                            <option>Course completion (100%)</option>
                            <option>Minimum score on final assessment</option>
                            <option>Custom criteria</option>
                          </select>
                        </div>
                        
                        <div>
                          <Label>Digital Badge</Label>
                          <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" id="linkedin-badge" />
                            <Label htmlFor="linkedin-badge" className="text-sm">Enable LinkedIn badge</Label>
                          </div>
                        </div>
                        
                        <Button className="bg-learntube-red hover:bg-learntube-dark-red">Save Certificate Settings</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* AI Tutor Builder - Keep but enhance the existing one */}
            {activeTab === 'ai-tutor' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">AI Tutor Builder</h1>
                  <Button className="bg-learntube-red hover:bg-learntube-dark-red">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New AI Tutor
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Build Your AI Teaching Assistant</CardTitle>
                      <CardDescription>Create custom AI tutors for your courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="border p-4 rounded-lg flex flex-col items-center text-center hover:border-primary transition-colors">
                          <Upload className="h-8 w-8 mb-3 text-learntube-red" />
                          <h3 className="font-medium mb-1">Upload Knowledge Base</h3>
                          <p className="text-sm text-gray-500 mb-3">Upload materials, notes and resources for your AI tutor</p>
                          <Button variant="outline" size="sm">Upload Files</Button>
                        </div>
                        
                        <div className="border p-4 rounded-lg flex flex-col items-center text-center hover:border-primary transition-colors">
                          <Brain className="h-8 w-8 mb-3 text-learntube-red" />
                          <h3 className="font-medium mb-1">Train Your Model</h3>
                          <p className="text-sm text-gray-500 mb-3">Customize your AI's learning style and approach</p>
                          <Button variant="outline" size="sm">Start Training</Button>
                        </div>
                      </div>
                      
                      {/* New Teaching Style Configuration */}
                      <div className="border-t pt-6 mb-6">
                        <h3 className="font-medium mb-4">Teaching Style Configuration</h3>
                        <div className="space-y-4">
                          <div>
                            <Label>Communication Tone</Label>
                            <div className="grid grid-cols-5 gap-2 mt-2">
                              <Button variant="outline" size="sm" className="bg-blue-50">Casual</Button>
                              <Button variant="outline" size="sm">Friendly</Button>
                              <Button variant="outline" size="sm">Balanced</Button>
                              <Button variant="outline" size="sm">Professional</Button>
                              <Button variant="outline" size="sm">Academic</Button>
                            </div>
                          </div>
                          
                          <div>
                            <Label>Interactivity Level</Label>
                            <div className="mt-2">
                              <div className="flex items-center justify-between mb-1 text-xs">
                                <span>Less Interactive</span>
                                <span>More Interactive</span>
                              </div>
                              <Input type="range" min="1" max="5" defaultValue="3" className="w-full" />
                            </div>
                          </div>
                          
                          <div>
                            <Label>Explanation Style</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                              <Button variant="outline" size="sm" className="bg-blue-50">Examples-based</Button>
                              <Button variant="outline" size="sm">Conceptual</Button>
                              <Button variant="outline" size="sm">Step-by-step</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Response Pattern Editor */}
                      <div className="border-t pt-6">
                        <h3 className="font-medium mb-4">Response Pattern Editor</h3>
                        <div className="space-y-4">
                          <div>
                            <Label>When student is confused:</Label>
                            <textarea 
                              className="w-full h-20 p-2 border rounded-md mt-1"
                              defaultValue="I understand this might be confusing. Let me break it down into simpler steps..."
                            ></textarea>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>When student is doing well:</Label>
                              <Input 
                                defaultValue="Great job! You're making excellent progress." 
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label>When student needs a hint:</Label>
                              <Input 
                                defaultValue="Here's a small hint to help you along..." 
                                className="mt-1"
                              />
                            </div>
                          </div>
                          
                          <Button className="bg-learntube-red hover:bg-learntube-dark-red">
                            Save AI Tutor Configuration
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Your AI Tutors</CardTitle>
                      <CardDescription>Active AI tutors for your courses</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Brain className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">WebDev Helper</h4>
                              <Badge variant="success">Active</Badge>
                            </div>
                            <p className="text-xs text-gray-500">Web Development Course</p>
                          </div>
                        </div>
                        <div className="text-xs flex justify-between mt-2 mb-2">
                          <span>Active: 12 days</span>
                          <span>247 students helped</span>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Analytics</Button>
                          <Button variant="outline" size="sm">Settings</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Brain className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Design Mentor</h4>
                              <Badge variant="success">Active</Badge>
                            </div>
                            <p className="text-xs text-gray-500">UX Design Course</p>
                          </div>
                        </div>
                        <div className="text-xs flex justify-between mt-2 mb-2">
                          <span>Active: 5 days</span>
                          <span>124 students helped</span>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Analytics</Button>
                          <Button variant="outline" size="sm">Settings</Button>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-3">Performance Overview</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Response Accuracy</span>
                              <span>87%</span>
                            </div>
                            <Progress value={87} className="h-1" />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Student Satisfaction</span>
                              <span>92%</span>
                            </div>
                            <Progress value={92} className="h-1" />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Daily Active Users</span>
                              <span>65%</span>
                            </div>
                            <Progress value={65} className="h-1" />
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New AI Tutor
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Placeholder for other tabs */}
            {(activeTab !== 'dashboard' && activeTab !== 'ai-tools' && activeTab !== 'ai-tutor' && activeTab !== 'exercises') && (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  {activeTab === 'courses' && <Video className="h-8 w-8 text-gray-500" />}
                  {activeTab === 'analytics' && <BarChart className="h-8 w-8 text-gray-500" />}
                  {activeTab === 'community' && <Users className="h-8 w-8 text-gray-500" />}
                  {activeTab === 'settings' && <Settings className="h-8 w-8 text-gray-500" />}
                </div>
                <h2 className="text-2xl font-bold mb-2 capitalize">{activeTab}</h2>
                <p className="text-gray-500 max-w-md">
                  This section is under development. Check back soon for more features.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CreatorStudio;
