import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import Card from '../components/Card';
import RatingBadge from '../components/RatingBadge';

const shortcuts = [
  { label: 'View Menu',     icon: '📋', to: '/menu',     gradient: 'linear-gradient(135deg, #FFD6CC, #FFB5C8)' },
  { label: 'Weekly Picks',  icon: '📅', to: '/calendar', gradient: 'linear-gradient(135deg, #D4C5F9, #BAE3FF)' },
  { label: 'Social Feed',   icon: '✨', to: '/feed',     gradient: 'linear-gradient(135deg, #B8F0D8, #FFF1A8)' },
];

export default function HomePage() {
  const { currentUser } = useAppStore();
  const navigate = useNavigate();

  return (
    <div className="px-5 pt-12 space-y-7 animate-fade-in">
      {/* Header */}
      <div>
        <p className="text-brand-muted font-body text-sm">Good morning 👋</p>
        <h1 className="font-display text-3xl font-semibold text-brand-text mt-1">
          Welcome back,<br />
          <span className="text-brand-primary italic">{currentUser}</span>
        </h1>
      </div>

      {/* Quick Shortcuts */}
      <section aria-label="Quick shortcuts">
        <h2 className="font-body text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">
          Quick Access
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {shortcuts.map((s, i) => (
            <button
              key={s.to}
              onClick={() => navigate(s.to)}
              aria-label={s.label}
              className={`rounded-3xl p-4 flex flex-col items-center gap-2 shadow-soft active:scale-95 transition-transform animate-slide-up stagger-${i + 1}`}
              style={{ background: s.gradient }}
            >
              <span className="text-3xl">{s.icon}</span>
              <span className="font-body text-xs font-semibold text-brand-text text-center leading-tight">
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Today's Trending */}
      <section aria-label="Today's trending item">
        <h2 className="font-body text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">
          🔥 Trending Today
        </h2>
        <Card className="animate-slide-up stagger-4">
          <div
            className="h-36 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #FFF1A8, #FFD6CC)' }}
          >
            <span className="text-6xl">🍜</span>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-display text-xl font-semibold text-brand-text">[item_name]</h3>
                <p className="font-body text-sm text-brand-muted mt-0.5">at [restaurant_name]</p>
              </div>
              <RatingBadge rating="[rating]" size="md" />
            </div>
            <p className="font-body text-sm text-brand-muted leading-relaxed italic">
              "[llm_summary]"
            </p>
            <button
              onClick={() => navigate('/menu')}
              aria-label="See full menu"
              className="mt-4 w-full py-2.5 rounded-2xl bg-brand-soft border border-brand-border text-brand-text font-body text-sm font-semibold active:scale-98 transition-transform"
            >
              See Full Menu →
            </button>
          </div>
        </Card>
      </section>

      {/* Recent Activity */}
      <section aria-label="Recent activity" className="animate-slide-up stagger-5">
        <h2 className="font-body text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">
          Recent Activity
        </h2>
        <div className="space-y-2">
          {['[item_name]', '[item_name]', '[item_name]'].map((name, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-brand-border p-3.5 flex items-center gap-3 shadow-soft"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center text-xl">
                🍽️
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-semibold text-brand-text truncate">{name}</p>
                <p className="font-body text-xs text-brand-muted">[restaurant_name] · [date]</p>
              </div>
              <RatingBadge rating="[rating]" size="sm" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
