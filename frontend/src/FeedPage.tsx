import { useState } from 'react';
import FeedCard from '../components/FeedCard';

const CARDS = [
  {
    id: 'post-1',
    username: '[username]',
    itemName: '[item_name]',
    restaurantName: '[restaurant_name]',
    rating: '[rating]',
    comment: '[comment]',
    date: '[date]',
    emoji: '🍜',
    gradientFrom: '#FFD6CC',
    gradientTo: '#FFE8E0',
  },
  {
    id: 'post-2',
    username: '[username]',
    itemName: '[item_name]',
    restaurantName: '[restaurant_name]',
    rating: '[rating]',
    comment: '[comment]',
    date: '[date]',
    emoji: '🥗',
    gradientFrom: '#D4C5F9',
    gradientTo: '#E8D5FF',
  },
  {
    id: 'post-3',
    username: '[username]',
    itemName: '[item_name]',
    restaurantName: '[restaurant_name]',
    rating: '[rating]',
    comment: '[comment]',
    date: '[date]',
    emoji: '🍕',
    gradientFrom: '#B8F0D8',
    gradientTo: '#FFF1A8',
  },
  {
    id: 'post-4',
    username: '[username]',
    itemName: '[item_name]',
    restaurantName: '[restaurant_name]',
    rating: '[rating]',
    comment: '[comment]',
    date: '[date]',
    emoji: '🌮',
    gradientFrom: '#BAE3FF',
    gradientTo: '#D4C5F9',
  },
  {
    id: 'post-5',
    username: '[username]',
    itemName: '[item_name]',
    restaurantName: '[restaurant_name]',
    rating: '[rating]',
    comment: '[comment]',
    date: '[date]',
    emoji: '🍱',
    gradientFrom: '#FFF1A8',
    gradientTo: '#FFD6CC',
  },
];

export default function FeedPage() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = CARDS.filter((c) => !dismissed.includes(c.id));
  const current = visible[0];

  const dismiss = (id: string) => setDismissed((prev) => [...prev, id]);

  return (
    <div className="px-5 pt-10 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-brand-text">Social Feed</h1>
        <p className="font-body text-sm text-brand-muted mt-1">What Bruins are eating today</p>
      </div>

      {/* Card stack indicator */}
      {visible.length > 0 && (
        <div className="flex justify-center gap-1.5 mb-4">
          {visible.slice(0, 5).map((c, i) => (
            <div
              key={c.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === 0 ? 'w-6 bg-brand-primary' : 'w-1.5 bg-brand-border'
              }`}
            />
          ))}
        </div>
      )}

      {/* Current card */}
      {current ? (
        <div>
          <FeedCard
            key={current.id}
            {...current}
            onSwipeLeft={() => dismiss(current.id)}
            onSwipeRight={() => dismiss(current.id)}
          />
          <p className="text-center font-body text-xs text-brand-muted mt-4">
            {visible.length} post{visible.length !== 1 ? 's' : ''} remaining
          </p>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🌟</p>
          <h2 className="font-display text-xl font-semibold text-brand-text mb-2">
            You're all caught up!
          </h2>
          <p className="font-body text-sm text-brand-muted mb-6">
            Check back later for more Bruin food reviews
          </p>
          <button
            onClick={() => setDismissed([])}
            aria-label="Refresh feed"
            className="px-6 py-2.5 bg-brand-primary text-white rounded-2xl font-body font-semibold text-sm active:scale-95 transition-transform"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
