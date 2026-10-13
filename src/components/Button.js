import { useHover } from '../hooks/useHover';
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
  defaultHover: {
    border: `1px solid ${colors.primary}`,
    color: colors.primary,
  },
  primary: {
    padding: '8px 14px',
    background: colors.primary,
    border: `1px solid ${colors.primary}`,
    borderRadius: radius,
    color: '#fff',
    fontSize: '0.9rem',
  },
  primaryHover: {
    background: colors.primaryDark,
    border: `1px solid ${colors.primaryDark}`,
  },
  link: {
    padding: 0,
    background: 'none',
    border: 'none',
    color: colors.primary,
    fontSize: '0.85rem',
  },
  linkHover: {
    textDecoration: 'underline',
  },
};

function Button({ variant = 'default', style, ...props }) {
  const [hovered, hoverHandlers] = useHover();

  return (
    <button
      type="button"
      style={{
        ...styles.base,
        ...styles[variant],
        ...(hovered && styles[`${variant}Hover`]),
        ...style,
      }}
      {...hoverHandlers}
      {...props}
    />
  );
}

export default Button;
