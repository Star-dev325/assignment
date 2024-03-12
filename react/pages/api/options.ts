
import { NextApiRequest, NextApiResponse } from 'next';

interface Option {
  id: number;
  name: string;
}

const options: Option[] = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
  // Add more options as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Option[]>) {
  const { query } = req.query;
  const filteredOptions = options.filter((option) => option.name.toLowerCase().includes(query.toString().toLowerCase()));
  res.status(200).json(filteredOptions);
}
