
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Upload, Save, MessageSquare, Settings, Layers } from 'lucide-react';

const AiTutorBuilder = () => {
  const [tutorName, setTutorName] = useState('');
  const [tutorDescription, setTutorDescription] = useState('');
  const [teachingStyle, setTeachingStyle] = useState('balanced');
  const [interactivityLevel, setInteractivityLevel] = useState(50);
  const [responseTone, setResponseTone] = useState('friendly');
  const [enableFollowUpQuestions, setEnableFollowUpQuestions] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      
      toast({
        title: "Files Uploaded",
        description: `${newFiles.length} file(s) added to knowledge base`
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const handleSaveTutor = () => {
    if (!tutorName) {
      toast({
        title: "Error",
        description: "Please provide a name for your AI tutor",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "AI Tutor Saved",
      description: `"${tutorName}" has been created and is ready to use`
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">AI Tutor Builder</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="h-5 w-5 mr-2" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500 mb-2">
                  Upload PDFs, docs, and other learning materials
                </p>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.md"
                  className="hidden"
                  id="knowledge-upload"
                  onChange={handleFileUpload}
                />
                <label htmlFor="knowledge-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Upload Files</span>
                  </Button>
                </label>
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files ({uploadedFiles.length})</Label>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div 
                        key={`${file.name}-${index}`}
                        className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
                      >
                        <span className="text-sm truncate">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(index)}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Tutor Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tutor-name">Tutor Name</Label>
                <Input
                  id="tutor-name"
                  placeholder="Give your AI tutor a name"
                  value={tutorName}
                  onChange={(e) => setTutorName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="tutor-description">Tutor Description</Label>
                <Textarea
                  id="tutor-description"
                  placeholder="Describe your AI tutor's expertise and role"
                  value={tutorDescription}
                  onChange={(e) => setTutorDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Teaching Style Configurator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="teaching-style" className="mb-2 block">Teaching Style</Label>
            <Select value={teachingStyle} onValueChange={setTeachingStyle}>
              <SelectTrigger id="teaching-style">
                <SelectValue placeholder="Select teaching style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="socratic">Socratic (question-based)</SelectItem>
                <SelectItem value="direct">Direct (straightforward)</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="encouraging">Encouraging</SelectItem>
                <SelectItem value="challenging">Challenging</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="response-tone" className="mb-2 block">Response Tone</Label>
            <Select value={responseTone} onValueChange={setResponseTone}>
              <SelectTrigger id="response-tone">
                <SelectValue placeholder="Select response tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="simple">Simple</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 flex justify-between">
              <span>Interactivity Level: {interactivityLevel}%</span>
            </Label>
            <Slider
              value={[interactivityLevel]}
              onValueChange={(values) => setInteractivityLevel(values[0])}
              min={0}
              max={100}
              step={10}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>More direct</span>
              <span>More interactive</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="follow-up"
              checked={enableFollowUpQuestions}
              onCheckedChange={setEnableFollowUpQuestions}
            />
            <Label htmlFor="follow-up">Enable follow-up questions</Label>
          </div>
        </div>

        <Button className="mt-6" onClick={handleSaveTutor}>
          <Save className="h-4 w-4 mr-2" />
          Save Tutor Configuration
        </Button>
      </div>
    </div>
  );
};

export default AiTutorBuilder;
