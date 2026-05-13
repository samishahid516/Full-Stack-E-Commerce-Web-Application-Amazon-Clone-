import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [toastMessage, setToastMessage] = useState('');

  const saveCart = (updated) => {
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const addToCart = (product, qty = 1) => {
    const existing = cart.find((i) => i.product._id === product._id);
    const updated = existing
      ? cart.map((i) =>
          i.product._id === product._id
            ? { ...i, quantity: i.quantity + qty }
            : i
        )
      : [...cart, { product, quantity: qty }];
    saveCart(updated);
    
    // Show toast
    setToastMessage('Item added to cart successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updated = cart.map((i) =>
      i.product._id === productId ? { ...i, quantity } : i
    );
    saveCart(updated);
  };

  const removeFromCart = (productId) => {
    const updated = cart.filter((i) => i.product._id !== productId);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount }}
    >
      {children}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--success, #10b981)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: '600',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999,
          animation: 'slideDown 0.3s ease-out'
        }}>
          ✅ {toastMessage}
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
