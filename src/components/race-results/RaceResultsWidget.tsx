import { Suspense } from 'react';
import RaceResults from './RaceResults';
import Loading from './Loading';
import { ECLIPSE_TEAM_API_ID, ONE_HOUR } from './constants';

export default async function RaceResultsWidget() {
  const initialData = await getRaceResults(1, 10);
  return (
    <div className="race-results-widget">
      <h2 className="m-0">Recent Race Results</h2>

      <Suspense fallback={<Loading />}>
        <RaceResults initialResults={initialData} initialPage={1} />
      </Suspense>
    </div>
  );
}

// Server-side function to fetch race results
async function getRaceResults(page = 1, limit = 10) {
  try {
    const response = await fetch(
      `https://www.road-results.com/downloadteam.php?teamID=${ECLIPSE_TEAM_API_ID}&json=1`,
      { next: { revalidate: ONE_HOUR } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const allResults = await response.json();

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const results = allResults.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allResults.length / limit);

    return {
      results,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: allResults.length,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error('Error fetching race results:', error);
    return {
      results: [],
      pagination: {
        currentPage: page,
        totalPages: 0,
        totalItems: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}
