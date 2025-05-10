
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Plus, Save, Trash } from 'lucide-react';
import { Exercise } from '@/types';

const ExerciseBuilder = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [points, setPoints] = useState(50);

  const handleAddExercise = () => {
    if (!title) {
      toast({
        title: "Error",
        description: "Please enter an exercise title",
        variant: "destructive"
      });
      return;
    }

    const newExercise: Exercise = {
      id: `exercise-${Date.now()}`,
      title,
      difficulty,
      points
    };

    setExercises([...exercises, newExercise]);
    toast({
      title: "Exercise Added",
      description: `Added "${title}" to exercises`
    });

    // Reset form
    setTitle('');
    setDifficulty('Medium');
    setPoints(50);
  };

  const handleDeleteExercise = (id: string) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
    toast({
      title: "Exercise Deleted",
      description: "Exercise has been removed"
    });
  };

  const handleSaveAll = () => {
    toast({
      title: "Exercises Saved",
      description: `Saved ${exercises.length} exercises to the course`
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Interactive Exercise Builder</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="exercise-title">Exercise Title</Label>
            <Input 
              id="exercise-title" 
              placeholder="Enter exercise title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select 
                value={difficulty} 
                onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => setDifficulty(value)}
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="points">Points</Label>
              <Input 
                id="points" 
                type="number" 
                min="1"
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
          
          <Button onClick={handleAddExercise} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Exercise
          </Button>
        </div>
      </div>

      {exercises.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Exercise List ({exercises.length})</h2>
            <Button onClick={handleSaveAll}>
              <Save className="mr-2 h-4 w-4" />
              Save All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.map(exercise => (
              <Card key={exercise.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteExercise(exercise.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span>
                      <span className="font-medium">Difficulty:</span> {exercise.difficulty}
                    </span>
                    <span>
                      <span className="font-medium">Points:</span> {exercise.points}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseBuilder;
