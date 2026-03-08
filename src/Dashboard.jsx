import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, LogOut, LayoutDashboard, Eye, Pencil, X, AlertTriangle, Check, Info } from 'lucide-react';

const PREDEFINED_CATEGORIES = [
  "Education",
  "Health",
  "Sanitation",
  "Human Rights",
  "Environment",
  "Technology",
  "Poverty Alleviation",
  "Entrepreneurship",
  "Tolerance"
];

const FormLabel = ({ label, info }) => (
  <div className="flex items-center gap-2 mb-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative group" tabIndex="0">
      <Info size={16} className="text-gray-400 cursor-help focus:text-[#448c6c] outline-none" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus:opacity-100 group-focus:visible transition-all z-10 pointer-events-none text-center">
        {info}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    imageUrl: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [confirmation, setConfirmation] = useState({
    show: false,
    title: '',
    message: '',
    action: null,
    isDestructive: false
  });
  const [notification, setNotification] = useState({
    show: false,
    type: '', // 'success' or 'error'
    message: ''
  });
  const previewDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(postsData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const triggerConfirmation = (title, message, action, isDestructive = false) => {
    setConfirmation({ show: true, title, message, action, isDestructive });
  };

  const closeConfirmation = () => {
    setConfirmation({ show: false, title: '', message: '', action: null, isDestructive: false });
  };

  const handleConfirmAction = () => {
    if (confirmation.action) confirmation.action();
    closeConfirmation();
  };

  const closeNotification = () => {
    setNotification({ show: false, type: '', message: '' });
  };

  const handleLogout = () => {
    triggerConfirmation(
      'Logout',
      'Are you sure you want to logout?',
      async () => {
        await signOut(auth);
        navigate('/admin/login');
      }
    );
  };

  const uploadFile = async (file) => {
    const cloudName = "dzqdfaghg"; 
    const uploadPreset = "build-the-right-ghanA"; 

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", cloudName);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: data
      });
      const fileData = await res.json();
      if (fileData.secure_url) {
        setFormData(prev => ({ ...prev, imageUrl: fileData.secure_url }));
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      setNotification({ show: true, type: 'error', message: 'Error uploading image' });
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await uploadFile(file);
  };

  const handlePaste = async (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        e.preventDefault();
        const file = items[i].getAsFile();
        await uploadFile(file);
        return;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      setNotification({ show: true, type: 'error', message: 'Please upload an image for the post.' });
      return;
    }
    triggerConfirmation(
      editId ? 'Update Post' : 'Publish Post',
      `Are you sure you want to ${editId ? 'update' : 'publish'} this post?`,
      processSubmit
    );
  };

  const processSubmit = async () => {
    setLoading(true);
    try {
      const slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      
      if (editId) {
        const postRef = doc(db, "posts", editId);
        await updateDoc(postRef, {
          ...formData,
          slug
        });
        setNotification({ show: true, type: 'success', message: 'Post updated successfully!' });
        setEditId(null);
      } else {
        const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        await addDoc(collection(db, "posts"), {
          ...formData,
          slug,
          date,
          createdAt: serverTimestamp()
        });
        setNotification({ show: true, type: 'success', message: 'Post added successfully!' });
      }
      
      setFormData({ title: '', category: '', excerpt: '', imageUrl: '', content: '' });
      setIsCustomCategory(false);
      fetchPosts();
    } catch (error) {
      console.error("Error saving document: ", error);
      setNotification({ show: true, type: 'error', message: 'Error saving post' });
    }
    setLoading(false);
  };

  const handleDelete = (id) => {
    triggerConfirmation(
      'Delete Post',
      'Are you sure you want to delete this post? This action cannot be undone.',
      async () => {
        await deleteDoc(doc(db, "posts", id));
        fetchPosts();
      },
      true
    );
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      imageUrl: post.imageUrl,
      content: post.content,
    });
    setEditId(post.id);
    setIsCustomCategory(!PREDEFINED_CATEGORIES.includes(post.category));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    triggerConfirmation(
      'Cancel Edit',
      'Are you sure you want to cancel editing? Unsaved changes will be lost.',
      () => {
        setFormData({ title: '', category: '', excerpt: '', imageUrl: '', content: '' });
        setIsCustomCategory(false);
        setEditId(null);
      },
      true
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[#2d4e41] text-white p-4 px-8 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2 font-bold text-xl">
          <LayoutDashboard /> Admin Dashboard
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 hover:text-gray-300 transition-colors">
          <LogOut size={20} /> Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Post Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-8">
              <h3 className="text-xl font-bold text-[#2d4e41] mb-6 flex items-center gap-2">
                {editId ? (
                  <>
                    <Pencil size={24} /> Edit Post
                  </>
                ) : (
                  <>
                    <Plus size={24} /> Add New Post
                  </>
                )}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <FormLabel label="Title" info="The main headline of your blog post." />
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#448c6c] outline-none"
                  />
                </div>
                <div>
                  <FormLabel label="Category" info="The topic this post belongs to (e.g., Education, Health)." />
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#448c6c] outline-none"
                  />
                  <select
                    value={isCustomCategory ? 'Other' : formData.category}
                    onChange={(e) => {
                      if (e.target.value === 'Other') {
                        setIsCustomCategory(true);
                        setFormData({ ...formData, category: '' });
                      } else {
                        setIsCustomCategory(false);
                        setFormData({ ...formData, category: e.target.value });
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#448c6c] outline-none mb-2 bg-white"
                  >
                    <option value="" disabled>Select a category</option>
                    {PREDEFINED_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="Other">Other (Type your own)</option>
                  </select>
                  
                  {isCustomCategory && (
                    <input
                      type="text"
                      required
                      placeholder="Enter custom category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#448c6c] outline-none"
                    />
                  )}
                </div>
                <div>
                  <FormLabel label="Image" info="Upload an image, paste an image URL, or paste an image from your clipboard." />
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#448c6c] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e6f0eb] file:text-[#2d4e41] hover:file:bg-[#d1e3da]"
                    />
                    <input
                      type="url"
                      placeholder="Or paste image URL here (or paste image from clipboard)"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      onPaste={handlePaste}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#448c6c] outline-none"
                    />
                  </div>
                  {uploading && <p className="text-sm text-[#448c6c] mt-1">Uploading image...</p>}
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img src={formData.imageUrl} alt="Preview" className="h-24 w-auto rounded-lg border border-gray-300" />
                    </div>
                  )}
                </div>
                <div>
                  <FormLabel label="Excerpt" info="A short summary (1-2 sentences) displayed on the blog home page." />
                  <textarea
                    required
                    rows="3"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#448c6c] outline-none"
                  ></textarea>
                </div>
                <div>
                  <FormLabel label="Content" info="The full body of your article. You can write multiple paragraphs here." />
                  <textarea
                    required
                    rows="6"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#448c6c] outline-none"
                  ></textarea>
                </div>
                
                {editId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition-all shadow-md mb-2 flex items-center justify-center gap-2"
                  >
                    <X size={18} /> Cancel Edit
                  </button>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#448c6c] hover:bg-[#366d54] text-white font-bold py-3 rounded-lg transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editId ? 'Update Post' : 'Publish Post')}
                </button>
              </form>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-xl font-bold text-[#2d4e41] mb-6 flex items-center gap-2">
                <Eye size={24} /> Live Preview
              </h3>
              <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="h-52 overflow-hidden relative bg-gray-100">
                  {formData.imageUrl ? (
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  {formData.category && (
                    <div className="absolute top-4 left-4 bg-[#448c6c] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {formData.category}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-sm text-gray-500 font-medium mb-2">{previewDate}</span>
                  <h4 className="text-[#2d4e41] text-xl font-bold mb-3 line-clamp-2">{formData.title || "Post Title"}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{formData.excerpt || "Post excerpt..."}</p>
                  <div className="mt-auto">
                    <span className="text-[#448c6c] font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                      Read Full Story <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-[#2d4e41] mb-6">Existing Posts</h3>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex gap-4 items-start">
                  <img src={post.imageUrl} alt={post.title} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{post.title}</h4>
                        <span className="text-xs font-bold text-[#448c6c] uppercase">{post.category}</span>
                        <span className="text-xs text-gray-500 ml-2">{post.date}</span>
                      </div>
                      <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(post)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors"
                      >
                        <Pencil size={20} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <p className="text-gray-500 text-center py-10">No posts found. Start creating one!</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmation.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeConfirmation}></div>
          <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full transform transition-all scale-100">
            <div className="flex items-center gap-3 mb-4">
              {confirmation.isDestructive && <AlertTriangle className="text-red-500" size={24} />}
              <h3 className={`text-xl font-bold ${confirmation.isDestructive ? 'text-red-600' : 'text-[#2d4e41]'}`}>
                {confirmation.title}
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">{confirmation.message}</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={closeConfirmation}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded-lg text-white font-bold transition-colors shadow-md ${
                  confirmation.isDestructive ? 'bg-red-500 hover:bg-red-600' : 'bg-[#448c6c] hover:bg-[#366d54]'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal (Success/Error) */}
      {notification.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeNotification}></div>
          <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all scale-100">
            <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${notification.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {notification.type === 'success' ? <Check size={32} /> : <X size={32} />}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {notification.type === 'success' ? 'Success!' : 'Error'}
            </h3>
            <p className="text-gray-600 mb-6">{notification.message}</p>
            <div className="flex flex-col gap-3">
              {notification.type === 'success' && (
                <button 
                  onClick={() => {
                    closeNotification();
                    navigate('/blog');
                  }}
                  className="px-8 py-3 rounded-full font-bold text-[#448c6c] border-2 border-[#448c6c] hover:bg-[#e6f0eb] transition-colors"
                >
                  Check Blog Page
                </button>
              )}
              <button 
                onClick={closeNotification}
                className={`px-8 py-3 rounded-full font-bold text-white transition-colors ${notification.type === 'success' ? 'bg-[#448c6c] hover:bg-[#366d54]' : 'bg-red-500 hover:bg-red-600'}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;