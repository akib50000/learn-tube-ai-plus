
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
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

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

const CreatorStudio = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
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
                variant={activeTab === 'ai-tutor' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('ai-tutor')}
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Tutor
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
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
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
            
            {/* AI Tutor Builder */}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        
                        <div className="border p-4 rounded-lg flex flex-col items-center text-center hover:border-primary transition-colors">
                          <MessagesSquare className="h-8 w-8 mb-3 text-learntube-red" />
                          <h3 className="font-medium mb-1">Response Patterns</h3>
                          <p className="text-sm text-gray-500 mb-3">Customize how your AI interacts with students</p>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                        
                        <div className="border p-4 rounded-lg flex flex-col items-center text-center hover:border-primary transition-colors">
                          <Settings className="h-8 w-8 mb-3 text-learntube-red" />
                          <h3 className="font-medium mb-1">Teaching Style</h3>
                          <p className="text-sm text-gray-500 mb-3">Set personality, tone and teaching approach</p>
                          <Button variant="outline" size="sm">Customize</Button>
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
                          <div>
                            <h4 className="font-medium">WebDev Helper</h4>
                            <p className="text-xs text-gray-500">Web Development Course</p>
                          </div>
                        </div>
                        <div className="text-xs flex justify-between">
                          <span>Active: 12 days</span>
                          <span>247 students helped</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2">Manage</Button>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Brain className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Design Mentor</h4>
                            <p className="text-xs text-gray-500">UX Design Course</p>
                          </div>
                        </div>
                        <div className="text-xs flex justify-between">
                          <span>Active: 5 days</span>
                          <span>124 students helped</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2">Manage</Button>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New AI Tutor
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>AI Content Planning</CardTitle>
                    <CardDescription>Let AI help you plan and create course content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border p-4 rounded-lg flex flex-col hover:shadow-md transition-shadow">
                        <Sparkles className="h-6 w-6 mb-2 text-learntube-red" />
                        <h3 className="font-medium mb-1">Course Outline Generator</h3>
                        <p className="text-sm text-gray-500 mb-3">Generate comprehensive course structure and modules</p>
                        <Button variant="outline" size="sm" className="mt-auto">Generate Outline</Button>
                      </div>
                      
                      <div className="border p-4 rounded-lg flex flex-col hover:shadow-md transition-shadow">
                        <FileText className="h-6 w-6 mb-2 text-learntube-red" />
                        <h3 className="font-medium mb-1">Lesson Script Writer</h3>
                        <p className="text-sm text-gray-500 mb-3">Create detailed scripts for your video lessons</p>
                        <Button variant="outline" size="sm" className="mt-auto">Write Scripts</Button>
                      </div>
                      
                      <div className="border p-4 rounded-lg flex flex-col hover:shadow-md transition-shadow">
                        <Book className="h-6 w-6 mb-2 text-learntube-red" />
                        <h3 className="font-medium mb-1">Quiz & Assessment Creator</h3>
                        <p className="text-sm text-gray-500 mb-3">Generate questions and practice exercises</p>
                        <Button variant="outline" size="sm" className="mt-auto">Create Assessments</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Placeholder for other tabs */}
            {activeTab !== 'dashboard' && activeTab !== 'ai-tutor' && (
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
