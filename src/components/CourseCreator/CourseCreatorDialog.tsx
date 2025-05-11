
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CourseCreatorFlow from './CourseCreatorFlow';

interface CourseCreatorDialogProps {
  buttonText?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonClassName?: string;
}

const CourseCreatorDialog: React.FC<CourseCreatorDialogProps> = ({
  buttonText = "Create New Course",
  buttonVariant = "default",
  buttonClassName = "bg-learntube-red hover:bg-learntube-dark-red",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={buttonClassName}>
          <Plus className="h-4 w-4 mr-2" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[90vh] p-0">
        <CourseCreatorFlow onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CourseCreatorDialog;
