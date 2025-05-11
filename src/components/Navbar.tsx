
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, Search, Bell, Video, User, Sun, Moon, 
  BookOpen, Settings, Plus, LogOut, Home, Compass,
  BookMarked, Heart, ChevronDown, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTheme } from '@/hooks/use-theme';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import CourseCreatorDialog from './CourseCreator/CourseCreatorDialog';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `Looking for "${searchQuery}"`,
        variant: "default",
      });
      console.log('Searching for:', searchQuery);
    }
  };
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  const handleCourseCreated = (courseId: string) => {
    console.log("Course created with ID:", courseId);
    toast({
      title: "Course created",
      description: `Your course with ID ${courseId} has been created successfully.`,
      variant: "success",
    });
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-200",
      isScrolled 
        ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" 
        : "bg-background"
    )}>
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 lg:gap-4 mr-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-learntube-red rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white transform rotate-45" />
            </div>
            <span className="hidden md:inline-flex text-xl font-bold">LearnTube</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex mx-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    isActive("/") 
                      ? "bg-accent text-accent-foreground" 
                      : "text-foreground/60 hover:text-foreground/80 hover:bg-accent/50"
                  )}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={isActive("/courses") ? "bg-accent text-accent-foreground" : ""}>
                Courses
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-3 p-6 w-[500px]">
                  <div>
                    <h4 className="text-sm font-medium leading-none mb-3">Browse by Category</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {["Web Development", "Data Science", "Design", "Business"].map((category) => (
                        <Link key={category} to={`/courses?category=${category.toLowerCase().replace(' ', '-')}`}>
                          <div className="block cursor-pointer select-none space-y-1 rounded-md p-3 hover:bg-accent">
                            <div className="text-sm font-medium">{category}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium leading-none mb-3">Popular Courses</h4>
                    <div className="grid gap-2">
                      {["JavaScript Fundamentals", "React Masterclass"].map((course, i) => (
                        <Link key={course} to={`/course/${i+1}`}>
                          <div className="flex cursor-pointer select-none items-center gap-2 rounded-md p-2 hover:bg-accent">
                            <div className="h-10 w-10 shrink-0 rounded bg-accent flex items-center justify-center">
                              <BookMarked className="h-5 w-5" />
                            </div>
                            <div className="text-sm">{course}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={isActive("/creator-studio") ? "bg-accent text-accent-foreground" : ""}>
                Creator Studio
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-2 p-4 w-[220px]">
                  <Link to="/creator-studio">
                    <div className="flex cursor-pointer select-none items-center gap-2 rounded-md p-2 hover:bg-accent">
                      <Video className="h-4 w-4" />
                      <div className="text-sm">My Courses</div>
                    </div>
                  </Link>
                  <Link to="/creator-studio?tab=analytics">
                    <div className="flex cursor-pointer select-none items-center gap-2 rounded-md p-2 hover:bg-accent">
                      <BookOpen className="h-4 w-4" />
                      <div className="text-sm">Analytics</div>
                    </div>
                  </Link>
                  <div className="border-t my-2"></div>
                  <CourseCreatorDialog
                    buttonText="Create New Course"
                    buttonClassName="w-full justify-start gap-2 bg-transparent hover:bg-accent px-2 py-2 h-auto font-normal shadow-none text-sm rounded-md"
                    buttonVariant="ghost"
                    onCourseCreated={handleCourseCreated}
                  />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/explore">
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    isActive("/explore") 
                      ? "bg-accent text-accent-foreground" 
                      : "text-foreground/60 hover:text-foreground/80 hover:bg-accent/50"
                  )}
                >
                  Explore
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 bg-background border-t p-4 md:hidden">
            <nav className="flex flex-col gap-2">
              <Link to="/" className="nav-item flex items-center gap-2 py-3">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link to="/courses" className="nav-item flex items-center gap-2 py-3">
                <BookOpen className="h-5 w-5" />
                <span>Courses</span>
              </Link>
              <Link to="/creator-studio" className="nav-item flex items-center gap-2 py-3">
                <Video className="h-5 w-5" />
                <span>Creator Studio</span>
              </Link>
              <Link to="/explore" className="nav-item flex items-center gap-2 py-3">
                <Compass className="h-5 w-5" />
                <span>Explore</span>
              </Link>
              
              <div className="border-t my-2"></div>
              
              <Link to="/profile/creator-123/creator" className="nav-item flex items-center gap-2 py-3">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              <Link to="/settings" className="nav-item flex items-center gap-2 py-3">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              
              <div className="border-t my-2"></div>
              
              <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} variant="ghost" className="justify-start">
                {theme === 'dark' ? <Sun className="mr-2 h-5 w-5" /> : <Moon className="mr-2 h-5 w-5" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
              
              <CourseCreatorDialog
                buttonText="Create New Course"
                buttonClassName="w-full justify-start gap-2"
                buttonVariant="default"
                onCourseCreated={handleCourseCreated}
              />
            </nav>
          </div>
        )}
        
        <form onSubmit={handleSearch} className="flex-1 flex items-center max-w-lg mx-auto">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search courses, tutorials, topics..."
              className="w-full pl-4 pr-10 py-2 rounded-full border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </form>
        
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Plus className="h-5 w-5" />
                <span className="sr-only">Create</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <CourseCreatorDialog 
                buttonText="New Course"
                buttonVariant="ghost"
                buttonClassName="w-full justify-start h-8 px-2 text-sm gap-2"
                onCourseCreated={handleCourseCreated}
              />
              <DropdownMenuItem>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>New Lesson</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="h-4 w-4 p-0 flex items-center justify-center absolute -top-1 -right-1 text-[10px]"
                >
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer p-3 hover:bg-muted">
                    <div className="flex gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">New course comment</p>
                        <p className="text-xs text-muted-foreground">
                          User{i} commented on your JavaScript course
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">2 hour{i} ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center font-medium">
                See all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile/creator-123/creator" className="flex items-center w-full">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/creator-studio" className="flex items-center w-full">
                  <Video className="mr-2 h-4 w-4" />
                  Creator Studio
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/saved-courses" className="flex items-center w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  Saved Courses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
