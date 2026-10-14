import { useEffect, useState } from 'react';
import { colors, radius } from '../theme';

const styles = {
  inputs: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    width: '100%',
    minWidth: 0,
    padding: '7px 8px',
    border: `1px solid ${colors.border}`,
    borderRadius: radius,
    font: 'inherit',
    fontSize: '0.9rem',
  },
  hint: {
    margin: '8px 0 0',
    fontSize: '0.8rem',
    color: colors.danger,
  },
};

function PriceFilter({ minPrice, maxPrice, onChange }) {
  // local copy of the inputs so typing feels instant; the URL is updated after a short pause
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  // keep inputs in sync when filters change from outside (e.g. "Clear all")
  useEffect(() => {
    setMin(minPrice);
    setMax(maxPrice);
  }, [minPrice, maxPrice]);

  // debounce: apply the price 500ms after the user stops typing
  useEffect(() => {
    if (min === minPrice && max === maxPrice) return;
    const timer = setTimeout(() => onChange(min, max), 500);
    return () => clearTimeout(timer);
  }, [min, max, minPrice, maxPrice, onChange]);

  const showRangeError = min !== '' && max !== '' && Number(min) > Number(max);

  return (
    <div>
      <div style={styles.inputs}>
        <input
          type="number"
          min="0"
          inputMode="decimal"
          placeholder="Min"
          aria-label="Minimum price"
          style={styles.input}
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <span aria-hidden="true">–</span>
        <input
          type="number"
          min="0"
          inputMode="decimal"
          placeholder="Max"
          aria-label="Maximum price"
          style={styles.input}
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
      </div>
      {showRangeError && (
        <p style={styles.hint} role="alert">
          Min price is higher than max price.
        </p>
      )}
    </div>
  );
}

export default PriceFilter;
