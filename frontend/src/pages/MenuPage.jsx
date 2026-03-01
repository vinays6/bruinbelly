import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MenuItemCard from '../components/MenuItemCard';
import { DINING_HALLS } from '../data/placeholders';

export default function MenuPage({ onNav }) {
  const [query, setQuery]     = useState('');
  const [expanded, setExpanded] = useState({ 'de-neve': true });

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const halls = DINING_HALLS.map((h) => ({
    ...h,
    items: h.items.filter(
      (item) =>
        query === '' ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((h) => h.items.length > 0 || query === '');

  return (
    <div className="px-4 pt-10">
      <div className="mb-5 animate-fade-up">
        <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-1">Today's Menu</p>
        <h1 className="font-display text-3xl font-bold text-stone-800">The Hill Dining</h1>
        <p className="text-sm text-stone-400 mt-1">[Today, [date]] · [#] items available</p>
      </div>

      {/* Sticky search */}
      <div className="sticky top-0 bg-[#FFFBF8]/95 backdrop-blur-sm pt-1 pb-3 z-10 animate-fade-up delay-1">
        <SearchBar value={query} onChange={setQuery} />
        {query && (
          <p className="text-xs text-stone-400 mt-2 pl-1">
            {halls.reduce((a, h) => a + h.items.length, 0)} results for "{query}"
          </p>
        )}
      </div>

      <div className="space-y-4 animate-fade-up delay-2">
        {halls.map((hall) => (
          <div key={hall.id}>
            <button
              onClick={() => toggle(hall.id)}
              aria-label={`${expanded[hall.id] ? 'Collapse' : 'Expand'} ${hall.name}`}
              className="w-full flex items-center gap-3 p-3.5 rounded-3xl bg-white border border-stone-100 shadow-sm active:scale-[0.99] transition-transform"
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: hall.bgColor }}
              >
                {hall.emoji}
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-sm text-stone-800">{hall.name}</p>
                <p className="text-xs text-stone-400">{hall.items.length} items</p>
              </div>
              <span className={`text-stone-400 text-sm transition-transform duration-200 ${expanded[hall.id] ? 'rotate-180' : ''}`}>
                ▾
              </span>
            </button>

            {expanded[hall.id] && (
              <div className="mt-2 space-y-2 pl-2">
                {hall.items.map((item, i) => (
                  <div key={item.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <MenuItemCard
                      item={item}
                      restaurant={hall.name}
                      onRate={(itemId) => onNav('rate', itemId)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {halls.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-stone-400">No items found</p>
            <p className="text-sm text-stone-300 mt-1">Try a different search</p>
          </div>
        )}
      </div>
    </div>
  );
}
