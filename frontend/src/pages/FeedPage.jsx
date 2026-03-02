import { useState, useRef, useEffect, useCallback } from 'react';
import FeedCard from '../components/FeedCard';
import { FEED_POSTS } from '../data/placeholders';

// ─── Helpers ────────────────────────────────────────────────────────────────

function getYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

// Sample shorts with real YouTube food video IDs
const SAMPLE_SHORTS = [
  {
    id: 'sh1',
    username: 'ucla_dessert_guy',
    initials: 'UD',
    avatarColor: '#D4B8FF',
    caption: 'Tiramisu at De Neve is absolutely unreal 😩☕ the espresso hits so different after midterms',
    restaurant: 'De Neve',
    likes: 31212,
    date: 'Today, 8:45 PM',
    previewUrl: 'youtube:dS7drIjDMDE',
    emoji: '🍮',
    comments: [
      { id: 'c1', username: 'bruin_foodie', initials: 'BF', avatarColor: '#FFB5C8', text: 'BRO the tiramisu was so good I went back for seconds 😭', date: '3m ago' },
      { id: 'c2', username: 'westwood_eats', initials: 'WE', avatarColor: '#B8E4FF', text: 'Running to De Neve RIGHT now', date: '7m ago' },
    ],
  },
  {
    id: 'sh2',
    username: 'de_neve_daily',
    initials: 'DN',
    avatarColor: '#FFB5C8',
    caption: 'BADDIE GETS ROASTED BY CHEF',
    restaurant: 'De Neve',
    likes: 142000,
    date: 'Today, 6:10 PM',
    previewUrl: 'youtube:kcatAjeBJ5U',
    emoji: '🍫',
    comments: [
      { id: 'c3', username: 'hungry_bruin', initials: 'HB', avatarColor: '#B8E4FF', text: 'The molten center is so good every time', date: '5m ago' },
    ],
  },
  {
    id: 'sh3',
    username: 'GordonRamsay',
    initials: 'GR',
    avatarColor: '#FFD6BA',
    caption: 'Perfect scrambled eggs — the only way 🍳 silky, creamy, never rubbery',
    restaurant: 'Gordon Ramsay',
    likes: 48210,
    date: '3 days ago',
    previewUrl: 'youtube:VFMmQgBfTKY',
    emoji: '🍳',
    comments: [],
  },
  {
    id: 'sh4',
    username: 'NickDiGiovanni',
    initials: 'ND',
    avatarColor: '#B8F0D4',
    caption: 'World\'s most expensive ramen 🍜 this broth took 3 days to make',
    restaurant: 'Nick DiGiovanni',
    likes: 62100,
    date: '4 days ago',
    previewUrl: 'youtube:wN9LKFZQR5M',
    emoji: '🍜',
    comments: [],
  },
  {
    id: 'sh5',
    username: 'JoshuaWeissman',
    initials: 'JW',
    avatarColor: '#D4B8FF',
    caption: 'Smash burger but BETTER than Five Guys 🍔 this technique is everything',
    restaurant: 'Joshua Weissman',
    likes: 32040,
    date: '5 days ago',
    previewUrl: 'youtube:b3xpDH5Bzqs',
    emoji: '🍔',
    comments: [],
  },
  {
    id: 'sh6',
    username: 'BingingwBabish',
    initials: 'BB',
    avatarColor: '#FFB5C8',
    caption: 'Krabby Patty IRL and it actually slaps 🍔✨ SpongeBob would be proud',
    restaurant: 'Babish Culinary Universe',
    likes: 51020,
    date: '6 days ago',
    previewUrl: 'youtube:sMbFJTGWMgo',
    emoji: '✨',
    comments: [],
  },
  {
    id: 'sh7',
    username: 'SortedFood',
    initials: 'SF',
    avatarColor: '#B8E4FF',
    caption: 'Homemade pizza dough in 5 minutes 🍕 no fancy equipment needed',
    restaurant: 'Sorted Food',
    likes: 19430,
    date: '1 week ago',
    previewUrl: 'youtube:G_PrivYfGGg',
    emoji: '🍕',
    comments: [],
  },
  {
    id: 'sh8',
    username: 'GordonRamsay',
    initials: 'GR',
    avatarColor: '#FFD6BA',
    caption: 'Perfect scrambled eggs — silky, creamy, never rubbery 🍳',
    restaurant: 'Gordon Ramsay',
    likes: 48210,
    date: '1 week ago',
    previewUrl: 'youtube:VFMmQgBfTKY',
    emoji: '🍳',
    comments: [],
  },
  {
    id: 'sh9',
    username: 'NickDiGiovanni',
    initials: 'ND',
    avatarColor: '#B8F0D4',
    caption: 'World\'s most expensive ramen 🍜 this broth took 3 days to make',
    restaurant: 'Nick DiGiovanni',
    likes: 62100,
    date: '1 week ago',
    previewUrl: 'youtube:wN9LKFZQR5M',
    emoji: '🍜',
    comments: [],
  },
  {
    id: 'sh10',
    username: 'EthanChlebowski',
    initials: 'EC',
    avatarColor: '#FFD6BA',
    caption: 'The only fried chicken recipe you will ever need 🍗 crispy every single time',
    restaurant: 'Ethan Chlebowski',
    likes: 23410,
    date: '2 weeks ago',
    previewUrl: 'youtube:zgmSHMRRJnE',
    emoji: '🍗',
    comments: [],
  },
  {
    id: 'sh11',
    username: 'TastyFood',
    initials: 'TF',
    avatarColor: '#D4B8FF',
    caption: 'Creamy garlic pasta in 15 minutes 🍝 weeknight dinner sorted',
    restaurant: 'Tasty',
    likes: 28736,
    date: '2 weeks ago',
    previewUrl: 'youtube:MnMsWcBMiuA',
    emoji: '🍝',
    comments: [],
  },
];

// ─── Comment Sheet ───────────────────────────────────────────────────────────

function CommentSheet({ short, onClose, onAddComment }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 200); }, []);

  const submit = () => {
    if (!text.trim()) return;
    onAddComment(short.id, text.trim());
    setText('');
  };

  return (
    <div className="absolute inset-0 z-40" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl flex flex-col"
        style={{ maxHeight: '75%' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-stone-200" />
        </div>
        <div className="px-5 py-3 flex items-center justify-between border-b border-stone-100">
          <h3 className="font-display font-bold text-stone-800 text-lg">
            Comments <span className="text-stone-400 text-base font-normal">({short.comments.length})</span>
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 text-sm active:scale-95">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3">
          {short.comments.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-2">💬</p>
              <p className="text-sm font-semibold text-stone-400">No comments yet</p>
              <p className="text-xs text-stone-300 mt-1">Be the first Bruin to comment!</p>
            </div>
          ) : (
            short.comments.map(c => (
              <div key={c.id} className="flex gap-3 mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-stone-700 shrink-0"
                     style={{ backgroundColor: c.avatarColor }}>{c.initials}</div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-xs font-bold text-stone-800">{c.username}</span>
                    <span className="text-xs text-stone-400">{c.date}</span>
                  </div>
                  <p className="text-sm text-stone-600 mt-0.5 leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-4 pb-6 pt-3 border-t border-stone-100 flex gap-2 items-center">
          <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-500 shrink-0">You</div>
          <input
            ref={inputRef}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Add a comment..."
            className="flex-1 bg-stone-50 border border-stone-100 rounded-2xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 outline-none focus:ring-2 focus:ring-orange-300 transition-all"
          />
          <button onClick={submit}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all active:scale-90
              ${text.trim() ? 'bg-orange-500 text-white shadow-md' : 'bg-stone-100 text-stone-300'}`}>
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Upload Modal ────────────────────────────────────────────────────────────

function UploadModal({ onClose, onPost }) {
  const [caption, setCaption] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [mode, setMode] = useState('url');
  const [urlInput, setUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [urlError, setUrlError] = useState('');
  const fileRef = useRef(null);

  const handleUrlChange = (val) => {
    setUrlInput(val);
    setUrlError('');
    if (!val.trim()) { setPreviewUrl(null); return; }
    const ytId = getYouTubeId(val.trim());
    if (ytId) {
      setPreviewUrl(`youtube:${ytId}`);
    } else {
      setPreviewUrl(null);
      if (val.length > 20) setUrlError('Paste a valid YouTube or YouTube Shorts URL');
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(`file:${URL.createObjectURL(file)}`);
  };

  const canPost = caption.trim() && previewUrl;

  const handlePost = () => {
    if (!canPost) return;
    onPost({ caption: caption.trim(), restaurant: restaurant.trim() || '[The Hill]', previewUrl });
    onClose();
  };

  const ytPreviewId = previewUrl?.startsWith('youtube:') ? previewUrl.replace('youtube:', '') : null;
  const filePreviewSrc = previewUrl?.startsWith('file:') ? previewUrl.replace('file:', '') : null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}
         style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="bg-white rounded-t-3xl w-full max-w-md flex flex-col"
           style={{ maxHeight: '92vh' }}
           onClick={e => e.stopPropagation()}>
        <div className="flex justify-center pt-3"><div className="w-10 h-1 rounded-full bg-stone-200" /></div>
        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <h2 className="font-display font-bold text-xl text-stone-800">Post a Short 🎥</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 text-sm active:scale-95">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {/* Mode toggle */}
          <div className="flex gap-1 mb-4 p-1 bg-stone-100 rounded-2xl">
            {[['url', '🔗 YouTube URL'], ['file', '📁 Upload File']].map(([m, label]) => (
              <button key={m} onClick={() => { setMode(m); setPreviewUrl(null); setUrlError(''); setUrlInput(''); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${mode === m ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}>
                {label}
              </button>
            ))}
          </div>

          {mode === 'url' && (
            <div className="mb-4">
              <input
                value={urlInput}
                onChange={e => handleUrlChange(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or youtu.be/..."
                className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:ring-2 focus:ring-orange-300 transition-all"
              />
              {urlError && <p className="text-xs text-rose-500 mt-1.5 pl-1">{urlError}</p>}
              {ytPreviewId && <p className="text-xs text-emerald-600 mt-1.5 pl-1 font-medium">✅ YouTube video detected!</p>}
            </div>
          )}

          {mode === 'file' && (
            <div className="mb-4">
              <div onClick={() => fileRef.current?.click()}
                className="w-full h-40 rounded-2xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center gap-2 cursor-pointer active:bg-stone-50 transition-colors overflow-hidden relative bg-stone-50">
                {filePreviewSrc ? (
                  <video src={filePreviewSrc} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
                ) : (
                  <>
                    <span className="text-4xl">📹</span>
                    <p className="text-sm font-semibold text-stone-500">Tap to choose video</p>
                    <p className="text-xs text-stone-400">MP4, MOV, WebM</p>
                  </>
                )}
              </div>
              <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleFile} />
            </div>
          )}

          {/* YouTube preview */}
          {ytPreviewId && (
            <div className="mb-4 rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: '16/9' }}>
              <iframe
                src={`https://www.youtube.com/embed/${ytPreviewId}?rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen title="YouTube preview"
              />
            </div>
          )}

          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="Write a caption... (e.g. Ramen Bowl at Feast 🍜 hits different)"
            rows={2}
            className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:ring-2 focus:ring-orange-300 resize-none mb-3 transition-all"
          />

          <input
            value={restaurant}
            onChange={e => setRestaurant(e.target.value)}
            placeholder="📍 Tag a dining hall (e.g. De Neve)"
            className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:ring-2 focus:ring-orange-300 mb-5 transition-all"
          />

          <button onClick={handlePost}
            className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all active:scale-[0.98]
              ${canPost ? 'bg-orange-500 text-white shadow-md' : 'bg-stone-100 text-stone-400'}`}>
            {canPost ? 'Post Short 🚀' : 'Add a video + caption to post'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Single Short Card ───────────────────────────────────────────────────────

function ShortCard({ short, isActive, liked, onLike, onComment, muted, onToggleMute }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const ytId = short.previewUrl?.startsWith('youtube:') ? short.previewUrl.replace('youtube:', '') : null;
  const fileSrc = short.previewUrl?.startsWith('file:') ? short.previewUrl.replace('file:', '') : null;

  useEffect(() => {
    if (!videoRef.current || !fileSrc) return;
    if (isActive) { videoRef.current.play().catch(() => {}); setPlaying(true); }
    else { videoRef.current.pause(); setPlaying(false); }
  }, [isActive, fileSrc]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = muted;
  }, [muted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black" style={{ borderRadius: '20px' }}>

      {/* ── Video content ── */}
      {ytId ? (
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?autoplay=${isActive ? 1 : 0}&mute=${muted ? 1 : 0}&loop=1&playlist=${ytId}&rel=0&controls=0&modestbranding=1&playsinline=1`}
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={short.caption}
        />
      ) : fileSrc ? (
        <video
          ref={videoRef}
          src={fileSrc}
          className="absolute inset-0 w-full h-full object-cover"
          loop playsInline
          onClick={togglePlay}
        />
      ) : (
        /* Should never show now that sample shorts have real IDs */
        <div className="absolute inset-0 flex flex-col items-center justify-center"
             style={{ background: `linear-gradient(160deg, ${short.avatarColor}99 0%, #FFD6BA55 60%, #D4B8FF44 100%)` }}>
          <div className="text-[90px] mb-4">{short.emoji}</div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl px-6 py-3 text-center">
            <p className="font-display font-bold text-stone-800">{short.restaurant}</p>
            <p className="text-xs text-stone-500 mt-0.5">No video yet</p>
          </div>
        </div>
      )}

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 45%, rgba(0,0,0,0.15) 100%)' }} />

      {/* ── Top: user info ── */}
      <div className="absolute top-4 left-4 right-16 z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-stone-700 shadow-sm"
               style={{ backgroundColor: short.avatarColor }}>{short.initials}</div>
          <div>
            <p className="text-white text-sm font-bold leading-tight drop-shadow-sm">{short.username}</p>
            <p className="text-white/70 text-xs">{short.date}</p>
          </div>
        </div>
      </div>

      {/* ── Bottom: caption ── */}
      <div className="absolute bottom-4 left-4 right-16 z-10 pointer-events-none">
        <p className="text-white text-sm leading-relaxed mb-2 drop-shadow-sm">{short.caption}</p>
        <span className="text-xs bg-white/20 backdrop-blur-sm text-white/90 px-3 py-1 rounded-full font-medium">
          📍 {short.restaurant}
        </span>
      </div>

      {/* ── Right: action buttons ── */}
      <div className="absolute right-3 bottom-4 z-10 flex flex-col gap-5 items-center">
        {/* Mute toggle */}
        <button onClick={onToggleMute} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-xl shadow-md">
            {muted ? '🔇' : '🔊'}
          </div>
        </button>

        <button onClick={() => onLike(short.id)} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <div className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center text-xl shadow-md
            ${liked ? 'bg-rose-500' : 'bg-black/40'}`}>{liked ? '❤️' : '🤍'}</div>
          <span className="text-white text-xs font-semibold drop-shadow-sm">{liked ? short.likes + 1 : short.likes}</span>
        </button>

        <button onClick={() => setShowComments(true)} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-xl shadow-md">💬</div>
          <span className="text-white text-xs font-semibold drop-shadow-sm">{short.comments.length}</span>
        </button>
      </div>

      {/* ── Pause overlay for file videos ── */}
      {fileSrc && !playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 5 }}>
          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white text-3xl ml-1">▶</span>
          </div>
        </div>
      )}

      {showComments && (
        <CommentSheet short={short} onClose={() => setShowComments(false)} onAddComment={onComment} />
      )}
    </div>
  );
}

// ─── Shorts Feed ─────────────────────────────────────────────────────────────

function ShortsFeed() {
  const [shorts, setShorts] = useState(SAMPLE_SHORTS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [likedShorts, setLikedShorts] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [muted, setMuted] = useState(true);
  const touchStartY = useRef(null);
  const lastWheelTime = useRef(0);

  const toggleLike = (id) =>
    setLikedShorts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);

  const addComment = (shortId, text) => {
    setShorts(prev => prev.map(s => s.id !== shortId ? s : {
      ...s,
      comments: [...s.comments, {
        id: `c${Date.now()}`,
        username: '[you]',
        initials: 'YO',
        avatarColor: '#FFD6BA',
        text,
        date: '[Just now]',
      }],
    }));
  };

  const handlePost = ({ caption, restaurant, previewUrl }) => {
    setShorts(prev => [{
      id: `sh${Date.now()}`,
      username: '[you]',
      initials: 'YO',
      avatarColor: '#FFD6BA',
      caption,
      restaurant,
      likes: 0,
      date: '[Just now]',
      previewUrl,
      emoji: '🎥',
      comments: [],
    }, ...prev]);
    setActiveIndex(0);
  };

  const goTo = useCallback((dir) => {
    setActiveIndex(i => Math.max(0, Math.min(shorts.length - 1, i + dir)));
  }, [shorts.length]);

  const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 50) goTo(1);
    else if (diff < -50) goTo(-1);
    touchStartY.current = null;
  };

  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 700) return;
    lastWheelTime.current = now;
    if (e.deltaY > 30) goTo(1);
    else if (e.deltaY < -30) goTo(-1);
  };

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onWheel={handleWheel}>
      {/* Post button */}
      <div className="flex justify-end mb-3">
        <button onClick={() => setShowUpload(true)}
          className="bg-orange-500 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-md active:scale-95 transition-transform flex items-center gap-1.5">
          <span className="text-base leading-none">+</span> Post Short
        </button>
      </div>

      {/* Card viewport — fills remaining screen height */}
      <div className="relative overflow-hidden rounded-3xl" style={{ height: 'calc(100vh - 320px)' }}>
        {shorts.map((short, i) => (
          <div
            key={short.id}
            className="absolute inset-0 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(${(i - activeIndex) * 102}%)` }}
          >
            <ShortCard
              short={short}
              isActive={i === activeIndex}
              liked={likedShorts.includes(short.id)}
              onLike={toggleLike}
              onComment={addComment}
              muted={muted}
              onToggleMute={() => setMuted(m => !m)}
            />
          </div>
        ))}
      </div>

      {/* Dot indicator */}
      <div className="flex justify-center gap-1.5 mt-3">
        {shorts.map((_, i) => (
          <button key={i} onClick={() => setActiveIndex(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? '20px' : '6px',
              height: '6px',
              backgroundColor: i === activeIndex ? '#f97316' : '#d6d3d1',
            }} />
        ))}
      </div>

      {activeIndex < shorts.length - 1 && (
        <p className="text-center text-xs text-stone-400 mt-2">Swipe up for next ↑</p>
      )}

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} onPost={handlePost} />}
    </div>
  );
}

// ─── Main FeedPage ───────────────────────────────────────────────────────────

export default function FeedPage() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [tab, setTab] = useState('all');

  const toggleLike = id =>
    setLikedPosts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);

  const posts = tab === 'liked'
    ? FEED_POSTS.filter(p => likedPosts.includes(p.id))
    : FEED_POSTS;

  const TABS = [
    { id: 'all',    label: '🌎 All Posts' },
    { id: 'shorts', label: '🎥 Shorts' },
    { id: 'liked',  label: `❤️ Liked (${likedPosts.length})` },
  ];

  return (
    <div className="px-4 pt-10">
      <div className="mb-5 animate-fade-up">
        <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-1">👥 Bruin Community</p>
        <h1 className="font-display text-3xl font-bold text-stone-800">Social Feed</h1>
        <p className="text-sm text-stone-400 mt-1">See what fellow Bruins are eating right now</p>
      </div>

      {/* 3 tabs */}
      <div className="flex gap-2 mb-5 animate-fade-up delay-1">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-2 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap
              ${tab === t.id ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-stone-400 border border-stone-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="animate-fade-up delay-2">
        {tab === 'shorts' ? (
          <ShortsFeed />
        ) : (
          <>
            <div className="space-y-4">
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
          </>
        )}
      </div>
    </div>
  );
}
