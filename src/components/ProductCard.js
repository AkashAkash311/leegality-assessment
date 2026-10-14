import { Link } from 'react-router-dom';
import { card, colors, radius } from '../theme';
import { formatPrice } from '../utils/format';
import Rating from './Rating';

const styles = {
  card: {
    ...card,
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
    color: 'inherit',
    textDecoration: 'none',
  },
  imageWrap: {
    aspectRatio: '1',
    marginBottom: 12,
    borderRadius: radius,
    background: colors.bg,
    overflow: 'hidden',
  },
  image: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  // Clamped to two lines so cards stay the same height.
  title: {
    margin: '0 0 8px',
    fontSize: '0.95rem',
    fontWeight: 600,
    lineHeight: 1.3,
    minHeight: '2.6em',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  meta: {
    marginTop: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4px 8px',
  },
  price: {
    fontSize: '1.05rem',
    fontWeight: 700,
  },
};

function ProductCard({ product }) {
  return (
    // fromListing tells the detail page it can go back in history to the listing
    <Link to={`/product/${product.id}`} state={{ fromListing: true }} style={styles.card}>
      <div style={styles.imageWrap}>
        <img style={styles.image} src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>
      <h3 style={styles.title}>{product.title}</h3>
      <div style={styles.meta}>
        <span style={styles.price}>{formatPrice(product.price)}</span>
        <Rating value={product.rating} />
      </div>
    </Link>
  );
}

export default ProductCard;
