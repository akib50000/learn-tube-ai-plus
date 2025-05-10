
import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  thumbnail: string;
}

const VideoPlayer = ({ videoUrl, title, thumbnail }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [showControls, setShowControls] = useState(true);
  
  // Convert seconds to MM:SS format
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // In a real implementation, these would interact with the actual video element
  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const handleFullScreen = () => console.log("Enter fullscreen");
  const skipForward = () => setProgress(Math.min(100, progress + 5));
  const skipBackward = () => setProgress(Math.max(0, progress - 5));
  
  return (
    <div 
      className="relative bg-black rounded-lg overflow-hidden aspect-video"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element (placeholder for demo) */}
      <div className="w-full h-full flex items-center justify-center">
        {!isPlaying ? (
          <div className="relative w-full h-full">
            <img 
              src={thumbnail} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button 
                className="w-16 h-16 rounded-full bg-learntube-red hover:bg-learntube-dark-red"
                onClick={togglePlayPause}
              >
                <Play className="h-8 w-8 text-white" fill="white" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-black w-full h-full flex items-center justify-center">
            <p className="text-white/50">Video would play here</p>
          </div>
        )}
      </div>
      
      {/* Video Controls - show based on hover state */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress bar */}
        <div className="mb-2">
          <Slider 
            value={[progress]} 
            max={100} 
            step={0.1}
            onValueChange={(values) => setProgress(values[0])}
            className="cursor-pointer"
          />
        </div>
        
        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={togglePlayPause} className="text-white hover:bg-white/20">
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? 'Pause' : 'Play'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={skipBackward} className="text-white hover:bg-white/20">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Back 5 seconds</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={skipForward} className="text-white hover:bg-white/20">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Forward 5 seconds</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <Slider 
                value={[volume]} 
                max={100}
                className="w-20"
                onValueChange={(values) => {
                  setVolume(values[0]);
                  setIsMuted(values[0] === 0);
                }}
              />
            </div>
            
            <span className="text-xs text-white/90 ml-2">
              {formatTime(progress * 0.6)} / {formatTime(60)}
            </span>
          </div>
          
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleFullScreen} className="text-white hover:bg-white/20">
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
