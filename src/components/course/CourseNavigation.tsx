
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { 
  List, 
  ChevronUp, 
  ChevronDown, 
  Play, 
  CheckCircle, 
  Bookmark, 
  FileText,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface CourseNavigationProps {
  modules: Module[];
  currentLessonId: string;
  bookmarkedLessons: string[];
  courseProgress: number;
  resources: any[];
  toggleModuleExpansion: (moduleId: string) => void;
  handleSelectLesson: (lessonId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  handleDownload: () => void;
}

export const CourseNavigation = ({
  modules,
  currentLessonId,
  bookmarkedLessons,
  courseProgress,
  resources,
  toggleModuleExpansion,
  handleSelectLesson,
  toggleBookmark,
  handleDownload
}: CourseNavigationProps) => {
  const { toast } = useToast();

  return (
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
            value={courseProgress} 
            className="h-2 mb-1" 
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{courseProgress}% complete</span>
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
            {resources && resources.map((resource: any) => (
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
  );
};

export default CourseNavigation;
