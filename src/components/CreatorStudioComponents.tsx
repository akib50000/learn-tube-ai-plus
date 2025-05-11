
import React from 'react';
import CourseCreatorDialog from './CourseCreator/CourseCreatorDialog';

export function CreatorToolbar() {
  return (
    <div className="flex items-center space-x-4">
      <CourseCreatorDialog />
    </div>
  );
}
