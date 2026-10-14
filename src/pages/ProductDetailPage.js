import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getApiCaller } from '../api';
import Button from '../components/Button';
import Rating from '../components/Rating';
import StatusMessage, { Spinner } from '../components/StatusMessage';
import { card, colors, radius } from '../theme';
import { formatCategory, formatPrice } from '../utils/format';

const styles = {
  detail: {
    maxWidth: 1040,
    margin: '0 auto',
    padding: '20px 16px 40px',
  },
  content: {
    ...card,
    marginTop: 16,
    padding: 24,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 32,
  },
  // The two columns wrap onto separate rows when there is not enough width.
  gallery: {
    flex: '5 1 280px',
    minWidth: 0,
  },
  info: {
    flex: '6 1 300px',
    minWidth: 0,
  },
  imageWrap: {
    aspectRatio: '1',
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
  thumbs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  thumb: {
    width: 64,
    height: 64,
    padding: 2,
    background: colors.bg,
    border: '2px solid transparent',
    borderRadius: radius,
    cursor: 'pointer',
  },
  thumbActive: {
    border: `2px solid ${colors.primary}`,
  },
  title: {
    margin: '0 0 8px',
    fontSize: '1.6rem',
    lineHeight: 1.25,
  },
  priceRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  facts: {
    margin: 0,
    fontSize: '0.95rem',
  },
  fact: {
    display: 'flex',
    gap: 6,
    padding: '2px 0',
  },
  factLabel: {
    fontWeight: 700,
  },
  factValue: {
    margin: 0,
  },
  section: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: `1px solid ${colors.border}`,
  },
  heading: {
    margin: '0 0 8px',
    fontSize: '1.1rem',
  },
  text: {
    margin: 0,
    lineHeight: 1.55,
  },
  reviews: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'grid',
    gap: 14,
  },
  reviewHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    marginBottom: 2,
  },
};


function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  //states
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  // get product details api
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const productDetails = await getApiCaller(`/products/${id}`);
        setProduct(productDetails);
        setSelectedImage(0);
      } catch (e) {
        console.log("get product details api error", e);
        setError('Could not load this product. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  // going back in history keeps the listing page (and its filters) as it was.
  // If the product link was opened directly there is no listing to go back to.
  const handleBack = () => {
    if (location.state?.fromListing) navigate(-1);
    else navigate('/');
  };

  if (loading) {
    return (
      <main style={styles.detail}>
        <Spinner label="Loading product..." />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main style={styles.detail}>
        <Button onClick={handleBack}>← Back</Button>
        <div style={{ marginTop: 16 }}>
          <StatusMessage isError title="Something went wrong" message={error} />
        </div>
      </main>
    );
  }

  const images = product.images || [];

  return (
    <main style={styles.detail}>
      <Button onClick={handleBack}>← Back</Button>

      <article style={styles.content}>
        <div style={styles.gallery}>
          <div style={styles.imageWrap}>
            <img style={styles.image} src={images[selectedImage] || product.thumbnail} alt={product.title} />
          </div>
          <div style={styles.thumbs}>
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                style={{ ...styles.thumb, ...(index === selectedImage && styles.thumbActive) }}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                onClick={() => setSelectedImage(index)}
              >
                <img style={styles.image} src={image} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div style={styles.info}>
          <h1 style={styles.title}>{product.title}</h1>
          <div style={styles.priceRow}>
            <span style={styles.price}>{formatPrice(product.price)}</span>
            <Rating value={product.rating} />
          </div>

          <dl style={styles.facts}>
            <div style={styles.fact}>
              <dt style={styles.factLabel}>Brand:</dt>
              <dd style={styles.factValue}>{product.brand || 'N/A'}</dd>
            </div>
            <div style={styles.fact}>
              <dt style={styles.factLabel}>Category:</dt>
              <dd style={styles.factValue}>{formatCategory(product.category)}</dd>
            </div>
          </dl>

          <section style={styles.section}>
            <h2 style={styles.heading}>Description</h2>
            <p style={styles.text}>{product.description}</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>Reviews</h2>
            <ul style={styles.reviews}>
              {(product.reviews || []).map((review, index) => (
                <li key={`${review.reviewerEmail}-${index}`}>
                  <div style={styles.reviewHeader}>
                    <strong>{review.reviewerName}</strong>
                    <Rating value={review.rating} />
                  </div>
                  <p style={styles.text}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}

export default ProductDetailPage;
