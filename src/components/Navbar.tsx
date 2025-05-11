
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, Search, Bell, Video, User, Sun, Moon, BookOpen, 
  Settings, Plus, LogOut, Home, Compass, Sparkles, 
  BarChart3, X, ChevronDown, ThumbsUp
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
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/use-theme';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `Looking for "${searchQuery}"`,
      });
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleCreateContent = () => {
    toast({
      title: "Create new content",
      description: "Choose what type of content to create",
    });
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60",
      isScrolled ? "shadow-sm" : ""
    )}>
      <div className="container flex h-16 items-center">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:w-[350px] pr-0">
            <SheetHeader className="mb-6">
              <SheetTitle className="flex items-center gap-2">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-learntube-red rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white transform rotate-45" />
                  </div>
                  <span className="text-xl font-bold">LearnTube</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-1 mr-6">
              <SheetClose asChild>
                <Link 
                  to="/" 
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-base transition-colors",
                    isActive("/") 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "hover:bg-muted"
                  )}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link 
                  to="/explore" 
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-base transition-colors",
                    isActive("/explore") 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "hover:bg-muted"
                  )}
                >
                  <Compass className="h-5 w-5" />
                  <span>Explore</span>
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link 
                  to="/creator-studio" 
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-base transition-colors",
                    isActive("/creator-studio") 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "hover:bg-muted"
                  )}
                >
                  <Video className="h-5 w-5" />
                  <span>Creator Studio</span>
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link 
                  to="/ai-tutor-builder" 
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-base transition-colors",
                    isActive("/ai-tutor-builder") 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "hover:bg-muted"
                  )}
                >
                  <Sparkles className="h-5 w-5" />
                  <span>AI Tutor Builder</span>
                </Link>
              </SheetClose>
              
              <div className="h-px bg-border my-2"></div>
              
              <h3 className="px-4 py-2 text-sm font-medium text-muted-foreground">My Account</h3>
              
              <SheetClose asChild>
                <Link 
                  to="/profile/creator-123/creator" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-base"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link 
                  to="/settings" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-base"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </SheetClose>
              
              <button 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-base text-left"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              
              <div className="h-px bg-border my-2"></div>
              
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-base text-left text-destructive">
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 bg-learntube-red rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white transform rotate-45" />
          </div>
          <span className="hidden font-bold text-lg md:inline-flex">LearnTube</span>
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button 
            variant={isActive("/") ? "secondary" : "ghost"} 
            size="sm" 
            asChild
            className="text-sm"
          >
            <Link to="/" className="flex items-center gap-1.5">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>
          <Button 
            variant={isActive("/explore") ? "secondary" : "ghost"} 
            size="sm" 
            asChild
            className="text-sm"
          >
            <Link to="/explore" className="flex items-center gap-1.5">
              <Compass className="h-4 w-4" />
              <span>Explore</span>
            </Link>
          </Button>
          <Button 
            variant={isActive("/creator-studio") ? "secondary" : "ghost"} 
            size="sm" 
            asChild
            className="text-sm"
          >
            <Link to="/creator-studio" className="flex items-center gap-1.5">
              <Video className="h-4 w-4" />
              <span>Creator Studio</span>
            </Link>
          </Button>
          <Button 
            variant={isActive("/ai-tutor-builder") ? "secondary" : "ghost"} 
            size="sm" 
            asChild
            className="text-sm"
          >
            <Link to="/ai-tutor-builder" className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>AI Tutor</span>
            </Link>
          </Button>
          
          {/* Categories dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-sm">
                Categories
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/explore?category=technology" className="flex items-center cursor-pointer">
                  Technology
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/explore?category=design" className="flex items-center cursor-pointer">
                  Design
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/explore?category=business" className="flex items-center cursor-pointer">
                  Business
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/explore?category=language" className="flex items-center cursor-pointer">
                  Language
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/explore?category=ai" className="flex items-center cursor-pointer">
                  AI & Machine Learning
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/explore?category=marketing" className="flex items-center cursor-pointer">
                  Marketing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/explore" className="flex items-center cursor-pointer font-medium">
                  View All Categories
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex items-center max-w-lg mx-auto px-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses, tutorials, topics..."
              className="w-full pl-10 pr-3 py-2 h-9 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        
        {/* Right side icons */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Create button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Plus className="h-5 w-5" />
                <span className="sr-only">Create</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/creator-studio" className="cursor-pointer">
                  <Video className="mr-2 h-4 w-4" />
                  <span>New Course</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>New Lesson</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/ai-tutor-builder" className="cursor-pointer">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>New AI Tutor</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Notifications */}
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
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs">
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="cursor-pointer p-3 hover:bg-muted focus:bg-muted">
                  <div className="flex gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                      <AvatarFallback>DC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">New course comment</p>
                      <p className="text-xs text-muted-foreground">
                        David Chen commented on your React course
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-3 hover:bg-muted focus:bg-muted">
                  <div className="flex gap-3">
                    <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center">
                      <ThumbsUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course milestone reached!</p>
                      <p className="text-xs text-muted-foreground">
                        Your AI Fundamentals course has reached 1,000 students
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-3 hover:bg-muted focus:bg-muted">
                  <div className="flex gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">New follower</p>
                      <p className="text-xs text-muted-foreground">
                        Dr. Sarah Johnson is now following you
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center font-medium">
                See all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User menu */}
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
              <div className="flex items-center gap-3 p-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to="/profile/creator-123/creator" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/creator-studio" className="cursor-pointer">
                    <Video className="mr-2 h-4 w-4" />
                    <span>Creator Studio</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/ai-tutor-builder" className="cursor-pointer">
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>AI Tutor Builder</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                    <span>Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>System</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
