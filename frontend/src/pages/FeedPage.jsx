import { useState } from 'react';
import FeedCard from '../components/FeedCard';
import { FEED_POSTS } from '../data/placeholders';

export default function FeedPage() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [filter, setFilter] = useState('all');

  const toggleLike = id =>
    setLikedPosts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);

  const posts = filter === 'liked'
    ? FEED_POSTS.filter(p => likedPosts.includes(p.id))
    : FEED_POSTS;

  return (
    <div className="px-4 pt-10">
      <div className="mb-5 animate-fade-up">
        <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-1">👥 Bruin Community</p>
        <h1 className="font-display text-3xl font-bold text-stone-800">Social Feed</h1>
        <p className="text-sm text-stone-400 mt-1">See what fellow Bruins are eating right now</p>
      </div>

      <div className="flex gap-2 mb-5 animate-fade-up delay-1">
        {['all', 'liked'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            aria-label={f === 'all' ? 'Show all posts' : 'Show liked posts'}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all
              ${filter === f ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-stone-400 border border-stone-100'}`}>
            {f === 'all' ? '🌎 All Posts' : `❤️ Liked (${likedPosts.length})`}
          </button>
        ))}
      </div>

      <div className="space-y-4 animate-fade-up delay-2">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-3">🤍</p>
            <p className="font-semibold text-stone-400">No liked posts yet</p>
            <p className="text-sm text-stone-300 mt-1">Heart posts you love in the feed</p>
          </div>
        ) : (
          posts.map((post, i) => (
            <div key={post.id} style={{ animationDelay: `${i * 0.06}s` }}>
              <FeedCard post={post} liked={likedPosts.includes(post.id)} onToggleLike={toggleLike} />
            </div>
          ))
        )}
      </div>
      {posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-stone-400">You are all caught up! 🎉</p>
          <p className="text-xs text-stone-300 mt-1">[New posts load from backend]</p>
        </div>
      )}
    </div>
  );
}
