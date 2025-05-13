
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import AiChatInterface from './AiChatInterface';

interface AITutorTabProps {
  chatMessage: string;
  setChatMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
}

const AITutorTab = ({ 
  chatMessage, 
  setChatMessage, 
  handleSendMessage 
}: AITutorTabProps) => {
  return (
    <Card className="h-[600px] flex flex-col">
      <CardContent className="p-6 flex-1 overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="mb-4 flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/ai-assistant.png" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">Course AI Tutor</h3>
              <p className="text-xs text-muted-foreground">Ask questions about this course</p>
            </div>
          </div>
          
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              <AiChatInterface />
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 border-t">
        <form className="flex w-full gap-2" onSubmit={handleSendMessage}>
          <Input 
            placeholder="Ask a question about this lesson..." 
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AITutorTab;
