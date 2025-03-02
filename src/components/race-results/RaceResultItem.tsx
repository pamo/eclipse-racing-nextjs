import React from 'react';
import { RaceResult } from './types';

interface RaceResultItemProps {
  result: RaceResult;
}

const RaceResultItem: React.FC<RaceResultItemProps> = ({ result }) => (
  <div className="mt-2">
    <div className="flex items-center">
      {result.place === 1 && <span className="mr-2">🥇</span>}
      {result.place === 2 && <span className="mr-2">🥈</span>}
      {result.place === 3 && <span className="mr-2">🥉</span>}
      <span className="mr-2">{result.place}th</span>
      <a href={result.bioLink} className="text-blue-600 hover:text-blue-800">
        {result.name}
      </a>
    </div>
  </div>
);

export default RaceResultItem;
