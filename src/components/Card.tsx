import React from 'react';

export interface ColorClasses {
  border: string;
  shadow: string;
  text: string;
  lightText: string;
}

interface CardProps {
  children: React.ReactNode;
  colorClasses: ColorClasses;
  className?: string;
}

export function Card({ colorClasses, children, className }: CardProps) {
  return (
    <div className="relative h-full">
      <div
        className={`absolute inset-0 ${colorClasses.shadow} translate-x-2 translate-y-2 transform rounded-lg`}
      ></div>

      <div
        className={`group relative z-10 h-full rounded-lg border-2 bg-white transition-all duration-300 hover:translate-x-1 hover:translate-y-1 ${colorClasses.border} ${className ? className : ''}`}
      >
        <div className="h-full rounded-lg bg-white p-2 md:p-4">{children}</div>
      </div>
    </div>
  );
}
