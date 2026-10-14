import { card, colors } from '../theme';
import Button from './Button';
import PriceFilter from './PriceFilter';

const styles = {
  filters: {
    ...card,
    padding: 16,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: {
    margin: 0,
    fontSize: '1.1rem',
  },
  section: {
    padding: '14px 0',
    borderTop: `1px solid ${colors.border}`,
  },
  sectionLast: {
    paddingBottom: 0,
  },
  heading: {
    margin: '0 0 10px',
    fontSize: '0.9rem',
    fontWeight: 700,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    maxHeight: 240,
    overflowY: 'auto',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '4px 0',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  optionInput: {
    margin: 0,
    accentColor: colors.primary,
  },
  // For "Loading categories...", "No brands available." and similar messages.
  note: {
    margin: 0,
    fontSize: '0.85rem',
    color: colors.textMuted,
  },
};

function FilterSection({ title, isLast = false, children }) {
  return (
    <section style={{ ...styles.section, ...(isLast && styles.sectionLast) }}>
      <h3 style={styles.heading}>{title}</h3>
      {children}
    </section>
  );
}

export function FilterNote({ children }) {
  return <p style={styles.note}>{children}</p>;
}

function FilterSidebar({
  categories,
  categoriesError,
  brands,
  brandsLoading,
  selectedCategory,
  selectedBrands,
  minPrice,
  maxPrice,
  showClear,
  onCategoryChange,
  onBrandToggle,
  onPriceChange,
  onClear,
}) {
  const categoryOptions = [{ slug: '', name: 'All categories' }, ...categories];

  return (
    <aside style={styles.filters} aria-label="Filters">
      <div style={styles.header}>
        <h2 style={styles.title}>Filters</h2>
        {showClear && (
          <Button variant="link" onClick={onClear}>
            Clear all
          </Button>
        )}
      </div>

      <FilterSection title="Categories">
        {categoriesError ? (
          <FilterNote>Could not load categories.</FilterNote>
        ) : (
          <ul style={styles.list}>
            {categoryOptions.map((category) => (
              <li key={category.slug}>
                <label style={styles.option}>
                  <input
                    type="radio"
                    name="category"
                    style={styles.optionInput}
                    checked={selectedCategory === category.slug}
                    onChange={() => onCategoryChange(category.slug)}
                  />
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        )}
      </FilterSection>

      <FilterSection title="Price Range">
        <PriceFilter minPrice={minPrice} maxPrice={maxPrice} onChange={onPriceChange} />
      </FilterSection>

      <FilterSection title="Brands" isLast>
        {brandsLoading && <FilterNote>Loading brands...</FilterNote>}
        {!brandsLoading && brands.length === 0 && <FilterNote>No brands available.</FilterNote>}
        {!brandsLoading && brands.length > 0 && (
          <ul style={styles.list}>
            {brands.map((brand) => (
              <li key={brand}>
                <label style={styles.option}>
                  <input
                    type="checkbox"
                    style={styles.optionInput}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => onBrandToggle(brand)}
                  />
                  {brand}
                </label>
              </li>
            ))}
          </ul>
        )}
      </FilterSection>
    </aside>
  );
}

export default FilterSidebar;
