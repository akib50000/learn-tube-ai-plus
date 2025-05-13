
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { BookOpen } from 'lucide-react';

const CourseNotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 px-4 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          The course you're looking for doesn't exist or may have been removed.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/explore">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseNotFound;
