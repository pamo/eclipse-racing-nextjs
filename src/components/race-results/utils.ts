import { format } from 'date-fns';
import { RaceDiscipline, RaceResult, RaceResultRaw } from './types';

export const parseRaceResults = (rawResults: RaceResultRaw[]): RaceResult[] => {
  return rawResults?.map((result: RaceResultRaw) => {
    const raceDate = result.RaceDate && format(result.RaceDate?.date, 'yyyy-MM-dd');
    return {
      raceDate,
      raceName: result.RaceName,
      category: result.RaceCategoryName,
      place: result.Place,
      name: `${result.FirstName} ${result.LastName}`,
      discipline: RaceDiscipline[result.DisciplineId],
    };
  });
};
