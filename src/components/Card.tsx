import React from "react";

interface ColorClasses {
  border: string;
  shadow: string;
  text: string;
  lightText: string;
}

interface CardProps {
  colorClasses: ColorClasses;
  children: React.ReactNode;
}

export function Card({ colorClasses, children }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg border-2 relative transition-all duration-300 hover:translate-x-1 hover:translate-y-1 group
      ${colorClasses.border}`}
    >
      {/* Solid shadow */}
      <div
        className={`absolute inset-0 ${colorClasses.shadow} rounded-lg transform translate-x-2 translate-y-2 -z-10`}
      ></div>

      <div className="bg-white p-6 rounded-lg">{children}</div>
    </div>
  );
}
