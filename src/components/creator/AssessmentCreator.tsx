
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Save, Trash, Clock, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'text' | 'truefalse';
  options?: string[];
  correctAnswer?: string | number | boolean;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  autoGraded: boolean;
  questions: Question[];
}

const AssessmentCreator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(30);
  const [passingScore, setPassingScore] = useState(70);
  const [autoGraded, setAutoGraded] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionType, setQuestionType] = useState<'mcq' | 'text' | 'truefalse'>('mcq');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);
  const [correctAnswerText, setCorrectAnswerText] = useState('');
  const [isTrueFalse, setIsTrueFalse] = useState(true);

  const handleAddQuestion = () => {
    if (!currentQuestion) {
      toast({
        title: "Error",
        description: "Question text cannot be empty",
        variant: "destructive"
      });
      return;
    }

    let newQuestion: Question = {
      id: `question-${Date.now()}`,
      text: currentQuestion,
      type: questionType
    };

    if (questionType === 'mcq') {
      if (options.some(opt => !opt)) {
        toast({
          title: "Error",
          description: "All options must be filled",
          variant: "destructive"
        });
        return;
      }
      newQuestion.options = [...options];
      newQuestion.correctAnswer = correctOption;
    } else if (questionType === 'text') {
      if (!correctAnswerText) {
        toast({
          title: "Error",
          description: "Please provide a reference answer",
          variant: "destructive"
        });
        return;
      }
      newQuestion.correctAnswer = correctAnswerText;
    } else if (questionType === 'truefalse') {
      newQuestion.correctAnswer = isTrueFalse;
    }

    setQuestions([...questions, newQuestion]);
    
    // Reset form
    setCurrentQuestion('');
    setOptions(['', '', '', '']);
    setCorrectOption(0);
    setCorrectAnswerText('');
    
    toast({
      title: "Question Added",
      description: "Question has been added to the assessment"
    });
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast({
      title: "Question Removed",
      description: "Question has been removed from the assessment"
    });
  };

  const handleUpdateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSaveAssessment = () => {
    if (!title) {
      toast({
        title: "Error",
        description: "Please provide an assessment title",
        variant: "destructive"
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one question to the assessment",
        variant: "destructive"
      });
      return;
    }

    const assessment: Assessment = {
      id: `assessment-${Date.now()}`,
      title,
      description,
      timeLimit,
      passingScore,
      autoGraded,
      questions
    };

    toast({
      title: "Assessment Saved",
      description: `"${title}" has been saved with ${questions.length} questions`
    });

    console.log('Assessment created:', assessment);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Assessment Creator</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="assessment-title">Assessment Title</Label>
            <Input 
              id="assessment-title" 
              placeholder="Enter assessment title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="assessment-description">Description</Label>
            <Textarea 
              id="assessment-description" 
              placeholder="Describe the purpose of this assessment" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="time-limit">Time Limit (minutes)</Label>
              <Input 
                id="time-limit" 
                type="number" 
                min="1"
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div>
              <Label htmlFor="passing-score">Passing Score (%)</Label>
              <Input 
                id="passing-score" 
                type="number" 
                min="0"
                max="100"
                value={passingScore}
                onChange={(e) => setPassingScore(parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-8">
              <Switch 
                id="auto-graded"
                checked={autoGraded}
                onCheckedChange={setAutoGraded}
              />
              <Label htmlFor="auto-graded">Auto-graded</Label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Add Questions</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="question-type">Question Type</Label>
            <Select 
              value={questionType} 
              onValueChange={(value: 'mcq' | 'text' | 'truefalse') => setQuestionType(value)}
            >
              <SelectTrigger id="question-type">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcq">Multiple Choice</SelectItem>
                <SelectItem value="text">Text Answer</SelectItem>
                <SelectItem value="truefalse">True/False</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="question-text">Question</Label>
            <Textarea 
              id="question-text" 
              placeholder="Enter question text" 
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
            />
          </div>

          {questionType === 'mcq' && (
            <div className="space-y-3">
              <Label>Answer Options</Label>
              {options.map((option, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input 
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleUpdateOption(index, e.target.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`correct-option-${index}`}
                      name="correct-option"
                      checked={correctOption === index}
                      onChange={() => setCorrectOption(index)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor={`correct-option-${index}`} className="text-xs">Correct</Label>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {questionType === 'text' && (
            <div>
              <Label htmlFor="reference-answer">Reference Answer</Label>
              <Textarea 
                id="reference-answer" 
                placeholder="Enter a reference answer for grading" 
                value={correctAnswerText}
                onChange={(e) => setCorrectAnswerText(e.target.value)}
              />
            </div>
          )}
          
          {questionType === 'truefalse' && (
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="answer-true" 
                  checked={isTrueFalse === true}
                  onChange={() => setIsTrueFalse(true)}
                  className="h-4 w-4"
                />
                <Label htmlFor="answer-true">True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="answer-false" 
                  checked={isTrueFalse === false}
                  onChange={() => setIsTrueFalse(false)}
                  className="h-4 w-4"
                />
                <Label htmlFor="answer-false">False</Label>
              </div>
            </div>
          )}
          
          <Button onClick={handleAddQuestion} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </div>
      </div>
      
      {questions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Question List ({questions.length})</h2>
            <Button onClick={handleSaveAssessment}>
              <Save className="mr-2 h-4 w-4" />
              Save Assessment
            </Button>
          </div>
          
          <div className="space-y-4">
            {questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader className="py-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-md">Q{index + 1}: {question.text}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveQuestion(question.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex items-center text-sm space-x-2">
                    <span className="font-medium">Type:</span>
                    <span>
                      {question.type === 'mcq' ? 'Multiple Choice' : 
                       question.type === 'text' ? 'Text Answer' : 'True/False'}
                    </span>
                  </div>
                  
                  {question.type === 'mcq' && question.options && (
                    <div className="mt-2 space-y-1">
                      {question.options.map((option, idx) => (
                        <div 
                          key={idx} 
                          className={`text-sm pl-4 ${question.correctAnswer === idx ? 'font-medium text-green-600 dark:text-green-400' : ''}`}
                        >
                          {question.correctAnswer === idx ? <Check className="inline h-4 w-4 mr-1" /> : '•'} {option}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'truefalse' && (
                    <div className="mt-2 text-sm pl-4 font-medium text-green-600 dark:text-green-400">
                      Correct answer: {question.correctAnswer ? 'True' : 'False'}
                    </div>
                  )}
                  
                  {question.type === 'text' && question.correctAnswer && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Reference answer:</span> {question.correctAnswer.toString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentCreator;
