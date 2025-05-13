import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/use-theme';
import CourseNavigation from '@/components/course/CourseNavigation';
import CourseHeader from '@/components/course/CourseHeader';
import CourseTabs from '@/components/course/CourseTabs';
import CourseLoadingSkeleton from '@/components/course/CourseLoadingSkeleton';
import CourseNotFound from '@/components/course/CourseNotFound';
import ProgressSection from '@/components/course/ProgressSection';

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

  // Mock exercises for practice
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
    return <CourseNotFound />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {isLoading ? (
        <CourseLoadingSkeleton />
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Course Navigation */}
          <CourseNavigation
            modules={modules}
            currentLessonId={currentLessonId}
            bookmarkedLessons={bookmarkedLessons}
            courseProgress={course.progress}
            resources={course.resources}
            toggleModuleExpansion={toggleModuleExpansion}
            handleSelectLesson={handleSelectLesson}
            toggleBookmark={toggleBookmark}
            handleDownload={handleDownload}
          />
          
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
                  <CourseHeader 
                    title={modules[0]?.lessons[0]?.title || "Introduction to the Course"}
                    bookmarkedLessons={bookmarkedLessons}
                    toggleBookmark={toggleBookmark}
                  />

                  <CourseTabs 
                    videoChapters={videoChapters}
                    exercises={exercises}
                    codingChallenges={codingChallenges}
                    chatMessage={chatMessage}
                    setChatMessage={setChatMessage}
                    handleSendMessage={handleSendMessage}
                  />
                </div>
                
                {/* Right Sidebar */}
                <div className="w-full md:w-80 flex-shrink-0">
                  <ProgressSection progressData={progressData} />
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
