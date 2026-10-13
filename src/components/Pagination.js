import { colors, radius } from '../theme';

const styles = {
  pagination: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 24,
  },
  button: {
    minWidth: 36,
    padding: '7px 12px',
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius,
    color: colors.text,
    font: 'inherit',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  buttonActive: {
    background: colors.primary,
    border: `1px solid ${colors.primary}`,
    color: '#fff',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  // For a "…" between page numbers when there are many pages.
  gap: {
    padding: '0 4px',
    color: colors.textMuted,
  },
};

// Page numbers to show, with the gaps collapsed: 1 … 4 5 6 … 20
function getPageItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) items.push('gap-start');
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < totalPages - 1) items.push('gap-end');
  items.push(totalPages);

  return items;
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = getPageItems(currentPage, totalPages);

  return (
    <nav style={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        style={{ ...styles.button, ...(currentPage === 1 && styles.buttonDisabled) }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Previous
      </button>

      {pages.map((page) =>
        typeof page === 'number' ? (
          <button
            key={page}
            type="button"
            style={{ ...styles.button, ...(page === currentPage && styles.buttonActive) }}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Page ${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={page} style={styles.gap} aria-hidden="true">
            …
          </span>
        )
      )}

      <button
        type="button"
        style={{ ...styles.button, ...(currentPage === totalPages && styles.buttonDisabled) }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next →
      </button>
    </nav>
  );
}

export default Pagination;
