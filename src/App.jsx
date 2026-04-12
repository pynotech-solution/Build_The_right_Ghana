import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Home from './Pages/Home';
import BlogArchive from './Pages/Blog/BlogArchive';
import PostPage from './Pages/Blog/PostPage';
import Footer from './Components/Footer';
import FullAboutPage from './Pages/FullAboutPage';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { Home as HomeIcon } from 'lucide-react';
import NotFound from './Pages/NotFound';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');
  const showBackToHome = !isHomePage && !isAdminPage;

  return (
    <>
      {/* <Header /> */}

      {showBackToHome && (
        <div className="fixed top-6 left-6 z-[100]">
          <Link 
            to="/" 
            className="flex items-center gap-2 bg-[#2d4e41] text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-[#448c6c] transition-all font-bold uppercase text-sm tracking-wider"
          >
            <HomeIcon size={18} /> Home
          </Link>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<FullAboutPage />} />
        <Route path="/blog" element={<BlogArchive />} />
        <Route path="/blog/:slug" element={<PostPage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
