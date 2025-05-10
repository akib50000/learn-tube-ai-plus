
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Book, Code, FileText, Layout, Video, Award, MessageSquare } from 'lucide-react';
import ExerciseBuilder from '@/components/creator/ExerciseBuilder';
import AiCourseGenerator from '@/components/creator/AiCourseGenerator';
import AiTutorBuilder from '@/components/creator/AiTutorBuilder';
import AssessmentCreator from '@/components/creator/AssessmentCreator';
import ResourceManager from '@/components/creator/ResourceManager';

const CreatorStudio = () => {
  const [activeTab, setActiveTab] = useState('course-builder');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Creator Studio</h1>
            <p className="text-gray-600 dark:text-gray-400">Create and manage your courses and learning materials</p>
          </div>
          
          <div className="mt-4 md:mt-0 space-x-2">
            <Button variant="outline">Save Draft</Button>
            <Button>Publish Course</Button>
          </div>
        </div>

        <Tabs defaultValue="course-builder" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
            <TabsList className="p-0 bg-transparent border-b">
              <TabsTrigger 
                value="course-builder" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none"
              >
                <Layout className="h-4 w-4 mr-2" />
                Course Builder
              </TabsTrigger>
              <TabsTrigger 
                value="ai-generator" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none"
              >
                <Video className="h-4 w-4 mr-2" />
                AI Course Generator
              </TabsTrigger>
              <TabsTrigger 
                value="exercises" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none"
              >
                <Code className="h-4 w-4 mr-2" />
                Exercise Builder
              </TabsTrigger>
              <TabsTrigger 
                value="assessments" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none"
              >
                <FileText className="h-4 w-4 mr-2" />
                Assessment Creator
              </TabsTrigger>
              <TabsTrigger 
                value="resources" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none"
              >
                <Book className="h-4 w-4 mr-2" />
                Resource Manager
              </TabsTrigger>
              <TabsTrigger 
                value="ai-tutor" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Tutor Builder
              </TabsTrigger>
              <TabsTrigger 
                value="certificates" 
                className="py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none"
              >
                <Award className="h-4 w-4 mr-2" />
                Certificates
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="course-builder" className="mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Course Builder</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-700 dark:text-gray-300">Course Title</label>
                    <input 
                      type="text" 
                      placeholder="Enter course title" 
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-700 dark:text-gray-300">Category</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Technology</option>
                      <option>Design</option>
                      <option>Business</option>
                      <option>Language</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-700 dark:text-gray-300">Level</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <textarea 
                    rows={4}
                    placeholder="Enter course description" 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block font-medium text-gray-700 dark:text-gray-300">Course Thumbnail</label>
                  <div className="border-2 border-dashed p-8 text-center rounded-md">
                    <div className="space-y-2">
                      <p>Drop an image here or click to upload</p>
                      <Button>Upload Image</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-generator" className="mt-6">
            <AiCourseGenerator />
          </TabsContent>

          <TabsContent value="exercises" className="mt-6">
            <ExerciseBuilder />
          </TabsContent>

          <TabsContent value="assessments" className="mt-6">
            <AssessmentCreator />
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <ResourceManager />
          </TabsContent>

          <TabsContent value="ai-tutor" className="mt-6">
            <AiTutorBuilder />
          </TabsContent>

          <TabsContent value="certificates" className="mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Certificate Manager</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-700 dark:text-gray-300">Certificate Title</label>
                    <input 
                      type="text" 
                      placeholder="Course Completion Certificate" 
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-700 dark:text-gray-300">Certificate Template</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Modern</option>
                      <option>Classic</option>
                      <option>Professional</option>
                      <option>Academic</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-700 dark:text-gray-300">Issuing Criteria</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Course Completion</option>
                      <option>Passing Final Assessment</option>
                      <option>Achieving Minimum Score</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-700 dark:text-gray-300">Minimum Required Score (%)</label>
                    <input 
                      type="number" 
                      min="0"
                      max="100"
                      defaultValue="70"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <input type="checkbox" id="enable-linkedin" className="h-4 w-4" />
                    <label htmlFor="enable-linkedin" className="text-gray-700 dark:text-gray-300">Enable LinkedIn Badge</label>
                  </div>
                  
                  <Button className="mt-4 w-full">Save Certificate Settings</Button>
                </div>
                
                <div className="border rounded-md p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-700 min-h-[300px]">
                  <div className="text-center">
                    <Award className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">Certificate Preview</p>
                    <p className="text-sm text-gray-500">Configure settings to see preview</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorStudio;
