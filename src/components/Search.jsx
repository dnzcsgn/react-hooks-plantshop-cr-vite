function Search({ value, onSearchChange }) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        id="search"
        type="text"
        placeholder="Type a name to search..."
        value={value}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
export default Search;
