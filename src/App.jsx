import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard.jsx";
import SearchBar from "./components/SearchBar.jsx";
import products from "./data/products.js";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const normalizedSearch = debouncedSearch.trim().toLowerCase();
  const filteredProducts = [...products]
    .filter((product) => product.title.toLowerCase().includes(normalizedSearch))
    .filter((product) => category === "All" || product.category === category)
    .sort((a, b) => {
      if (sortOrder === "low-to-high") return a.price - b.price;
      if (sortOrder === "high-to-low") return b.price - a.price;
      return 0;
    });

  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`;
  }, [filteredProducts.length]);

  function handleAddToCart(productTitle) {
    setCartCount((count) => count + 1);
    setLastAdded(productTitle);
  }

  function clearFilters() {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  }

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="CvSU Mini Store home">
          <span className="brand-mark">C</span>
          <span><strong>CvSU</strong> Mini Store</span>
        </a>
        <span className="header-note">Student essentials, in one place</span>
      </header>

      <section className="hero">
        <p className="eyebrow">CAVITE STATE UNIVERSITY</p>
        <h1>Find what you need.<br /><span>Keep learning.</span></h1>
        <p className="hero-copy">A simple catalog of everyday school and study essentials.</p>
      </section>

      <section className="cart-summary" aria-live="polite">
        <div className="cart-symbol">▣</div>
        <div>
          <p className="cart-label">YOUR CART</p>
          <strong>{cartCount === 0 ? "Your cart is empty." : `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}</strong>
        </div>
        <span className="cart-count">{cartCount}</span>
      </section>

      <section className="catalog-section">
        <div className="section-heading">
          <div><p className="eyebrow">THE COLLECTION</p><h2>Browse products</h2></div>
          <span className="product-total">Showing {filteredProducts.length} of {products.length} products</span>
        </div>

        <SearchBar
          searchText={searchText}
          onSearchTextChange={setSearchText}
          category={category}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          onClearFilters={clearFilters}
        />

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                category={product.category}
                inStock={product.inStock}
                onAddToCart={handleAddToCart}
              >
                {product.id === 1 && <span className="product-badge product-badge--new">New</span>}
                {product.id === 5 && <span className="product-badge product-badge--sale">Popular</span>}
              </ProductCard>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-state__icon" aria-hidden="true">⌕</span>
            <h3>No products found.</h3>
            <p>Try a different keyword or category.</p>
            <button type="button" onClick={clearFilters}>Clear filters</button>
          </div>
        )}
      </section>

      <footer className="site-footer">CvSU Mini Store <span>•</span> DCIT26 Application Development and Emerging Technologies</footer>
    </main>
  );
}

export default App;