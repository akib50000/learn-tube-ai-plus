
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Chapter {
  id: string;
  title: string;
  timestamp: number;
}

interface VideoChaptersProps {
  chapters: Chapter[];
}

const VideoChapters = ({ chapters }: VideoChaptersProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  // Convert seconds to MM:SS format
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChapterClick = (timestamp: number) => {
    // In a real implementation, this would seek the video to the timestamp
    console.log(`Seeking to ${timestamp} seconds`);
  };
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border rounded-md overflow-hidden"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex justify-between items-center p-3 h-auto"
        >
          <span className="font-medium">Video Chapters</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="divide-y">
          {chapters.map((chapter) => (
            <Button
              key={chapter.id}
              variant="ghost"
              className="w-full justify-start py-2.5 px-3 h-auto"
              onClick={() => handleChapterClick(chapter.timestamp)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-sm">{chapter.title}</span>
                <span className="text-xs text-gray-500">{formatTime(chapter.timestamp)}</span>
              </div>
            </Button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default VideoChapters;
