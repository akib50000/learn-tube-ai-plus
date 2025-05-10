
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
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
            <Button className="w-full">Start Exercise</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PracticeExercises;
