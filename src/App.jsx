import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import BlogArchive from './Pages/Blog/BlogArchive';
import PostPage from './Pages/Blog/PostPage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import FullAboutPage from './Pages/FullAboutPage';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <>
      <Header />

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;