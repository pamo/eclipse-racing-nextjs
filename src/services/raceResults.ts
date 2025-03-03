import { ECLIPSE_TEAM_API_ID, ONE_HOUR, RESULTS_PER_PAGE } from '@/services/constants';
import { RaceDiscipline, RaceResult, RaceResultRaw } from '@/components/race-results/types';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export interface GroupedRaceResults {
  [date: string]: {
    [raceName: string]: {
      [category: string]: RaceResult[];
    };
  };
}
export interface PaginatedResponse {
  results: GroupedRaceResults;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRaces: number;
  };
  metadata: {
    lastUpdated: string;
  };
}
export async function fetchRaceResults(page: number = 1): Promise<PaginatedResponse> {
  const response = await fetch(
    `https://www.road-results.com/downloadteam.php?teamID=${ECLIPSE_TEAM_API_ID}&json=1`,
    { next: { revalidate: ONE_HOUR, tags: ['race-results'] } }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const allResults: RaceResultRaw[] = await response.json();
  // Get unique race dates for pagination
  const uniqueRaceDates = [...new Set(allResults.map((result) => result.RaceDate.date))];
  const sortedDates = uniqueRaceDates.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.valueOf() - dateA.valueOf();
  });
  // Calculate pagination
  const totalRaces = sortedDates.length;
  const totalPages = Math.ceil(totalRaces / RESULTS_PER_PAGE);
  const startIndex = (page - 1) * RESULTS_PER_PAGE;
  const paginatedDates = sortedDates.slice(startIndex, startIndex + RESULTS_PER_PAGE);

  // Filter results for paginated dates
  const paginatedResults = allResults.filter((result) =>
    paginatedDates.includes(result.RaceDate.date)
  );

  const groupedResults = parseRaceResults(paginatedResults);

  return {
    results: groupedResults,
    pagination: {
      currentPage: page,
      totalPages,
      totalRaces,
    },
    metadata: {
      lastUpdated: new Date().toISOString(),
    },
  };
}

function parseRaceResults(rawResults: RaceResultRaw[]): GroupedRaceResults {
  const groupedResults: GroupedRaceResults = {};

  rawResults?.forEach((result: RaceResultRaw) => {
    const raceDate =
      result.RaceDate && format(new Date(result.RaceDate.date), 'MMM dd, yyyy', { locale: enUS });
    const raceName = result.RaceName;
    const category = result.RaceCategoryName;
    const bioLink = `/team#${result.FirstName.toLowerCase()}-${result.LastName.toLowerCase()}`;

    const raceResult: RaceResult = {
      raceDate,
      raceName,
      category,
      place: result.Place,
      name: `${result.FirstName} ${result.LastName}`,
      discipline: RaceDiscipline[result.DisciplineId],
      bioLink,
    };

    if (!groupedResults[raceDate]) {
      groupedResults[raceDate] = {};
    }

    if (!groupedResults[raceDate][raceName]) {
      groupedResults[raceDate][raceName] = {};
    }

    if (!groupedResults[raceDate][raceName][category]) {
      groupedResults[raceDate][raceName][category] = [];
    }

    groupedResults[raceDate][raceName][category].push(raceResult);
  });

  return groupedResults;
}
