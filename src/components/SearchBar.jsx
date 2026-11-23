function SearchBar({
  searchText,
  onSearchTextChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortOrderChange,
  onClearFilters
}) {
  return (
    <section className="search-panel" aria-label="Product search and filters">
      <label className="search-field">
        <span className="control-label">SEARCH PRODUCTS</span>
        <span className="search-input-wrap">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={searchText}
            onChange={(event) => onSearchTextChange(event.target.value)}
            placeholder="Search by product name..."
            aria-label="Search by product name"
          />
        </span>
      </label>
      <label className="filter-field">
        <span className="control-label">CATEGORY</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="All">All categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="School Supplies">School Supplies</option>
          <option value="Accessories">Accessories</option>
        </select>
      </label>
      <label className="filter-field">
        <span className="control-label">SORT BY PRICE</span>
        <select value={sortOrder} onChange={(event) => onSortOrderChange(event.target.value)}>
          <option value="default">Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </label>
      <button className="clear-filters" type="button" onClick={onClearFilters}>Clear Filters</button>
    </section>
  );
}

export default SearchBar;