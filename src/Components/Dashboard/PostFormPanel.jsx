import { Pencil, Plus, X, Loader2 } from 'lucide-react';
import FormLabel from './FormLabel';
import { PREDEFINED_CATEGORIES } from './constants';

const PostFormPanel = ({
  editId,
  formData,
  isCustomCategory,
  loading,
  uploading,
  onCancelEdit,
  onCategoryChange,
  onFieldChange,
  onImageUpload,
  onPaste,
  onSubmit,
}) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-8">
    <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-[#2d4e41]">
      {editId ? <><Pencil size={24} /> Edit Post</> : <><Plus size={24} /> Add New Post</>}
    </h3>

    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <FormLabel label="Title" info="The main headline of your blog post." />
        <input
          type="text"
          required
          value={formData.title}
          onChange={(event) => onFieldChange('title', event.target.value)}
          className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-[#448c6c]"
        />
      </div>

      <div>
        <FormLabel label="Category" info="The topic this post belongs to." />
        <select
          value={isCustomCategory ? 'Other' : formData.category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="mb-2 w-full rounded border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-[#448c6c]"
        >
          <option value="" disabled>Select a category</option>
          {PREDEFINED_CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
          <option value="Other">Other (Type your own)</option>
        </select>

        {isCustomCategory && (
          <input
            type="text"
            required
            placeholder="Enter custom category"
            value={formData.category}
            onChange={(event) => onFieldChange('category', event.target.value)}
            className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-[#448c6c]"
          />
        )}
      </div>

      <div>
        <FormLabel label="Image" info="Upload an image, paste an image URL, or paste an image from your clipboard." />
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="w-full rounded border border-gray-300 p-2 text-sm outline-none focus:ring-2 focus:ring-[#448c6c] file:mr-2 file:rounded-full file:border-0 file:bg-[#e6f0eb] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#2d4e41] hover:file:bg-[#d1e3da] sm:file:mr-4 sm:file:px-4 sm:file:py-2 sm:file:text-sm"
          />
          <input
            type="url"
            placeholder="Or paste image URL here (or paste image from clipboard)"
            value={formData.imageUrl}
            onChange={(event) => onFieldChange('imageUrl', event.target.value)}
            onPaste={onPaste}
            className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-[#448c6c]"
          />
        </div>
        {uploading && (
          <p className="mt-1 flex items-center gap-2 text-sm font-medium text-[#448c6c]"><Loader2 className="animate-spin" size={16} /> Uploading image...</p>
        )}
        {formData.imageUrl && (
          <div className="mt-2">
            <img src={formData.imageUrl} alt="Preview" className="h-24 w-auto rounded-lg border border-gray-300" />
          </div>
        )}
      </div>

      <div>
        <FormLabel label="Excerpt" info="A short summary displayed on the blog page." />
        <textarea
          required
          rows="3"
          value={formData.excerpt}
          onChange={(event) => onFieldChange('excerpt', event.target.value)}
          className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-[#448c6c]"
        />
      </div>

      <div>
        <FormLabel label="Content" info="The full body of your article." />
        <textarea
          required
          rows="6"
          value={formData.content}
          onChange={(event) => onFieldChange('content', event.target.value)}
          className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-[#448c6c]"
        />
      </div>

      {editId && (
        <button type="button" onClick={onCancelEdit} className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-500 py-2 font-bold text-white shadow-md transition-all hover:bg-gray-600">
          <X size={18} /> Cancel Edit
        </button>
      )}

      <button type="submit" disabled={loading || uploading} className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#448c6c] py-3 font-bold text-white shadow-md transition-all hover:bg-[#366d54] disabled:opacity-70">
        {loading ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : editId ? 'Update Post' : 'Publish Post'}
      </button>
    </form>
  </div>
);

export default PostFormPanel;
