
import { useState } from 'react';
import { CheckCircle, Lock, ChevronDown, ChevronRight, Clock, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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

interface CourseModulesProps {
  modules: Module[];
  onSelectLesson: (moduleId: string, lessonId: string) => void;
}

const CourseModules = ({ modules, onSelectLesson }: CourseModulesProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([modules[0]?.id || '']);
  
  // Calculate overall course progress
  const totalCompleted = modules.reduce((sum, module) => sum + module.completed, 0);
  const totalLessons = modules.reduce((sum, module) => sum + module.total, 0);
  const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
  
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
      
      <ScrollArea className="flex-1">
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
                      value={(module.completed / module.total) * 100}
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
      </ScrollArea>
    </div>
  );
};

export default CourseModules;
