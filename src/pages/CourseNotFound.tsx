
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Frown, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const CourseNotFound = () => {
  const { courseId } = useParams<{ courseId: string }>();

  useEffect(() => {
    console.error("Course not found:", courseId);
  }, [courseId]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-screen-lg mx-auto py-16 px-4">
        <Card className="max-w-md mx-auto shadow-lg border rounded-xl overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/5"></div>
          <CardContent className="p-8">
            <div className="mb-8 flex justify-center -mt-16">
              <div className="w-20 h-20 rounded-full bg-background border-4 border-background shadow-lg flex items-center justify-center">
                <Frown className="h-10 w-10 text-muted-foreground" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-center">Course Not Found</h1>
            
            <p className="text-muted-foreground mb-8 text-center">
              The course "{courseId}" doesn't exist or may have been removed.
            </p>
            
            <div className="space-y-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/" className="flex items-center justify-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              
              <Button asChild className="w-full">
                <Link to="/creator-studio" className="flex items-center justify-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Explore Courses
                </Link>
              </Button>
              
              <div className="relative mt-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or search for more courses
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseNotFound;
