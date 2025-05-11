
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Heart, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  category?: string;
  progress?: number;
  rating?: number;
  price?: string;
  isFeatured?: boolean;
}

const CourseCard = ({ 
  id, 
  title, 
  thumbnail, 
  instructor, 
  duration, 
  category,
  progress = 0,
  rating,
  price,
  isFeatured = false
}: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <Card 
      className={cn(
        "video-card h-full overflow-hidden border shadow-sm transition-all duration-200 hover:shadow-md", 
        isHovered ? "transform-gpu scale-[1.02]" : "",
        isFeatured ? "ring-2 ring-primary ring-offset-2" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/course/${id}`} className="block">
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={thumbnail} 
            alt={title} 
            className={cn(
              "video-thumbnail object-cover w-full h-full transition-transform duration-300",
              isHovered ? "scale-105" : ""
            )}
          />
          
          {category && (
            <Badge className="absolute top-2 left-2 bg-white/90 text-black hover:bg-white/80">
              {category}
            </Badge>
          )}
          
          {price && (
            <Badge className="absolute top-2 right-2 bg-black/80 text-white">
              {price === 'Free' ? 'Free' : `$${price}`}
            </Badge>
          )}
          
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700">
              <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }} 
              />
              <span className="absolute right-1 bottom-1 text-[10px] font-medium text-white bg-black/50 px-1 rounded">
                {progress}%
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <Link to={`/course/${id}`} className="block flex-1">
            <h3 className="font-medium text-base line-clamp-2 mb-2 hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>
          <button 
            className="flex-shrink-0 ml-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "text-gray-400")} />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-y-1 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1 mr-3">
            <User className="h-3 w-3" />
            <Link to={`/profile/${instructor}/creator`} className="hover:text-primary transition-colors">
              {instructor}
            </Link>
          </div>
          <div className="flex items-center gap-1 mr-3">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
          {rating && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className={cn(
                      "h-3 w-3", 
                      star <= Math.round(rating) 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300 fill-gray-300"
                    )}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
