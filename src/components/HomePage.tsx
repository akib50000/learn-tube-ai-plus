
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, Star, MapPin } from 'lucide-react';

// Featured course data
const featuredCourse = {
  id: 'course-featured',
  title: 'Master Modern Web Development',
  instructor: 'Alex Johnson',
  rating: 4.9,
  reviews: 342,
  image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29kaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  description: 'A comprehensive journey from beginner to professional web developer. Learn React, Node.js, and modern JavaScript practices.',
  price: 89.99,
};

// Category data
const categories = [
  { id: 'cat-1', name: 'Web Development', icon: '🌐', courses: 123, image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' },
  { id: 'cat-2', name: 'Mobile Development', icon: '📱', courses: 87, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9iaWxlJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' },
  { id: 'cat-3', name: 'Data Science', icon: '📊', courses: 95, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' },
  { id: 'cat-4', name: 'Design', icon: '🎨', courses: 67, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' },
];

// Trending courses data
const trendingCourses = [
  {
    id: 'course-1',
    title: 'React Fundamentals',
    instructor: 'Sarah Davis',
    rating: 4.8,
    reviews: 218,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmVhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    price: 49.99,
    location: 'Online',
  },
  {
    id: 'course-2',
    title: 'Python for Data Science',
    instructor: 'Michael Chen',
    rating: 4.7,
    reviews: 195,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHl0aG9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: 59.99,
    location: 'Online',
  },
  {
    id: 'course-3',
    title: 'UX Design Principles',
    instructor: 'Emma Wilson',
    rating: 4.9,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: 69.99,
    location: 'Online',
  },
  {
    id: 'course-4',
    title: 'iOS App Development',
    instructor: 'David Thompson',
    rating: 4.6,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9iaWxlJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    price: 79.99,
    location: 'Online',
  },
];

const HomePage = () => {
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-learntube-darker-gray to-learntube-dark-gray overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=80"
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Learn with LearnTube
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in">
            Discover thousands of courses taught by expert instructors to help you master new skills
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
            <Button className="airbnb-btn-primary text-base">
              Explore Courses
            </Button>
            <Button variant="outline" className="text-base border-white text-white hover:bg-white/20">
              Start Teaching
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Course Section */}
      <section className="airbnb-section">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6">Featured Course</h2>
          
          {isLoading ? (
            <div className="relative rounded-xl overflow-hidden">
              <Skeleton className="w-full h-[400px]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 airbnb-card p-0 overflow-hidden hover:shadow-airbnb transition-shadow duration-300">
              <div className="relative aspect-[16/9] lg:aspect-auto">
                <img 
                  src={featuredCourse.image} 
                  alt={featuredCourse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="icon" className="rounded-full bg-white/90 hover:bg-white text-learntube-red">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 lg:p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{featuredCourse.title}</h3>
                    <p className="text-muted-foreground mb-1">By {featuredCourse.instructor}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{featuredCourse.rating}</span>
                    <span className="text-muted-foreground">({featuredCourse.reviews})</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 flex-grow">{featuredCourse.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                  <span className="font-semibold text-xl">${featuredCourse.price}</span>
                  <Button className="airbnb-btn-primary grow sm:grow-0">Enroll Now</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="airbnb-section bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6">Browse Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link key={category.id} to={`/explore?category=${encodeURIComponent(category.name)}`}>
                <Card className="airbnb-card h-full overflow-hidden hover:shadow-airbnb transition-shadow duration-300">
                  <div className="relative h-40">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <h3 className="text-lg font-bold">{category.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground">{category.courses} courses</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Courses Section */}
      <section className="airbnb-section">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Trending Courses</h2>
            <Link to="/explore" className="text-learntube-red hover:underline font-medium">
              View all courses
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCourses.map(course => (
              <Card key={course.id} className="airbnb-card h-full overflow-hidden hover:shadow-airbnb transition-shadow duration-300">
                <div className="relative">
                  <AspectRatio ratio={16/9} className="bg-muted">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                  <div className="absolute top-3 right-3">
                    <Button variant="ghost" size="icon" className="rounded-full bg-white/90 hover:bg-white text-learntube-red">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 text-sm mb-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-muted-foreground">({course.reviews})</span>
                  </div>
                  
                  <h3 className="font-bold mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">By {course.instructor}</p>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-3 w-3" />
                    <span>{course.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">${course.price}</span>
                    <Button variant="outline" size="sm" className="text-xs">View Course</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Community Section */}
      <section className="airbnb-section bg-learntube-red text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Learning Community</h2>
            <p className="text-lg mb-8">Connect with over 100,000 learners and instructors worldwide. Share knowledge, ask questions, and grow together.</p>
            <Button className="bg-white text-learntube-red hover:bg-gray-100">Join Now</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
