import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { colors, pageWidth, radius } from '../theme';

const styles = {
  header: {
    background: colors.header,
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  inner: {
    maxWidth: pageWidth,
    margin: '0 auto',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  brand: {
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 700,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  search: {
    flex: 1,
    minWidth: 0,
    maxWidth: 560,
    margin: '0 auto',
    display: 'flex',
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    padding: '9px 12px',
    border: 'none',
    borderRadius: `${radius}px 0 0 ${radius}px`,
    font: 'inherit',
  },
  searchButton: {
    padding: '0 16px',
    border: 'none',
    borderRadius: `0 ${radius}px ${radius}px 0`,
    background: colors.primary,
    color: '#fff',
    font: 'inherit',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

function Header() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentSearch = searchParams.get('q') || '';
  const [searchText, setSearchText] = useState(currentSearch);

  // update the box when the search changes from outside (back button, clear filters)
  useEffect(() => {
    setSearchText(currentSearch);
  }, [currentSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    // keep the other filters if we are already on the listing page
    const params = location.pathname === '/' ? new URLSearchParams(searchParams) : new URLSearchParams();
    if (searchText.trim()) params.set('q', searchText.trim());
    else params.delete('q');
    params.delete('page');
    navigate(`/?${params.toString()}`);
  };

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <Link to="/" style={styles.brand}>
          ShopList
        </Link>
        <form style={styles.search} role="search" onSubmit={handleSearch}>
          <input
            type="search"
            style={styles.searchInput}
            placeholder="Search products..."
            aria-label="Search products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" style={styles.searchButton}>
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
