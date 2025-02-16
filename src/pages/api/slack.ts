import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const payload = JSON.parse(req.body.payload);
      const action = payload?.actions[0];
      if (payload.type === 'block_actions' && action?.type === 'button') {
        const message = `User clicked the button: ${action.text.text}`;

        return res.status(200).json({ text: message });
      }

      return res.status(200).end();
    } catch (error) {
      console.error('Error parsing payload:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
