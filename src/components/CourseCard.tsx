
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Heart, BookOpen, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  instructorId?: string;
  duration: string;
  category?: string;
  description?: string;
  progress?: number;
  rating?: number;
  price?: string;
  students?: number;
  isFeatured?: boolean;
}

const CourseCard = ({ 
  id, 
  title, 
  thumbnail, 
  instructor, 
  instructorId = '1',
  duration, 
  category,
  description,
  progress = 0,
  rating = 4.8,
  price = 'Free',
  students = 325,
  isFeatured = false
}: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <Card 
      className={cn(
        "overflow-hidden border-none shadow-md transition-all duration-300 h-full",
        isHovered ? "shadow-xl transform-gpu scale-[1.02]" : "",
        isFeatured ? "ring-2 ring-primary ring-offset-2" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link to={`/course/${id}`} className="block">
          <div className="relative overflow-hidden aspect-video">
            <img 
              src={thumbnail} 
              alt={title} 
              className={cn(
                "object-cover w-full h-full transition-transform duration-500",
                isHovered ? "scale-110" : "scale-100"
              )}
            />
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 transition-opacity",
              isHovered ? "opacity-90" : ""
            )} />
            
            {category && (
              <Badge className="absolute top-3 left-3 bg-white/90 text-black hover:bg-white/80">
                {category}
              </Badge>
            )}
            
            {price && (
              <Badge className={cn(
                "absolute top-3 right-3 px-2 py-1 font-medium",
                price === 'Free' ? "bg-green-500 hover:bg-green-600" : "bg-black/80 hover:bg-black/70"
              )}>
                {price === 'Free' ? 'Free' : `$${price}`}
              </Badge>
            )}
            
            {progress > 0 && (
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-200/50">
                <div 
                  className="progress-bar h-full" 
                  style={{ width: `${progress}%` }} 
                />
                <span className="absolute right-2 bottom-2 text-xs font-medium text-white bg-black/50 px-1.5 py-0.5 rounded-sm">
                  {progress}% Complete
                </span>
              </div>
            )}
          </div>
        </Link>
        
        <button 
          className={cn(
            "absolute z-10 top-3 right-12 p-2 rounded-full transition-all duration-200",
            isHovered || isFavorite ? "opacity-100" : "opacity-0",
            isFavorite ? "bg-red-500 text-white" : "bg-white/90 hover:bg-white"
          )}
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-4 w-4", isFavorite ? "fill-white" : "fill-transparent")} />
        </button>
      </div>
      
      <div className="p-4">
        <Link to={`/course/${id}`} className="block">
          <h3 className="font-medium text-base sm:text-lg line-clamp-2 mb-1.5 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{description}</p>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <Link to={`/profile/${instructorId}/creator`} className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            <User className="h-3.5 w-3.5" />
            <span>{instructor}</span>
          </Link>
          
          <div className="flex items-center gap-1 text-sm">
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5", 
                    i < Math.round(rating) 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300 fill-transparent"
                  )}
                />
              ))}
            </div>
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-gray-500 text-xs">({students})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t pt-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{students} students</span>
          </div>
        </div>
        
        <Button asChild size="sm" className="w-full mt-3 bg-learntube-red hover:bg-learntube-dark-red text-white">
          <Link to={`/course/${id}`}>
            Enroll Now
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default CourseCard;
