
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import CourseCard from './CourseCard';

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  progress?: number;
}

interface CategorySectionProps {
  title: string;
  courses: Course[];
}

const CategorySection = ({ title, courses }: CategorySectionProps) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ScrollArea>
        <div className="flex gap-4 pb-4">
          {courses.map((course) => (
            <div key={course.id} className="min-w-[240px] max-w-[240px]">
              <CourseCard {...course} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default CategorySection;
