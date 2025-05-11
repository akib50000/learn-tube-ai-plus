
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, Bell, Video, User, Sun, Moon, BookOpen, Settings, Plus, LogOut } from 'lucide-react';
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
import { useTheme } from '@/hooks/use-theme';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { toast } = useToast();

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
    return location.pathname === path;
  };
  
  const handleCreateContent = () => {
    toast({
      title: "Create new content",
      description: "Choose what type of content to create",
      variant: "default",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 lg:gap-4 mr-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-learntube-red rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white transform rotate-45" />
            </div>
            <span className="hidden md:inline-flex text-xl font-bold">LearnTube</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 mr-4">
          <Button 
            variant={isActive("/") ? "default" : "ghost"} 
            size="sm" 
            asChild
            className="text-sm font-medium transition-colors"
          >
            <Link to="/">Home</Link>
          </Button>
          <Button 
            variant={isActive("/courses") ? "default" : "ghost"} 
            size="sm" 
            asChild
            className="text-sm font-medium transition-colors"
          >
            <Link to="/courses">Courses</Link>
          </Button>
          <Button 
            variant={isActive("/creator-studio") ? "default" : "ghost"} 
            size="sm" 
            asChild
            className="text-sm font-medium transition-colors"
          >
            <Link to="/creator-studio">Creator Studio</Link>
          </Button>
        </nav>
        
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
              <Button variant="ghost" size="icon" onClick={handleCreateContent}>
                <Plus className="h-5 w-5" />
                <span className="sr-only">Create</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Video className="mr-2 h-4 w-4" />
                <Link to="/creator-studio">New Course</Link>
              </DropdownMenuItem>
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
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
