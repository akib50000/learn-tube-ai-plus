
import { Home, Compass, Clock, ThumbsUp, Folder, Bookmark, GraduationCap, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define sidebar categories with their related topics
const learningCategories = [
  { name: 'Programming', topics: ['JavaScript', 'Python', 'React', 'Node.js', 'Data Structures'] },
  { name: 'Design', topics: ['UI/UX', 'Figma', 'Graphic Design', 'Motion Graphics'] },
  { name: 'Business', topics: ['Marketing', 'Finance', 'Entrepreneurship', 'Leadership'] },
  { name: 'Academic', topics: ['Mathematics', 'Physics', 'Literature', 'History'] },
  { name: 'Languages', topics: ['English', 'Spanish', 'Japanese', 'French'] }
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r p-2 h-[calc(100vh-4rem)] fixed top-16">
      <ScrollArea className="h-full pr-4">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 font-semibold tracking-tight">Menu</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="sidebar-item w-full justify-start">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
              <Button variant="ghost" className="sidebar-item w-full justify-start">
                <Compass className="h-4 w-4" />
                <span>Explore</span>
              </Button>
              <Button variant="ghost" className="sidebar-item w-full justify-start">
                <Clock className="h-4 w-4" />
                <span>History</span>
              </Button>
              <Button variant="ghost" className="sidebar-item w-full justify-start">
                <ThumbsUp className="h-4 w-4" />
                <span>Liked Courses</span>
              </Button>
              <Button variant="ghost" className="sidebar-item w-full justify-start">
                <Bookmark className="h-4 w-4" />
                <span>Saved</span>
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="px-3 py-2">
            <h2 className="mb-2 font-semibold tracking-tight">Your Learning</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="sidebar-item w-full justify-start">
                <Folder className="h-4 w-4" />
                <span>My Courses</span>
              </Button>
              <Button variant="ghost" className="sidebar-item w-full justify-start">
                <GraduationCap className="h-4 w-4" />
                <span>Certifications</span>
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="px-3 py-2">
            <h2 className="mb-2 font-semibold tracking-tight">Categories</h2>
            <div className="space-y-1">
              {learningCategories.map((category) => (
                <div key={category.name} className="mb-2">
                  <Button variant="ghost" className="sidebar-item w-full justify-start font-medium">
                    {category.name}
                  </Button>
                  <div className="ml-4 space-y-1">
                    {category.topics.map((topic) => (
                      <Button 
                        key={topic} 
                        variant="ghost" 
                        className="text-sm w-full justify-start h-8 px-2"
                      >
                        {topic}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="px-3 py-2">
            <Button variant="ghost" className="sidebar-item w-full justify-start">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
