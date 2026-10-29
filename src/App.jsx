
import { useEffect, useState } from "react";
import "./App.css";
import PriceHistory from "./PriceHistory";

const categories = ["All Products", "Electronics", "Fashion", "Home", "Beauty"];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");
  const [wishlist, setWishlist] = useState(() => {
  const savedWishlist = localStorage.getItem("smartcart-wishlist");
  return savedWishlist ? JSON.parse(savedWishlist) : [];
});

useEffect(() => {
  localStorage.setItem("smartcart-wishlist", JSON.stringify(wishlist));
}, [wishlist]);

  const [showWishlist, setShowWishlist] = useState(false);
  const [sort, setSort] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  fetch("http://127.0.0.1:5000/api/products")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });
}, []);
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All Products" || product.category === category;
      const matchesWishlist = !showWishlist || wishlist.includes(product.id);
      return matchesSearch && matchesCategory && matchesWishlist;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return a.id - b.id;
    });

  function toggleWishlist(id) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
  }
  function getOffers(product) {
  return [
    {
      store: "ValueMart",
      price: Math.round(product.price * 0.94),
    },
    {
      store: product.store,
      price: product.price,
    },
    {
      store: "SmartDeals",
      price: Math.round(product.price * 1.06),
    },
  ].sort((a, b) => a.price - b.price);
}
if (loading) {
  return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Loading SmartCart products...</h2>;
}
  return (
    <div className="app">
      <div className="announcement">
        Smart shopping starts here ✨ Compare products and shop smarter.
      </div>

      <header className="navbar">
        <a href="#" className="logo">
          <span className="logo-icon">S</span>
          Smart<span>Cart</span>
          <span className="logo-dot">.</span>
        </a>

        <nav className="nav-links">
          <a href="#products">Explore</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </nav>

        
<button
  className="wishlist-nav"
  onClick={() => {
    setShowWishlist(!showWishlist);
    setSearch("");
    setCategory("All Products");
  }}
>
  {showWishlist ? "♡ All Products" : "♡ Wishlist"}
  <span>{wishlist.length}</span>
</button>

      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="status-dot"></span>
              YOUR SMARTER WAY TO SHOP
            </div>

            <h1>
              Find the best.
              <br />
              <span>Pay less.</span>
            </h1>

            <p className="hero-description">
              Discover products you love, compare prices, and make every
              purchase count. Better choices begin here.
            </p>

            <div className="hero-actions">
              <a href="#products" className="primary-button">
                Explore products <span>↗</span>
              </a>
              <div className="trust-note">
                <span>✓</span> Smarter shopping decisions
              </div>
            </div>

            <div className="hero-stats">
              <div>
                <strong>8+</strong>
                <span>Products to explore</span>
              </div>
              <div className="stat-divider"></div>
              <div>
                <strong>4</strong>
                <span>Categories</span>
              </div>
              <div className="stat-divider"></div>
              <div>
                <strong>100%</strong>
                <span>Free to explore</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-orbit orbit-one"></div>
            <div className="visual-orbit orbit-two"></div>
            <div className="hero-product-card">
              <div className="floating-tag">✦ Smart finds</div>
              <div className="hero-product-image">🎧</div>
              <div className="hero-product-info">
                <span className="mini-label">FEATURED PICK</span>
                <h3>Sony WH-1000XM5</h3>
                <div className="hero-price-row">
                  <strong>₹24,990</strong>
                  <span>₹29,990</span>
                </div>
                <div className="deal-badge">Save ₹5,000 · Sample price</div>
              </div>
            </div>
            <div className="floating-card floating-top">
              <span className="floating-icon">↘</span>
              <div>
                <strong>Compare prices</strong>
                <span>Find better value</span>
              </div>
            </div>
            <div className="floating-card floating-bottom">
              <span className="floating-icon heart-icon">♡</span>
              <div>
                <strong>Your favourites</strong>
                <span>All in one place</span>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits">
          <div className="benefit-item">
            <span className="benefit-icon">⌕</span>
            <div>
              <strong>Easy discovery</strong>
              <p>Find products quickly</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">⇄</span>
            <div>
              <strong>Compare smarter</strong>
              <p>Make informed choices</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">♡</span>
            <div>
              <strong>Save your picks</strong>
              <p>Keep favourites nearby</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">↗</span>
            <div>
              <strong>Shop with confidence</strong>
              <p>Value meets convenience</p>
            </div>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="section-label">THE SMART COLLECTION</span>
              <h2>Find your next <span>favourite.</span></h2>
              <p>Thoughtful picks for your everyday life.</p>
            </div>
            <div className="product-count">
              <span>{filteredProducts.length}</span> products found
            </div>
          </div>

          <div className="category-tabs" id="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "category-tab active" : "category-tab"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="search-sort-row">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear search">
                  ×
                </button>
              )}
            </div>

            <select
              className="sort-select"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Sort: Featured</option>
              <option value="low">Price: Low to high</option>
              <option value="high">Price: High to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => {
              const discount = Math.round(
                ((product.oldPrice - product.price) / product.oldPrice) * 100
              );

              return (
                <article className="product-card" key={product.id}>
                  <div
                    className="product-image"
                    style={{ backgroundColor: product.color }}
                  >
                    <span className="discount-tag">{discount}% OFF</span>
                    <button
                      className={wishlist.includes(product.id) ? "heart-button selected" : "heart-button"}
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Toggle wishlist"
                    >
                      {wishlist.includes(product.id) ? "♥" : "♡"}
                    </button>
                    <div className="product-emoji">{product.emoji}</div>
                  </div>

                  <div className="product-details">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>

                    <div className="rating">
                      <span>★</span> {product.rating}
                      <span className="rating-note">· Sample rating</span>
                    </div>

                    <div className="price-row">
                      <strong>{formatPrice(product.price)}</strong>
                      <del>{formatPrice(product.oldPrice)}</del>
                    </div>

                    <div className="store-row">
                      <span>Listed by {product.store}</span>
                    </div>

                    <button
                      className="compare-button"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Compare prices <span>↗</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <span>⌕</span>
              <h3>No products found</h3>
              <p>Try a different search or category.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All Products");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="newsletter" id="about">
          <div className="newsletter-icon">✳</div>
          <div>
            <span className="section-label">A LITTLE MORE SMART</span>
            <h2>Good choices start with good comparisons.</h2>
            <p>
              SmartCart is a shopping project designed to make product
              discovery and price comparison simpler.
            </p>
          </div>
          <a href="#products" className="newsletter-button">
            Explore the collection ↗
          </a>
        </section>
                {selectedProduct && (
          <div
            className="comparison-overlay"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="comparison-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="comparison-close"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close comparison"
              >
                ×
              </button>

              <span className="section-label">SMART PRICE COMPARISON</span>

              <div className="comparison-product">
                <div
                  className="comparison-product-icon"
                  style={{
                    backgroundColor: selectedProduct.color,
                  }}
                >
                  {selectedProduct.emoji}
                </div>

                <div>
                  <h2>{selectedProduct.name}</h2>
                  <p>
                    {selectedProduct.category} · ★ {selectedProduct.rating}
                  </p>
                </div>
              </div>

              <div className="comparison-heading">
                <h3>Compare store prices</h3>
                <span>3 sample offers</span>
              </div>

              <div className="comparison-offers">
                {getOffers(selectedProduct).map((offer, index, offers) => (
                  <div
                    className={
                      index === 0
                        ? "comparison-offer cheapest"
                        : "comparison-offer"
                    }
                    key={offer.store}
                  >
                    <div className="offer-store-icon">
                      {index === 0 ? "🏆" : "🛍️"}
                    </div>

                    <div className="offer-store-details">
                      <strong>{offer.store}</strong>

                      {index === 0 && (
                        <span className="best-deal-label">
                          LOWEST SAMPLE PRICE
                        </span>
                      )}

                      {index !== 0 && (
                        <span className="offer-note">
                          Sample listing
                        </span>
                      )}
                    </div>

                    <div className="offer-price-details">
                      <strong>{formatPrice(offer.price)}</strong>

                      {index !== 0 && (
                        <span>
                          +{formatPrice(offer.price - offers[0].price)} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="comparison-savings">
                <span>💰</span>
                <div>
                  <strong>
                    Save up to{" "}
                    {formatPrice(
                      getOffers(selectedProduct)[2].price -
                        getOffers(selectedProduct)[0].price
                    )}
                  </strong>
                  <p>
                    Difference between the highest and lowest sample offers.
                  </p>
                </div>
              </div>

              <p className="comparison-disclaimer">
                Demo prices for portfolio purposes only. These are not
                verified retailer offers or live market prices.
              </p>
                            <PriceHistory productId={selectedProduct.id} />
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <a href="#" className="logo footer-logo">
          <span className="logo-icon">S</span>
          Smart<span>Cart</span>
          <span className="logo-dot">.</span>
        </a>
        <p>Shop thoughtfully. Choose smartly.</p>
        <span className="footer-copy">Demo project · Sample product data</span>
      </footer>
    </div>
  );
}

export default App;
