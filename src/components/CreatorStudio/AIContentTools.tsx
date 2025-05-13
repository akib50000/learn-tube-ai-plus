
import React from 'react';
import { 
  Upload, 
  Plus, 
  FileText, 
  ListFilter, 
  Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface AIContentToolsProps {
  contentTools: any[];
  isGeneratingOutline: boolean;
  isUploadingVideo: boolean;
  form: UseFormReturn<any>;
  handleGenerateOutline: (data: any) => void;
  handleUploadVideo: () => void;
  handleLaunchTool: (toolName: string) => void;
}

const AIContentTools: React.FC<AIContentToolsProps> = ({
  contentTools,
  isGeneratingOutline,
  isUploadingVideo,
  form,
  handleGenerateOutline,
  handleUploadVideo,
  handleLaunchTool,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Content Tools</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-learntube-red hover:bg-learntube-dark-red">
              <Plus className="h-4 w-4 mr-2" />
              New Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Generate New Content</DialogTitle>
              <DialogDescription>
                Use AI to generate course outlines, exercises, or assessments.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleGenerateOutline)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Topic/Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Introduction to Machine Learning" {...field} />
                        </FormControl>
                        <FormDescription>
                          What is the main topic of your course?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keywords</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., algorithms, data science, neural networks" {...field} />
                        </FormControl>
                        <FormDescription>
                          Separate keywords with commas
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty Level</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2" 
                            {...field}
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-learntube-red hover:bg-learntube-dark-red"
                    disabled={isGeneratingOutline}
                  >
                    {isGeneratingOutline ? 'Generating...' : 'Generate Course Outline'}
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>AI-Powered Course Creation</CardTitle>
          <CardDescription>Use our suite of AI tools to quickly create engaging courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contentTools.map((tool) => (
              <div key={tool.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tool.color}`}>
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium">{tool.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-3">{tool.description}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleLaunchTool(tool.title)}
                >
                  Launch Tool
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Video-to-Course Generator</CardTitle>
          <CardDescription>Upload a video lecture and let AI generate a complete course module</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-2">Drop your video file here</h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              Upload a lecture video and our AI will automatically extract chapters, create a transcript, generate slides, and build a course outline.
            </p>
            <div className="flex flex-col gap-2 items-center">
              <Button 
                className="bg-learntube-red hover:bg-learntube-dark-red"
                onClick={handleUploadVideo}
                disabled={isUploadingVideo}
              >
                {isUploadingVideo ? "Uploading..." : "Upload Video"}
              </Button>
              <span className="text-xs text-gray-500">MP4, MOV or AVI (max. 2GB)</span>
            </div>
          </div>
          
          <div className="mt-6 border-t pt-6">
            <h3 className="font-medium mb-3">What you'll get:</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="border rounded p-3 text-center">
                <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <span className="text-sm">Transcript</span>
              </div>
              <div className="border rounded p-3 text-center">
                <ListFilter className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <span className="text-sm">Chapters</span>
              </div>
              <div className="border rounded p-3 text-center">
                <Image className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <span className="text-sm">Visual Slides</span>
              </div>
              <div className="border rounded p-3 text-center">
                <FileText className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                <span className="text-sm">Exercises</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIContentTools;
