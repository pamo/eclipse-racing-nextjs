import { Suspense } from 'react';
import RaceResults from './RaceResults';
import Loading from './Loading';
import { fetchRaceResults } from '@/services/raceResults';
import { ChunkyText } from '../ChunkyText';

export default async function RaceResultsWidget() {
  const initialData = await fetchRaceResults();

  return (
    <div className="race-results-widget">
      <ChunkyText className="text-eclipse-yellow">hot off the press</ChunkyText>
      <Suspense fallback={<Loading />}>
        <RaceResults initialResults={initialData} />
      </Suspense>
    </div>
  );
}
