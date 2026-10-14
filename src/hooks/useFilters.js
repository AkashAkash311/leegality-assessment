import { useSearchParams } from 'react-router-dom';

// Filters are kept in the URL (?category=..&brand=..&min=..&max=..&q=..&page=..)
// so they are still applied when the user comes back from a product page.
export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    category: searchParams.get('category') || '',
    brands: searchParams.getAll('brand'),
    minPrice: searchParams.get('min') || '',
    maxPrice: searchParams.get('max') || '',
    search: searchParams.get('q') || '',
    page: Number(searchParams.get('page')) || 1,
  };

  // any filter change goes back to page 1
  const updateParams = (changes) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        Object.entries(changes).forEach(([key, value]) => {
          params.delete(key);
          if (Array.isArray(value)) {
            value.forEach((item) => params.append(key, item));
          } else if (value !== '' && value !== null && value !== undefined) {
            params.set(key, value);
          }
        });
        params.delete('page');
        return params;
      },
      { replace: true }
    );
  };

  const setCategory = (category) => {
    // brands come from the selected category's products, so reset them too
    updateParams({ category, brand: [] });
  };

  const toggleBrand = (brand) => {
    const selected = filters.brands.includes(brand)
      ? filters.brands.filter((item) => item !== brand)
      : [...filters.brands, brand];
    updateParams({ brand: selected });
  };

  const setPriceRange = (min, max) => {
    updateParams({ min, max });
  };

  const clearFilters = () => {
    updateParams({ category: '', brand: [], min: '', max: '', q: '' });
  };

  const setPage = (page) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (page > 1) params.set('page', page);
      else params.delete('page');
      return params;
    });
  };

  return { filters, setCategory, toggleBrand, setPriceRange, clearFilters, setPage };
}
