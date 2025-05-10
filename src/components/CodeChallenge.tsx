
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Play, CheckCircle } from 'lucide-react';

interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  testCases: string[];
}

interface CodeChallengeProps {
  challenges: CodingChallenge[];
}

const CodeChallenge = ({ challenges }: CodeChallengeProps) => {
  const [activeChallenge, setActiveChallenge] = useState<string>(challenges[0]?.id || '');
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  
  const currentChallenge = challenges.find(c => c.id === activeChallenge);
  
  const handleSelectChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    setActiveChallenge(challengeId);
    setCode(challenge?.starterCode || '');
    setOutput('');
  };
  
  const runCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Running your code...\n\nTest case 1: Passed ✓\nTest case 2: Failed ✗\nError: Expected output doesn't match the actual output.\n\nKeep trying!`);
      setIsRunning(false);
    }, 1500);
  };
  
  // Initialize code when component mounts or challenge changes
  useState(() => {
    if (currentChallenge) {
      setCode(currentChallenge.starterCode);
    }
  });
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {challenges.map(challenge => (
          <Button
            key={challenge.id}
            variant={challenge.id === activeChallenge ? "default" : "outline"}
            className="whitespace-nowrap"
            onClick={() => handleSelectChallenge(challenge.id)}
          >
            <Code className="h-4 w-4 mr-2" />
            {challenge.title}
          </Button>
        ))}
      </div>
      
      {currentChallenge && (
        <Card>
          <CardHeader>
            <CardTitle>{currentChallenge.title}</CardTitle>
            <CardDescription>{currentChallenge.description}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="code">
              <TabsList>
                <TabsTrigger value="code">Code Editor</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
              </TabsList>
              
              <TabsContent value="code" className="mt-2">
                <div className="border rounded-md p-2 min-h-[300px] bg-gray-50 dark:bg-gray-900 font-mono text-sm overflow-auto">
                  <textarea 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full min-h-[300px] bg-transparent focus:outline-none resize-none"
                    spellCheck="false"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="output" className="mt-2">
                <div className="border rounded-md p-2 min-h-[300px] bg-gray-50 dark:bg-gray-900 font-mono text-sm whitespace-pre-wrap">
                  {output || "Run your code to see the output here."}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={runCode} 
              disabled={isRunning}
              className="ml-auto"
            >
              {isRunning ? (
                <>Loading...</>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Code
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CodeChallenge;
