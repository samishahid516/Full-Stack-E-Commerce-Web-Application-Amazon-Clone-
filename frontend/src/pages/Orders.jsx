import { useState, useEffect } from 'react';
import API from '../utils/api';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';
import './Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/orders/my')
      .then(({ data }) => setOrders(data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">My Orders</h1>

        {error && <ErrorMessage message={error} />}

        {orders.length === 0 ? (
          <div className="empty-state">
            <p>📦 You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card card" key={order._id}>
                <div className="order-header">
                  <div>
                    <p className="order-id">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}</p>
                  </div>
                  <div className="order-meta">
                    <span className={`badge badge-${order.status}`}>{order.status}</span>
                    <span className="order-total">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div className="order-item" key={idx}>
                      <img
                        src={item.product?.imageUrl || 'https://via.placeholder.com/60'}
                        alt={item.product?.name}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/60'; }}
                      />
                      <div className="order-item-info">
                        <p className="order-item-name">{item.product?.name || 'Product unavailable'}</p>
                        <p className="order-item-meta">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                      </div>
                      <p className="order-item-total">${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
