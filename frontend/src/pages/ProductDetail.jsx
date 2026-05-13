import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch((err) => setError(err.response?.data?.message || 'Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="container page-wrapper"><ErrorMessage message={error} /></div>;

  return (
    <div className="page-wrapper">
      <div className="container">
        <button className="btn btn-outline btn-sm back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="detail-grid card">
          {/* Image */}
          <div className="detail-img-wrap">
            <img
              src={product.imageUrl || 'https://via.placeholder.com/500x500?text=No+Image'}
              alt={product.name}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/500x500?text=No+Image'; }}
            />
          </div>

          {/* Info */}
          <div className="detail-info">
            <span className="product-category">{product.category}</span>
            <h1 className="detail-name">{product.name}</h1>
            <StarRating rating={product.rating} size="lg" />
            <p className="detail-price">${product.price.toFixed(2)}</p>

            <div className={`stock-indicator ${product.stock > 0 ? 'in-stock' : 'no-stock'}`}>
              {product.stock > 0 ? `✅ In Stock (${product.stock} available)` : '❌ Out of Stock'}
            </div>

            <p className="detail-desc">{product.description}</p>

            {product.stock > 0 && (
              <div className="add-to-cart-section">
                <div className="qty-control">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}>+</button>
                </div>
                <button className={`btn ${added ? 'btn-secondary' : 'btn-primary'}`} onClick={handleAddToCart}>
                  {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
