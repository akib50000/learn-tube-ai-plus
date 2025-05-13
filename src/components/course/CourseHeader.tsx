
import { Clock, Play, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CourseHeaderProps {
  title: string;
  bookmarkedLessons: string[];
  toggleBookmark: (lessonId: string) => void;
}

const CourseHeader = ({ title, bookmarkedLessons, toggleBookmark }: CourseHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
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
  );
};

export default CourseHeader;
