import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import StatusMessage from './components/StatusMessage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';

const styles = {
  notFound: {
    maxWidth: 640,
    margin: '0 auto',
    padding: '40px 16px',
  },
};

function NotFoundPage() {
  return (
    <main style={styles.notFound}>
      <StatusMessage title="Page not found" message="The page you are looking for does not exist." />
    </main>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
