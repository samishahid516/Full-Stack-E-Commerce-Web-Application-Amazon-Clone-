import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../utils/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import './Admin.css';

const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Kitchen', 'Footwear', 'Sports', 'Grocery', 'Toys', 'Home', 'Other'];

const initialForm = {
  name: '', description: '', price: '', category: '', imageUrl: '', stock: '', rating: ''
};

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      API.get(`/products/${id}`)
        .then(({ data }) => {
          setForm({
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            imageUrl: data.imageUrl || '',
            stock: data.stock,
            rating: data.rating
          });
        })
        .catch(() => setError('Product not found'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      rating: parseFloat(form.rating) || 0
    };

    try {
      if (isEdit) {
        await API.put(`/products/${id}`, payload);
      } else {
        await API.post('/products', payload);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="form-page-wrap card">
          <h1 className="page-title">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Product Name *</label>
                <input name="name" className="form-control" value={form.name} onChange={handleChange} required placeholder="e.g. Sony WH-1000XM5" />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select name="category" className="form-control" value={form.category} onChange={handleChange} required>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Price ($) *</label>
                <input name="price" type="number" min="0" step="0.01" className="form-control" value={form.price} onChange={handleChange} required placeholder="29.99" />
              </div>

              <div className="form-group">
                <label>Stock Quantity *</label>
                <input name="stock" type="number" min="0" className="form-control" value={form.stock} onChange={handleChange} required placeholder="100" />
              </div>

              <div className="form-group">
                <label>Rating (0–5)</label>
                <input name="rating" type="number" min="0" max="5" step="0.1" className="form-control" value={form.rating} onChange={handleChange} placeholder="4.5" />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input name="imageUrl" className="form-control" value={form.imageUrl} onChange={handleChange} placeholder="https://..." />
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea name="description" className="form-control" rows={4} value={form.description} onChange={handleChange} required placeholder="Describe the product..." />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={() => navigate('/admin')}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
