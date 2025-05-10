
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Upload, Clock, FileCode, Book, Video } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const AiCourseGenerator = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      toast({
        title: "Video Uploaded",
        description: `Successfully uploaded "${e.target.files[0].name}"`
      });
    }
  };

  const simulateGeneration = () => {
    if (!uploadedFile && !courseTitle) {
      toast({
        title: "Error",
        description: "Please upload a video or provide course details",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStep('Analyzing content...');

    // Simulate the generation process
    const steps = [
      'Analyzing content...',
      'Extracting chapters...',
      'Generating transcript...',
      'Creating summary...',
      'Building curriculum...',
      'Generating exercises...',
      'Finalizing course structure...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setGenerationStep(steps[currentStep]);
        setGenerationProgress(Math.min(Math.floor((currentStep + 1) / steps.length * 100), 100));
        currentStep++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        toast({
          title: "Course Generated",
          description: "Your AI course has been successfully created!"
        });
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">AI Course Generator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="h-5 w-5 mr-2" />
                Video Upload
              </CardTitle>
              <CardDescription>
                Upload a lecture video and let AI extract content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500 mb-2">
                  Drop your video file here or click to browse
                </p>
                <Input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  id="video-upload"
                  onChange={handleFileUpload}
                />
                <label htmlFor="video-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Select Video File</span>
                  </Button>
                </label>
              </div>
              {uploadedFile && (
                <div className="mt-4 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <p className="text-sm truncate">{uploadedFile.name}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={simulateGeneration}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate From Video'}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="h-5 w-5 mr-2" />
                Manual Entry
              </CardTitle>
              <CardDescription>
                Provide details and let AI build your course structure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  placeholder="E.g. Machine Learning 101"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="course-description">Course Description</Label>
                <Textarea
                  id="course-description"
                  placeholder="Describe your course content and goals"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={simulateGeneration}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Course Structure'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {isGenerating && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{generationStep}</span>
              <span className="text-sm">{generationProgress}%</span>
            </div>
            <Progress value={generationProgress} className="h-2" />
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">What AI Will Create</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center">
                <FileCode className="h-4 w-4 mr-2" />
                Structured Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>Course modules</li>
                <li>Lesson breakdowns</li>
                <li>Video chapters</li>
                <li>Transcripts</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Automatically Generated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>Practice exercises</li>
                <li>Quiz questions</li>
                <li>Knowledge checks</li>
                <li>Summary notes</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center">
                <Book className="h-4 w-4 mr-2" />
                Learning Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>Suggested readings</li>
                <li>Related topics</li>
                <li>External resources</li>
                <li>FAQ section</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AiCourseGenerator;
