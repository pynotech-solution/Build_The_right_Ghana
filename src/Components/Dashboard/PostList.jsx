import { FileText, Pencil, Trash2, User } from 'lucide-react';

const PostList = ({ posts, onDelete, onEdit }) => (
  <div>
    <h3 className="mb-6 text-2xl font-bold text-[#2d4e41]">Existing Posts</h3>
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">
          <img src={post.imageUrl} alt={post.title} className="h-48 w-full rounded-lg object-cover sm:h-24 sm:w-24" />
          <div className="w-full flex-grow">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:gap-2">
              <div className="min-w-0 flex-1">
                <h4 className="break-words text-lg font-bold text-gray-800">{post.title}</h4>
                <span className="text-xs font-bold uppercase text-[#448c6c]">{post.category}</span>
                <span className="ml-2 text-xs text-gray-500">{post.date}</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.createdBy && <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600"><User size={10} /> Added by: {post.createdBy}</span>}
                  {post.lastEditedBy && <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600"><Pencil size={10} /> Edited by: {post.lastEditedBy}</span>}
                </div>
              </div>
              <div className="flex w-full shrink-0 justify-end gap-2 sm:w-auto">
                <button onClick={() => onEdit(post)} className="rounded-full p-2 text-blue-500 transition-colors hover:bg-blue-50">
                  <Pencil size={20} />
                </button>
                <button onClick={() => onDelete(post.id)} className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-50">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
          </div>
        </div>
      ))}
      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-8 text-center text-emerald-800 shadow-sm">
          <FileText size={48} className="text-emerald-500" />
          <h4 className="text-xl font-bold">No Blog Posts Yet!</h4>
          <p className="text-sm font-medium leading-relaxed">
            Your public blog section is currently empty. Visitors love reading about your mission, impact, and recent updates!
          </p>
          <p className="mt-2 text-sm font-bold text-emerald-700">
            Use the form on the left to write and publish your very first post.
          </p>
        </div>
      )}
    </div>
  </div>
);

export default PostList;
