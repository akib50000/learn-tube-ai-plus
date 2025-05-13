
import { useState } from 'react';
import { CheckCircle, Lock, Clock, Play, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  active?: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  completed: number;
  total: number;
}

interface BookmarkedSection {
  id: string;
  title: string;
  timestamp: number;
  moduleId: string;
  lessonId: string;
}

interface CourseModulesProps {
  modules: Module[];
  bookmarks?: BookmarkedSection[];
  onSelectLesson: (moduleId: string, lessonId: string) => void;
}

const CourseModules = ({ modules = [], bookmarks = [], onSelectLesson }: CourseModulesProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([modules[0]?.id || '']);
  const [activeTab, setActiveTab] = useState<'modules' | 'bookmarks'>('modules');
  
  // Calculate overall course progress with null checks
  const totalCompleted = modules.reduce((sum, module) => sum + module.completed, 0);
  const totalLessons = modules.reduce((sum, module) => sum + module.total, 0);
  const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
  
  // Format timestamp to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="bg-white dark:bg-learntube-dark-gray rounded-lg border h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-medium text-lg">Course Content</h2>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span>{overallProgress}% complete</span>
          <span>{totalCompleted}/{totalLessons} lessons</span>
        </div>
        <Progress value={overallProgress} className="mt-2" />
      </div>
      
      <div className="p-2 border-b">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'modules' | 'bookmarks')}>
          <TabsList className="w-full">
            <TabsTrigger value="modules" className="flex-1">
              Modules
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex-1">
              Bookmarks
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <ScrollArea className="flex-1">
        {activeTab === 'modules' ? (
          <Accordion
            type="multiple"
            value={expandedModules}
            onValueChange={setExpandedModules}
            className="w-full"
          >
            {modules.map((module) => (
              <AccordionItem key={module.id} value={module.id} className="border-b">
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{module.title}</span>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span>{module.completed}/{module.total} completed</span>
                      <Progress 
                        value={(module.completed / Math.max(1, module.total)) * 100}
                        className="w-20 h-1.5"
                      />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="py-1">
                    {module.lessons.map((lesson) => (
                      <Button
                        key={lesson.id}
                        variant="ghost"
                        className={`w-full justify-start px-4 py-2 h-auto ${
                          lesson.active ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : ''
                        }`}
                        disabled={lesson.locked}
                        onClick={() => onSelectLesson(module.id, lesson.id)}
                      >
                        <div className="flex items-center gap-3">
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : lesson.locked ? (
                            <Lock className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                          <div className="flex flex-col items-start text-left">
                            <span className={`line-clamp-1 ${lesson.locked ? 'text-gray-400' : ''}`}>
                              {lesson.title}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="p-2">
            {bookmarks.length > 0 ? (
              <div className="space-y-2">
                {bookmarks.map((bookmark) => (
                  <Button
                    key={bookmark.id}
                    variant="outline"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => onSelectLesson(bookmark.moduleId, bookmark.lessonId)}
                  >
                    <div className="flex items-center gap-3">
                      <Bookmark className="h-4 w-4 text-learntube-red" />
                      <div className="flex flex-col items-start text-left">
                        <span className="line-clamp-1 font-medium">{bookmark.title}</span>
                        <span className="text-xs text-gray-500">
                          at {formatTime(bookmark.timestamp)}
                        </span>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Bookmark className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No bookmarks yet</p>
                <p className="text-sm mt-1">Bookmark important sections while watching</p>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default CourseModules;
