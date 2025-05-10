
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import FeaturedCourse from '@/components/FeaturedCourse';
import CategorySection from '@/components/CategorySection';
import { ThemeProvider } from '@/hooks/use-theme';

const Index = () => {
  // Mock data for featured course
  const featuredCourse = {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals: Machine Learning for Beginners',
    description: 'Learn the core principles of artificial intelligence and machine learning in this comprehensive course for beginners. Understand key concepts, algorithms, and practical applications in the field of AI.',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2070',
    instructor: 'Dr. Sarah Johnson',
    duration: '8h 45m',
    likes: 12540,
    tags: ['AI', 'Machine Learning', 'Data Science', 'Beginner']
  };
  
  // Mock data for course categories
  const courses = {
    trending: [
      {
        id: 'react-mastery',
        title: 'React Mastery: Build Modern Web Applications',
        thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
        instructor: 'David Chen',
        duration: '10h 20m',
        progress: 45
      },
      {
        id: 'python-data-science',
        title: 'Python for Data Science and Machine Learning',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Maya Patel',
        duration: '12h 30m',
        progress: 20
      },
      {
        id: 'ux-design',
        title: 'UX Design Principles and Best Practices',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Alex Wong',
        duration: '8h 15m'
      },
      {
        id: 'blockchain',
        title: 'Blockchain Technology and Cryptocurrencies',
        thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000',
        instructor: 'James Wilson',
        duration: '9h 45m',
        progress: 10
      },
      {
        id: 'cloud-computing',
        title: 'Cloud Computing: AWS Fundamentals',
        thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Emma Davis',
        duration: '11h 10m'
      },
      {
        id: 'digital-marketing',
        title: 'Digital Marketing Masterclass',
        thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Michael Brown',
        duration: '7h 55m',
        progress: 75
      }
    ],
    programming: [
      {
        id: 'javascript-advanced',
        title: 'Advanced JavaScript: From Zero to Hero',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Alex Rodriguez',
        duration: '11h 40m'
      },
      {
        id: 'ios-swift',
        title: 'iOS Development with Swift',
        thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Lisa Chang',
        duration: '9h 25m',
        progress: 30
      },
      {
        id: 'golang',
        title: 'Go Programming Language for Backends',
        thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Robert Miller',
        duration: '8h 15m'
      },
      {
        id: 'rust-systems',
        title: 'Rust for System Programming',
        thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Samantha Lee',
        duration: '10h 50m'
      },
      {
        id: 'databases',
        title: 'Database Design and SQL Mastery',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Daniel Martin',
        duration: '7h 30m',
        progress: 60
      }
    ],
    design: [
      {
        id: 'figma-ui',
        title: 'UI Design with Figma: From Wireframe to Prototype',
        thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Olivia Wang',
        duration: '8h 20m'
      },
      {
        id: 'motion-graphics',
        title: 'Motion Graphics and Animation Fundamentals',
        thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Kevin Taylor',
        duration: '9h 15m',
        progress: 15
      },
      {
        id: 'ux-research',
        title: 'UX Research Methods and User Testing',
        thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Natalie Park',
        duration: '6h 45m'
      },
      {
        id: 'design-systems',
        title: 'Creating and Managing Design Systems',
        thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Carlos Mendez',
        duration: '7h 55m',
        progress: 40
      }
    ],
    recommended: [
      {
        id: 'ai-ethics',
        title: 'AI Ethics and Responsible Innovation',
        thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Dr. Amina Rashid',
        duration: '5h 30m'
      },
      {
        id: 'data-visualization',
        title: 'Data Visualization with D3.js',
        thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Thomas White',
        duration: '8h 45m',
        progress: 25
      },
      {
        id: 'cyber-security',
        title: 'Cybersecurity for Developers',
        thumbnail: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Jennifer Black',
        duration: '9h 20m'
      },
      {
        id: 'devops',
        title: 'DevOps and CI/CD Pipelines',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
        instructor: 'Ryan Smith',
        duration: '10h 15m',
        progress: 50
      }
    ]
  };
  
  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 md:ml-64 p-4 md:p-6 overflow-y-auto">
            {/* Featured Course Banner */}
            <section className="mb-8">
              <FeaturedCourse {...featuredCourse} />
            </section>
            
            {/* Course Categories */}
            <CategorySection title="Trending Courses" courses={courses.trending} />
            <CategorySection title="Programming" courses={courses.programming} />
            <CategorySection title="Design" courses={courses.design} />
            <CategorySection title="Recommended for You" courses={courses.recommended} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
