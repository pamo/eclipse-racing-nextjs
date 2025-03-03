'use client';

import { Fragment, useState } from 'react';
import Loading from './Loading';
import Pagination from './Pagination';
import { GroupedRaceResults, PaginatedResponse } from '@/services/raceResults';
import RaceCard from './RaceCard';

interface RaceResultsProps {
  initialResults: PaginatedResponse;
  initialPage?: number;
}

export default function RaceResults({ initialResults, initialPage = 1 }: RaceResultsProps) {
  const [results, setResults] = useState<GroupedRaceResults>(initialResults.results);
  const [pagination, setPagination] = useState(initialResults.pagination);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = async (newPage: number) => {
    setIsLoading(true);
    setCurrentPage(newPage);

    try {
      const response = await fetch(`/api/race-results?page=${newPage}`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: PaginatedResponse = await response.json();
      setResults(data.results);
      setPagination(data.pagination);
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
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-4">
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

      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
