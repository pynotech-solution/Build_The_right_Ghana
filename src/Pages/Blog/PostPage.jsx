import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../../Components/blogPosts';

const PostPage = () => {
  const { slug } = useParams();

  // Find the post matching the slug from the shared data
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <div className="pt-40 pb-20 text-center text-2xl text-gray-600">Post not found</div>;
  }

  return (
    <article className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="text-[#448c6c] font-bold mb-8 inline-block hover:underline">
          ← Back to News
        </Link>
        
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-[400px] object-cover rounded-2xl mb-10 shadow-lg" 
        />
        
        <span className="text-gray-500 font-medium">{post.date}</span>
        <h1 className="text-4xl md:text-6xl font-bold text-[#2d4e41] mt-4 mb-8 leading-tight">
          {post.title}
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p>{post.content}</p>
          {/* Add more paragraphs/sections here */}
        </div>
      </div>
    </article>
  );
};

export default PostPage;