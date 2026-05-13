export default function StarRating({ rating, size = 'sm' }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} style={{ color: i <= Math.round(rating) ? '#f59e0b' : '#d1d5db', fontSize: size === 'lg' ? '1.2rem' : '0.85rem' }}>
        ★
      </span>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {stars}
      <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: '4px' }}>({rating.toFixed(1)})</span>
    </div>
  );
}
