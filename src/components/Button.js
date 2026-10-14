import { colors, radius } from '../theme';

const styles = {
  base: {
    font: 'inherit',
    cursor: 'pointer',
  },
  default: {
    padding: '8px 14px',
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius,
    color: colors.text,
    fontSize: '0.9rem',
  },
  primary: {
    padding: '8px 14px',
    background: colors.primary,
    border: `1px solid ${colors.primary}`,
    borderRadius: radius,
    color: '#fff',
    fontSize: '0.9rem',
  },
  link: {
    padding: 0,
    background: 'none',
    border: 'none',
    color: colors.primary,
    fontSize: '0.85rem',
  },
};

function Button({ variant = 'default', style, ...props }) {
  return (
    <button
      type="button"
      style={{
        ...styles.base,
        ...styles[variant],
        ...style,
      }}
      {...props}
    />
  );
}

export default Button;
