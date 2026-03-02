import RatingBadge from '../components/RatingBadge';
import { CURRENT_USER, TRENDING, FEED_POSTS } from '../data/placeholders';

const SHORTCUTS = [
  { label: 'View Menu',    emoji: '🍽️', tab: 'menu',     bg: '#FFD6BA' },
  { label: 'Weekly Picks', emoji: '📅', tab: 'calendar', bg: '#D4B8FF' },
  { label: 'Social Feed',  emoji: '👥', tab: 'feed',     bg: '#B8E4FF' },
];

export default function HomePage({ onNav }) {
  return (
    <div className="px-4 pt-10 pb-2">
      {/* Header */}
      <div className="mb-7 animate-fade-up">
        <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-1">🐻 UCLA Dining</p>
        <h1 className="font-display text-3xl font-bold text-stone-800 leading-tight">
          Welcome back,<br />
          <span className="text-orange-500">{CURRENT_USER}</span> 👋
        </h1>
        <p className="text-sm text-stone-400 mt-2">What are you eating today on The Hill?</p>
      </div>

      {/* Shortcuts */}
      <div className="mb-7 animate-fade-up delay-1">
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Quick Access</p>
        <div className="grid grid-cols-3 gap-3">
          {SHORTCUTS.map(s => (
            <button key={s.tab} onClick={() => onNav(s.tab)} aria-label={s.label}
              className="rounded-3xl p-4 flex flex-col items-center gap-2 shadow-sm active:scale-95 transition-transform border border-white/60"
              style={{ backgroundColor: s.bg }}>
              <span className="text-2xl">{s.emoji}</span>
              <span className="text-xs font-semibold text-stone-700 text-center leading-tight">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="mb-7 animate-fade-up delay-2">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400">🔥 Trending Today</p>
          <span className="text-xs text-orange-500 font-semibold">#1 Today</span>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-stone-50 overflow-hidden">
          <div className="h-24 flex items-center justify-center relative"
               style={{ background: 'linear-gradient(135deg, #FFD6BA 0%, #FFB5C8 50%, #D4B8FF 100%)' }}>
            <span className="text-5xl drop-shadow-sm">{TRENDING.emoji}</span>
            <div className="absolute top-3 right-3">
              <RatingBadge rating={TRENDING.rating} size="lg" />
            </div>
          </div>
          <div className="p-4">
            <h2 className="font-display font-bold text-xl text-stone-800 mb-0.5">{TRENDING.name}</h2>
            <p className="text-xs text-stone-400 flex items-center gap-1 mb-3">
              📍 {TRENDING.restaurant} · {TRENDING.reviews} reviews
            </p>
            <div className="rounded-2xl p-3 border border-amber-100" style={{ backgroundColor: '#FFFDE7' }}>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">✨ AI Bruin Consensus</p>
              <p className="text-sm text-stone-500 leading-relaxed italic">"{TRENDING.summary}"</p>
            </div>
            <button onClick={() => onNav('menu')} aria-label="See full menu"
              className="mt-3 w-full bg-stone-800 text-white text-sm font-semibold py-3 rounded-2xl active:scale-[0.98] transition-transform">
              See Full Menu →
            </button>
          </div>
        </div>
      </div>

      {/* Recent activity teaser */}
      <div className="mb-4 animate-fade-up delay-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Recent on The Hill</p>
          <button onClick={() => onNav('feed')} aria-label="View all feed" className="text-xs text-orange-500 font-semibold">See all</button>
        </div>
        {FEED_POSTS.slice(0, 3).map((post, i) => (
          <div key={post.id} className="flex items-center gap-3 bg-white rounded-2xl px-3.5 py-2.5 mb-2 shadow-sm border border-stone-50">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-stone-700"
                 style={{ backgroundColor: post.avatarColor }}>{post.initials}</div>
            <p className="text-xs text-stone-400 flex-1">
              <span className="font-semibold text-stone-600">{post.username}</span> rated {post.itemName} · {post.rating}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
