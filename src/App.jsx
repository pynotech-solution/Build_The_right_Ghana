import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import BlogArchive from './Pages/Blog/BlogArchive';
import PostPage from './Pages/Blog/PostPage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import FullAboutPage from './Pages/FullAboutPage';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<FullAboutPage />} />
        <Route path="/blog" element={<BlogArchive />} />
        <Route path="/blog/:slug" element={<PostPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;