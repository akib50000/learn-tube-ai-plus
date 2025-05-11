
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { 
  ChevronRight, 
  ChevronLeft, 
  Book, 
  FileText, 
  CheckCircle,
  Calendar,
  Upload,
  Edit,
  Plus,
  Save,
  Video,
  Image,
  File,
  Link,
  Code,
  Search,
  Trash,
  Move,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type CourseStep = 'info' | 'modules' | 'exercises' | 'review';

interface CourseCreatorProps {
  onClose: () => void;
}

const CourseCreatorFlow: React.FC<CourseCreatorProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<CourseStep>('info');
  const [progress, setProgress] = useState<number>(25);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('beginner');
  const [language, setLanguage] = useState<string>('english');
  const [modules, setModules] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const handleNextStep = () => {
    if (currentStep === 'info') {
      if (!title.trim()) {
        toast({
          title: "Course title required",
          description: "Please enter a title for your course",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep('modules');
      setProgress(50);
    } else if (currentStep === 'modules') {
      if (modules.length === 0) {
        toast({
          title: "Modules required",
          description: "Please add at least one module",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep('exercises');
      setProgress(75);
    } else if (currentStep === 'exercises') {
      setCurrentStep('review');
      setProgress(100);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'modules') {
      setCurrentStep('info');
      setProgress(25);
    } else if (currentStep === 'exercises') {
      setCurrentStep('modules');
      setProgress(50);
    } else if (currentStep === 'review') {
      setCurrentStep('exercises');
      setProgress(75);
    }
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your course has been saved as a draft",
    });
  };

  const handlePublishCourse = () => {
    toast({
      title: "Course published!",
      description: "Your course is now live and available to students",
    });
    onClose();
  };

  const handleAddModule = () => {
    const newModule = {
      id: `module-${modules.length + 1}`,
      title: `Module ${modules.length + 1}`,
      summary: '',
      lessons: []
    };
    
    setModules([...modules, newModule]);
    setSelectedModule(modules.length);
    
    toast({
      title: "Module added",
      description: "New module has been created"
    });
  };

  const handleAddLesson = (moduleIndex: number) => {
    if (moduleIndex === null || moduleIndex < 0 || moduleIndex >= modules.length) return;
    
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons = [
      ...updatedModules[moduleIndex].lessons,
      {
        id: `lesson-${moduleIndex}-${updatedModules[moduleIndex].lessons.length + 1}`,
        title: `Lesson ${updatedModules[moduleIndex].lessons.length + 1}`,
        description: '',
        videoUrl: '',
        resources: [],
        exercises: [],
        isFreePreview: false,
        duration: 15,
        isPublished: false
      }
    ];
    
    setModules(updatedModules);
    
    toast({
      title: "Lesson added",
      description: "New lesson has been added to the module"
    });
  };

  const handleAddExercise = (moduleIndex: number, lessonIndex: number, exerciseType: string) => {
    if (moduleIndex === null || moduleIndex < 0 || moduleIndex >= modules.length) return;
    
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons[lessonIndex].exercises.push({
      id: `exercise-${new Date().getTime()}`,
      type: exerciseType,
      title: `New ${exerciseType} Exercise`,
      prompt: '',
      autoGrade: true,
      difficulty: 'medium'
    });
    
    setModules(updatedModules);
    
    toast({
      title: "Exercise added",
      description: `New ${exerciseType} exercise has been created`
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'info':
        return <CourseInfoStep 
          title={title} 
          setTitle={setTitle}
          description={description} 
          setDescription={setDescription}
          category={category} 
          setCategory={setCategory}
          difficulty={difficulty} 
          setDifficulty={setDifficulty}
          language={language} 
          setLanguage={setLanguage}
        />;
      case 'modules':
        return <ModulesStep 
          modules={modules} 
          setModules={setModules}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          handleAddModule={handleAddModule}
          handleAddLesson={handleAddLesson}
        />;
      case 'exercises':
        return <ExercisesStep 
          modules={modules} 
          setModules={setModules}
          handleAddExercise={handleAddExercise}
        />;
      case 'review':
        return <ReviewStep 
          modules={modules}
          title={title}
          description={description}
          category={category}
          difficulty={difficulty}
          language={language}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Progress indicator */}
      <div className="border-b p-4">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className={`${currentStep === 'info' ? 'font-bold text-primary' : ''}`}>
            1. Course Info
          </span>
          <span className={`${currentStep === 'modules' ? 'font-bold text-primary' : ''}`}>
            2. Modules & Lessons
          </span>
          <span className={`${currentStep === 'exercises' ? 'font-bold text-primary' : ''}`}>
            3. Exercises & Resources
          </span>
          <span className={`${currentStep === 'review' ? 'font-bold text-primary' : ''}`}>
            4. Review & Publish
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step content */}
      <div className="flex-1 p-6 overflow-auto">
        {renderStepContent()}
      </div>

      {/* Bottom navigation */}
      <div className="border-t p-4 flex justify-between">
        <div>
          {currentStep !== 'info' && (
            <Button variant="outline" onClick={handlePreviousStep}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Previous
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="mr-1 h-4 w-4" /> Save Draft
          </Button>
          {currentStep !== 'review' ? (
            <Button onClick={handleNextStep}>
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handlePublishCourse} className="bg-learntube-red hover:bg-learntube-dark-red">
              <CheckCircle className="mr-1 h-4 w-4" /> Publish Course
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCreatorFlow;

// Course Info Step Component
interface CourseInfoStepProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  category: string;
  setCategory: (category: string) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}

const CourseInfoStep: React.FC<CourseInfoStepProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  language,
  setLanguage
}) => {
  const handleAISuggest = () => {
    const suggestions = [
      "Mastering React for Modern Web Applications",
      "Complete Python Programming: From Basics to Advanced",
      "UX Design Principles for Digital Products",
      "Data Visualization with D3.js",
      "Machine Learning Fundamentals for Everyone"
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setTitle(randomSuggestion);
    
    toast({
      title: "AI Suggestion",
      description: "We've suggested a course title based on popular topics"
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Course Information</h2>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="courseTitle">Course Title</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="courseTitle"
              placeholder="Enter a descriptive title for your course"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleAISuggest} type="button">
              AI Suggest
            </Button>
          </div>
        </div>
        
        <div>
          <Label htmlFor="courseDescription">Short Description</Label>
          <div className="mt-1 relative">
            <textarea
              id="courseDescription"
              placeholder="Briefly describe what students will learn (max 280 characters)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={280}
              className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {description.length}/280
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="courseCategory">Category</Label>
            <select
              id="courseCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select category</option>
              <option value="ai">AI & Machine Learning</option>
              <option value="cs">Computer Science</option>
              <option value="design">Design</option>
              <option value="language">Language</option>
              <option value="business">Business</option>
              <option value="data">Data Science</option>
              <option value="web">Web Development</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="courseDifficulty">Difficulty</Label>
            <select
              id="courseDifficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="courseLanguage">Language</Label>
            <select
              id="courseLanguage"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="japanese">Japanese</option>
              <option value="mandarin">Mandarin</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modules Step Component
interface ModulesStepProps {
  modules: any[];
  setModules: (modules: any[]) => void;
  selectedModule: number | null;
  setSelectedModule: (index: number | null) => void;
  handleAddModule: () => void;
  handleAddLesson: (moduleIndex: number) => void;
}

const ModulesStep: React.FC<ModulesStepProps> = ({
  modules,
  setModules,
  selectedModule,
  setSelectedModule,
  handleAddModule,
  handleAddLesson
}) => {
  const updateModuleTitle = (moduleIndex: number, newTitle: string) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].title = newTitle;
    setModules(updatedModules);
  };
  
  const updateModuleSummary = (moduleIndex: number, newSummary: string) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].summary = newSummary;
    setModules(updatedModules);
  };
  
  const updateLessonTitle = (moduleIndex: number, lessonIndex: number, newTitle: string) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons[lessonIndex].title = newTitle;
    setModules(updatedModules);
  };
  
  const updateLessonDescription = (moduleIndex: number, lessonIndex: number, newDescription: string) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons[lessonIndex].description = newDescription;
    setModules(updatedModules);
  };
  
  const toggleLessonPreview = (moduleIndex: number, lessonIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons[lessonIndex].isFreePreview = 
      !updatedModules[moduleIndex].lessons[lessonIndex].isFreePreview;
    setModules(updatedModules);
    
    toast({
      title: updatedModules[moduleIndex].lessons[lessonIndex].isFreePreview ? 
        "Lesson set as free preview" : "Free preview removed",
      description: "Students will " + 
        (updatedModules[moduleIndex].lessons[lessonIndex].isFreePreview ? "" : "not ") + 
        "be able to access this lesson without enrollment"
    });
  };
  
  const updateLessonDuration = (moduleIndex: number, lessonIndex: number, newDuration: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons[lessonIndex].duration = newDuration;
    setModules(updatedModules);
  };
  
  const updateVideoUrl = (moduleIndex: number, lessonIndex: number, url: string) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons[lessonIndex].videoUrl = url;
    setModules(updatedModules);
  };
  
  const deleteModule = (moduleIndex: number) => {
    if (window.confirm("Are you sure you want to delete this module and all its lessons?")) {
      const updatedModules = modules.filter((_, index) => index !== moduleIndex);
      setModules(updatedModules);
      setSelectedModule(null);
      
      toast({
        title: "Module deleted",
        description: "The module and all its content has been removed"
      });
    }
  };
  
  const deleteLesson = (moduleIndex: number, lessonIndex: number) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      const updatedModules = [...modules];
      updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons
        .filter((_, index) => index !== lessonIndex);
      setModules(updatedModules);
      
      toast({
        title: "Lesson deleted",
        description: "The lesson and all its content has been removed"
      });
    }
  };

  return (
    <div className="flex h-full gap-6">
      {/* Modules List (Left Panel) */}
      <div className="w-72 border-r pr-4 h-full overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Modules</h3>
          <Button size="sm" onClick={handleAddModule}>
            <Plus className="h-4 w-4 mr-1" /> Add Module
          </Button>
        </div>
        
        <div className="space-y-2">
          {modules.map((module, index) => (
            <div 
              key={module.id}
              className={`p-3 border rounded-md cursor-pointer transition-colors ${
                index === selectedModule ? 'bg-primary/10 border-primary' : 'bg-background hover:bg-accent'
              }`}
              onClick={() => setSelectedModule(index)}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">{module.title}</div>
                <div className="text-xs text-muted-foreground">
                  {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
                </div>
              </div>
              {module.summary && (
                <div className="text-sm text-muted-foreground mt-1 truncate">
                  {module.summary}
                </div>
              )}
            </div>
          ))}
          
          {modules.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p>No modules yet</p>
              <p className="text-sm">Click "Add Module" to create your first module</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Lesson Grid (Right Panel) */}
      <div className="flex-1 overflow-auto">
        {selectedModule !== null ? (
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="space-y-1">
                  <Label htmlFor="moduleTitle">Module Title</Label>
                  <Input
                    id="moduleTitle"
                    value={modules[selectedModule].title}
                    onChange={(e) => updateModuleTitle(selectedModule, e.target.value)}
                    className="font-semibold"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => deleteModule(selectedModule)}
                >
                  <Trash className="h-4 w-4 mr-1" /> Delete Module
                </Button>
              </div>
              
              <div>
                <Label htmlFor="moduleSummary">Module Summary (Optional)</Label>
                <textarea
                  id="moduleSummary"
                  value={modules[selectedModule].summary}
                  onChange={(e) => updateModuleSummary(selectedModule, e.target.value)}
                  placeholder="Provide a brief overview of this module"
                  className="w-full h-16 rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                />
              </div>
            </div>
            
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Lessons</h3>
              <Button 
                size="sm" 
                variant="default" 
                onClick={() => handleAddLesson(selectedModule)}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Lesson
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              {modules[selectedModule].lessons.map((lesson: any, lessonIndex: number) => (
                <Card key={lesson.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">
                        <Input
                          value={lesson.title}
                          onChange={(e) => updateLessonTitle(selectedModule, lessonIndex, e.target.value)}
                          className="font-medium"
                        />
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteLesson(selectedModule, lessonIndex)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`lesson-desc-${lessonIndex}`}>Description</Label>
                        <textarea
                          id={`lesson-desc-${lessonIndex}`}
                          value={lesson.description}
                          onChange={(e) => updateLessonDescription(selectedModule, lessonIndex, e.target.value)}
                          placeholder="Provide a description for this lesson"
                          className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label>Video Content</Label>
                        <Tabs defaultValue="youtube" className="mt-1">
                          <TabsList className="grid grid-cols-2">
                            <TabsTrigger value="youtube">YouTube Link</TabsTrigger>
                            <TabsTrigger value="upload">Upload Video</TabsTrigger>
                          </TabsList>
                          <TabsContent value="youtube" className="pt-2">
                            <Input
                              placeholder="Enter YouTube video URL"
                              value={lesson.videoUrl}
                              onChange={(e) => updateVideoUrl(selectedModule, lessonIndex, e.target.value)}
                            />
                            {lesson.videoUrl && lesson.videoUrl.includes('youtube.com') && (
                              <div className="mt-2 aspect-video bg-muted rounded-md flex items-center justify-center">
                                <Video className="h-10 w-10 text-muted-foreground opacity-50" />
                                <span className="ml-2 text-sm text-muted-foreground">Video preview</span>
                              </div>
                            )}
                          </TabsContent>
                          <TabsContent value="upload" className="pt-2">
                            <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-6 text-center">
                              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                              <p className="text-sm mb-2">Drag & drop video file or click to browse</p>
                              <Button variant="outline" size="sm">
                                Choose File
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                        
                        <div className="mt-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            Auto-generate transcript
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor={`lesson-duration-${lessonIndex}`}>Estimated Duration (minutes)</Label>
                        <Input
                          id={`lesson-duration-${lessonIndex}`}
                          type="number"
                          min="1"
                          value={lesson.duration}
                          onChange={(e) => updateLessonDuration(selectedModule, lessonIndex, parseInt(e.target.value, 10))}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex flex-col justify-end">
                        <Label>&nbsp;</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <input
                            type="checkbox"
                            id={`preview-toggle-${lessonIndex}`}
                            checked={lesson.isFreePreview}
                            onChange={() => toggleLessonPreview(selectedModule, lessonIndex)}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor={`preview-toggle-${lessonIndex}`} className="cursor-pointer">
                            Mark as free preview lesson
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {modules[selectedModule].lessons.length === 0 && (
                <div className="text-center py-12 border rounded-md bg-muted/10 text-muted-foreground">
                  <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>No lessons in this module yet</p>
                  <p className="text-sm mt-1">Click "Add Lesson" to create your first lesson</p>
                </div>
              )}
            </div>
            
            <Button 
              onClick={() => handleAddLesson(selectedModule)}
              variant="outline"
              className="w-full border-dashed"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Lesson
            </Button>
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <Book className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-medium mb-1">No Module Selected</h3>
            <p className="mb-4">Select a module from the left panel or create a new one</p>
            <Button onClick={handleAddModule}>
              <Plus className="h-4 w-4 mr-1" /> Create First Module
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Exercises Step Component
interface ExercisesStepProps {
  modules: any[];
  setModules: (modules: any[]) => void;
  handleAddExercise: (moduleIndex: number, lessonIndex: number, exerciseType: string) => void;
}

const ExercisesStep: React.FC<ExercisesStepProps> = ({
  modules,
  setModules,
  handleAddExercise
}) => {
  const [activeTab, setActiveTab] = useState('exercises');
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);

  const handleSuggestExercises = () => {
    toast({
      title: "AI Exercise Suggestions",
      description: "Based on your lesson content, we've suggested some exercises"
    });
    
    // In a real app, these would be generated based on lesson content
    const suggestedExercises = [
      {
        id: `exercise-ai-1`,
        type: 'mcq',
        title: 'Understanding Key Concepts',
        prompt: 'Which of the following best describes the main concept covered in this lesson?',
        autoGrade: true,
        difficulty: 'easy'
      },
      {
        id: `exercise-ai-2`,
        type: 'code-challenge',
        title: 'Practical Implementation',
        prompt: 'Implement the function described in the lesson to solve the following problem.',
        autoGrade: true,
        difficulty: 'medium'
      }
    ];
    
    if (selectedModuleIndex !== null && selectedLessonIndex !== null) {
      const updatedModules = [...modules];
      updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].exercises = [
        ...updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].exercises,
        ...suggestedExercises
      ];
      setModules(updatedModules);
    }
  };
  
  const addResource = (type: string) => {
    if (selectedModuleIndex === null || selectedLessonIndex === null) return;
    
    const updatedModules = [...modules];
    updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].resources = [
      ...updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].resources,
      {
        id: `resource-${new Date().getTime()}`,
        type: type,
        title: `New ${type} Resource`,
        url: type === 'link' ? 'https://' : '',
        content: type === 'code' ? '// Add your code snippet here' : ''
      }
    ];
    
    setModules(updatedModules);
    
    toast({
      title: "Resource Added",
      description: `New ${type} resource has been added to the lesson`
    });
  };
  
  const deleteExercise = (exerciseIndex: number) => {
    if (selectedModuleIndex === null || selectedLessonIndex === null) return;
    
    const updatedModules = [...modules];
    updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].exercises = 
      updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].exercises
        .filter((_: any, index: number) => index !== exerciseIndex);
    
    setModules(updatedModules);
    
    toast({
      title: "Exercise Deleted",
      description: "The exercise has been removed from the lesson"
    });
  };
  
  const updateExerciseTitle = (exerciseIndex: number, newTitle: string) => {
    if (selectedModuleIndex === null || selectedLessonIndex === null) return;
    
    const updatedModules = [...modules];
    updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].exercises[exerciseIndex].title = newTitle;
    setModules(updatedModules);
  };
  
  const updateExercisePrompt = (exerciseIndex: number, newPrompt: string) => {
    if (selectedModuleIndex === null || selectedLessonIndex === null) return;
    
    const updatedModules = [...modules];
    updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].exercises[exerciseIndex].prompt = newPrompt;
    setModules(updatedModules);
  };
  
  const toggleExerciseGrading = (exerciseIndex: number) => {
    if (selectedModuleIndex === null || selectedLessonIndex === null) return;
    
    const updatedModules = [...modules];
    updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].exercises[exerciseIndex].autoGrade = 
      !updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].exercises[exerciseIndex].autoGrade;
    
    setModules(updatedModules);
  };
  
  const updateExerciseDifficulty = (exerciseIndex: number, difficulty: string) => {
    if (selectedModuleIndex === null || selectedLessonIndex === null) return;
    
    const updatedModules = [...modules];
    updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].exercises[exerciseIndex].difficulty = difficulty;
    setModules(updatedModules);
  };

  // Helper function to get active lesson exercises
  const getActiveExercises = () => {
    if (selectedModuleIndex === null || 
        selectedLessonIndex === null || 
        !modules[selectedModuleIndex] || 
        !modules[selectedModuleIndex].lessons[selectedLessonIndex]) {
      return [];
    }
    return modules[selectedModuleIndex].lessons[selectedLessonIndex].exercises || [];
  };
  
  // Helper function to get active lesson resources
  const getActiveResources = () => {
    if (selectedModuleIndex === null || 
        selectedLessonIndex === null || 
        !modules[selectedModuleIndex] || 
        !modules[selectedModuleIndex].lessons[selectedLessonIndex]) {
      return [];
    }
    return modules[selectedModuleIndex].lessons[selectedLessonIndex].resources || [];
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-3 mb-6">
        <div className="flex-1">
          <Label htmlFor="moduleSelector">Module</Label>
          <select
            id="moduleSelector"
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
            value={selectedModuleIndex}
            onChange={(e) => {
              setSelectedModuleIndex(parseInt(e.target.value, 10));
              setSelectedLessonIndex(0); // Reset lesson selection
            }}
          >
            {modules.map((module, index) => (
              <option key={module.id} value={index}>{module.title}</option>
            ))}
            {modules.length === 0 && (
              <option disabled>No modules available</option>
            )}
          </select>
        </div>
        
        <div className="flex-1">
          <Label htmlFor="lessonSelector">Lesson</Label>
          <select
            id="lessonSelector"
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
            value={selectedLessonIndex}
            onChange={(e) => setSelectedLessonIndex(parseInt(e.target.value, 10))}
            disabled={modules.length === 0 || !modules[selectedModuleIndex]?.lessons.length}
          >
            {modules.length > 0 && modules[selectedModuleIndex]?.lessons.map((lesson: any, index: number) => (
              <option key={lesson.id} value={index}>{lesson.title}</option>
            ))}
            {(modules.length === 0 || !modules[selectedModuleIndex]?.lessons.length) && (
              <option disabled>No lessons available</option>
            )}
          </select>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="exercises" className="flex-1 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {modules.length > 0 && modules[selectedModuleIndex] && modules[selectedModuleIndex].lessons[selectedLessonIndex] ? 
                `Exercises for ${modules[selectedModuleIndex].lessons[selectedLessonIndex].title}` : 
                'Exercises'}
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSuggestExercises}>
                AI Suggest
              </Button>
              <div className="relative group">
                <Button 
                  variant="default"
                  disabled={modules.length === 0 || !modules[selectedModuleIndex]?.lessons.length}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Exercise
                </Button>
                <div className="absolute right-0 mt-1 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <div className="py-1">
                    <button 
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center"
                      onClick={() => handleAddExercise(selectedModuleIndex, selectedLessonIndex, 'mcq')}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Multiple Choice
                    </button>
                    <button 
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center"
                      onClick={() => handleAddExercise(selectedModuleIndex, selectedLessonIndex, 'code-challenge')}
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Code Challenge
                    </button>
                    <button 
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center"
                      onClick={() => handleAddExercise(selectedModuleIndex, selectedLessonIndex, 'drag-drop')}
                    >
                      <Move className="h-4 w-4 mr-2" />
                      Drag and Drop
                    </button>
                    <button 
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center"
                      onClick={() => handleAddExercise(selectedModuleIndex, selectedLessonIndex, 'fill-blank')}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Fill in the Blanks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {getActiveExercises().length > 0 ? (
              getActiveExercises().map((exercise: any, index: number) => (
                <Card key={exercise.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          exercise.type === 'mcq' ? 'default' : 
                          exercise.type === 'code-challenge' ? 'secondary' : 
                          exercise.type === 'drag-drop' ? 'outline' : 'success'
                        }>
                          {exercise.type === 'mcq' ? 'Multiple Choice' : 
                           exercise.type === 'code-challenge' ? 'Code Challenge' : 
                           exercise.type === 'drag-drop' ? 'Drag & Drop' : 'Fill in Blanks'}
                        </Badge>
                        <Badge variant={
                          exercise.difficulty === 'easy' ? 'success' : 
                          exercise.difficulty === 'medium' ? 'default' : 'destructive'
                        }>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => deleteExercise(index)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input 
                      value={exercise.title}
                      onChange={(e) => updateExerciseTitle(index, e.target.value)}
                      className="font-medium mt-1"
                    />
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor={`exercise-prompt-${index}`}>Exercise Prompt</Label>
                      <textarea
                        id={`exercise-prompt-${index}`}
                        value={exercise.prompt}
                        onChange={(e) => updateExercisePrompt(index, e.target.value)}
                        placeholder="Enter the exercise instructions or question here..."
                        className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor={`exercise-difficulty-${index}`}>Difficulty</Label>
                        <select
                          id={`exercise-difficulty-${index}`}
                          value={exercise.difficulty}
                          onChange={(e) => updateExerciseDifficulty(index, e.target.value)}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>
                      <div className="flex flex-col justify-end">
                        <Label>&nbsp;</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <input
                            type="checkbox"
                            id={`auto-grade-${index}`}
                            checked={exercise.autoGrade}
                            onChange={() => toggleExerciseGrading(index)}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor={`auto-grade-${index}`} className="cursor-pointer">
                            Auto-grade exercise
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 border-t bg-muted/20 py-2">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button variant="default" size="sm">
                      Edit Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 border rounded-md bg-muted/10 text-muted-foreground">
                <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No exercises yet</p>
                <p className="text-sm mt-1">Add exercises to help students practice what they've learned</p>
                <div className="mt-4">
                  <Button 
                    onClick={() => handleAddExercise(selectedModuleIndex, selectedLessonIndex, 'mcq')}
                    disabled={modules.length === 0 || !modules[selectedModuleIndex]?.lessons.length}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Create First Exercise
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {modules.length > 0 && modules[selectedModuleIndex] && modules[selectedModuleIndex].lessons.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Template Library</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="border rounded-md p-3 hover:border-primary cursor-pointer">
                  <Code className="h-5 w-5 mb-2 text-blue-500" />
                  <h5 className="font-medium text-sm">Code Editor Template</h5>
                  <p className="text-xs text-muted-foreground mt-1">Live code editor with test cases</p>
                </div>
                <div className="border rounded-md p-3 hover:border-primary cursor-pointer">
                  <Image className="h-5 w-5 mb-2 text-purple-500" />
                  <h5 className="font-medium text-sm">Design Canvas Template</h5>
                  <p className="text-xs text-muted-foreground mt-1">Image annotation exercises</p>
                </div>
                <div className="border rounded-md p-3 hover:border-primary cursor-pointer">
                  <FileText className="h-5 w-5 mb-2 text-green-500" />
                  <h5 className="font-medium text-sm">Quiz Template</h5>
                  <p className="text-xs text-muted-foreground mt-1">5 pre-configured MCQs</p>
                </div>
                <div className="border rounded-md p-3 hover:border-primary cursor-pointer">
                  <CheckCircle className="h-5 w-5 mb-2 text-amber-500" />
                  <h5 className="font-medium text-sm">Flashcards Template</h5>
                  <p className="text-xs text-muted-foreground mt-1">Term & definition pairs</p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="resources" className="flex-1 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {modules.length > 0 && modules[selectedModuleIndex] && modules[selectedModuleIndex].lessons[selectedLessonIndex] ? 
                `Resources for ${modules[selectedModuleIndex].lessons[selectedLessonIndex].title}` : 
                'Resources'}
            </h3>
            <div className="relative group">
              <Button 
                variant="default"
                disabled={modules.length === 0 || !modules[selectedModuleIndex]?.lessons.length}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Resource
              </Button>
              <div className="absolute right-0 mt-1 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <div className="py-1">
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center"
                    onClick={() => addResource('file')}
                  >
                    <File className="h-4 w-4 mr-2" />
                    Upload File
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center"
                    onClick={() => addResource('link')}
                  >
                    <Link className="h-4 w-4 mr-2" />
                    External Link
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center"
                    onClick={() => addResource('code')}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Code Snippet
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {getActiveResources().length > 0 ? (
              getActiveResources().map((resource: any, index: number) => (
                <Card key={resource.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge variant={
                        resource.type === 'file' ? 'default' : 
                        resource.type === 'link' ? 'secondary' : 
                        'outline'
                      }>
                        {resource.type === 'file' ? 'PDF/Document' : 
                         resource.type === 'link' ? 'External Link' : 
                         'Code Snippet'}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input 
                      value={resource.title}
                      onChange={(e) => {
                        const updatedModules = [...modules];
                        updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].resources[index].title = e.target.value;
                        setModules(updatedModules);
                      }}
                      className="font-medium mt-1"
                    />
                  </CardHeader>
                  <CardContent>
                    {resource.type === 'link' && (
                      <Input 
                        placeholder="Enter URL" 
                        value={resource.url} 
                        onChange={(e) => {
                          const updatedModules = [...modules];
                          updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].resources[index].url = e.target.value;
                          setModules(updatedModules);
                        }}
                      />
                    )}
                    {resource.type === 'file' && (
                      <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm mb-2">Drag & drop file or click to browse</p>
                        <Button variant="outline" size="sm">
                          Choose File
                        </Button>
                      </div>
                    )}
                    {resource.type === 'code' && (
                      <textarea
                        value={resource.content}
                        onChange={(e) => {
                          const updatedModules = [...modules];
                          updatedModules[selectedModuleIndex].lessons[selectedLessonIndex].resources[index].content = e.target.value;
                          setModules(updatedModules);
                        }}
                        className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                      />
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 border rounded-md bg-muted/10 text-muted-foreground">
                <File className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No resources yet</p>
                <p className="text-sm mt-1">Add documents, links, or code examples to enhance the lesson</p>
                <div className="mt-4">
                  <Button 
                    onClick={() => addResource('file')}
                    disabled={modules.length === 0 || !modules[selectedModuleIndex]?.lessons.length}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add First Resource
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {modules.length > 0 && modules[selectedModuleIndex] && modules[selectedModuleIndex].lessons.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Global Resource Library</h4>
              <div className="border rounded-md p-4">
                <div className="flex gap-2 mb-4">
                  <Input placeholder="Search resources..." className="flex-1" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-center py-6 text-muted-foreground">
                  <p>All your uploaded resources will appear here</p>
                  <p className="text-sm">You can reuse them across multiple lessons</p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Review Step Component
interface ReviewStepProps {
  modules: any[];
  title: string;
  description: string;
  category: string;
  difficulty: string;
  language: string;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  modules,
  title,
  description,
  category,
  difficulty,
  language
}) => {
  // Calculate total lessons, exercises, and resources
  const stats = modules.reduce(
    (acc, module) => {
      acc.lessons += module.lessons.length;
      
      module.lessons.forEach((lesson: any) => {
        acc.exercises += lesson.exercises?.length || 0;
        acc.resources += lesson.resources?.length || 0;
      });
      
      return acc;
    },
    { lessons: 0, exercises: 0, resources: 0 }
  );
  
  const getCategoryLabel = (categoryKey: string) => {
    const categories: Record<string, string> = {
      'ai': 'AI & Machine Learning',
      'cs': 'Computer Science',
      'design': 'Design',
      'language': 'Language',
      'business': 'Business',
      'data': 'Data Science',
      'web': 'Web Development'
    };
    
    return categories[categoryKey] || categoryKey;
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Review Your Course</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full p-3 mb-2">
              <Book className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{modules.length}</h3>
            <p className="text-sm text-muted-foreground">Modules</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full p-3 mb-2">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{stats.lessons}</h3>
            <p className="text-sm text-muted-foreground">Lessons</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full p-3 mb-2">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{stats.exercises}</h3>
            <p className="text-sm text-muted-foreground">Exercises</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground text-xs">Title</Label>
              <p className="font-medium">{title}</p>
            </div>
            
            <div>
              <Label className="text-muted-foreground text-xs">Description</Label>
              <p>{description || 'No description provided'}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-muted-foreground text-xs">Category</Label>
                <p>{category ? getCategoryLabel(category) : 'Not specified'}</p>
              </div>
              
              <div>
                <Label className="text-muted-foreground text-xs">Difficulty</Label>
                <p className="capitalize">{difficulty}</p>
              </div>
              
              <div>
                <Label className="text-muted-foreground text-xs">Language</Label>
                <p className="capitalize">{language}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Course Outline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modules.map((module, index) => (
              <div key={module.id} className="border rounded-md">
                <div className="flex justify-between items-center p-3 bg-muted/20">
                  <h3 className="font-medium">
                    Module {index + 1}: {module.title}
                  </h3>
                  <Badge variant="outline">{module.lessons.length} lessons</Badge>
                </div>
                
                <div className="p-3">
                  {module.lessons.map((lesson: any, lessonIndex: number) => (
                    <div key={lesson.id} className="py-2 border-b last:border-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">
                            {index + 1}.{lessonIndex + 1} {lesson.title}
                          </span>
                          {lesson.isFreePreview && (
                            <Badge variant="success" className="ml-2 text-xs">Free Preview</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.videoUrl ? (
                            <Badge variant="outline" className="bg-green-50">
                              <CheckCircle className="h-3 w-3 mr-1" /> Video
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50">
                              ⚠️ No Video
                            </Badge>
                          )}
                          
                          <Badge variant="outline">
                            {lesson.duration} min
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground ml-6 mt-1">
                        <span>Exercises: {lesson.exercises?.length || 0}</span>
                        <span className="mx-2">•</span>
                        <span>Resources: {lesson.resources?.length || 0}</span>
                      </div>
                    </div>
                  ))}
                  
                  {module.lessons.length === 0 && (
                    <div className="text-sm text-muted-foreground py-2">
                      No lessons in this module
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {modules.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No modules created yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block">Course Thumbnail</Label>
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-md aspect-video flex flex-col items-center justify-center bg-muted/10">
                <Image className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm mb-2">Upload a thumbnail image</p>
                <Button variant="outline" size="sm">
                  Choose Image
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended: 1280x720px (16:9)
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="pricing">Pricing</Label>
                <select
                  id="pricing"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="certification">Certification</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id="certification"
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="certification" className="cursor-pointer">
                    Enable completion certificate
                  </Label>
                </div>
              </div>
              
              <div>
                <Label htmlFor="publishDate">Publication</Label>
                <div className="flex gap-2 mt-1">
                  <Button variant="outline" className="flex-1">Publish Now</Button>
                  <Button variant="outline" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

