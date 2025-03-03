import React from 'react';
import { RaceResult } from './types';

interface RaceResultItemProps {
  result: RaceResult;
}

const getPlaceText = (place: number) => {
  switch (place) {
    case 1:
      return '🥇 1st';
    case 2:
      return '🥈 2nd';
    case 3:
      return '🥉 3rd';
    default:
      return `⭐️ ${place}th`;
  }
};
function RaceResultItem({ result }: RaceResultItemProps) {
  const placeText = getPlaceText(result.place);
  return (
    <div className="mt-2">
      <div className="flex items-center">
        <span className="mr-2">{placeText}</span>
        <a href={result.bioLink} className="text-eclipse-blue hover:text-eclipse-blue-dark">
          {result.name}
        </a>
      </div>
    </div>
  );
}

export default RaceResultItem;
