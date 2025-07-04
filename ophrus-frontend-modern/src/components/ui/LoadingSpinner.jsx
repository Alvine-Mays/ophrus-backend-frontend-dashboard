import React from 'react';
import { cn } from '../../lib/utils';

const LoadingSpinner = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-300 border-t-yellow-600',
          sizeClasses[size]
        )}
      />
    </div>
  );
};

export default LoadingSpinner;

