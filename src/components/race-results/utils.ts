import { format } from 'date-fns';
import { GroupedRaceResults, RaceDiscipline, RaceResult, RaceResultRaw } from './types';


export const parseRaceResults = (rawResults: RaceResultRaw[]): GroupedRaceResults => {
  const groupedResults: GroupedRaceResults = {};

  rawResults?.forEach((result: RaceResultRaw) => {
    const raceDate = result.RaceDate && format(new Date(result.RaceDate.date), 'yyyy-MM-dd');
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
};
