import React from 'react';
import { Card } from '../Card';
import RaceCategory from './RaceCategory';
import { GroupedRaceResults } from './types';

interface RaceCardProps {
  date: string;
  raceName: string;
  categories: GroupedRaceResults[string][string];
  className?: string;
}

const RaceCard: React.FC<RaceCardProps> = ({ date, raceName, categories, className }) => (
  <Card className={`mb-4 p-4 ${className || ''}`}>
    <h2 className="text-xl font-bold">{date}</h2>
    <h3 className="text-lg font-semibold">{raceName}</h3>
    {Object.keys(categories).map((category) => (
      <RaceCategory key={category} category={category} results={categories[category]} />
    ))}
  </Card>
);

export default RaceCard;
