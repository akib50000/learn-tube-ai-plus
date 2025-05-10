
import { Link } from 'react-router-dom';
import { Play, Clock, User, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface FeaturedCourseProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  likes: number;
  tags: string[];
}

const FeaturedCourse = ({
  id,
  title,
  description,
  thumbnail,
  instructor,
  duration,
  likes,
  tags,
}: FeaturedCourseProps) => {
  return (
    <Card className="overflow-hidden border-none bg-transparent">
      <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
        <img 
          src={thumbnail} 
          alt={title} 
          className="absolute inset-0 h-full w-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-black/30 hover:bg-black/40">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-white/80 mb-4 line-clamp-2 md:line-clamp-3">{description}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{instructor}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{likes.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button asChild className="bg-learntube-red hover:bg-learntube-dark-red">
              <Link to={`/course/${id}`}>
                <Play className="h-4 w-4 mr-2" />
                Start Learning
              </Link>
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Save for Later
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedCourse;
