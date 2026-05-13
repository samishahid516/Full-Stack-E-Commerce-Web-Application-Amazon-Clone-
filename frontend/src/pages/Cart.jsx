import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import './Cart.css';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePlaceOrder = async () => {
    if (!user) { navigate('/login'); return; }
    setPlacing(true);
    setError('');
    try {
      const items = cart.map((i) => ({ product: i.product._id, quantity: i.quantity }));
      await API.post('/orders', { items });
      clearCart();
      setSuccess('Order placed successfully! 🎉');
      setTimeout(() => navigate('/orders'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map(({ product, quantity }) => (
              <div className="cart-item card" key={product._id}>
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/100x100'}
                  alt={product.name}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100x100'; }}
                />
                <div className="cart-item-info">
                  <Link to={`/products/${product._id}`} className="cart-item-name">
                    {product.name}
                  </Link>
                  <p className="cart-item-price">${product.price.toFixed(2)} each</p>
                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <button onClick={() => updateQuantity(product._id, quantity - 1)}>−</button>
                      <span>{quantity}</span>
                      <button onClick={() => updateQuantity(product._id, quantity + 1)}>+</button>
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(product._id)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-item-subtotal">
                  ${(product.price * quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            {user ? (
              <button
                className="btn btn-primary place-order-btn"
                onClick={handlePlaceOrder}
                disabled={placing}
              >
                {placing ? 'Placing Order...' : '✅ Place Order'}
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary place-order-btn">
                Login to Place Order
              </Link>
            )}

            <Link to="/" className="continue-shopping">← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
