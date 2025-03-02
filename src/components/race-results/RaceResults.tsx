'use client';

import { Fragment, useState } from 'react';
import Loading from './Loading';
import Pagination from './Pagination';
import { RaceResultsRaw } from './types';
import { parseRaceResults } from './utils';
import RaceCard from './RaceCard';
interface RaceResultsProps {
  initialResults: RaceResultsRaw;
  initialPage: number;
}
export default function RaceResults({ initialResults, initialPage }: RaceResultsProps) {
  const [results, setResults] = useState(parseRaceResults(initialResults.results));
  const [pagination, setPagination] = useState(initialResults.pagination);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage || 1);

  const handlePageChange = async (newPage: number) => {
    setIsLoading(true);
    setCurrentPage(newPage);

    try {
      // Fetch new results
      const response = await fetch(`/api/race-results?page=${newPage}`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResults(parseRaceResults(data.results));
      setPagination({
        ...data.pagination,
        currentPage: newPage,
      });
    } catch (error) {
      console.error('Error fetching page:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {Object.keys(results).length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {Object.keys(results).map((date) => (
                <Fragment key={date}>
                  {Object.keys(results[date]).map((raceName) => (
                    <RaceCard
                      key={raceName}
                      date={date}
                      raceName={raceName}
                      categories={results[date][raceName]}
                    />
                  ))}
                </Fragment>
              ))}
            </div>
          ) : (
            <div className="text-center text-sm text-gray-500">No results found</div>
          )}
        </>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
