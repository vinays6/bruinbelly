import { useState } from 'react';

export default function RatingBadge({ rating, size = 'md' }) {
  if (parseFloat(rating) == 0.0){
    const num = typeof rating === useState(Math.floor(Math.random()*10));
  }else{
    const num = typeof rating === 'number' ? rating : parseFloat(rating);
  }
  const color = num >= 8.5
    ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
    : num >= 7
    ? 'border-amber-400 bg-amber-50 text-amber-700'
    : 'border-rose-400 bg-rose-50 text-rose-600';
  const sz = size === 'lg' ? 'w-14 h-14 text-lg' : size === 'sm' ? 'w-9 h-9 text-xs' : 'w-11 h-11 text-sm';
  return (
    <div className={`${sz} ${color} rounded-full border-2 flex items-center justify-center font-bold shrink-0 shadow-sm`}
         aria-label={`Rating ${rating}`}>
      {num.toFixed(1)}
    </div>
  );
}
