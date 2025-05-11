
import { useLocation, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Frown } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // If it's a course path, redirect to the CourseNotFound page
  if (location.pathname.match(/^\/course\/[^/]+$/)) {
    const courseId = location.pathname.split('/')[2];
    return <Navigate to={`/course-not-found/${courseId}`} replace />;
  }

  const isCourseNotFound = location.pathname.includes("/course/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-6">
        <div className="mb-6 flex justify-center">
          {isCourseNotFound ? (
            <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
              <Frown className="h-10 w-10 text-yellow-500" />
            </div>
          ) : (
            <div className="text-6xl font-bold text-primary/20">404</div>
          )}
        </div>
        
        <h1 className="text-3xl font-bold mb-4">
          {isCourseNotFound ? "Course Not Found" : "Page Not Found"}
        </h1>
        
        <p className="text-muted-foreground mb-6">
          {isCourseNotFound
            ? "The course you're looking for doesn't exist or may have been removed."
            : "Sorry, we couldn't find the page you're looking for."}
        </p>
        
        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          {isCourseNotFound && (
            <Button asChild>
              <Link to="/creator-studio">Explore Courses</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
