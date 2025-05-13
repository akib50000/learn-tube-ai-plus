import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const AITutorBuilder = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">AI Tutor Builder</h1>

        <Tabs defaultValue="design" className="w-full">
          <TabsList>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="design">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Layout</CardTitle>
                  <CardDescription>Choose the layout for your AI tutor.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline">Option 1</Button>
                    <Button variant="outline">Option 2</Button>
                    <Button variant="outline">Option 3</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Color Scheme</CardTitle>
                  <CardDescription>Select a color scheme for your AI tutor.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline">Light</Button>
                    <Button variant="outline">Dark</Button>
                    <Button variant="outline">Custom</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="content">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Introduction</CardTitle>
                  <CardDescription>Write an introduction for your AI tutor.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input placeholder="Enter introduction text" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Modules</CardTitle>
                  <CardDescription>Add modules to your AI tutor.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button>Add Module</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Name</CardTitle>
                  <CardDescription>Set the name of your AI tutor.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input placeholder="Enter AI tutor name" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                  <CardDescription>Set the description of your AI tutor.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input placeholder="Enter AI tutor description" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <Button onClick={() => navigate('/profile')}>Save and Publish</Button>
      </div>
    </div>
  );
};

export default AITutorBuilder;
