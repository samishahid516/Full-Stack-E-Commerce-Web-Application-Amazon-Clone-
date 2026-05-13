import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card card">
      <Link to={`/products/${product._id}`}>
        <div className="product-img-wrap">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={product.name}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }}
          />
        </div>
      </Link>
      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product._id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <StarRating rating={product.rating} />
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          {product.stock > 0 ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
}
