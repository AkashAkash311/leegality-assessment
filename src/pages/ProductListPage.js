import { useEffect, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import ProductGrid from '../components/ProductGrid';
import { colors, pageWidth } from '../theme';
import { getApiCaller } from '../api';

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
  //states
  const [productDetails, setProductDetails] = useState();
  const [page, setPage] = useState(1);
  const categories = [];
  const brands = [];

  // productDetails is undefined until the first response arrives
  const products = productDetails?.products ?? [];
  const totalPages = Math.ceil((productDetails?.total ?? 0) / 30);

  // functions

  // get product api's
  const loadProducts = async () => {
    try {
      const productDetails = await getApiCaller(`/products?limit=30&skip=${(page - 1) * 30}`);
      console.log("trertrertrertreertre", productDetails);
      setProductDetails(productDetails);
    } catch (e) {
      console.log("get Product api callerr", e);
    }
  };
  useEffect(() => {
    loadProducts();
  }, [])

  return (
    <main style={styles.listing}>
      <div style={styles.sidebar}>
        <FilterSidebar categories={categories} brands={brands} />
      </div>

      <section style={styles.results} aria-label="Products">
        <div style={styles.toolbar}>
          <p style={styles.summary}>Showing {products.length} products</p>
        </div>
        <ProductGrid products={products} />
        <Pagination currentPage={page} totalPages={totalPages} />
      </section>
    </main>
  );
}

export default ProductListPage;
