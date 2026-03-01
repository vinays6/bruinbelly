import { useState } from 'react';
import RatingBadge from './RatingBadge';

export default function FeedCard({ post, liked, onToggleLike }) {
  const [animating, setAnimating] = useState(false);
  const handleLike = () => {
    setAnimating(true);
    onToggleLike(post.id);
    setTimeout(() => setAnimating(false), 300);
  };
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-stone-50 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-stone-700 shrink-0"
             style={{ backgroundColor: post.avatarColor }}>
          {post.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-stone-800">{post.username}</p>
          <p className="text-xs text-stone-400">{post.date}</p>
        </div>
        <RatingBadge rating={post.rating} size="md" />
      </div>
      {/* Item info */}
      <div className="px-4 pb-3">
        <div className="bg-stone-50 rounded-2xl p-3">
          <p className="font-display font-semibold text-base text-stone-800 leading-tight">{post.itemName}</p>
          <p className="text-xs text-stone-400 mt-0.5">📍 {post.restaurant}</p>
        </div>
      </div>
      {/* Comment */}
      <div className="px-4 pb-4">
        <p className="text-sm text-stone-500 leading-relaxed italic">"{post.comment}"</p>
      </div>
      {/* Footer */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="text-xs text-stone-400">
          {liked ? post.likes + 1 : post.likes} likes
        </span>
        <button onClick={handleLike} aria-label={liked ? 'Unlike post' : 'Like post'}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm
                     transition-all duration-200 active:scale-95
                     ${liked ? 'bg-rose-50 text-rose-500 border border-rose-200' : 'bg-stone-50 text-stone-400 border border-stone-100'}
                     ${animating ? 'scale-110' : ''}`}>
          <span className={`text-base transition-transform ${animating ? 'scale-125' : ''}`}>
            {liked ? '❤️' : '🤍'}
          </span>
          {liked ? 'Liked' : 'Like'}
        </button>
      </div>
    </div>
  );
}
