import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MenuItemCard from '../components/MenuItemCard';

const diningHalls = [
  {
    name: '[dining_hall_name]',
    emoji: '🏛️',
    items: [
      { id: '1', name: '[item_name]', rating: '[rating]', emoji: '🍜' },
      { id: '2', name: '[item_name]', rating: '[rating]', emoji: '🥗' },
      { id: '3', name: '[item_name]', rating: '[rating]', emoji: '🍗' },
    ],
  },
  {
    name: '[dining_hall_name]',
    emoji: '🌿',
    items: [
      { id: '4', name: '[item_name]', rating: '[rating]', emoji: '🥦' },
      { id: '5', name: '[item_name]', rating: '[rating]', emoji: '🍱' },
      { id: '6', name: '[item_name]', rating: '[rating]', emoji: '🥙' },
    ],
  },
  {
    name: '[dining_hall_name]',
    emoji: '🍽️',
    items: [
      { id: '7', name: '[item_name]', rating: '[rating]', emoji: '🍕' },
      { id: '8', name: '[item_name]', rating: '[rating]', emoji: '🌮' },
      { id: '9', name: '[item_name]', rating: '[rating]', emoji: '🍰' },
    ],
  },
];

export default function MenuPage() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string[]>([diningHalls[0].name]);

  const toggle = (name: string) => {
    setExpanded((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const filteredHalls = diningHalls.map((hall) => ({
    ...hall,
    items: hall.items.filter(
      (item) =>
        query === '' ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        hall.name.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((hall) => query === '' || hall.items.length > 0);

  return (
    <div className="px-5 pt-10 animate-fade-in">
      {/* Header */}
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-brand-text">Today's Menu</h1>
        <p className="font-body text-sm text-brand-muted mt-1">[date] · [#] items available</p>
      </div>

      {/* Sticky search */}
      <div className="sticky top-0 z-20 bg-brand-surface pb-3 pt-1">
        <SearchBar value={query} onChange={setQuery} placeholder="Search items or dining halls…" />
      </div>

      {/* Dining halls */}
      <div className="space-y-3 mt-2">
        {filteredHalls.map((hall, hi) => {
          const isExpanded = expanded.includes(hall.name);
          return (
            <div
              key={hall.name}
              className={`bg-white rounded-3xl border border-brand-border shadow-soft overflow-hidden animate-slide-up`}
              style={{ animationDelay: `${hi * 0.07}s` }}
            >
              {/* Hall header */}
              <button
                onClick={() => toggle(hall.name)}
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${hall.name}`}
                className="w-full flex items-center justify-between p-4 active:bg-brand-soft transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{hall.emoji}</span>
                  <div className="text-left">
                    <p className="font-body font-semibold text-brand-text text-sm">{hall.name}</p>
                    <p className="font-body text-xs text-brand-muted">{hall.items.length} items</p>
                  </div>
                </div>
                <span
                  className={`text-brand-muted text-lg transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                >
                  ↓
                </span>
              </button>

              {/* Items */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-2 border-t border-brand-border pt-3">
                  {hall.items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      itemName={item.name}
                      restaurantName={hall.name}
                      rating={item.rating}
                      emoji={item.emoji}
                      onRate={() => {}}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredHalls.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="font-body text-brand-muted text-sm">No items match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
