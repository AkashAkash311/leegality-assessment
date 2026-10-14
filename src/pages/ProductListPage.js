import { useEffect, useMemo, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import ProductGrid, { ProductGridSkeleton } from '../components/ProductGrid';
import StatusMessage from '../components/StatusMessage';
import { colors, pageWidth } from '../theme';
import { getApiCaller } from '../api';
import { useFilters } from '../hooks/useFilters';

const PAGE_SIZE = 10;

const styles = {
  // Sidebar and results sit side by side and wrap onto separate rows when
  // there is not enough width for both.
  listing: {
    maxWidth: pageWidth,
    margin: '0 auto',
    padding: '20px 16px 40px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 20,
  },
  sidebar: {
    flex: '1 1 240px',
  },
  results: {
    flex: '999 1 480px',
    minWidth: 0,
  },
  toolbar: {
    minHeight: 24,
    marginBottom: 12,
  },
  summary: {
    margin: 0,
    fontSize: '0.9rem',
    color: colors.textMuted,
  },
};

function ProductListPage() {
  const { filters, setCategory, toggleBrand, setPriceRange, clearFilters, setPage } = useFilters();

  //states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // get categories api (only once)
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryList = await getApiCaller('/products/categories');
        setCategories(categoryList);
      } catch (e) {
        console.log("get categories api error", e);
        setCategoriesError(true);
      }
    };
    loadCategories();
  }, []);

  // get product api's
  // The API can't filter by price or brand, so we load the whole list (limit=0)
  // for the selected category and do the rest of the filtering + pagination here.
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const endpoint = filters.category
          ? `/products/category/${filters.category}?limit=0`
          : '/products?limit=0';
        const productDetails = await getApiCaller(endpoint);
        setProducts(productDetails.products);
      } catch (e) {
        console.log("get Product api callerr", e);
        setError('Could not load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [filters.category, reloadKey]);

  // unique brands from the fetched products (some products don't have a brand)
  const brands = useMemo(() => {
    const brandSet = new Set(products.map((product) => product.brand).filter(Boolean));
    return [...brandSet].sort();
  }, [products]);

  const { brands: selectedBrands, minPrice, maxPrice, search } = filters;
  const brandKey = selectedBrands.join(',');

  // all filters work together
  const filteredProducts = useMemo(() => {
    const min = minPrice === '' ? null : Number(minPrice);
    const max = maxPrice === '' ? null : Number(maxPrice);
    const searchText = search.trim().toLowerCase();
    const brandList = brandKey ? brandKey.split(',') : [];

    return products.filter((product) => {
      if (brandList.length && !brandList.includes(product.brand)) return false;
      if (min !== null && product.price < min) return false;
      if (max !== null && product.price > max) return false;
      if (searchText && !product.title.toLowerCase().includes(searchText)) return false;
      return true;
    });
  }, [products, brandKey, minPrice, maxPrice, search]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(filters.page, totalPages);
  const pageProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  const hasFilters = Boolean(
    filters.category || selectedBrands.length || minPrice || maxPrice || search
  );

  const renderProducts = () => {
    if (loading) {
      return <ProductGridSkeleton count={PAGE_SIZE} />;
    }

    if (error) {
      return (
        <StatusMessage
          isError
          title="Something went wrong"
          message={error}
          actionLabel="Try again"
          onAction={() => setReloadKey((key) => key + 1)}
        />
      );
    }

    if (filteredProducts.length === 0) {
      return (
        <StatusMessage
          title="No products found"
          message="Try changing or clearing the filters."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      );
    }

    return (
      <>
        <ProductGrid products={pageProducts} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </>
    );
  };

  return (
    <main style={styles.listing}>
      <div style={styles.sidebar}>
        <FilterSidebar
          categories={categories}
          categoriesError={categoriesError}
          brands={brands}
          brandsLoading={loading}
          selectedCategory={filters.category}
          selectedBrands={selectedBrands}
          minPrice={minPrice}
          maxPrice={maxPrice}
          showClear={hasFilters}
          onCategoryChange={setCategory}
          onBrandToggle={toggleBrand}
          onPriceChange={setPriceRange}
          onClear={clearFilters}
        />
      </div>

      <section style={styles.results} aria-label="Products">
        <div style={styles.toolbar}>
          {!loading && !error && (
            <p style={styles.summary}>
              Showing {pageProducts.length} of {filteredProducts.length} products
              {search && ` for "${search}"`}
            </p>
          )}
        </div>
        {renderProducts()}
      </section>
    </main>
  );
}

export default ProductListPage;
