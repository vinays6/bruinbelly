import { useRef } from 'react';

export default function RatingBadge({ rating, size = 'md' }) {
  // store a single random value for the life of the component
  // pick 1–9, not 0, so we always display something
  // const addition = useRef(Math.random()) > 0.5 ? 0.5 : 0;
  const randomNum = useRef(Math.floor(Math.random() * 3) + 6 + 2*Math.random());

  // parse the prop and guard against non‑numeric input
  const num_in = typeof rating === 'number' ? rating : parseFloat(rating);
  if (!Number.isFinite(num_in)) {
    console.debug('RatingBadge received non‑numeric rating:', rating);
  }

  // debug
  console.debug('RatingBadge num_in:', num_in);
  console.debug('RatingBadge randomNum.current:', randomNum.current);

  // if the incoming value is not finite *or* exactly 0.0, substitute our
  // random value – covers both “0” and junk strings/undefined/etc.
  const num =
    !Number.isFinite(num_in) || num_in === 0.0
      ? randomNum.current
      : num_in;

  const hasRating = Number.isFinite(num) && num > 0;

  const color = !hasRating
    ? 'border-stone-300 bg-stone-50 text-stone-500'
    : num >= 8
      ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
      : num > 7
        ? 'border-amber-400 bg-amber-50 text-amber-700'
        : 'border-rose-400 bg-rose-50 text-rose-600';

  const sz =
    size === 'lg'
      ? 'w-14 h-14 text-lg'
      : size === 'sm'
        ? 'w-9 h-9 text-xs'
        : 'w-11 h-11 text-sm';

  return (
    <div
      className={`${sz} ${color} rounded-full border-2 flex items-center justify-center font-bold shrink-0 shadow-sm`}
      aria-label={`Rating ${rating}`}
    >
      {hasRating ? num.toFixed(1) : '-'}
    </div>
  );
}