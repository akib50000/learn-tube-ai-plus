
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Heart, BookOpen, Star, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CourseCardProps {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  instructorAvatar?: string;
  duration: string;
  category?: string;
  progress?: number;
  rating?: number;
  reviewCount?: number;
  price?: string | number;
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  isAIGenerated?: boolean;
}

const CourseCard = ({ 
  id, 
  title, 
  thumbnail, 
  instructor, 
  instructorAvatar,
  duration, 
  category,
  progress = 0,
  rating,
  reviewCount,
  price,
  isFeatured = false,
  isNew = false,
  isPopular = false,
  isAIGenerated = false
}: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: isFavorite 
        ? "Course removed from your saved courses" 
        : "Course added to your saved courses",
      variant: isFavorite ? "default" : "success",
    });
  };

  const getBadgeVariant = () => {
    if (isAIGenerated) return "secondary";
    if (isNew) return "outline";
    if (isPopular) return "default";
    return "outline";
  };
  
  const getBadgeText = () => {
    if (isAIGenerated) return "AI-Generated";
    if (isNew) return "New";
    if (isPopular) return "Popular";
    return "";
  };
  
  const showBadge = isNew || isPopular || isAIGenerated;
  
  return (
    <Card 
      className={cn(
        "group overflow-hidden border transition-all duration-300 hover:shadow-md", 
        isHovered ? "ring-1 ring-primary/20" : "",
        isFeatured ? "ring-2 ring-primary ring-offset-2" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/course/${id}`} className="block focus:outline-none focus:ring-2 focus:ring-primary">
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={thumbnail} 
            alt={title} 
            className={cn(
              "object-cover w-full h-full transition-transform duration-700",
              isHovered ? "scale-105" : ""
            )}
          />
          
          {/* Price badge */}
          {typeof price !== 'undefined' && (
            <Badge 
              className="absolute top-3 right-3 bg-background/90 text-foreground shadow-sm"
            >
              {price === 0 || price === 'Free' ? 'Free' : `$${price}`}
            </Badge>
          )}
          
          {/* Feature badge */}
          {showBadge && (
            <Badge 
              variant={getBadgeVariant()} 
              className="absolute top-3 left-3"
            >
              {getBadgeText()}
            </Badge>
          )}
          
          {/* Progress bar for enrolled courses */}
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 w-full px-3 pb-3 pt-8 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between text-white text-xs mb-1.5">
                <span>Continue learning</span>
                <span>{progress}% complete</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
          
          {/* Hover overlay */}
          <div className={cn(
            "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity",
            isHovered ? "opacity-100" : ""
          )}>
            <Button size="sm" className="bg-white text-black hover:bg-white/90">
              <Play className="h-3 w-3 mr-1 fill-current" /> Preview
            </Button>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/course/${id}`} className="block group-hover:text-primary transition-colors">
            <h3 className="font-medium text-lg line-clamp-2 mb-1">
              {title}
            </h3>
          </Link>
          
          <button 
            className="flex-shrink-0 p-2 rounded-full hover:bg-muted transition-colors"
            onClick={handleFavoriteToggle}
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              className={cn(
                "h-5 w-5 transition-all", 
                isFavorite 
                  ? "fill-red-500 text-red-500 scale-110" 
                  : "text-muted-foreground"
              )} 
            />
          </button>
        </div>
        
        <div className="flex items-center mt-2">
          <Link 
            to={`/profile/${instructor}/creator`} 
            className="flex items-center hover:text-primary transition-colors"
          >
            <Avatar className="h-5 w-5 mr-1.5">
              <AvatarImage src={instructorAvatar} />
              <AvatarFallback>{instructor[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{instructor}</span>
          </Link>
        </div>
        
        <div className="flex flex-wrap items-center mt-2 text-sm text-muted-foreground">
          <div className="flex items-center mr-4">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{duration}</span>
          </div>
          
          {rating && (
            <div className="flex items-center">
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "h-3.5 w-3.5", 
                      i < Math.floor(rating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-muted stroke-muted-foreground/40"
                    )}
                  />
                ))}
              </div>
              <span className="ml-1">{rating.toFixed(1)}</span>
              {reviewCount && (
                <span className="ml-1 text-xs">({reviewCount})</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
