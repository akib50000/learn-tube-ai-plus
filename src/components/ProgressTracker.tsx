
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lock } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  completed: number;
  total: number;
}

interface LearningPath {
  id: string;
  title: string;
  completed: boolean;
  locked?: boolean;
}

interface ProgressTrackerProps {
  modules: Module[];
  learningPath: LearningPath[];
}

const ProgressTracker = ({ modules, learningPath }: ProgressTrackerProps) => {
  const totalCompleted = modules.reduce((sum, module) => sum + module.completed, 0);
  const totalLessons = modules.reduce((sum, module) => sum + module.total, 0);
  const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
  
  return (
    <div className="space-y-6">
      {/* Overall Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Track your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} />
            </div>
            
            <div className="grid gap-4">
              {modules.map((module) => (
                <div key={module.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{module.title}</span>
                    <span className="text-sm text-gray-500">
                      {module.completed}/{module.total} completed
                    </span>
                  </div>
                  <Progress value={(module.completed / module.total) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Learning Path Card */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Path</CardTitle>
          <CardDescription>Recommended next steps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningPath.map((path) => (
              <div
                key={path.id}
                className={`p-4 border rounded-lg flex items-center justify-between ${
                  path.locked ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {path.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : path.locked ? (
                    <Lock className="h-5 w-5 text-gray-400" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-blue-500" />
                  )}
                  <div>
                    <h3 className="font-medium">{path.title}</h3>
                    <p className="text-sm text-gray-500">
                      {path.completed
                        ? 'Completed'
                        : path.locked
                        ? 'Locked'
                        : 'In progress'}
                    </p>
                  </div>
                </div>
                {!path.locked && !path.completed && (
                  <Button size="sm">Continue</Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
