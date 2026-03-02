export default function ReviewCard({ review }) {
  const stars = Math.round(review.rating * 2) / 2;
  const fullStars  = Math.floor(stars);
  const halfStar   = stars % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const previewUrl = review.imageFile ? URL.createObjectURL(review.imageFile) : null;
  const username = review.username || 'Anonymous';
  const scoreOutOfTen = Number.isFinite(review.rating) ? (review.rating * 2).toFixed(1) : '-';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-stone-700 shrink-0"
          style={{ backgroundColor: '#FFD6BA' }}
        >
          {username.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-stone-800">{username}</p>
          <p className="text-xs text-stone-400">{review.date}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex">
            {Array(fullStars).fill(0).map((_, i) => (
              <span key={`f-${i}`} className="text-orange-400 text-sm">★</span>
            ))}
            {halfStar && <span className="text-orange-400 text-sm">⯨</span>}
            {Array(emptyStars).fill(0).map((_, i) => (
              <span key={`e-${i}`} className="text-stone-200 text-sm">★</span>
            ))}
          </div>
          <span className="text-xs font-bold text-orange-500">{scoreOutOfTen}</span>
        </div>
      </div>

      {/* Comment */}
      {review.comment && (
        <p className="text-sm text-stone-500 leading-relaxed italic mb-3">"{review.comment}"</p>
      )}

      {/* Image thumbnail */}
      {previewUrl && (
        <div className="w-full h-36 rounded-xl overflow-hidden">
          <img src={previewUrl} alt="Review" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}
