
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft, Home, Book } from 'lucide-react';
import Navbar from '@/components/Navbar';

const CourseNotFound = () => {
  const { courseId } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-learntube-red/10 rounded-full flex items-center justify-center animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Book className="h-16 w-16 text-learntube-red" />
                <Search className="h-8 w-8 text-learntube-dark-red absolute bottom-3 right-3" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Course Not Found</h1>
            <p className="text-lg text-muted-foreground mb-6">
              We couldn't find the course with ID: <span className="font-mono bg-muted px-2 py-1 rounded">{courseId}</span>
            </p>
            <p className="text-muted-foreground mb-8 max-w-lg">
              This course may have been removed, renamed, or is temporarily unavailable. 
              Please check the URL or try searching for the course.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="default" size="lg" className="gap-2 bg-learntube-red hover:bg-learntube-dark-red">
                <Link to="/">
                  <Home className="h-5 w-5" />
                  Browse Courses
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/">
                  <ArrowLeft className="h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-12 border-t pt-8">
            <h2 className="text-lg font-semibold mb-4">You might be interested in these courses:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Link to={`/course/recommended-${i}`} key={i} 
                  className="group flex items-center gap-3 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center shrink-0">
                    <Book className="h-6 w-6 text-primary/70" />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      Recommended Course {i}
                    </h3>
                    <p className="text-sm text-muted-foreground">Popular course</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseNotFound;
