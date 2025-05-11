
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { BookOpen, Filter, Search, Sparkles, Tag, Clock } from 'lucide-react';

const Explore = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data
  const categories = [
    { id: 'tech', name: 'Technology' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
    { id: 'language', name: 'Language' },
    { id: 'ai', name: 'Artificial Intelligence' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'data', name: 'Data Science' },
    { id: 'web', name: 'Web Development' }
  ];
  
  const coursesData = [
    {
      id: 'ai-fundamentals',
      title: 'AI Fundamentals: Machine Learning for Beginners',
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2070',
      instructor: 'Dr. Sarah Johnson',
      instructorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      duration: '8h 45m',
      rating: 4.8,
      reviewCount: 1253,
      price: 49.99,
      isPopular: true,
      category: 'ai',
    },
    {
      id: 'react-mastery',
      title: 'React Mastery: Build Modern Web Applications',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
      instructor: 'David Chen',
      instructorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      duration: '10h 20m',
      rating: 4.9,
      reviewCount: 987,
      price: 59.99,
      progress: 45,
      category: 'web',
    },
    {
      id: 'ux-design',
      title: 'UX Design Principles and Best Practices',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
      instructor: 'Alex Wong',
      instructorAvatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      duration: '8h 15m',
      rating: 4.7,
      reviewCount: 654,
      price: 39.99,
      isNew: true,
      category: 'design',
    },
    {
      id: 'python-data',
      title: 'Python for Data Science and Machine Learning',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
      instructor: 'Maya Patel',
      instructorAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      duration: '12h 30m',
      rating: 4.6,
      reviewCount: 843,
      price: 0,
      isAIGenerated: true,
      category: 'data',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Masterclass',
      thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=1000',
      instructor: 'Michael Brown',
      instructorAvatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      duration: '7h 55m',
      rating: 4.5,
      reviewCount: 512,
      price: 29.99,
      category: 'marketing',
    },
    {
      id: 'japanese-beginner',
      title: 'Japanese for Beginners: Master the Basics',
      thumbnail: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&q=80&w=1000',
      instructor: 'Yuki Tanaka',
      instructorAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      duration: '9h 40m',
      rating: 4.9,
      reviewCount: 376,
      price: 44.99,
      progress: 10,
      category: 'language',
    },
    {
      id: 'entrepreneurship',
      title: 'Entrepreneurship: From Idea to Launch',
      thumbnail: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=1000',
      instructor: 'James Wilson',
      instructorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      duration: '11h 15m',
      rating: 4.7,
      reviewCount: 289,
      price: 54.99,
      isPopular: true,
      category: 'business',
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Fundamentals: Protect Your Digital Life',
      thumbnail: 'https://images.unsplash.com/photo-1478358161113-b0e11994a36b?auto=format&fit=crop&q=80&w=1000',
      instructor: 'Elena Rodriguez',
      instructorAvatar: 'https://randomuser.me/api/portraits/women/39.jpg',
      duration: '6h 30m',
      rating: 4.8,
      reviewCount: 412,
      price: 49.99,
      isNew: true,
      category: 'tech',
    }
  ];
  
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const filteredCourses = coursesData.filter(course => {
    // Filter by search query
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !course.instructor.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) {
      return false;
    }
    
    // Filter by price range
    const coursePrice = typeof course.price === 'string' ? 0 : course.price;
    if (coursePrice < priceRange[0] || coursePrice > priceRange[1]) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Sidebar filters - desktop */}
          <div className="hidden md:block w-64 space-y-6">
            <div>
              <h3 className="font-medium mb-4 flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <Label 
                      htmlFor={`category-${category.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Duration
              </h3>
              <div className="space-y-2">
                {["0-3 hours", "3-6 hours", "6-10 hours", "10+ hours"].map(duration => (
                  <div key={duration} className="flex items-center space-x-2">
                    <Checkbox id={`duration-${duration}`} />
                    <Label 
                      htmlFor={`duration-${duration}`}
                      className="text-sm cursor-pointer"
                    >
                      {duration}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`rating-${rating}`} />
                    <Label 
                      htmlFor={`rating-${rating}`}
                      className="text-sm cursor-pointer flex items-center"
                    >
                      {Array(rating).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                        />
                      ))}
                      {Array(5 - rating).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 text-muted-foreground/30" 
                        />
                      ))}
                      <span className="ml-1">& up</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Button variant="outline" className="w-full" onClick={() => {
              setSelectedCategories([]);
              setPriceRange([0, 100]);
            }}>
              Clear All Filters
            </Button>
          </div>
          
          {/* Main content */}
          <div className="flex-1 w-full">
            {/* Search and filter header */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search courses, topics, or instructors..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="md:hidden w-full flex items-center justify-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {(selectedCategories.length > 0) && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
              
              <div className="hidden md:flex items-center gap-2 ml-auto">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="text-sm border rounded-md p-2 bg-background">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Highest Rated</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Mobile filter drawer */}
            {isFilterOpen && (
              <div className="md:hidden border rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-4">Filters</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <Badge 
                          key={category.id}
                          variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleCategory(category.id)}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Price Range</h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 100]}
                        max={100}
                        step={1}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedCategories([]);
                        setPriceRange([0, 100]);
                      }}
                    >
                      Clear
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Tabs */}
            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new" className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> New
                </TabsTrigger>
                <TabsTrigger value="ai">AI-Generated</TabsTrigger>
                <TabsTrigger value="free">Free</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Course Results */}
            {filteredCourses.length > 0 ? (
              <>
                <div className="text-sm text-muted-foreground mb-4">
                  Showing {filteredCourses.length} results
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCourses.map(course => (
                    <CourseCard
                      key={course.id}
                      id={course.id}
                      title={course.title}
                      thumbnail={course.thumbnail}
                      instructor={course.instructor}
                      instructorAvatar={course.instructorAvatar}
                      duration={course.duration}
                      rating={course.rating}
                      reviewCount={course.reviewCount}
                      price={course.price}
                      progress={course.progress}
                      isNew={course.isNew}
                      isPopular={course.isPopular}
                      isAIGenerated={course.isAIGenerated}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We couldn't find any courses matching your filters. Try adjusting your search criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 100]);
                    setSearchQuery('');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
