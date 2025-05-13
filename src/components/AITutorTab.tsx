
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AITutorSelector from './AITutorSelector';

interface AITutorTabProps {
  courseTitle?: string;
  courseSubject?: string;
  courseId?: string;
}

const AITutorTab: React.FC<AITutorTabProps> = ({ courseTitle, courseSubject, courseId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Learning Assistant</CardTitle>
          <CardDescription>
            Get personalized help with your coursework and questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tutors">
            <TabsList className="mb-4">
              <TabsTrigger value="tutors">AI Tutors</TabsTrigger>
              <TabsTrigger value="previous">Previous Conversations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tutors">
              <AITutorSelector courseTitle={courseTitle} courseSubject={courseSubject} />
            </TabsContent>
            
            <TabsContent value="previous">
              <div className="text-center py-8 text-muted-foreground">
                <p>No previous conversations found</p>
                <p className="text-sm mt-1">Start a new conversation with an AI tutor to get help with your coursework</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITutorTab;
