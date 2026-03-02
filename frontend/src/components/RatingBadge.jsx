export default function RatingBadge({ rating, size = 'md' }) {
  const num = typeof rating === 'number' ? rating : parseFloat(rating);
  const hasRating = Number.isFinite(num) && num > 0;
  const color = !hasRating
    ? 'border-stone-300 bg-stone-50 text-stone-500'
    : num >= 8.5
    ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
    : num >= 7
    ? 'border-amber-400 bg-amber-50 text-amber-700'
    : 'border-rose-400 bg-rose-50 text-rose-600';
  const sz = size === 'lg' ? 'w-14 h-14 text-lg' : size === 'sm' ? 'w-9 h-9 text-xs' : 'w-11 h-11 text-sm';
  return (
    <div className={`${sz} ${color} rounded-full border-2 flex items-center justify-center font-bold shrink-0 shadow-sm`}
         aria-label={`Rating ${rating}`}>
      {hasRating ? num.toFixed(1) : '-'}
    </div>
  );
}
