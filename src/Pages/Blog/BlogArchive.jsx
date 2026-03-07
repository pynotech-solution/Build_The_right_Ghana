import React from 'react';
import { BlogCard } from '../../Components/Blog';
import { blogPosts } from '../../Components/blogPosts';
import Socials from '../../Components/Socials';

const BlogArchive = () => {
  // Use the shared data source
  const allPosts = blogPosts;

  return (
    <main className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-[#2d4e41] mb-4">Our Journey</h1>
        <p className="text-xl text-gray-600 mb-16">Latest updates and impact stories from the field.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
      <Socials />
    </main>
  );
};

export default BlogArchive;