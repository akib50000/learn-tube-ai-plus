
// AI Suggestion Types
export type AiSuggestionType = 'exercise' | 'review' | 'code';

export interface AiSuggestion {
  id: string;
  title: string;
  type: AiSuggestionType;
}

// Exercise Types
export interface Exercise {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

// Learning Path Types
export interface LearningPathItem {
  id: string;
  title: string;
  completed: boolean;
  locked?: boolean;
}

// Course Module Types
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  active?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  completed: number;
  total: number;
}

// Video Chapter Types
export interface VideoChapter {
  id: string;
  title: string;
  timestamp: number;
}

export interface BookmarkedSection {
  id: string;
  title: string;
  timestamp: number;
  moduleId: string;
  lessonId: string;
}

// Course Material Types
export interface CourseMaterial {
  id: string;
  title: string;
  content: string;
}

export interface CourseNote {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

export interface CourseResource {
  id: string;
  title: string;
  type: 'pdf' | 'zip' | 'doc' | 'link';
  size?: string;
  url: string;
}

// Coding Challenge Types
export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  testCases: string[];
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}
