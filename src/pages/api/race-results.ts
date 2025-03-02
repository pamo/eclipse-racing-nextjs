import { ECLIPSE_TEAM_API_ID, ONE_HOUR } from '@/components/race-results/constants';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { query: searchParams } = req;
    const page = Number(searchParams['page']) || 1;
    const limit = 10;

    try {
      const response = await fetch(
        `https://www.road-results.com/downloadteam.php?teamID=${ECLIPSE_TEAM_API_ID}&json=1`,
        { next: { revalidate: ONE_HOUR } } // Cache for 1 hour
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const allResults = await response.json();

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const results = allResults.slice(startIndex, endIndex);
      const totalPages = Math.ceil(allResults.length / limit);

      return res.status(200).json({
        results,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: allResults.length,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      });
    } catch (error) {
      console.error('Error fetching race results:', error);
      return res.status(500).json({
        results: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalItems: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
        error: 'Internal Server Error',
      });
    }
  }
}
