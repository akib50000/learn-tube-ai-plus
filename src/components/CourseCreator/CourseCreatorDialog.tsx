
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CourseCreatorFlow from './CourseCreatorFlow';
import { useToast } from '@/hooks/use-toast';

interface CourseCreatorDialogProps {
  buttonText?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "success" | "warning";
  buttonClassName?: string;
  onCourseCreated?: (courseId: string) => void;
}

const CourseCreatorDialog: React.FC<CourseCreatorDialogProps> = ({
  buttonText = "Create New Course",
  buttonVariant = "default",
  buttonClassName = "bg-learntube-red hover:bg-learntube-dark-red text-white",
  onCourseCreated,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  
  const handleClose = (courseId?: string) => {
    setIsOpen(false);
    
    if (courseId) {
      toast({
        title: "Course created successfully",
        description: "Your course has been created and saved as a draft",
        variant: "success",
      });
      
      if (onCourseCreated) {
        onCourseCreated(courseId);
      }
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={buttonClassName}>
          <Plus className="h-4 w-4 mr-2" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden">
        <CourseCreatorFlow onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CourseCreatorDialog;
