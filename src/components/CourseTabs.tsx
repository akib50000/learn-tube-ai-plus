
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Book, MessageCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface CourseMaterial {
  id: string;
  title: string;
  content: string;
}

interface CourseNote {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

interface CourseResource {
  id: string;
  title: string;
  type: 'pdf' | 'zip' | 'doc' | 'link';
  size?: string;
  url: string;
}

interface CourseTabsProps {
  materials: CourseMaterial[];
  notes: CourseNote[];
  resources: CourseResource[];
}

const CourseTabs = ({ materials, notes, resources }: CourseTabsProps) => {
  const [activeTab, setActiveTab] = useState('materials');
  
  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf': return '📄';
      case 'zip': return '🗃️';
      case 'doc': return '📝';
      case 'link': return '🔗';
      default: return '📁';
    }
  };
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
      <div className="border-b px-2">
        <TabsList className="bg-transparent">
          <TabsTrigger value="materials" className="flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none">
            <Book className="h-4 w-4" />
            Materials
          </TabsTrigger>
          <TabsTrigger value="discussion" className="flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none">
            <MessageCircle className="h-4 w-4" />
            Discussion
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none">
            <FileText className="h-4 w-4" />
            Notes
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex gap-2 data-[state=active]:border-b-2 data-[state=active]:border-learntube-red rounded-none">
            <Download className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="materials" className="flex-1 mt-0 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4">
          {materials.map((material) => (
            <div key={material.id} className="mb-6">
              <h3 className="font-bold text-lg mb-2">{material.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{material.content}</p>
              <Separator className="my-4" />
            </div>
          ))}
        </ScrollArea>
      </TabsContent>
      
      <TabsContent value="discussion" className="flex-1 mt-0">
        <div className="h-full flex items-center justify-center text-center p-4">
          <div>
            <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <h3 className="text-lg font-medium mb-2">Join the Discussion</h3>
            <p className="text-gray-500 mb-4">Share your thoughts and questions with other learners</p>
            <Button className="bg-learntube-red hover:bg-learntube-dark-red">Start a Conversation</Button>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="notes" className="flex-1 mt-0">
        <ScrollArea className="h-full p-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">{note.title}</h4>
                  <span className="text-xs text-gray-500">{note.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{note.content}</p>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <h3 className="text-lg font-medium mb-2">No Notes Yet</h3>
                <p className="text-gray-500 mb-4">Start taking notes while watching the course</p>
                <Button className="bg-learntube-red hover:bg-learntube-dark-red">Add Note</Button>
              </div>
            </div>
          )}
        </ScrollArea>
      </TabsContent>
      
      <TabsContent value="resources" className="flex-1 mt-0">
        <ScrollArea className="h-full p-4">
          <div className="grid grid-cols-1 gap-2">
            {resources.map((resource) => (
              <a 
                key={resource.id} 
                href={resource.url} 
                className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="text-2xl">{getFileIcon(resource.type)}</div>
                <div className="flex-1">
                  <div className="font-medium">{resource.title}</div>
                  {resource.size && (
                    <div className="text-xs text-gray-500">{resource.size}</div>
                  )}
                </div>
                <Download className="h-4 w-4" />
              </a>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
