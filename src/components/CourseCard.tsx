
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CourseCardProps {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  progress?: number;
}

const CourseCard = ({ id, title, thumbnail, instructor, duration, progress = 0 }: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link to={`/course/${id}`}>
      <Card 
        className="video-card h-full overflow-hidden border-none transition-transform duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title} 
            className={`video-thumbnail transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
          />
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-base line-clamp-2 mb-1">{title}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <User className="h-3 w-3" />
            <span>{instructor}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
