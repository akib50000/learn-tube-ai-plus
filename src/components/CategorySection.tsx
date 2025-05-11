
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import CourseCard from '@/components/CourseCard';

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  instructorAvatar?: string;
  duration: string;
  progress?: number;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isPopular?: boolean;
  isAIGenerated?: boolean;
}

interface CategorySectionProps {
  title: string;
  description?: string;
  courses: Course[];
  className?: string;
  viewAllLink?: string;
}

const CategorySection = ({
  title,
  description,
  courses,
  className,
  viewAllLink = "/explore",
}: CategorySectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -containerRef.current.clientWidth / 2, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: containerRef.current.clientWidth / 2, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      checkScroll();
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
      };
    }
  }, [courses]);

  if (courses.length === 0) return null;

  return (
    <div className={`mb-12 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="outline" 
            className="hidden md:flex rounded-full"
            disabled={!canScrollLeft}
            onClick={handleScrollLeft}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            className="hidden md:flex rounded-full"
            disabled={!canScrollRight}
            onClick={handleScrollRight}
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
          <Button asChild variant="ghost" className="hidden sm:flex gap-1">
            <Link to={viewAllLink} className="flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x scrollbar-none"
          onScroll={checkScroll}
        >
          {courses.map((course, index) => (
            <div key={course.id} className="w-[300px] min-w-[300px] snap-start">
              <CourseCard
                id={course.id}
                title={course.title}
                thumbnail={course.thumbnail}
                instructor={course.instructor}
                instructorAvatar={course.instructorAvatar}
                duration={course.duration}
                progress={course.progress}
                rating={course.rating}
                reviewCount={course.reviewCount}
                isNew={course.isNew}
                isPopular={course.isPopular}
                isAIGenerated={course.isAIGenerated}
              />
            </div>
          ))}
        </div>
        
        {/* Mobile view all */}
        <div className="sm:hidden mt-4 text-center">
          <Button asChild variant="outline" className="w-full">
            <Link to={viewAllLink}>View All Courses</Link>
          </Button>
        </div>
        
        {/* Gradient masks for scroll effect */}
        {canScrollLeft && (
          <div className="absolute top-0 left-0 bottom-4 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        )}
        
        {canScrollRight && (
          <div className="absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default CategorySection;
