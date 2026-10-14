import { colors } from '../theme';

const MAX_RATING = 5;

const styles = {
  rating: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    whiteSpace: 'nowrap',
  },
  stars: {
    position: 'relative',
    display: 'inline-block',
    color: colors.border,
    letterSpacing: 1,
    lineHeight: 1,
  },
  // Gold stars laid over the grey ones and clipped to the rating percentage.
  starsFilled: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    overflow: 'hidden',
    color: colors.star,
  },
  value: {
    fontSize: '0.8rem',
    color: colors.textMuted,
  },
};

function Rating({ value = 0 }) {
  const percent = Math.min(100, Math.max(0, (value / MAX_RATING) * 100));

  return (
    <span style={styles.rating} role="img" aria-label={`Rated ${value.toFixed(1)} out of ${MAX_RATING}`}>
      <span style={styles.stars} aria-hidden="true">
        ★★★★★
        <span style={{ ...styles.starsFilled, width: `${percent}%` }}>★★★★★</span>
      </span>
      <span style={styles.value} aria-hidden="true">
        ({value.toFixed(1)})
      </span>
    </span>
  );
}

export default Rating;
