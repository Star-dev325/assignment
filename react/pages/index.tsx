import Autocomplete from '../components/Autocomplete';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Autocomplete Example</h1>
      <Autocomplete />
    </div>
  );
}
