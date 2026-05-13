import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';
import './Home.css';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Kitchen', 'Footwear', 'Sports', 'Grocery', 'Toys', 'Home'];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, activeCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (activeCategory !== 'All') params.category = activeCategory;

      const { data } = await API.get('/products', { params });
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    if (searchQuery) setSearchParams({});
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Hero Banner */}
        <div className="hero-banner">
          <h1>Welcome to ShopEasy 🛒</h1>
          <p>Discover thousands of products at amazing prices</p>
        </div>

        {/* Search result info */}
        {searchQuery && (
          <div className="search-info">
            <span>Showing results for: <strong>"{searchQuery}"</strong></span>
            <button className="btn btn-sm btn-outline" onClick={() => { setSearchParams({}); }}>
              ✕ Clear Search
            </button>
          </div>
        )}

        {/* Category Filter */}
        <div className="category-filter">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products */}
        {loading ? (
          <LoadingSpinner text="Loading products..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : products.length === 0 ? (
          <div className="empty-state">
            <p>😕 No products found.</p>
            <button className="btn btn-primary" onClick={() => { setActiveCategory('All'); setSearchParams({}); }}>
              View All Products
            </button>
          </div>
        ) : (
          <>
            <p className="product-count">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
            <div className="products-grid">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
