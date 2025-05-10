
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import CourseModules from '@/components/CourseModules';
import AiChatInterface from '@/components/AiChatInterface';
import CourseTabs from '@/components/CourseTabs';
import VideoChapters from '@/components/VideoChapters';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Share, Bookmark, BookOpen, FileText, Code, Lightbulb, MessageSquare, ChevronLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeProvider } from '@/hooks/use-theme';
import CodeChallenge from '@/components/CodeChallenge';
import PracticeExercises from '@/components/PracticeExercises';
import QuizModule from '@/components/QuizModule';
import ProgressTracker from '@/components/ProgressTracker';
import { AiSuggestion, Exercise, VideoChapter, BookmarkedSection, Module, CourseMaterial, CourseResource, CourseNote, LearningPathItem, CodingChallenge, Quiz } from '@/types';

// Sample course data - in a real app this would come from an API
const courseData = {
  id: 'ai-fundamentals',
  title: 'AI Fundamentals: Machine Learning for Beginners',
  description: 'Learn the core principles of artificial intelligence and machine learning.',
  instructor: 'Dr. Sarah Johnson',
  thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2070',
  modules: [
    {
      id: 'module-1',
      title: 'Introduction to AI and Machine Learning',
      completed: 2,
      total: 4,
      lessons: [
        { id: 'lesson-1-1', title: 'What is Artificial Intelligence?', duration: '10:25', completed: true, locked: false, active: true },
        { id: 'lesson-1-2', title: 'History of AI Development', duration: '12:10', completed: true, locked: false },
        { id: 'lesson-1-3', title: 'Types of Machine Learning', duration: '15:45', completed: false, locked: false },
        { id: 'lesson-1-4', title: 'AI Ethics and Considerations', duration: '8:30', completed: false, locked: false }
      ]
    },
    {
      id: 'module-2',
      title: 'Machine Learning Basics',
      completed: 1,
      total: 5,
      lessons: [
        { id: 'lesson-2-1', title: 'Supervised Learning', duration: '14:20', completed: true, locked: false },
        { id: 'lesson-2-2', title: 'Unsupervised Learning', duration: '11:50', completed: false, locked: false },
        { id: 'lesson-2-3', title: 'Reinforcement Learning', duration: '13:15', completed: false, locked: false },
        { id: 'lesson-2-4', title: 'Neural Networks', duration: '16:40', completed: false, locked: false },
        { id: 'lesson-2-5', title: 'Deep Learning', duration: '18:10', completed: false, locked: false }
      ]
    },
    {
      id: 'module-3',
      title: 'Practical Applications',
      completed: 0,
      total: 4,
      lessons: [
        { id: 'lesson-3-1', title: 'AI in Healthcare', duration: '12:15', completed: false, locked: false },
        { id: 'lesson-3-2', title: 'AI in Finance', duration: '9:45', completed: false, locked: true },
        { id: 'lesson-3-3', title: 'AI in Transportation', duration: '11:20', completed: false, locked: true },
        { id: 'lesson-3-4', title: 'AI in Entertainment', duration: '10:50', completed: false, locked: true }
      ]
    }
  ] as Module[],
  videoChapters: [
    { id: 'chapter-1', title: 'Introduction', timestamp: 0 },
    { id: 'chapter-2', title: 'Key Concepts', timestamp: 180 },
    { id: 'chapter-3', title: 'Historical Overview', timestamp: 360 },
    { id: 'chapter-4', title: 'Modern Applications', timestamp: 540 },
    { id: 'chapter-5', title: 'Future Directions', timestamp: 720 }
  ] as VideoChapter[],
  bookmarkedSections: [
    { id: 'bookmark-1', title: 'Neural Network Architecture', timestamp: 245, moduleId: 'module-2', lessonId: 'lesson-2-4' },
    { id: 'bookmark-2', title: 'Types of Supervised Learning', timestamp: 120, moduleId: 'module-2', lessonId: 'lesson-2-1' }
  ] as BookmarkedSection[],
  materials: [
    { id: 'material-1', title: 'What is Artificial Intelligence?', 
      content: `Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving.

      The ideal characteristic of artificial intelligence is its ability to rationalize and take actions that have the best chance of achieving a specific goal. AI is continuously evolving to benefit many different industries. Machines are wired using a cross-disciplinary approach based on mathematics, computer science, linguistics, psychology, and more.

      Applications of AI include expert systems, natural language processing, speech recognition, and machine vision. AI can be categorized as either weak or strong. Weak AI, also known as narrow AI, is designed and trained for a particular task. Virtual personal assistants, such as Apple's Siri, are a form of weak AI. Strong AI, also known as artificial general intelligence, is an AI system with generalized human cognitive abilities.` 
    },
    { id: 'material-2', title: 'History of AI Development',
      content: `The concept of artificial intelligence has been around for centuries, dating back to ancient myths and stories about artificial beings endowed with intelligence or consciousness by master craftsmen. However, the field of AI as we understand it today began to take shape in the mid-20th century.

      In 1950, Alan Turing published a landmark paper titled "Computing Machinery and Intelligence," which proposed the Turing Test as a measure of machine intelligence. The first official AI research conference was held at Dartmouth College in 1956, where the term "artificial intelligence" was coined by John McCarthy.

      Throughout the decades, AI research has experienced periods of optimism followed by disappointment and loss of funding, known as "AI winters." The field has evolved significantly, from early rule-based systems to modern deep learning approaches that have achieved remarkable success in various domains.

      Key milestones include:
      - 1950s: Early AI programs, including Samuel's checkers program
      - 1960s: Development of expert systems
      - 1980s: Rise of machine learning algorithms
      - 1990s: AI applied to data mining and logistics
      - 2000s: Big data and improved computing resources
      - 2010s: Deep learning revolution and practical applications` 
    }
  ] as CourseMaterial[],
  notes: [
    { id: 'note-1', title: 'Types of Machine Learning', content: 'Remember the three main types: supervised, unsupervised, and reinforcement learning. Each has specific use cases.', timestamp: '10 mins ago' },
    { id: 'note-2', title: 'Neural Network Architecture', content: 'Input layer, hidden layers, and output layer. The more complex the problem, the more hidden layers might be needed.', timestamp: '2 days ago' }
  ] as CourseNote[],
  resources: [
    { id: 'resource-1', title: 'AI Fundamentals Slides', type: 'pdf' as const, size: '2.4 MB', url: '#' },
    { id: 'resource-2', title: 'Machine Learning Algorithms Cheat Sheet', type: 'pdf' as const, size: '1.8 MB', url: '#' },
    { id: 'resource-3', title: 'Sample ML Code Repository', type: 'link' as const, url: 'https://github.com/example/ai-learning' },
    { id: 'resource-4', title: 'Course Project Materials', type: 'zip' as const, size: '5.7 MB', url: '#' }
  ] as CourseResource[],
  practiceExercises: [
    { id: 'exercise-1', title: 'Implement a Simple Neural Network', difficulty: 'Medium' as const, points: 50 },
    { id: 'exercise-2', title: 'Data Classification Challenge', difficulty: 'Hard' as const, points: 100 },
    { id: 'exercise-3', title: 'AI Ethics Case Study', difficulty: 'Easy' as const, points: 25 }
  ] as Exercise[],
  codingChallenges: [
    { 
      id: 'code-1', 
      title: 'Linear Regression Implementation', 
      description: 'Implement a simple linear regression algorithm from scratch.',
      starterCode: 'def linear_regression(X, y):\n    # Your code here\n    return weights',
      testCases: ['test_case_1', 'test_case_2']
    },
    { 
      id: 'code-2', 
      title: 'Decision Tree Classifier', 
      description: 'Build a basic decision tree classifier for the given dataset.',
      starterCode: 'class DecisionTree:\n    def __init__(self):\n        # Your code here\n        pass',
      testCases: ['test_case_1']
    }
  ] as CodingChallenge[],
  quizzes: [
    {
      id: 'quiz-1',
      title: 'AI Fundamentals Quiz',
      questions: [
        {
          id: 'q1',
          question: 'What is the primary goal of supervised learning?',
          options: [
            'To cluster similar data points',
            'To predict outcomes based on labeled data',
            'To discover hidden patterns without labels',
            'To maximize rewards through trial and error'
          ],
          correctAnswer: 1
        },
        {
          id: 'q2',
          question: 'Which of these is NOT a type of machine learning?',
          options: [
            'Supervised Learning',
            'Reinforcement Learning',
            'Collaborative Learning',
            'Unsupervised Learning'
          ],
          correctAnswer: 2
        }
      ]
    }
  ] as Quiz[],
  aiSuggestions: [
    { id: 'suggestion-1', title: 'Practice Neural Network Diagrams', type: 'exercise' as const },
    { id: 'suggestion-2', title: 'Review Supervised Learning Concepts', type: 'review' as const },
    { id: 'suggestion-3', title: 'Try the Decision Tree Challenge', type: 'code' as const }
  ] as AiSuggestion[],
  learningPath: [
    { id: 'path-1', title: 'Machine Learning Foundations', completed: false },
    { id: 'path-2', title: 'Deep Learning Specialization', completed: false, locked: true },
    { id: 'path-3', title: 'AI Ethics Certification', completed: false, locked: true }
  ] as LearningPathItem[]
};

const CoursePage = () => {
  const { courseId } = useParams();
  const [activeLesson, setActiveLesson] = useState({ moduleId: 'module-1', lessonId: 'lesson-1-1' });
  const [mobileTab, setMobileTab] = useState('video');
  const [activeContentTab, setActiveContentTab] = useState('materials');
  const [showMobileAI, setShowMobileAI] = useState(false);

  // Handle lesson selection
  const handleSelectLesson = (moduleId: string, lessonId: string) => {
    setActiveLesson({ moduleId, lessonId });
  };
  
  // Get current lesson info
  const currentModule = courseData.modules.find(m => m.id === activeLesson.moduleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === activeLesson.lessonId);
  
  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <div className="px-4 py-2 border-b flex items-center">
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-lg font-medium truncate">{courseData.title}</h1>
        </div>
        
        {/* Mobile Tabs for Responsive Design */}
        <div className="md:hidden">
          <Tabs value={mobileTab} onValueChange={setMobileTab}>
            <TabsList className="w-full">
              <TabsTrigger 
                value="video" 
                className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Course
              </TabsTrigger>
              <TabsTrigger 
                value="modules" 
                className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none"
              >
                <FileText className="h-4 w-4 mr-1" />
                Modules
              </TabsTrigger>
              <TabsTrigger 
                value="practice" 
                className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none"
              >
                <Code className="h-4 w-4 mr-1" />
                Practice
              </TabsTrigger>
            </TabsList>

            <TabsContent value="video" className="p-0 m-0">
              <div className="p-4">
                {/* Video Player */}
                <VideoPlayer 
                  videoUrl="#" 
                  title={currentLesson?.title || 'Loading...'} 
                  thumbnail={courseData.thumbnail}
                />
                
                {/* Title and Actions */}
                <div className="mt-4">
                  <h2 className="text-xl font-bold">{currentLesson?.title || 'Loading...'}</h2>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-gray-600">
                      Instructor: {courseData.instructor}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span className="sr-only md:not-sr-only">Like</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4 mr-1" />
                        <span className="sr-only md:not-sr-only">Share</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Bookmark className="h-4 w-4 mr-1" />
                        <span className="sr-only md:not-sr-only">Save</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Video Chapters */}
                <div className="mt-4">
                  <VideoChapters chapters={courseData.videoChapters} />
                </div>
                
                {/* Course Materials and Resources */}
                <div className="mt-6 h-[400px] border rounded-lg overflow-hidden">
                  <CourseTabs 
                    materials={courseData.materials}
                    notes={courseData.notes}
                    resources={courseData.resources}
                  />
                </div>
                
                {/* Mobile AI Tutor Button */}
                <div className="mt-4 text-center">
                  <Sheet open={showMobileAI} onOpenChange={setShowMobileAI}>
                    <SheetTrigger asChild>
                      <Button className="w-full bg-learntube-red hover:bg-learntube-dark-red">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Open AI Tutor Chat
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[85%] sm:w-[385px] p-0">
                      <AiChatInterface 
                        suggestions={courseData.aiSuggestions}
                        learningPath={courseData.learningPath}
                      />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="modules" className="p-0 m-0">
              <div className="p-4">
                <CourseModules 
                  modules={courseData.modules}
                  bookmarks={courseData.bookmarkedSections}
                  onSelectLesson={(moduleId, lessonId) => {
                    handleSelectLesson(moduleId, lessonId);
                    setMobileTab('video');
                  }}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="practice" className="p-0 m-0">
              <div className="p-4">
                <Tabs defaultValue="exercises">
                  <TabsList className="w-full">
                    <TabsTrigger value="exercises" className="flex-1">Exercises</TabsTrigger>
                    <TabsTrigger value="coding" className="flex-1">Coding</TabsTrigger>
                    <TabsTrigger value="quiz" className="flex-1">Quiz</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="exercises" className="mt-4">
                    <PracticeExercises exercises={courseData.practiceExercises} />
                  </TabsContent>
                  
                  <TabsContent value="coding" className="mt-4">
                    <CodeChallenge challenges={courseData.codingChallenges} />
                  </TabsContent>
                  
                  <TabsContent value="quiz" className="mt-4">
                    <QuizModule quizzes={courseData.quizzes} />
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Course Content - Desktop Layout with Resizable Panels */}
        <div className="flex-1 hidden md:block">
          <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-120px)]">
            {/* Left Panel - Course Modules */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={25} className="border-r">
              <CourseModules 
                modules={courseData.modules}
                bookmarks={courseData.bookmarkedSections}
                onSelectLesson={handleSelectLesson}
              />
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Center Panel - Video and Content */}
            <ResizablePanel defaultSize={55} minSize={40} className="overflow-auto">
              <div className="p-4">
                {/* Video Player */}
                <VideoPlayer 
                  videoUrl="#" 
                  title={currentLesson?.title || 'Loading...'} 
                  thumbnail={courseData.thumbnail}
                />
                
                {/* Title and Actions */}
                <div className="mt-4">
                  <h2 className="text-xl font-bold">{currentLesson?.title || 'Loading...'}</h2>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-gray-600">
                      Instructor: {courseData.instructor}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>Like</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4 mr-1" />
                        <span>Share</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Bookmark className="h-4 w-4 mr-1" />
                        <span>Save</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Video Chapters */}
                <div className="mt-4">
                  <VideoChapters chapters={courseData.videoChapters} />
                </div>
                
                {/* Course Content Tabs */}
                <div className="mt-6">
                  <Tabs value={activeContentTab} onValueChange={setActiveContentTab}>
                    <TabsList>
                      <TabsTrigger value="materials">Materials</TabsTrigger>
                      <TabsTrigger value="exercises">Practice Exercises</TabsTrigger>
                      <TabsTrigger value="coding">Coding Challenges</TabsTrigger>
                      <TabsTrigger value="quiz">Quizzes</TabsTrigger>
                      <TabsTrigger value="progress">Progress</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="materials" className="mt-4 h-[400px] border rounded-lg overflow-hidden">
                      <CourseTabs 
                        materials={courseData.materials}
                        notes={courseData.notes}
                        resources={courseData.resources}
                      />
                    </TabsContent>
                    
                    <TabsContent value="exercises" className="mt-4">
                      <PracticeExercises exercises={courseData.practiceExercises} />
                    </TabsContent>
                    
                    <TabsContent value="coding" className="mt-4">
                      <CodeChallenge challenges={courseData.codingChallenges} />
                    </TabsContent>
                    
                    <TabsContent value="quiz" className="mt-4">
                      <QuizModule quizzes={courseData.quizzes} />
                    </TabsContent>
                    
                    <TabsContent value="progress" className="mt-4">
                      <ProgressTracker modules={courseData.modules} learningPath={courseData.learningPath} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Right Panel - AI Chat Interface */}
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35} className="border-l overflow-hidden">
              <AiChatInterface 
                suggestions={courseData.aiSuggestions}
                learningPath={courseData.learningPath}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CoursePage;
