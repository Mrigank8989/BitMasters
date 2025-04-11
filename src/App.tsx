import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import Profile from './pages/Profile';
import AppRoutes from './AppRoutes';
function App() {
  const location = useLocation();
  const noLayoutRoutes = ['/profile'];

  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {isNoLayout ? (
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </>
  );
}

export default App;

