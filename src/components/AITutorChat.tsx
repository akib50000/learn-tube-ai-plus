
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  MicOff, 
  MessageCircle, 
  X, 
  Volume2, 
  VolumeX, 
  User 
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface AITutorChatProps {
  expertName?: string;
  expertTitle?: string;
  expertPhoto?: string;
  onClose?: () => void;
}

const AITutorChat: React.FC<AITutorChatProps> = ({ 
  expertName = "AI Tutor",
  expertTitle = "Expert",
  expertPhoto,
  onClose 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string; isUser: boolean}>>([
    { text: `Hi there! I'm ${expertName}, your AI tutor. How can I help you today?`, isUser: false }
  ]);
  const [audioVisualization, setAudioVisualization] = useState<number[]>(
    Array(20).fill(0).map(() => Math.random() * 100)
  );

  // Simulate waveform animation
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setAudioVisualization(prev => 
          prev.map(() => Math.random() * 100)
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      toast({
        title: "Listening",
        description: "Speak to interact with your AI tutor",
      });
      // In a real app, we would start recording audio here
      
      // Simulate a response after a short delay
      setTimeout(() => {
        simulateResponse();
      }, 3000);
    } else {
      setIsListening(false);
      toast({
        title: "Stopped listening",
        description: "Voice input paused",
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Unmuted" : "Muted",
      description: isMuted ? "AI voice enabled" : "AI voice disabled",
    });
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      toast({
        title: "Session ended",
        description: "Your conversation has been saved",
      });
    }
  };

  const simulateResponse = () => {
    // Add user message (simulating what was "heard")
    const userQuestion = "Can you explain how neural networks work?";
    setMessages(prev => [...prev, { text: userQuestion, isUser: true }]);
    
    setIsListening(false);
    
    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = "Neural networks are computing systems inspired by the biological neural networks in human brains. They consist of layers of interconnected nodes or 'neurons', which process input data and learn patterns over time. The basic structure includes an input layer, one or more hidden layers, and an output layer. Each connection between neurons has a weight that adjusts during training.";
      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-3xl h-[80vh] bg-black rounded-xl overflow-hidden flex flex-col relative">
        {/* Header info */}
        <div className="absolute top-0 left-0 right-0 p-4 text-center text-white/80 text-sm">
          You are speaking with an AI. Check for errors.
        </div>
        
        {/* Expert info */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-900/80 to-indigo-900/80">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/70 mb-3">
              {expertPhoto ? (
                <img src={expertPhoto} alt={expertName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-white/20 flex items-center justify-center">
                  <User className="h-12 w-12 text-white/70" />
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">{expertName}</h2>
            <p className="text-white/70">{expertTitle}</p>
          </div>
          
          {/* Waveform visualization */}
          <div className="w-full flex items-center justify-center h-20 mb-8 px-12">
            {audioVisualization.map((height, index) => (
              <div 
                key={index}
                className={cn(
                  "w-1.5 mx-0.5 rounded-full bg-white/70 transition-all duration-100",
                  isListening ? "animate-pulse" : ""
                )}
                style={{ 
                  height: `${Math.max(3, height / 4)}px`,
                  opacity: isListening ? 0.7 + Math.random() * 0.3 : 0.3
                }}
              ></div>
            ))}
          </div>
          
          {/* Current message */}
          <div className="w-full max-w-xl bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-8">
            <p className="text-white text-center">
              {messages[messages.length - 1].text}
            </p>
          </div>
        </div>
        
        {/* Controls */}
        <div className="bg-black text-white p-6 flex justify-center gap-6">
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full w-16 h-16 p-0 border-white/20 bg-white/10 hover:bg-white/20"
            onClick={() => {
              toast({
                title: "Text Mode",
                description: "Switching to text chat interface",
              });
            }}
          >
            <MessageCircle className="h-6 w-6 text-white/80" />
            <span className="sr-only">Switch to Text</span>
          </Button>
          
          <Button 
            variant={isListening ? "destructive" : "outline"} 
            size="lg" 
            className={cn(
              "rounded-full w-16 h-16 p-0",
              isListening 
                ? "bg-primary border-primary" 
                : "border-white/20 bg-white/10 hover:bg-white/20"
            )}
            onClick={toggleListening}
          >
            {isListening ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6 text-white/80" />
            )}
            <span className="sr-only">
              {isListening ? "Stop Listening" : "Start Listening"}
            </span>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full w-16 h-16 p-0 border-white/20 bg-white/10 hover:bg-white/20"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-6 w-6 text-white/80" />
            ) : (
              <Volume2 className="h-6 w-6 text-white/80" />
            )}
            <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
          </Button>
        </div>
        
        {/* End call button */}
        <Button 
          variant="destructive" 
          className="absolute bottom-6 right-6 rounded-full"
          onClick={handleClose}
        >
          <X className="h-4 w-4 mr-2" />
          End Call
        </Button>
      </div>
    </div>
  );
};

export default AITutorChat;
