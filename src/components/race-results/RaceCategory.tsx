import React from 'react';
import { RaceResult } from './types';
import RaceResultItem from './RaceResultItem';

interface RaceCategoryProps {
  category: string;
  results: RaceResult[];
}

const RaceCategory: React.FC<RaceCategoryProps> = ({ category, results }) => (
  <div className="mt-4">
    <h4 className="text-md font-semibold">{category}</h4>
    {results.map((result, index) => (
      <RaceResultItem key={index} result={result} />
    ))}
  </div>
);

export default RaceCategory;
