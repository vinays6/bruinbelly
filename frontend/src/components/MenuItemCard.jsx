import RatingBadge from './RatingBadge';

export default function MenuItemCard({ item, restaurant, onRate }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl p-3.5 shadow-sm border border-stone-50">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{ backgroundColor: '#FFF3B8' }}
      >
        🍽️
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-stone-800 truncate">{item.name}</p>
        <p className="text-xs text-stone-400 truncate">{restaurant}</p>
        <div className="flex gap-1.5 mt-1 flex-wrap">
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
            {item.category}
          </span>
          {item.dietary && (
            <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
              {item.dietary}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <RatingBadge rating={item.rating} size="sm" />
        <button
          aria-label={`Rate ${item.name}`}
          onClick={() => onRate && onRate(item.id)}
          className="bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl
                     active:scale-95 transition-transform shadow-sm"
        >
          Rate
        </button>
      </div>
    </div>
  );
}
