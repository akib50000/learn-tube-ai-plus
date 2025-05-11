
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `Looking for "${searchQuery}"`,
        variant: "default",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-36 h-36 mb-8">
            <div className="absolute inset-0 bg-learntube-red/10 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <span className="text-7xl">4</span>
                <span className="text-7xl">0</span>
                <span className="text-7xl">4</span>
                <HelpCircle className="absolute -top-3 -right-3 h-8 w-8 text-learntube-dark-red" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Page not found</h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-md">
            We can't seem to find the page you're looking for.
          </p>
          
          <div className="w-full max-w-md mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input 
                type="search"
                placeholder="Search for courses, topics, instructors..."
                className="airbnb-input flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="bg-learntube-red hover:bg-learntube-dark-red">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 bg-learntube-red hover:bg-learntube-dark-red">
              <Link to="/">
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="javascript:history.back()">
                <ArrowLeft className="h-5 w-5" />
                Go Back
              </a>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-learntube-red/10 flex items-center justify-center mx-auto mb-3">
                <Search className="h-6 w-6 text-learntube-red" />
              </div>
              <h3 className="text-lg font-medium mb-2">Browse Courses</h3>
              <p className="text-muted-foreground text-sm">
                Explore our extensive library of courses by category.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-learntube-red/10 flex items-center justify-center mx-auto mb-3">
                <HelpCircle className="h-6 w-6 text-learntube-red" />
              </div>
              <h3 className="text-lg font-medium mb-2">Help Center</h3>
              <p className="text-muted-foreground text-sm">
                Get support from our helpful community and team.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-learntube-red/10 flex items-center justify-center mx-auto mb-3">
                <Home className="h-6 w-6 text-learntube-red" />
              </div>
              <h3 className="text-lg font-medium mb-2">Return Home</h3>
              <p className="text-muted-foreground text-sm">
                Go back to our homepage to start fresh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
