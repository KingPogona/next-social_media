import { NextApiRequest, NextApiResponse } from 'next';

export const exampleController = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello from the controller!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};