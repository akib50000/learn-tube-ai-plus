
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

interface QuizModuleProps {
  quizzes: Quiz[];
}

const QuizModule = ({ quizzes }: QuizModuleProps) => {
  const [activeQuiz, setActiveQuiz] = useState<string>(quizzes[0]?.id || '');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  const currentQuiz = quizzes.find(q => q.id === activeQuiz);
  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];
  
  const handleSelectAnswer = (optionIndex: number) => {
    if (!currentQuestion || quizSubmitted) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };
  
  const handleNextQuestion = () => {
    if (!currentQuiz) return;
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };
  
  const calculateScore = () => {
    if (!currentQuiz) return 0;
    
    let correctCount = 0;
    currentQuiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    return Math.round((correctCount / currentQuiz.questions.length) * 100);
  };
  
  if (!currentQuiz || !currentQuestion) {
    return <div className="text-center py-4">No quiz available</div>;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {quizzes.map(quiz => (
          <Button
            key={quiz.id}
            variant={quiz.id === activeQuiz ? "default" : "outline"}
            onClick={() => {
              setActiveQuiz(quiz.id);
              setCurrentQuestionIndex(0);
              setSelectedAnswers({});
              setQuizSubmitted(false);
            }}
          >
            {quiz.title}
          </Button>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{currentQuiz.title}</CardTitle>
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
            </span>
          </div>
          <Progress 
            value={((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100} 
            className="h-1"
          />
        </CardHeader>
        
        <CardContent>
          {quizSubmitted ? (
            <div className="text-center py-6">
              <div className="text-4xl font-bold mb-2">{calculateScore()}%</div>
              <div className="text-xl mb-4">
                {calculateScore() >= 70 ? 'Great job!' : 'Keep practicing!'}
              </div>
              <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
              
              <RadioGroup
                value={selectedAnswers[currentQuestion.id]?.toString()}
                onValueChange={(value) => handleSelectAnswer(parseInt(value))}
              >
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label className="ml-2" htmlFor={`option-${index}`}>
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </>
          )}
        </CardContent>
        
        {!quizSubmitted && (
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            {currentQuestionIndex === currentQuiz.questions.length - 1 ? (
              <Button 
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < currentQuiz.questions.length}
              >
                Submit
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestion.id] === undefined}
              >
                Next
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default QuizModule;
