import { useState } from 'react';

// Supports 0–5 in 0.5 increments
export default function StarRatingInput({ value, onChange }) {
  const [hover, setHover] = useState(null);

  const displayed = hover !== null ? hover : value;

  // Each star covers 2 half-positions (i=0 → 0.5, i=1 → 1.0, ... i=9 → 5.0)
  const getStarFill = (starIndex) => {
    // starIndex 0-4 = star 1-5
    const full  = starIndex + 1;
    const half  = starIndex + 0.5;
    if (displayed >= full) return 'full';
    if (displayed >= half) return 'half';
    return 'empty';
  };

  const handleMouseMove = (e, starIndex) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeft = x < rect.width / 2;
    setHover(isLeft ? starIndex + 0.5 : starIndex + 1);
  };

  const handleClick = (e, starIndex) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeft = x < rect.width / 2;
    onChange(isLeft ? starIndex + 0.5 : starIndex + 1);
  };

  const handleKeyDown = (e, starIndex) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(starIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Stars */}
      <div
        className="flex gap-1"
        onMouseLeave={() => setHover(null)}
        role="group"
        aria-label="Star rating"
      >
        {[0, 1, 2, 3, 4].map((starIndex) => {
          const fill = getStarFill(starIndex);
          return (
            <button
              key={starIndex}
              type="button"
              aria-label={`Rate ${starIndex + 1} stars`}
              onMouseMove={(e) => handleMouseMove(e, starIndex)}
              onClick={(e) => handleClick(e, starIndex)}
              onKeyDown={(e) => handleKeyDown(e, starIndex)}
              className="w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-lg transition-transform active:scale-90"
            >
              <svg viewBox="0 0 24 24" className="w-9 h-9">
                <defs>
                  <linearGradient id={`half-${starIndex}`}>
                    <stop offset="50%" stopColor="#F97316" />
                    <stop offset="50%" stopColor="#E7E5E4" />
                  </linearGradient>
                </defs>
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill={
                    fill === 'full'  ? '#F97316' :
                    fill === 'half'  ? `url(#half-${starIndex})` :
                    '#E7E5E4'
                  }
                  stroke={fill !== 'empty' ? '#F97316' : '#D6D3D1'}
                  strokeWidth="1"
                />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Numeric input synced with stars */}
      <div className="flex items-center gap-2">
        <label htmlFor="numeric-rating" className="text-sm text-stone-500 font-medium">
          Or enter score:
        </label>
        <input
          id="numeric-rating"
          type="number"
          min="0"
          max="5"
          step="0.5"
          value={value === 0 ? '' : value}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (isNaN(v)) { onChange(0); return; }
            onChange(Math.min(5, Math.max(0, Math.round(v * 2) / 2)));
          }}
          placeholder="0.0"
          className="w-20 text-center border border-stone-200 rounded-xl px-2 py-1.5 text-sm font-semibold
                     text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
        />
        <span className="text-sm text-stone-400">/ 5.0</span>
      </div>

      {/* Label */}
      <p className="text-sm font-semibold text-orange-500 h-5">
        {value === 0 ? '' :
         value <= 1 ? 'Poor' :
         value <= 2 ? 'Fair' :
         value <= 3 ? 'Good' :
         value <= 4 ? 'Great' :
         'Amazing!'}
      </p>
    </div>
  );
}
