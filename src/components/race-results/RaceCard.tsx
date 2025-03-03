import React from 'react';
import { Card } from '../Card';
import RaceCategory from './RaceCategory';
import { GroupedRaceResults } from './types';
import { getColorClasses } from '@/utils/color';

interface RaceCardProps {
  date: string;
  raceName: string;
  categories: GroupedRaceResults[string][string];
  className?: string;
}
function getColorIndex(date: string): number {
  // Use the date string to generate a consistent color index
  const sum = date.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return sum % 5; // Assuming you have 6 colors
}

const RaceCard: React.FC<RaceCardProps> = ({ date, raceName, categories, className }) => {
  const colorClasses = getColorClasses(getColorIndex(date));
  return (
    <Card colorClasses={colorClasses} className={`mb-4 ${className || ''}`}>
      <h2 className="m-0">{date}</h2>
      <h3 className="m-0">{raceName}</h3>
      {Object.keys(categories).map((category) => (
        <RaceCategory key={category} category={category} results={categories[category]} />
      ))}
    </Card>
  );
};

export default RaceCard;
