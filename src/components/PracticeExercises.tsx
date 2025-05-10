
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface Exercise {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

interface PracticeExercisesProps {
  exercises: Exercise[];
}

const PracticeExercises = ({ exercises }: PracticeExercisesProps) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const handleStartExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsDialogOpen(true);
    toast({
      title: "Exercise Started",
      description: `You've started "${exercise.title}"`,
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedExercise(null);
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercises.map(exercise => (
          <Card key={exercise.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{exercise.title}</CardTitle>
                  <CardDescription>Practice exercise</CardDescription>
                </div>
                <Badge className={`${getDifficultyColor(exercise.difficulty)} hover:${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <span className="font-medium">Points:</span> {exercise.points}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleStartExercise(exercise)}
              >
                Start Exercise
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedExercise && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedExercise.title}</DialogTitle>
              <DialogDescription>
                Difficulty: {selectedExercise.difficulty} | Points: {selectedExercise.points}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>Exercise content would be displayed here. This is a placeholder for the actual exercise content.</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={() => {
                toast({
                  title: "Exercise Submitted",
                  description: "Your work has been submitted for review",
                });
                handleCloseDialog();
              }}>Submit Answer</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PracticeExercises;
