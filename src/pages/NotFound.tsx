
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass, Frown, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const isCourseNotFound = location.pathname.includes("/course/");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-screen-lg mx-auto py-16 px-4">
        <Card className="max-w-md mx-auto p-8 shadow-lg border rounded-xl">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              {isCourseNotFound ? (
                <Frown className="h-10 w-10 text-muted-foreground" />
              ) : (
                <Compass className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-center">
            {isCourseNotFound ? "Course Not Found" : "Page Not Found"}
          </h1>
          
          <p className="text-muted-foreground mb-8 text-center">
            {isCourseNotFound
              ? "The course you're looking for doesn't exist or may have been removed."
              : "Sorry, we couldn't find the page you're looking for."}
          </p>
          
          <div className="space-y-4">
            <Button asChild variant="default" className="w-full">
              <Link to="/" className="flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or search for content
                </span>
              </div>
            </div>
            
            <div className="flex mt-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search for courses..."
                  className="w-full py-2 pl-10 pr-4 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button type="submit" className="rounded-l-none">
                Search
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
