import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';
import './Admin.css';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    setDeletingId(id);
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="admin-header">
          <h1 className="page-title">Admin Dashboard</h1>
          <Link to="/admin/product" className="btn btn-primary">+ Add Product</Link>
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="card admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={p.imageUrl || 'https://via.placeholder.com/50'}
                      alt={p.name}
                      className="admin-product-img"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                    />
                  </td>
                  <td className="product-name-cell">{p.name}</td>
                  <td><span className="badge badge-pending">{p.category}</span></td>
                  <td className="price-cell">${p.price.toFixed(2)}</td>
                  <td className={p.stock < 5 ? 'low-stock' : ''}>{p.stock}</td>
                  <td>⭐ {p.rating.toFixed(1)}</td>
                  <td>
                    <div className="action-btns">
                      <Link to={`/admin/product/${p._id}`} className="btn btn-secondary btn-sm">Edit</Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(p._id, p.name)}
                        disabled={deletingId === p._id}
                      >
                        {deletingId === p._id ? '...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="empty-table">No products yet. <Link to="/admin/product">Add one!</Link></p>
          )}
        </div>
      </div>
    </div>
  );
}
