
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import PracticeExercises from '@/components/PracticeExercises';

interface ExerciseBuilderProps {
  exerciseTemplates: any[];
  practiceExercises: any[];
  handleSelectTemplate: (category: string, template: string) => void;
}

const ExerciseBuilder: React.FC<ExerciseBuilderProps> = ({
  exerciseTemplates,
  practiceExercises,
  handleSelectTemplate,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Interactive Exercise Builder</h1>
        <Button 
          className="bg-learntube-red hover:bg-learntube-dark-red"
          onClick={() => {
            toast({
              title: "New Exercise",
              description: "Creating a new blank exercise",
            })
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Exercise
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Exercise Templates</CardTitle>
            <CardDescription>Pre-built templates for different course categories</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto space-y-4">
            {exerciseTemplates.map((category, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <category.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">{category.category}</h3>
                </div>
                <div className="space-y-2">
                  {category.templates.map((template: string, idx: number) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleSelectTemplate(category.category, template)}
                    >
                      <Plus className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{template}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Question Types</CardTitle>
            <CardDescription>Drag and drop question types to build your exercise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div 
                className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                onClick={() => {
                  toast({
                    title: "Question Type Added",
                    description: "Multiple Choice question type added to your exercise",
                  });
                }}
              >
                <h3 className="font-medium mb-1">Multiple Choice</h3>
                <p className="text-xs text-gray-500">Select one or multiple correct answers</p>
              </div>
              <div 
                className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                onClick={() => {
                  toast({
                    title: "Question Type Added",
                    description: "Code Challenge added to your exercise",
                  });
                }}
              >
                <h3 className="font-medium mb-1">Code Challenge</h3>
                <p className="text-xs text-gray-500">Write and test code solutions</p>
              </div>
              <div 
                className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                onClick={() => {
                  toast({
                    title: "Question Type Added",
                    description: "Drag and Drop question added to your exercise",
                  });
                }}
              >
                <h3 className="font-medium mb-1">Drag and Drop</h3>
                <p className="text-xs text-gray-500">Match or order items visually</p>
              </div>
              <div 
                className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                onClick={() => {
                  toast({
                    title: "Question Type Added",
                    description: "Fill in the Blanks question added to your exercise",
                  });
                }}
              >
                <h3 className="font-medium mb-1">Fill in the Blanks</h3>
                <p className="text-xs text-gray-500">Complete text with missing words</p>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-4">
              <h3 className="font-medium mb-3">Exercise Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Time Limit</span>
                  <div className="flex items-center gap-2">
                    <Input type="number" className="w-16 h-8" defaultValue="10" />
                    <span className="text-sm text-gray-500">minutes</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Grading</span>
                  <select className="h-8 rounded-md border border-input bg-background px-2">
                    <option>Auto-graded</option>
                    <option>Manual review</option>
                    <option>Both</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span>Attempts</span>
                  <Input type="number" className="w-16 h-8" defaultValue="2" />
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full"
              onClick={() => {
                toast({
                  title: "Exercise Preview",
                  description: "Opening exercise preview mode",
                });
              }}
            >
              Preview Exercise
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Practice Exercises</CardTitle>
          <CardDescription>Interactive exercises for your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <PracticeExercises exercises={practiceExercises} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Certification Setup</CardTitle>
          <CardDescription>Create certificates for course completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="aspect-[8.5/11] bg-gray-50 border rounded-lg flex items-center justify-center mb-3">
                <div className="w-[80%] h-[80%] border border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-serif mb-1">Certificate of Completion</h3>
                    <p className="text-sm text-gray-500">Your certificate template will appear here</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Template Upload",
                      description: "Please select a certificate template to upload",
                    });
                  }}
                >
                  Upload Template
                </Button>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Certificate Title</label>
                <Input defaultValue="Certificate of Completion" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Course Name</label>
                <Input placeholder="Select a course..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Certificate Message</label>
                <Input defaultValue="This certifies that {student} has successfully completed {course}." />
              </div>
              <Button className="w-full bg-learntube-red hover:bg-learntube-dark-red">
                Save Certificate Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseBuilder;
