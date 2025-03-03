import { NextApiRequest, NextApiResponse } from 'next';
import { fetchRaceResults } from '@/services/raceResults';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const page = Number(req.query.page) || 1;
      const data = await fetchRaceResults(page);
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching race results:', error);
      return res.status(500).json({
        results: {},
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalRaces: 0,
        },
        metadata: {
          totalRaces: 0,
          lastUpdated: new Date().toISOString(),
        },
        error: 'Internal Server Error'
      });
    }
  }
}
