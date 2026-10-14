import { card, radius } from '../theme';
import ProductCard from './ProductCard';

const shimmer = {
  background: 'linear-gradient(90deg, #e9edf2 25%, #f4f6f9 50%, #e9edf2 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeleton-shimmer 1.2s ease-in-out infinite',
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 16,
  },
  skeletonCard: {
    ...card,
    padding: 12,
  },
  skeletonImage: {
    ...shimmer,
    aspectRatio: '1',
    marginBottom: 12,
    borderRadius: radius,
  },
  skeletonLine: {
    ...shimmer,
    height: 14,
    marginBottom: 10,
    borderRadius: 4,
  },
  skeletonLineShort: {
    width: '55%',
  },
};

function ProductGrid({ products }) {
  return (
    <div style={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count }) {
  return (
    <div style={styles.grid} role="status" aria-label="Loading products">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} style={styles.skeletonCard} aria-hidden="true">
          <div style={styles.skeletonImage} />
          <div style={styles.skeletonLine} />
          <div style={{ ...styles.skeletonLine, ...styles.skeletonLineShort }} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
