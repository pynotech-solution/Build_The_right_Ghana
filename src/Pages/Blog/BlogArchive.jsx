import React, { useState, useEffect } from 'react';
import { BlogCard } from '../../Components/Blog';
import Socials from '../../Components/Socials';
import Reveal from '../../Components/Reveal';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

const BlogArchive = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="pt-40 pb-20 text-center text-2xl text-gray-600">Loading...</div>;

  return (
    <main className="pt-32 pb-20 px-6 bg-white">
      <Reveal>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-[#2d4e41] mb-4">Our Journey</h1>
        <p className="text-xl text-gray-600 mb-16">Latest updates and impact stories from the field.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
      </Reveal>
      <Socials />
    </main>
  );
};

export default BlogArchive;