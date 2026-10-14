import { card, colors } from '../theme';
import Button from './Button';

const styles = {
  status: {
    ...card,
    padding: '48px 16px',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 8px',
    fontSize: '1.15rem',
  },
  message: {
    margin: '0 0 16px',
    color: colors.textMuted,
  },
  spinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: '64px 16px',
    color: colors.textMuted,
  },
  spinnerCircle: {
    width: 22,
    height: 22,
    border: `3px solid ${colors.border}`,
    borderTopColor: colors.primary,
    borderRadius: '50%',
    animation: 'spinner-rotate 0.8s linear infinite',
  },
};

// Shared block for error and empty states, with an optional action button.
function StatusMessage({ title, message, actionLabel, onAction, isError = false }) {
  return (
    <div style={styles.status} role={isError ? 'alert' : 'status'}>
      <h2 style={styles.title}>{title}</h2>
      {message && <p style={styles.message}>{message}</p>}
      {actionLabel && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function Spinner({ label = 'Loading...' }) {
  return (
    <div style={styles.spinner} role="status">
      <span style={styles.spinnerCircle} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default StatusMessage;
