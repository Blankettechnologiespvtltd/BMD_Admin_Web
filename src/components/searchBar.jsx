export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by name, email, role..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-96 border rounded-lg px-4 py-2"
    />
  );
}