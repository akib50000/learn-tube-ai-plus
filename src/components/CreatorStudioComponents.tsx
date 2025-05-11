
import React from 'react';
import CourseCreatorDialog from './CourseCreator/CourseCreatorDialog';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Settings } from 'lucide-react';

export function CreatorToolbar() {
  const navigate = useNavigate();
  
  const handleCourseCreated = (courseId: string) => {
    // In a real app, we would navigate to the course editor
    console.log("Course created with ID:", courseId);
  };
  
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-950 border-b sticky top-0 z-10">
      <h2 className="text-xl font-semibold mr-auto">Creator Studio</h2>
      
      <Button variant="outline" size="sm" onClick={() => navigate('/settings')} className="gap-2">
        <Settings className="h-4 w-4" />
        Settings
      </Button>
      
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <BookOpen className="h-4 w-4" />
        View as Learner
      </Button>
      
      <CourseCreatorDialog 
        buttonText="Create New Course"
        buttonVariant="default"
        buttonClassName="bg-learntube-red hover:bg-learntube-dark-red text-white"
        onCourseCreated={handleCourseCreated}
      />
    </div>
  );
}

export function EmptyCoursesList() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <BookOpen className="h-8 w-8 text-gray-500" />
      </div>
      <h3 className="text-xl font-medium mb-2">No courses yet</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        Create your first course and start sharing your knowledge with learners around the world.
      </p>
      <CourseCreatorDialog 
        buttonText="Create Your First Course" 
        buttonClassName="bg-learntube-red hover:bg-learntube-dark-red text-white"
      />
    </div>
  );
}
