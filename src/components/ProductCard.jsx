function ProductCard({
  title,
  price,
  category = "General",
  inStock,
  onAddToCart,
  children
}) {
  return (
    <article className={`product-card ${inStock ? "" : "product-card--unavailable"}`}>
      <div className="product-card__topline">
        <span className="product-category">{category}</span>
        {children}
      </div>
      <div className="product-card__icon" aria-hidden="true">
        {category === "Electronics" ? "⌁" : category === "Books" ? "▤" : category === "School Supplies" ? "✎" : "◇"}
      </div>
      <h2>{title}</h2>
      <p className="product-price">{price.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}</p>
      <div className="product-card__footer">
        <span className={`stock-status ${inStock ? "stock-status--in" : "stock-status--out"}`}>
          <span className="status-dot" />{inStock ? "In Stock" : "Out of Stock"}
        </span>
        <button type="button" onClick={() => onAddToCart(title)} disabled={!inStock}>
          {inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;