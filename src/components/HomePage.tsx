
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Search, ArrowRight, Trophy, Star, Clock, 
  CheckCircle, Bookmark, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import FeaturedCourse from '@/components/FeaturedCourse';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/hooks/use-toast';

// Mock data for featured courses
const featuredCoursesData = [
  {
    id: "course-1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, MongoDB and more with hands-on projects.",
    thumbnail: "https://images.unsplash.com/photo-1546900703-cf06143d1239?q=80&w=2050&auto=format&fit=crop",
    instructor: "Sarah Johnson",
    instructorId: "instructor-1",
    duration: "42 hours",
    likes: 4253,
    tags: ["Web Development", "React", "JavaScript"],
    rating: 4.9,
    students: 25481,
    price: "Free"
  },
  {
    id: "course-2",
    title: "UI/UX Design Masterclass",
    description: "Learn to design beautiful interfaces that users will love. Master Figma, design principles and user research.",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
    instructor: "Michael Chen",
    instructorId: "instructor-2",
    duration: "28 hours",
    likes: 3876,
    tags: ["Design", "UI/UX", "Figma"],
    rating: 4.8,
    students: 18924,
    price: "49.99"
  },
  {
    id: "course-3",
    title: "Data Science and Machine Learning",
    description: "Dive into the world of data science with Python, pandas, scikit-learn, and TensorFlow.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    instructor: "Dr. Alicia Rivera",
    instructorId: "instructor-3",
    duration: "36 hours",
    likes: 5124,
    tags: ["Data Science", "Python", "Machine Learning"],
    rating: 4.7,
    students: 32145,
    price: "59.99"
  }
];

// Mock data for popular categories
const popularCategories = [
  {
    id: "cat-1",
    name: "Development",
    icon: "💻",
    courses: 482,
    color: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    id: "cat-2",
    name: "Design",
    icon: "🎨",
    courses: 341,
    color: "bg-purple-50 dark:bg-purple-900/20"
  },
  {
    id: "cat-3",
    name: "Business",
    icon: "📊",
    courses: 264,
    color: "bg-amber-50 dark:bg-amber-900/20"
  },
  {
    id: "cat-4",
    name: "Marketing",
    icon: "📱",
    courses: 157,
    color: "bg-green-50 dark:bg-green-900/20"
  },
  {
    id: "cat-5",
    name: "Photography",
    icon: "📷",
    courses: 112,
    color: "bg-red-50 dark:bg-red-900/20"
  },
  {
    id: "cat-6",
    name: "Music",
    icon: "🎵",
    courses: 98,
    color: "bg-indigo-50 dark:bg-indigo-900/20"
  }
];

// Mock data for trending courses
const trendingCoursesData = [
  {
    id: "trending-1",
    title: "Introduction to Artificial Intelligence",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    instructor: "Prof. James Wilson",
    rating: 4.8,
    students: 14253,
    price: "49.99",
    tags: ["AI", "Python", "Machine Learning"]
  },
  {
    id: "trending-2",
    title: "Advanced JavaScript: Modern ES6+ Features",
    thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop",
    instructor: "Emma Rodriguez",
    rating: 4.9,
    students: 8764,
    price: "Free",
    tags: ["JavaScript", "Web Development", "ES6"]
  },
  {
    id: "trending-3",
    title: "Financial Analysis and Modeling",
    thumbnail: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1974&auto=format&fit=crop",
    instructor: "Robert Chang, MBA",
    rating: 4.7,
    students: 6129,
    price: "69.99",
    tags: ["Finance", "Excel", "Business"]
  },
  {
    id: "trending-4",
    title: "Digital Marketing Fundamentals",
    thumbnail: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2031&auto=format&fit=crop",
    instructor: "Lisa Montgomery",
    rating: 4.8,
    students: 9452,
    price: "39.99",
    tags: ["Marketing", "Social Media", "SEO"]
  }
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `Looking for "${searchQuery}"`,
      });
      // In a real app, this would navigate or filter results
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64">
          {/* Hero Section */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10" />
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="Students learning" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-20 container py-20 px-4 max-w-5xl mx-auto text-white">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                  Discover Your Learning Potential
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  Join over 100,000 learners mastering new skills with our expert-led courses.
                  Start your learning journey today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="search"
                        placeholder="What do you want to learn today?"
                        className="pl-12 h-12 w-full bg-white text-black rounded-full shadow"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Button 
                        type="submit" 
                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-10"
                      >
                        Search
                      </Button>
                    </form>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="h-12 px-6 rounded-full">
                    <Link to="/explore">
                      Browse All Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Featured Courses Section */}
          <section className="py-16 px-4">
            <div className="container max-w-6xl mx-auto">
              <div className="flex flex-wrap items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-semibold mb-2">Featured Courses</h2>
                  <p className="text-muted-foreground">
                    Handpicked courses by our expert team to jumpstart your learning journey
                  </p>
                </div>
                <Button asChild variant="outline" className="rounded-full mt-2 md:mt-0">
                  <Link to="/explore">
                    View All Courses <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="space-y-6">
                {featuredCoursesData.map((course) => (
                  <FeaturedCourse key={course.id} {...course} />
                ))}
              </div>
            </div>
          </section>
          
          {/* Categories Section */}
          <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/30">
            <div className="container max-w-6xl mx-auto">
              <div className="flex flex-wrap items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-semibold mb-2">Popular Categories</h2>
                  <p className="text-muted-foreground">
                    Browse our most sought-after learning categories
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {popularCategories.map((category) => (
                  <Link 
                    to={`/explore?category=${category.name.toLowerCase()}`} 
                    key={category.id}
                    className="block group"
                  >
                    <div className={`${category.color} p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-200 hover:shadow-lg h-full`}>
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="font-medium mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.courses} courses</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          
          {/* Trending Courses Section */}
          <section className="py-16 px-4">
            <div className="container max-w-6xl mx-auto">
              <div className="flex flex-wrap items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-semibold mb-2">Trending This Week</h2>
                  <p className="text-muted-foreground">
                    Popular courses that students are loving right now
                  </p>
                </div>
                <Button asChild variant="outline" className="rounded-full mt-2 md:mt-0">
                  <Link to="/explore?sort=trending">
                    See More <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingCoursesData.map((course) => (
                  <Link to={`/course/${course.id}`} key={course.id} className="group">
                    <Card className="overflow-hidden border-none shadow-md h-full transition-all duration-200 hover:shadow-xl">
                      <div className="relative">
                        <AspectRatio ratio={16/9}>
                          <img 
                            src={course.thumbnail} 
                            alt={course.title} 
                            className="object-cover w-full h-full rounded-t-lg" 
                          />
                        </AspectRatio>
                        <div className="absolute top-3 right-3 flex gap-2">
                          {course.price === 'Free' ? (
                            <Badge variant="success" className="bg-green-500 text-white">Free</Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-white text-black">${course.price}</Badge>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="sm" variant="secondary" className="gap-1 bg-white/90 text-black rounded-full">
                            <Heart className="h-4 w-4" /> Save
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent className="p-5">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {course.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-secondary/50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <h3 className="text-lg font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          By {course.instructor}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star}
                                  className={`h-3.5 w-3.5 ${star <= Math.round(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Intl.NumberFormat().format(course.students)} students
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          
          {/* Benefits Section */}
          <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/30">
            <div className="container max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-semibold mb-4">Why Learn With Us</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We provide a comprehensive learning experience that helps you achieve your goals
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-background p-6 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Expert Instructors</h3>
                  <p className="text-muted-foreground">
                    Learn from industry professionals with years of hands-on experience and teaching expertise
                  </p>
                </div>
                
                <div className="bg-background p-6 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Practical Projects</h3>
                  <p className="text-muted-foreground">
                    Build real-world projects that enhance your portfolio and demonstrate your skills to employers
                  </p>
                </div>
                
                <div className="bg-background p-6 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Flexible Learning</h3>
                  <p className="text-muted-foreground">
                    Learn at your own pace with lifetime access to course materials and regular updates
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 px-4">
            <div className="container max-w-6xl mx-auto">
              <div className="bg-primary text-white rounded-2xl overflow-hidden shadow-xl">
                <div className="flex flex-col md:flex-row">
                  <div className="p-8 md:p-12 flex-1">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
                    <p className="text-white/90 mb-6 text-lg">
                      Join thousands of students already learning on our platform. Get unlimited access to our growing library of courses.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" variant="secondary" className="rounded-full">
                        Sign Up For Free
                      </Button>
                      <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white/10">
                        Browse Courses
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block">
                    <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
                      alt="Students learning" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
