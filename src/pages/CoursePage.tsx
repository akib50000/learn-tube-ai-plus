import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Clock,
  Download,
  FileText,
  Globe,
  MessageSquare,
  Play,
  Share2,
  Star,
  ThumbsUp,
  User,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  List,
  Settings,
  Plus,
  Search,
  Heart,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/use-theme';
import { formatNumber, formatDuration } from '@/lib/utils';
import AITutorTab from '@/components/AITutorTab';

// Feature Item component
const FeatureItem = ({ icon: Icon, children }: { icon?: React.ComponentType<any>; children: React.ReactNode }) => (
  <li className="flex items-start">
    {Icon && (
      <div className="mr-2 h-5 w-5 text-green-500">
        <Icon className="h-5 w-5" />
      </div>
    )}
    <span>{children}</span>
  </li>
);

interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
  isExpanded?: boolean;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  date: string;
  content: string;
}

interface Question {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  date: string;
  content: string;
  answers: Answer[];
}

interface Answer {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  date: string;
  content: string;
  isAccepted?: boolean;
  votes: number;
}

const CoursePage = () => {
  const { courseId } = useParams<{courseId: string}>();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [modules, setModules] = useState<Module[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentLessonId, setCurrentLessonId] = useState<string>("");
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Simulate API call to fetch course data
    const fetchCourse = async () => {
      setIsLoading(true);
      
      // Mock data
      setTimeout(() => {
        if (courseId === 'not-found') {
          setCourse(null);
        } else {
          const mockCourse = {
            id: courseId,
            title: "Mastering Web Development: React, Node.js, and MongoDB",
            description: "Learn to build modern, responsive web applications using React on the frontend and Node.js with MongoDB on the backend. This comprehensive course covers everything from setup to deployment.",
            thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000",
            instructor: {
              id: "instructor-1",
              name: "David Chen",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              bio: "Full Stack Developer with 10+ years of experience",
              courses: 12,
              students: 45000,
              rating: 4.9
            },
            rating: 4.8,
            reviewCount: 1253,
            studentCount: 45892,
            price: 49.99,
            duration: "24h 45m",
            lastUpdated: "October 2023",
            language: "English",
            level: "Intermediate",
            progress: 35,
            tags: ["Web Development", "React", "Node.js", "MongoDB", "JavaScript"],
            features: [
              "24+ hours of high-quality video content",
              "85 coding exercises and projects",
              "Downloadable source code",
              "Certificate of completion",
              "Lifetime access to updates"
            ]
          };
          
          setCourse(mockCourse);
          
          const mockModules = [
            {
              id: "module-1",
              title: "Getting Started with Web Development",
              duration: "2h 15m",
              isExpanded: true,
              lessons: [
                {
                  id: "lesson-1-1",
                  title: "Course Introduction and Setup",
                  duration: "15m",
                  isCompleted: true
                },
                {
                  id: "lesson-1-2",
                  title: "HTML5 Essentials",
                  duration: "45m",
                  isCompleted: true
                },
                {
                  id: "lesson-1-3",
                  title: "CSS3 Fundamentals",
                  duration: "35m",
                  isCompleted: true
                },
                {
                  id: "lesson-1-4",
                  title: "JavaScript Basics",
                  duration: "40m",
                  isCompleted: false
                }
              ]
            },
            {
              id: "module-2",
              title: "React Fundamentals",
              duration: "4h 30m",
              lessons: [
                {
                  id: "lesson-2-1",
                  title: "Introduction to React",
                  duration: "30m",
                  isCompleted: false
                },
                {
                  id: "lesson-2-2",
                  title: "Components and Props",
                  duration: "45m",
                  isCompleted: false
                },
                {
                  id: "lesson-2-3",
                  title: "State and Lifecycle",
                  duration: "55m",
                  isCompleted: false
                },
                {
                  id: "lesson-2-4",
                  title: "Handling Events",
                  duration: "40m",
                  isCompleted: false
                },
                {
                  id: "lesson-2-5",
                  title: "Conditional Rendering",
                  duration: "35m",
                  isCompleted: false
                },
                {
                  id: "lesson-2-6",
                  title: "Lists and Keys",
                  duration: "25m",
                  isCompleted: false
                }
              ]
            },
            {
              id: "module-3",
              title: "Advanced React",
              duration: "5h 45m",
              lessons: [
                {
                  id: "lesson-3-1",
                  title: "React Hooks",
                  duration: "1h 10m",
                  isCompleted: false
                },
                {
                  id: "lesson-3-2",
                  title: "Context API",
                  duration: "45m",
                  isCompleted: false
                },
                {
                  id: "lesson-3-3",
                  title: "React Router",
                  duration: "50m",
                  isCompleted: false
                },
                {
                  id: "lesson-3-4",
                  title: "Redux State Management",
                  duration: "1h 20m",
                  isCompleted: false,
                  isLocked: true
                }
              ]
            },
            {
              id: "module-4",
              title: "Node.js and Express",
              duration: "4h 20m",
              lessons: [
                {
                  id: "lesson-4-1",
                  title: "Introduction to Node.js",
                  duration: "40m",
                  isCompleted: false,
                  isLocked: true
                },
                {
                  id: "lesson-4-2",
                  title: "Express Framework Basics",
                  duration: "55m",
                  isCompleted: false,
                  isLocked: true
                }
              ]
            },
            {
              id: "module-5",
              title: "MongoDB and Database Integration",
              duration: "3h 45m",
              lessons: [
                {
                  id: "lesson-5-1",
                  title: "MongoDB Basics",
                  duration: "50m",
                  isCompleted: false,
                  isLocked: true
                }
              ]
            },
            {
              id: "module-6",
              title: "Full Stack Project: Social Media App",
              duration: "5h 15m",
              lessons: [
                {
                  id: "lesson-6-1",
                  title: "Project Overview and Planning",
                  duration: "25m",
                  isCompleted: false,
                  isLocked: true
                }
              ]
            }
          ];
          
          setModules(mockModules);
          
          // Set the first lesson as current lesson
          if (mockModules.length > 0 && mockModules[0].lessons.length > 0) {
            setCurrentLessonId(mockModules[0].lessons[0].id);
          }
          
          const mockReviews = [
            {
              id: "review-1",
              user: {
                name: "Sarah Johnson",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              rating: 5,
              date: "October 15, 2023",
              content: "This course exceeded my expectations! David explains complex concepts in a way that's easy to understand. The projects were challenging but incredibly rewarding. I went from knowing basic HTML to building full-stack applications. Highly recommended!"
            },
            {
              id: "review-2",
              user: {
                name: "Michael Brown"
              },
              rating: 4,
              date: "September 28, 2023",
              content: "Great course overall. The React section was particularly well-explained and the exercises helped reinforce the concepts. I would have liked more depth on testing, but otherwise it was excellent."
            },
            {
              id: "review-3",
              user: {
                name: "Emily Wilson",
                avatar: "https://randomuser.me/api/portraits/women/67.jpg"
              },
              rating: 5,
              date: "August 12, 2023",
              content: "As someone who had tried to learn React multiple times before, this course finally made it click for me. The instructor's teaching style is engaging and the project-based approach kept me motivated throughout. Worth every penny!"
            }
          ];
          
          setReviews(mockReviews);
          
          const mockQuestions = [
            {
              id: "question-1",
              user: {
                name: "Alex Rodriguez",
                avatar: "https://randomuser.me/api/portraits/men/64.jpg"
              },
              date: "October 10, 2023",
              content: "In the Redux section, I'm having trouble with connecting my actions to the reducer. The state isn't updating when I dispatch actions. Has anyone else encountered this issue?",
              answers: [
                {
                  id: "answer-1-1",
                  user: {
                    name: "David Chen",
                    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
                  },
                  date: "October 11, 2023",
                  content: "Hi Alex, this is typically caused by either not exporting your action creators correctly or not connecting the component properly with connect() or useDispatch(). Check out lesson 3-4 at timestamp 48:30 where I cover common Redux debugging techniques. Let me know if that helps!",
                  isAccepted: true,
                  votes: 12
                }
              ]
            },
            {
              id: "question-2",
              user: {
                name: "Priya Patel"
              },
              date: "September 25, 2023",
              content: "I'm trying to implement authentication with JWT in my final project but I'm getting a 401 error when trying to access protected routes. Any suggestions?",
              answers: [
                {
                  id: "answer-2-1",
                  user: {
                    name: "Thomas White",
                    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
                  },
                  date: "September 26, 2023",
                  content: "Make sure you're including the token in the Authorization header with the Bearer prefix. Also check if your token isn't expired. I had the same issue and it turned out my token was expiring too quickly.",
                  votes: 5
                }
              ]
            }
          ];
          
          setQuestions(mockQuestions);
        }
        
        setIsLoading(false);
      }, 1000);
    };
    
    fetchCourse();
  }, [courseId]);

  const toggleModuleExpansion = (moduleId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, isExpanded: !module.isExpanded } 
        : module
    ));
  };
  
  const handleSelectLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    
    // Update progress
    toast({
      title: "Lesson selected",
      description: "Starting a new lesson",
      variant: "default",
    });
  };
  
  const handleEnrollClick = () => {
    toast({
      title: "Enrolled successfully!",
      description: "You have been enrolled in this course",
      variant: "success",
    });
  };
  
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleDownload = () => {
    toast({
      title: "Downloading content",
      description: "Your content will be available offline shortly",
      variant: "default",
    });
  };
  
  // If course not found, redirect to error page
  if (!isLoading && !course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-12 px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            The course you're looking for doesn't exist or may have been removed.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/explore">Browse Courses</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {isLoading ? (
        <div className="container py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="w-full aspect-video rounded-lg mb-6" />
              <Skeleton className="h-10 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div>
              <Skeleton className="w-full h-96 rounded-lg" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Video Player Section */}
          <div className="bg-black text-white">
            <div className="container py-6">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {!isPlaying && (
                    <div className="text-center">
                      <Button 
                        size="lg" 
                        className="mb-4 rounded-full h-16 w-16 flex items-center justify-center"
                        onClick={handleTogglePlay}
                      >
                        <Play className="h-8 w-8 ml-1" />
                      </Button>
                      <h2 className="text-xl font-medium">
                        {modules[0]?.lessons[0]?.title || "Introduction to the Course"}
                      </h2>
                    </div>
                  )}
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <Progress value={30} className="h-1 mb-3" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button size="icon" variant="ghost" className="text-white" onClick={handleTogglePlay}>
                        {isPlaying ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                          </svg>
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <span className="text-xs">4:25 / 15:30</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button size="icon" variant="ghost" className="text-white" onClick={handleDownload}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-white">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="container py-8 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Course Content */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-muted-foreground ml-1">({formatNumber(course.reviewCount)} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{formatNumber(course.studentCount)} students</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{course.language}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                      <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link 
                        to={`/profile/${course.instructor.id}/creator`}
                        className="font-medium hover:underline"
                      >
                        {course.instructor.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{course.instructor.bio}</p>
                    </div>
                  </div>
                  
                  {course.progress > 0 && (
                    <Card className="mb-6">
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Your Progress</h3>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span>{course.progress}% complete</span>
                          <span>12/36 lessons</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <Button className="w-full mt-4">Continue Learning</Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-6 w-full justify-start">
                    <TabsTrigger value="overview" className="flex-1 sm:flex-none">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum" className="flex-1 sm:flex-none">Curriculum</TabsTrigger>
                    <TabsTrigger value="reviews" className="flex-1 sm:flex-none">Reviews</TabsTrigger>
                    <TabsTrigger value="qa" className="flex-1 sm:flex-none">Q&A</TabsTrigger>
                    <TabsTrigger value="ai-tutor" className="flex-1 sm:flex-none">AI Tutor</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-medium mb-3">About This Course</h3>
                        <p className="text-muted-foreground mb-4">
                          {course.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">What you'll learn</h4>
                              <ul className="space-y-2">
                                <FeatureItem icon={CheckCircle}>Build complete web applications from front to back end</FeatureItem>
                                <FeatureItem icon={CheckCircle}>Master React hooks, context API, and state management</FeatureItem>
                                <FeatureItem icon={CheckCircle}>Develop REST APIs with Node.js and Express</FeatureItem>
                                <FeatureItem icon={CheckCircle}>Connect and interact with MongoDB databases</FeatureItem>
                                <FeatureItem icon={CheckCircle}>Deploy applications to production environments</FeatureItem>
                              </ul>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Course features</h4>
                              <ul className="space-y-2">
                                {course.features.map((feature: string, index: number) => (
                                  <FeatureItem key={index} icon={CheckCircle}>{feature}</FeatureItem>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-medium mb-3">Requirements</h3>
                        <ul className="space-y-2">
                          <FeatureItem>Basic knowledge of HTML, CSS, and JavaScript</FeatureItem>
                          <FeatureItem>A computer with an internet connection</FeatureItem>
                          <FeatureItem>Code editor (VS Code recommended)</FeatureItem>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-medium mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {course.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="curriculum">
                    <div>
                      <div className="flex justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-medium">Course Curriculum</h3>
                          <p className="text-sm text-muted-foreground">
                            {modules.length} modules • {
                              modules.reduce((acc, module) => acc + module.lessons.length, 0)
                            } lessons • {course.duration} total length
                          </p>
                        </div>
                        {course.progress > 0 && (
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark All as Completed
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        {modules.map((module) => (
                          <Card key={module.id} className="overflow-hidden">
                            <button 
                              className="w-full flex justify-between items-center p-4 hover:bg-muted/50 transition-colors text-left"
                              onClick={() => toggleModuleExpansion(module.id)}
                            >
                              <div className="flex items-center">
                                <div className="mr-4 bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center">
                                  <List className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{module.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {module.lessons.length} lessons • {module.duration}
                                  </p>
                                </div>
                              </div>
                              {module.isExpanded ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              )}
                            </button>
                            
                            {module.isExpanded && (
                              <div className="border-t">
                                {module.lessons.map((lesson) => (
                                  <button
                                    key={lesson.id}
                                    className={cn(
                                      "w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left",
                                      currentLessonId === lesson.id && "bg-muted",
                                      lesson.isLocked && "opacity-60"
                                    )}
                                    onClick={() => !lesson.isLocked && handleSelectLesson(lesson.id)}
                                    disabled={lesson.isLocked}
                                  >
                                    <div className="flex items-center">
                                      <div className="mr-4 rounded-full w-8 h-8 flex items-center justify-center">
                                        {lesson.isCompleted ? (
                                          <div className="bg-green-100 dark:bg-green-900/30 w-8 h-8 rounded-full flex items-center justify-center">
                                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                          </div>
                                        ) : lesson.isLocked ? (
                                          <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
                                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                          </div>
                                        ) : (
                                          <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                                            <Play className="h-4 w-4 text-primary" />
                                          </div>
                                        )}
                                      </div>
                                      <div className="text-left">
                                        <h5 className="font-medium text-sm">{lesson.title}</h5>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                          <Clock className="h-3 w-3 mr-1" />
                                          <span>{lesson.duration}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {currentLessonId === lesson.id && (
                                      <Badge variant="secondary">Currently Viewing</Badge>
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                          <div className="text-center md:text-left">
                            <div className="text-5xl font-bold mb-2">{course.rating}</div>
                            <div className="flex justify-center md:justify-start mb-2">
                              {Array(5).fill(0).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={cn(
                                    "h-5 w-5", 
                                    i < Math.floor(course.rating) 
                                      ? "fill-yellow-400 text-yellow-400" 
                                      : "text-gray-300"
                                  )}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground">{course.reviewCount} reviews</p>
                          </div>
                          <div className="mt-6">
                            <h4 className="font-medium mb-3">Rating breakdown</h4>
                            {[5, 4, 3, 2, 1].map(star => (
                              <div key={star} className="flex items-center mb-2">
                                <div className="w-16 text-sm">{star} stars</div>
                                <div className="flex-1 mx-2">
                                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                                    <div 
                                      className={cn(
                                        "h-full",
                                        star === 5 ? "w-[70%] bg-green-500" :
                                        star === 4 ? "w-[20%] bg-green-400" :
                                        star === 3 ? "w-[7%] bg-yellow-400" :
                                        star === 2 ? "w-[2%] bg-orange-400" :
                                        "w-[1%] bg-red-500"
                                      )}
                                    ></div>
                                  </div>
                                </div>
                                <div className="w-12 text-right text-sm text-muted-foreground">
                                  {star === 5 ? '70%' :
                                   star === 4 ? '20%' :
                                   star === 3 ? '7%' :
                                   star === 2 ? '2%' : '1%'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="md:w-2/3">
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-medium">Student Reviews</h3>
                            <div className="flex gap-2">
                              <select className="text-sm bg-background border rounded-md p-1">
                                <option>Most Recent</option>
                                <option>Highest Rated</option>
                                <option>Lowest Rated</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            {reviews.map(review => (
                              <div key={review.id} className="border-b pb-6 last:border-b-0">
                                <div className="flex items-start">
                                  <Avatar className="h-10 w
