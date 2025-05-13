
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CreatorDashboardProps {
  courses: any[];
  isAddingCourse: boolean;
  handleCreateCourse: () => void;
}

const CreatorDashboard: React.FC<CreatorDashboardProps> = ({ 
  courses, 
  isAddingCourse, 
  handleCreateCourse 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Creator Dashboard</h1>
        <Button 
          className="bg-learntube-red hover:bg-learntube-dark-red"
          onClick={handleCreateCourse}
          disabled={isAddingCourse}
        >
          {isAddingCourse ? (
            "Creating..."
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Create New Course
            </>
          )}
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">345</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Course Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-green-600">+0.2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,250</div>
            <p className="text-xs text-green-600">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Course Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-green-600">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Your Courses</CardTitle>
          <CardDescription>Manage and track your course portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
              <div 
                key={course.id}
                className="border rounded-lg overflow-hidden bg-white dark:bg-learntube-dark-gray"
              >
                <div className="aspect-video relative">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      course.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {course.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium mb-2 line-clamp-1">{course.title}</h3>
                  
                  {course.progress < 100 && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Completion</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Updated {course.lastUpdated}</span>
                    {course.students && <span>{course.students} students</span>}
                  </div>
                  
                  <div className="mt-3 flex">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="text-xs w-full bg-learntube-red hover:bg-learntube-dark-red"
                      onClick={() => {
                        toast({
                          title: `Editing ${course.title}`,
                          description: "Opening course editor",
                        });
                      }}
                    >
                      {course.status === 'published' ? 'Edit Course' : 'Continue Editing'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Create New Course Card */}
            <div className="border rounded-lg overflow-hidden bg-white dark:bg-learntube-dark-gray border-dashed border-gray-300 flex flex-col items-center justify-center p-6 h-full min-h-[200px]">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Plus className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="font-medium mb-2">Create New Course</h3>
              <p className="text-sm text-gray-500 text-center mb-4">Start building your next amazing learning experience</p>
              <Button 
                className="bg-learntube-red hover:bg-learntube-dark-red"
                onClick={handleCreateCourse}
                disabled={isAddingCourse}
              >
                {isAddingCourse ? "Creating..." : "Get Started"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorDashboard;
