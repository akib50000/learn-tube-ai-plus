
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureItemProps {
  icon?: React.ComponentType<any>;
  children: React.ReactNode;
}

const FeatureItem = ({ icon: Icon, children }: FeatureItemProps) => (
  <li className="flex items-start">
    {Icon && (
      <div className="mr-2 h-5 w-5 text-green-500">
        <Icon className="h-5 w-5" />
      </div>
    )}
    <span>{children}</span>
  </li>
);

export default FeatureItem;
