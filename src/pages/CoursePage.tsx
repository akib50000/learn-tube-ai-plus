
import { useState, useEffect, Dispatch, SetStateAction, FormEvent, Element } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  Bookmark,
  FileCode,
  MessageCircle,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/use-theme';
import { formatNumber } from '@/lib/utils';
import AITutorTab from '@/components/AITutorTab';
import FeatureItem from '@/components/CourseFeatureItem';
import VideoPlayer from '@/components/VideoPlayer';
import VideoChapters from '@/components/VideoChapters';
import PracticeExercises from '@/components/PracticeExercises';
import CodeChallenge from '@/components/CodeChallenge';
import ProgressTracker from '@/components/ProgressTracker';

// Interface definitions for Module, Lesson, Review, Question, Answer
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
  const [bookmarkedLessons, setBookmarkedLessons] = useState<string[]>([]);
  const [chatMessage, setChatMessage] = useState("");
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Mock chapters for video player
  const videoChapters = [
    { id: "chapter-1", title: "Introduction", timestamp: 0 },
    { id: "chapter-2", title: "Core Concepts", timestamp: 120 },
    { id: "chapter-3", title: "Advanced Techniques", timestamp: 360 },
    { id: "chapter-4", title: "Practical Examples", timestamp: 600 },
    { id: "chapter-5", title: "Conclusion", timestamp: 840 }
  ];

  // Mock exercises for practice - Fixed the difficulty type to use string literals
  const exercises = [
    { id: "ex-1", title: "Basic DOM Manipulation", difficulty: "Easy" as "Easy" | "Medium" | "Hard", points: 10 },
    { id: "ex-2", title: "Event Handling Challenge", difficulty: "Medium" as "Easy" | "Medium" | "Hard", points: 25 },
    { id: "ex-3", title: "API Integration Exercise", difficulty: "Hard" as "Easy" | "Medium" | "Hard", points: 50 }
  ];

  // Mock coding challenges
  const codingChallenges = [
    {
      id: "challenge-1",
      title: "Form Validation",
      description: "Create a form validation function that checks for required fields, email format, and password strength.",
      starterCode: "function validateForm(formData) {\n  // Your code here\n  \n  return isValid;\n}",
      testCases: ["Basic validation", "Email format check", "Password strength"]
    },
    {
      id: "challenge-2",
      title: "Array Manipulation",
      description: "Implement a function that filters and transforms an array based on given criteria.",
      starterCode: "function transformArray(arr, filterFn, mapFn) {\n  // Your code here\n  \n  return result;\n}",
      testCases: ["Empty array", "Filter odd numbers", "Transform to objects"]
    }
  ];

  // Mock progress data
  const progressData = {
    modules: [
      { id: "m1", title: "Introduction to Web Dev", completed: 4, total: 4 },
      { id: "m2", title: "React Fundamentals", completed: 3, total: 6 },
      { id: "m3", title: "Advanced React", completed: 0, total: 4 }
    ],
    learningPath: [
      { id: "path-1", title: "Complete Module 1", completed: true },
      { id: "path-2", title: "Complete React Fundamentals", completed: false },
      { id: "path-3", title: "Build First Project", completed: false },
      { id: "path-4", title: "Advanced React Patterns", completed: false, locked: true }
    ]
  };

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
            ],
            resources: [
              { id: "res-1", title: "Course Slides", type: "PDF", size: "2.4 MB" },
              { id: "res-2", title: "Starter Code", type: "ZIP", size: "5.7 MB" },
              { id: "res-3", title: "Reference Guide", type: "PDF", size: "1.8 MB" }
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
          
          // Set some bookmarked lessons for demo
          setBookmarkedLessons(['lesson-1-2', 'lesson-2-3']);
          
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
          
          setReviews(mockReviews);
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

  const toggleBookmark = (lessonId: string) => {
    if (bookmarkedLessons.includes(lessonId)) {
      setBookmarkedLessons(bookmarkedLessons.filter(id => id !== lessonId));
      toast({
        title: "Bookmark removed",
        description: "Lesson removed from your bookmarks",
        variant: "default",
      });
    } else {
      setBookmarkedLessons([...bookmarkedLessons, lessonId]);
      toast({
        title: "Bookmark added",
        description: "Lesson added to your bookmarks",
        variant: "success",
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // In a real app, this would send the message to an AI service
    toast({
      title: "Message sent",
      description: "The AI tutor will respond shortly",
      variant: "default",
    });
    
    setChatMessage("");
  };
  
  // If course not found, show error page
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
    <div className="min-h-screen bg-background flex flex-col">
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
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Course Navigation */}
          <div className="hidden md:flex w-64 border-r flex-shrink-0 flex-col h-[calc(100vh-4rem)]">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Course Content</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {modules.length} modules • {modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons
              </p>
            </div>
            
            <ScrollArea className="flex-1">
              {/* Expandable Modules */}
              <div className="p-2">
                <h3 className="px-3 py-2 text-sm font-medium">Modules</h3>
                <div className="space-y-1">
                  {modules.map((module) => (
                    <Collapsible 
                      key={module.id} 
                      open={module.isExpanded}
                      className="border rounded-md overflow-hidden mb-2"
                    >
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full flex justify-between items-center p-3 h-auto"
                          onClick={() => toggleModuleExpansion(module.id)}
                        >
                          <div className="flex items-start">
                            <div className="mr-2 bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center mt-0.5">
                              <List className="h-3 w-3 text-primary" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-sm">{module.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {module.lessons.length} lessons • {module.duration}
                              </p>
                            </div>
                          </div>
                          {module.isExpanded ? (
                            <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="border-t">
                        {module.lessons.map((lesson) => (
                          <Button 
                            key={lesson.id}
                            variant="ghost"
                            className={cn(
                              "w-full justify-start pl-11 pr-2 py-2 h-auto text-left",
                              currentLessonId === lesson.id && "bg-muted",
                              lesson.isLocked && "opacity-60"
                            )}
                            onClick={() => !lesson.isLocked && handleSelectLesson(lesson.id)}
                            disabled={lesson.isLocked}
                          >
                            <div className="flex items-center justify-between w-full gap-1">
                              <div className="flex items-center gap-2">
                                {lesson.isCompleted ? (
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                ) : lesson.isLocked ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-muted-foreground">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                  </svg>
                                ) : (
                                  <Play className="h-3 w-3 text-primary" />
                                )}
                                <span className="text-xs font-medium truncate">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-muted-foreground">{lesson.duration}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-5 w-5 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBookmark(lesson.id);
                                  }}
                                >
                                  <Bookmark 
                                    className={cn(
                                      "h-3 w-3",
                                      bookmarkedLessons.includes(lesson.id) 
                                        ? "fill-yellow-400 text-yellow-400" 
                                        : "text-muted-foreground"
                                    )} 
                                  />
                                </Button>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </div>
              
              {/* Lesson Progression Tracker */}
              <div className="p-4 border-t">
                <h3 className="mb-2 text-sm font-medium">Your Progress</h3>
                <Progress 
                  value={course.progress} 
                  className="h-2 mb-1" 
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{course.progress}% complete</span>
                  <span>12/36 lessons</span>
                </div>
              </div>
              
              {/* Bookmarked Sections */}
              <div className="p-4 border-t">
                <h3 className="mb-2 text-sm font-medium">Bookmarked Lessons</h3>
                {bookmarkedLessons.length > 0 ? (
                  <div className="space-y-2">
                    {bookmarkedLessons.map(bookmarkId => {
                      const lesson = modules
                        .flatMap(module => module.lessons)
                        .find(lesson => lesson.id === bookmarkId);
                      
                      return lesson ? (
                        <Button 
                          key={bookmarkId}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-auto py-1 text-left"
                          onClick={() => handleSelectLesson(bookmarkId)}
                        >
                          <div className="flex items-center gap-2">
                            <Bookmark className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs truncate">{lesson.title}</span>
                          </div>
                        </Button>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No bookmarks yet</p>
                )}
              </div>
              
              {/* Resources and Downloads */}
              <div className="p-4 border-t">
                <h3 className="mb-2 text-sm font-medium">Course Resources</h3>
                <div className="space-y-2">
                  {course.resources && course.resources.map((resource: any) => (
                    <Button 
                      key={resource.id}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start h-auto py-2 text-left"
                      onClick={handleDownload}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          {resource.type === 'PDF' ? (
                            <FileText className="h-3.5 w-3.5 text-red-500" />
                          ) : resource.type === 'ZIP' ? (
                            <Download className="h-3.5 w-3.5 text-blue-500" />
                          ) : (
                            <Download className="h-3.5 w-3.5" />
                          )}
                          <div>
                            <p className="text-xs font-medium">{resource.title}</p>
                            <p className="text-[10px] text-muted-foreground">{resource.size}</p>
                          </div>
                        </div>
                        <Download className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
          
          {/* Center Panel - Course Content */}
          <div className="flex-1 overflow-auto">
            <div className="bg-black text-white">
              <div className="container max-w-5xl mx-auto py-6">
                <VideoPlayer 
                  videoUrl="#"
                  title={modules[0]?.lessons[0]?.title || "Introduction to the Course"}
                  thumbnail={course.thumbnail}
                />
              </div>
            </div>
            
            <div className="container max-w-5xl mx-auto py-6 px-4">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Main Content Area */}
                <div className="flex-1">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">
                      {modules[0]?.lessons[0]?.title || "Introduction to the Course"}
                    </h1>
                    <div className="flex items-center gap-x-4 text-sm mb-6">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>15:30</span>
                      </div>
                      <div className="flex items-center">
                        <Play className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>Lesson 1.1</span>
                      </div>
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => toggleBookmark("lesson-1-1")}
                      >
                        <Bookmark 
                          className={cn(
                            "h-4 w-4", 
                            bookmarkedLessons.includes("lesson-1-1") 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-muted-foreground"
                          )} 
                        />
                        <span>Bookmark</span>
                      </Button>
                    </div>
                  </div>

                  <Tabs defaultValue="content" className="mb-8">
                    <TabsList className="mb-4">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="exercises">Exercises</TabsTrigger>
                      <TabsTrigger value="challenges">Coding Challenges</TabsTrigger>
                      <TabsTrigger value="notes">Notes</TabsTrigger>
                      <TabsTrigger value="ai-tutor">AI Tutor</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content">
                      <Card className="mb-6">
                        <CardContent className="p-6">
                          <h2 className="text-lg font-medium mb-4">Lesson Content</h2>
                          <p className="mb-4">
                            Welcome to the first lesson of our Web Development Course. In this introduction, we'll cover the basic setup and tools you'll need throughout the course.
                          </p>
                          <p className="mb-4">
                            Web development is a dynamic field that combines creativity and technical skills to create engaging online experiences. We'll start with the fundamentals of HTML, CSS, and JavaScript before diving into more advanced frameworks like React.
                          </p>
                          <p>
                            By the end of this course, you'll have built multiple projects and gained the skills needed to develop modern web applications from scratch.
                          </p>
                        </CardContent>
                      </Card>

                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">Video Chapters</h3>
                        <VideoChapters chapters={videoChapters} />
                      </div>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-4">Key Takeaways</h3>
                          <ul className="space-y-2">
                            <FeatureItem icon={CheckCircle}>Understanding of the web development ecosystem</FeatureItem>
                            <FeatureItem icon={CheckCircle}>Knowledge of essential development tools</FeatureItem>
                            <FeatureItem icon={CheckCircle}>Basic setup for your development environment</FeatureItem>
                            <FeatureItem icon={CheckCircle}>Overview of the course structure and projects</FeatureItem>
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="exercises">
                      <Card className="mb-6">
                        <CardContent className="p-6">
                          <h2 className="text-lg font-medium mb-4">Practice Exercises</h2>
                          <p className="mb-6">
                            Reinforce what you've learned with these practical exercises. Complete them to solidify your understanding.
                          </p>
                          
                          <PracticeExercises exercises={exercises} />
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="challenges">
                      <Card className="mb-6">
                        <CardContent className="p-6">
                          <h2 className="text-lg font-medium mb-4">Coding Challenges</h2>
                          <p className="mb-6">
                            Test your skills with these coding challenges. Write code to solve real-world problems.
                          </p>
                          
                          <div className="space-y-6">
                            <CodeChallenge challenges={codingChallenges} />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="notes">
                      <Card className="mb-6">
                        <CardContent className="p-6">
                          <h2 className="text-lg font-medium mb-4">Your Notes</h2>
                          <div className="mb-4">
                            <Textarea 
                              placeholder="Take notes for this lesson..." 
                              className="min-h-[200px]" 
                            />
                          </div>
                          <div className="flex justify-end">
                            <Button>
                              <Save className="mr-2 h-4 w-4" />
                              Save Notes
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-4">Saved Notes</h3>
                          <p className="text-muted-foreground text-center py-8">
                            You haven't saved any notes for this lesson yet.
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="ai-tutor">
                      <AITutorTab 
                        courseTitle={course.title} 
                        courseSubject={course.tags?.[0]} 
                        courseId={course.id}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
                
                {/* Right Panel - Additional Info */}
                <div className="md:w-80 lg:w-96 space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold mb-4">About this Course</h2>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Instructor: {course.instructor.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Duration: {course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Level: {course.level}</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Language: {course.language}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Students: {formatNumber(course.studentCount)}</span>
                        </div>
                      </div>
                        
                      <div className="mt-6">
                        <Button onClick={handleEnrollClick} className="w-full">
                          Enroll in Course
                        </Button>
                        <div className="flex justify-center mt-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs">
                            <Heart className="h-3 w-3 mr-1" />
                            Favorite
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
                      <ProgressTracker 
                        modules={progressData.modules} 
                        learningPath={progressData.learningPath} 
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Course Tags</h2>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
