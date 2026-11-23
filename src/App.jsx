import { useState } from "react";
import ProductCard from "./components/ProductCard.jsx";
import products from "./data/products.js";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  function handleAddToCart(productTitle) {
    setCartCount((count) => count + 1);
    setLastAdded(productTitle);
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
          <span className="product-total">{products.length} products</span>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              inStock={product.inStock}
              onAddToCart={handleAddToCart}
            >
              {index === 0 && <span className="product-badge product-badge--new">New</span>}
              {index === 4 && <span className="product-badge product-badge--sale">Popular</span>}
            </ProductCard>
          ))}
        </div>
      </section>

      <footer className="site-footer">CvSU Mini Store <span>•</span> DCIT26 Application Development and Emerging Technologies</footer>
    </main>
  );
}

export default App;