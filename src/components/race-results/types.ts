export interface RaceResultRaw {
  RaceDate: { date: Date };
  RaceName: string;
  RaceCategoryName: string;
  Place: number;
  FirstName: string;
  LastName: string;
  DisciplineId: number;
}
export interface RaceResultsRaw {
  results: RaceResultRaw[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export enum RaceDiscipline {
  'Road' = 1,
  'Crit' = 2,
}

export interface RaceResult {
  raceDate: string;
  raceName: string;
  category: string;
  place: number;
  name: string;
  discipline: string;
}

export interface RaceResults {
  results: RaceResult[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}
