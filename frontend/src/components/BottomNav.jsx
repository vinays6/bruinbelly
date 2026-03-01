const TABS = [
  { id: 'home',     emoji: '🏠', label: 'Home'     },
  { id: 'menu',     emoji: '🍽️', label: 'Menu'     },
  { id: 'feed',     emoji: '👥', label: 'Feed',  center: true },
  { id: 'calendar', emoji: '📅', label: 'Calendar' },
  { id: 'settings', emoji: '⚙️', label: 'Settings' },
];

export default function BottomNav({ active, onNav }) {
  return (
    <nav aria-label="Main navigation"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md
                 bg-white/95 backdrop-blur-md border-t border-stone-100
                 flex items-center z-50 shadow-lg">
      {TABS.map((tab) =>
        tab.center ? (
          <div key={tab.id} className="flex-1 flex justify-center">
            <button
              onClick={() => onNav(tab.id)}
              aria-label="Social Feed"
              className={`-mt-5 w-14 h-14 rounded-full flex items-center justify-center text-2xl
                         border-4 border-white shadow-lg transition-transform active:scale-95
                         ${active === tab.id ? 'bg-orange-400' : 'bg-orange-500'}`}>
              {tab.emoji}
            </button>
          </div>
        ) : (
          <button
            key={tab.id}
            onClick={() => onNav(tab.id)}
            aria-label={tab.label}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors
                       ${active === tab.id ? 'text-orange-500' : 'text-stone-400'}`}>
            <span className={`text-xl transition-transform ${active === tab.id ? 'scale-110' : ''}`}>{tab.emoji}</span>
            {tab.label}
          </button>
        )
      )}
    </nav>
  );
}
