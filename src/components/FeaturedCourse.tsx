
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, User, ThumbsUp, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

interface FeaturedCourseProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  instructorId?: string;
  instructorAvatar?: string;
  duration: string;
  likes: number;
  tags: string[];
  rating?: number;
  students?: number;
  price?: string;
}

const FeaturedCourse = ({
  id,
  title,
  description,
  thumbnail,
  instructor,
  instructorId = '1',
  instructorAvatar,
  duration,
  likes,
  tags,
  rating = 4.8,
  students = 1250,
  price = 'Free',
}: FeaturedCourseProps) => {
  const [saved, setSaved] = useState(false);
  
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setSaved(!saved);
    toast({
      title: saved ? "Removed from saved courses" : "Saved for later",
      description: saved ? "Course removed from your saved list" : "Course added to your saved list",
      variant: saved ? "default" : "success",
    });
  };

  return (
    <Card className="overflow-hidden border-none shadow-xl bg-transparent h-full rounded-xl hover-lift">
      <div className="relative aspect-video sm:aspect-[21/9] overflow-hidden rounded-xl">
        <img 
          src={thumbnail} 
          alt={title} 
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        
        <div className="absolute top-4 right-4 flex gap-2">
          {price === 'Free' ? (
            <Badge variant="success" className="text-white font-medium px-3 py-1">Free</Badge>
          ) : (
            <Badge variant="secondary" className="bg-white text-black font-medium px-3 py-1">${price}</Badge>
          )}
          {students > 1000 && (
            <Badge variant="secondary" className="bg-black/40 text-white font-medium px-3 py-1">Bestseller</Badge>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/20">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Link to={`/course/${id}`} className="block">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              {title}
            </h1>
          </Link>
          <p className="text-white/80 mb-4 line-clamp-2 md:line-clamp-3">{description}</p>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/90 mb-4">
            <Link to={`/profile/${instructorId}/creator`} 
              className="flex items-center gap-2 hover:text-primary transition-colors">
              <Avatar className="h-6 w-6 border border-white/30">
                {instructorAvatar ? (
                  <AvatarImage src={instructorAvatar} alt={instructor} />
                ) : null}
                <AvatarFallback>{instructor[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{instructor}</span>
            </Link>
            
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <ThumbsUp className="h-4 w-4" />
              <span>{likes.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <BookOpen className="h-4 w-4" />
              <span>{students.toLocaleString()} students</span>
            </div>
            
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`h-4 w-4 ${star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-learntube-red hover:bg-learntube-dark-red gap-2">
              <Link to={`/course/${id}`}>
                <Play className="h-4 w-4" />
                Start Learning
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className={`${saved ? "bg-white/20 border-white/40" : "bg-white/10 border-white/30"} text-white hover:bg-white/20`}
              onClick={handleSave}
            >
              {saved ? "Saved" : "Save for Later"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedCourse;
