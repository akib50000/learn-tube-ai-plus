
import { Card } from '@/components/ui/card';
import ProgressTracker from '@/components/ProgressTracker';

interface ModuleProgress {
  id: string;
  title: string;
  completed: number;
  total: number;
}

interface LearningPathItem {
  id: string;
  title: string;
  completed: boolean;
  locked?: boolean;
}

interface ProgressData {
  modules: ModuleProgress[];
  learningPath: LearningPathItem[];
}

interface ProgressSectionProps {
  progressData: ProgressData;
}

const ProgressSection = ({ progressData }: ProgressSectionProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Learning Progress</h2>
        <ProgressTracker 
          modules={progressData.modules}
          learningPath={progressData.learningPath}
        />
      </Card>
    </div>
  );
};

export default ProgressSection;
