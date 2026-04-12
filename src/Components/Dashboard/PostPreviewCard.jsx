import { Eye } from 'lucide-react';

const PostPreviewCard = ({ formData, previewDate }) => (
  <div className="lg:sticky lg:top-8">
    <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-[#2d4e41]">
      <Eye size={24} /> Live Preview
    </h3>
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {formData.imageUrl ? (
          <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">No Image</div>
        )}
        {formData.category && (
          <div className="absolute left-4 top-4 rounded-full bg-[#448c6c] px-3 py-1 text-xs font-bold uppercase text-white">
            {formData.category}
          </div>
        )}
      </div>
      <div className="flex flex-grow flex-col p-6">
        <span className="mb-2 text-sm font-medium text-gray-500">{previewDate}</span>
        <h4 className="mb-3 line-clamp-2 text-xl font-bold text-[#2d4e41]">{formData.title || 'Post Title'}</h4>
        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600">{formData.excerpt || 'Post excerpt...'}</p>
        <div className="mt-auto">
          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#448c6c]">
            Read Full Story <span>{'->'}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default PostPreviewCard;
