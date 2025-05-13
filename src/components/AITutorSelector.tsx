
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BookOpen, MessageCircle, Star } from 'lucide-react';
import AITutorChat from './AITutorChat';

interface AITutorSelectorProps {
  courseTitle?: string;
  courseSubject?: string;
}

// Sample AI tutor data
const tutors = [
  {
    id: 'tutor-1',
    name: 'Dr. Ada',
    title: 'Programming Expert',
    specialties: ['Python', 'Data Structures', 'Algorithms'],
    rating: 4.9,
    reviews: 342,
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
    description: 'Specializing in computer science fundamentals and programming languages with 10+ years of experience.',
  },
  {
    id: 'tutor-2',
    name: 'Prof. Maxwell',
    title: 'Data Science Specialist',
    specialties: ['Machine Learning', 'Statistics', 'Data Visualization'],
    rating: 4.8,
    reviews: 215,
    photo: 'https://randomuser.me/api/portraits/men/46.jpg',
    description: 'Expert in data science and machine learning with a background in statistical analysis and predictive modeling.',
  },
  {
    id: 'tutor-3',
    name: 'Dr. Elena',
    title: 'Web Development Instructor',
    specialties: ['JavaScript', 'React', 'Node.js'],
    rating: 4.7,
    reviews: 189,
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    description: 'Full-stack developer and educator specializing in modern web technologies and frameworks.',
  }
];

const AITutorSelector: React.FC<AITutorSelectorProps> = ({ courseTitle, courseSubject }) => {
  const [selectedTutor, setSelectedTutor] = useState<typeof tutors[0] | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleSelectTutor = (tutor: typeof tutors[0]) => {
    setSelectedTutor(tutor);
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">AI Tutors</h2>
            <p className="text-sm text-muted-foreground">
              Get help from our AI experts who specialize in {courseSubject || "this subject"}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={tutor.photo} alt={tutor.name} />
                    <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{tutor.name}</CardTitle>
                    <CardDescription className="text-sm">{tutor.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm mb-3">{tutor.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {tutor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm">
                  <div className="flex items-center mr-3">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-medium">{tutor.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({tutor.reviews} reviews)</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleSelectTutor(tutor)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask Questions
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {showChat && selectedTutor && (
        <AITutorChat 
          expertName={selectedTutor.name}
          expertTitle={selectedTutor.title}
          expertPhoto={selectedTutor.photo}
          onClose={handleCloseChat}
        />
      )}
    </>
  );
};

export default AITutorSelector;
