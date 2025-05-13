
import { useState } from 'react';
import Navbar from '@/components/Navbar';
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
  Link as LinkIcon,
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
import { toast } from '@/hooks/use-toast';
import PracticeExercises from '@/components/PracticeExercises';
import { useNavigate } from 'react-router-dom';
import AITutorChat from '@/components/AITutorChat';
import CreatorDashboard from '@/components/CreatorStudio/CreatorDashboard';
import AIContentTools from '@/components/CreatorStudio/AIContentTools';
import ExerciseBuilder from '@/components/CreatorStudio/ExerciseBuilder';
import AITutorBuilder from '@/components/CreatorStudio/AITutorBuilder';

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
    icon: LinkIcon,
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

// Sample practice exercises for Exercise Builder tab
const practiceExercises = [
  {
    id: 'ex-1',
    title: 'HTML Structure Challenge',
    difficulty: 'Easy' as const,
    points: 10
  },
  {
    id: 'ex-2',
    title: 'CSS Flexbox Layout',
    difficulty: 'Medium' as const,
    points: 20
  },
  {
    id: 'ex-3',
    title: 'JavaScript Promises',
    difficulty: 'Hard' as const,
    points: 30
  },
  {
    id: 'ex-4',
    title: 'React Component Lifecycle',
    difficulty: 'Medium' as const,
    points: 25
  }
];

const CreatorStudio = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contentToolsTab, setContentToolsTab] = useState('planner');
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isTrainingTutor, setIsTrainingTutor] = useState(false);
  const [showAITutorChat, setShowAITutorChat] = useState(false);
  const form = useForm();
  const navigate = useNavigate();
  
  const handleGenerateOutline = (data: any) => {
    setIsGeneratingOutline(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGeneratingOutline(false);
      toast({
        title: "Outline Generated",
        description: `Created an outline for ${data.topic || 'your course'}`,
      });
    }, 2000);
  };

  const handleCreateCourse = () => {
    setIsAddingCourse(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAddingCourse(false);
      toast({
        title: "Course Created",
        description: "Your new course has been created successfully",
      });
    }, 1500);
  };

  const handleUploadVideo = () => {
    setIsUploadingVideo(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploadingVideo(false);
      toast({
        title: "Video Uploaded",
        description: "Your video has been uploaded and is being processed",
      });
    }, 2000);
  };

  const handleTrainTutor = () => {
    setIsTrainingTutor(true);
    
    // Simulate AI training process
    setTimeout(() => {
      setIsTrainingTutor(false);
      toast({
        title: "AI Tutor Training Started",
        description: "Your AI tutor is being trained with the provided materials",
      });
    }, 2000);
  };

  const handleLaunchTool = (toolName: string) => {
    toast({
      title: "Tool Launched",
      description: `${toolName} is now ready to use`,
    });
  };

  const handleSelectTemplate = (category: string, template: string) => {
    toast({
      title: "Template Selected",
      description: `Added ${template} template to your exercise`,
    });
  };
  
  return (
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
                <Button 
                  className="bg-learntube-red hover:bg-learntube-dark-red"
                  onClick={handleCreateCourse}
                  disabled={isAddingCourse}
                >
                  {isAddingCourse ? (
                    "Creating..."
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Course
                    </>
                  )}
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
                              onClick={() => {
                                toast({
                                  title: `Editing ${course.title}`,
                                  description: "Opening course editor",
                                });
                              }}
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
                      <Button 
                        className="bg-learntube-red hover:bg-learntube-dark-red"
                        onClick={handleCreateCourse}
                        disabled={isAddingCourse}
                      >
                        {isAddingCourse ? "Creating..." : "Get Started"}
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLaunchTool(tool.title)}
                        >
                          Launch Tool
                        </Button>
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
                      <Button 
                        className="bg-learntube-red hover:bg-learntube-dark-red"
                        onClick={handleUploadVideo}
                        disabled={isUploadingVideo}
                      >
                        {isUploadingVideo ? "Uploading..." : "Upload Video"}
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
                <Button 
                  className="bg-learntube-red hover:bg-learntube-dark-red"
                  onClick={() => {
                    toast({
                      title: "New Exercise",
                      description: "Creating a new blank exercise",
                    })
                  }}
                >
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
                            <div 
                              key={idx} 
                              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleSelectTemplate(category.category, template)}
                            >
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
                      <div 
                        className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        onClick={() => {
                          toast({
                            title: "Question Type Added",
                            description: "Multiple Choice question type added to your exercise",
                          });
                        }}
                      >
                        <h3 className="font-medium mb-1">Multiple Choice</h3>
                        <p className="text-xs text-gray-500">Select one or multiple correct answers</p>
                      </div>
                      <div 
                        className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        onClick={() => {
                          toast({
                            title: "Question Type Added",
                            description: "Code Challenge added to your exercise",
                          });
                        }}
                      >
                        <h3 className="font-medium mb-1">Code Challenge</h3>
                        <p className="text-xs text-gray-500">Write and test code solutions</p>
                      </div>
                      <div 
                        className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        onClick={() => {
                          toast({
                            title: "Question Type Added",
                            description: "Drag and Drop question added to your exercise",
                          });
                        }}
                      >
                        <h3 className="font-medium mb-1">Drag and Drop</h3>
                        <p className="text-xs text-gray-500">Match or order items visually</p>
                      </div>
                      <div 
                        className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        onClick={() => {
                          toast({
                            title: "Question Type Added",
                            description: "Fill in the Blanks question added to your exercise",
                          });
                        }}
                      >
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
                    
                    <Button 
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Exercise Preview",
                          description: "Opening exercise preview mode",
                        });
                      }}
                    >
                      Preview Exercise
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Practice Exercises</CardTitle>
                  <CardDescription>Interactive exercises for your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <PracticeExercises exercises={practiceExercises} />
                </CardContent>
              </Card>
              
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Template Upload",
                              description: "Please select a certificate template to upload",
                            });
                          }}
                        >
                          Upload Template
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <Label>Certificate Title</Label>
                        <Input defaultValue="Certificate of Completion" />
                      </div>
                      <div>
                        <Label>Course Name</Label>
                        <Input placeholder="Select a course..." />
                      </div>
                      <div>
                        <Label>Certificate Message</Label>
                        <Input defaultValue="This certifies that {student} has successfully completed {course}." />
                      </div>
                      <Button className="w-full bg-learntube-red hover:bg-learntube-dark-red">
                        Save Certificate Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* AI Tutor Tab */}
          {activeTab === 'ai-tutor' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">AI Tutor Builder</h1>
                <Button 
                  className="bg-learntube-red hover:bg-learntube-dark-red"
                  onClick={() => {
                    toast({
                      title: "New AI Tutor",
                      description: "Creating a new AI tutor",
                    });
                  }}
                >
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
                              <Image className="h-4 w-4 mr-2" />
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
          )}
          
          {/* Placeholder for other tabs */}
          {(activeTab === 'community' || activeTab === 'analytics' || activeTab === 'courses' || activeTab === 'settings') && (
            <div className="flex items-center justify-center h-[50vh]">
              <div className="text-center">
                <div className="rounded-full bg-gray-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {activeTab === 'community' && <Users className="h-8 w-8 text-gray-500" />}
                  {activeTab === 'analytics' && <BarChart className="h-8 w-8 text-gray-500" />}
                  {activeTab === 'courses' && <Book className="h-8 w-8 text-gray-500" />}
                  {activeTab === 'settings' && <Settings className="h-8 w-8 text-gray-500" />}
                </div>
                <h2 className="text-xl font-medium mb-2">
                  {activeTab === 'community' && 'Community'}
                  {activeTab === 'analytics' && 'Analytics'}
                  {activeTab === 'courses' && 'Courses'}
                  {activeTab === 'settings' && 'Settings'}
                </h2>
                <p className="text-gray-500 max-w-md">
                  This section is currently being built. Check back soon for updates!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorStudio;
