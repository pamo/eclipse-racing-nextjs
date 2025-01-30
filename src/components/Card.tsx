import { getColorClasses } from '@/utils/color';
import React from 'react';

export interface ColorClasses {
  border: string;
  shadow: string;
  text: string;
  lightText: string;
}

interface CardProps {
  children: React.ReactNode;
  colorClasses?: ColorClasses;
  className?: string;
}

export function Card({ colorClasses = getColorClasses(Math.floor(Math.random() * 6)), children, className }: CardProps) {
  return (
    <div className="relative h-full">
      <div
        className={`absolute inset-0 ${colorClasses.shadow} rounded-lg transform translate-x-2 translate-y-2`}
      ></div>

      <div
        className={`relative z-10 bg-white rounded-lg border-2 h-full transition-all duration-300 hover:translate-x-1 hover:translate-y-1 group
        ${colorClasses.border}
         ${className}`}
      >
        <div className="bg-white p-4 md:p-6 rounded-lg h-full">{children}</div>
      </div>
    </div>
  );
}
