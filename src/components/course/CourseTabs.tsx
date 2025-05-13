
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LessonContent from './LessonContent';
import PracticeExercises from '@/components/PracticeExercises';
import CodeChallenge from '@/components/CodeChallenge';
import AITutorTab from '@/components/AITutorTab';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  timestamp: number;
}

interface Exercise {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  testCases: string[];
}

interface CourseTabsProps {
  videoChapters: Chapter[];
  exercises: Exercise[];
  codingChallenges: CodingChallenge[];
  chatMessage: string;
  setChatMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
}

const CourseTabs = ({ 
  videoChapters,
  exercises,
  codingChallenges,
  chatMessage,
  setChatMessage,
  handleSendMessage
}: CourseTabsProps) => {
  return (
    <Tabs defaultValue="content" className="mb-8">
      <TabsList className="mb-4">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="challenges">Coding Challenges</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="ai-tutor">AI Tutor</TabsTrigger>
      </TabsList>

      <TabsContent value="content">
        <LessonContent videoChapters={videoChapters} />
      </TabsContent>

      <TabsContent value="exercises">
        <PracticeExercises exercises={exercises} />
      </TabsContent>

      <TabsContent value="challenges">
        <CodeChallenge challenges={codingChallenges} />
      </TabsContent>

      <TabsContent value="notes">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Lesson Notes</h3>
            <div className="space-y-4">
              <Textarea 
                placeholder="Write your notes here..." 
                className="min-h-[200px]"
              />
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Notes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ai-tutor">
        <AITutorTab 
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          handleSendMessage={handleSendMessage}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
