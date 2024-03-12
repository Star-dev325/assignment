import { useState } from 'react';
import { ShadcnInput } from 'shadcn';
import { Listbox, ListboxOption } from '@radix-ui/react-listbox';
import { useQuery } from 'react-query';

interface Option {
  id: number;
  name: string;
}

const fetchOptions = async (query: string): Promise<Option[]> => {
  // Perform HTTP request to fetch options based on query
  const response = await fetch(`/api/options?query=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch options');
  }
  return response.json();
};

const Autocomplete: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { data, isLoading, isError } = useQuery(['options', inputValue], () => fetchOptions(inputValue));

  return (
    <div className="relative">
      <ShadcnInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type to search..."
        className="w-full border border-gray-300 rounded-md p-2"
      />
      {isLoading && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-md shadow-lg">
          Loading...
        </div>
      )}
      {isError && (
        <div className="absolute top-full left-0 w-full bg-white border border-red-500 text-red-500 rounded-b-md shadow-lg">
          Error fetching options
        </div>
      )}
      <Listbox as="ul" className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-md shadow-lg mt-1">
        {data?.map((option) => (
          <ListboxOption key={option.id} value={option} className="py-2 px-4 cursor-default select-none">
            {option.name}
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  );
};

export default Autocomplete;
