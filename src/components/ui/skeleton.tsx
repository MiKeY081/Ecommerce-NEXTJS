import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton = ({ className = '', ...props }: SkeletonProps) => {
  return <div className={`animate-pulse bg-muted ${className}`} {...props} />;
};

export default Skeleton;
