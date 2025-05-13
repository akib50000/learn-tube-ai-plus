
import { Card, CardContent } from '@/components/ui/card';
import FeatureItem from '@/components/CourseFeatureItem';
import VideoChapters from '@/components/VideoChapters';
import { CheckCircle } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  timestamp: number;
}

interface LessonContentProps {
  videoChapters: Chapter[];
}

const LessonContent = ({ videoChapters }: LessonContentProps) => {
  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-4">Lesson Content</h2>
          <p className="mb-4">
            Welcome to the first lesson of our Web Development Course. In this introduction, we'll cover the basic setup and tools you'll need throughout the course.
          </p>
          <p className="mb-4">
            Web development is a dynamic field that combines creativity and technical skills to create engaging online experiences. We'll start with the fundamentals of HTML, CSS, and JavaScript before diving into more advanced frameworks like React.
          </p>
          <p>
            By the end of this course, you'll have built multiple projects and gained the skills needed to develop modern web applications from scratch.
          </p>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Video Chapters</h3>
        <VideoChapters chapters={videoChapters} />
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Key Takeaways</h3>
          <ul className="space-y-2">
            <FeatureItem icon={CheckCircle}>Understanding of the web development ecosystem</FeatureItem>
            <FeatureItem icon={CheckCircle}>Knowledge of essential development tools</FeatureItem>
            <FeatureItem icon={CheckCircle}>Basic setup for your development environment</FeatureItem>
            <FeatureItem icon={CheckCircle}>Overview of the course structure and projects</FeatureItem>
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default LessonContent;
