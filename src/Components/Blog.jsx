import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { blogPosts } from './blogPosts';
import Socials from './Socials';

  export const BlogCard = ({ date, category, title, excerpt, imageUrl, slug }) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      {/* Image Container */}
      <div className="h-52 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-4 left-4 bg-[#448c6c] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-sm text-gray-500 font-medium mb-2">{date}</span>
        {/* Title also links to the post */}
        <Link to={`/blog/${slug}`}>
          <h4 className="text-[#2d4e41] text-xl font-bold mb-3 line-clamp-2 hover:text-[#448c6c] cursor-pointer">
            {title}
          </h4>
        </Link>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="mt-auto">
          {/* Link to specific article */}
          <Link 
            to={`/blog/${slug}`} 
            className="text-[#448c6c] font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all"
          >
            Read Full Story <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const navigate = useNavigate();

  // Display only the first 3 posts on the home page
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 px-6 md:px-20 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h3 className="text-[#448c6c] font-bold uppercase tracking-widest mb-4">
              LATEST NEWS
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d4e41]">
              Insights from our <br /> journey in Ghana
            </h2>
          </div>
          {/* Navigate to the full blog archive */}
          <button 
            onClick={() => navigate('/blog')}
            className="border-2 border-[#448c6c] text-[#448c6c] font-bold px-8 py-3 rounded-full hover:bg-[#448c6c] hover:text-white transition-all uppercase tracking-wide"
          >
            View All Posts
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>

      <Socials />
    </section>
  );
};

export default Blog;