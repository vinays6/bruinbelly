import { useState } from 'react';
import StarRatingInput from './StarRatingInput';
import ImageUploadPreview from './ImageUploadPreview';
import { CURRENT_USER } from '../data/placeholders';
import { addReview } from '../store/ratingsStore';

export default function RatingForm({ itemId, onSubmitSuccess }) {
  const [rating, setRating]     = useState(0);
  const [comment, setComment]   = useState('');
  const [imageFile, setImage]   = useState(null);
  const [error, setError]       = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a star rating before submitting.');
      return;
    }
    if (rating < 0 || rating > 5) {
      setError('Rating must be between 0 and 5.');
      return;
    }
    setError('');

    const review = {
      id:        `rev-${Date.now()}`,
      username:  CURRENT_USER,
      rating,
      comment:   comment.trim(),
      date:      new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
      imageFile: imageFile || null,
    };

    addReview(itemId, review);
    setRating(0);
    setComment('');
    setImage(null);
    onSubmitSuccess(review);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

      {/* Stars */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4">
        <label className="text-sm font-semibold text-stone-700 block mb-3">Your Rating *</label>
        <StarRatingInput value={rating} onChange={setRating} />
        {error && (
          <p role="alert" className="text-xs text-rose-500 font-medium text-center mt-2">{error}</p>
        )}
      </div>

      {/* Comment */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4">
        <label htmlFor="comment" className="text-sm font-semibold text-stone-700 block mb-2">
          Your Review <span className="text-stone-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience…"
          rows={3}
          className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-700
                     placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-300
                     focus:border-orange-400 resize-none transition-all"
        />
      </div>

      {/* Image upload */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4">
        <ImageUploadPreview imageFile={imageFile} onChange={setImage} />
      </div>

      {/* Sticky submit */}
      <div className="sticky bottom-20 pt-2 pb-1">
        <button
          type="submit"
          aria-label="Submit your rating"
          className="w-full bg-orange-500 text-white font-semibold py-4 rounded-2xl
                     shadow-lg active:scale-[0.98] transition-transform text-sm
                     hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          Submit Rating
        </button>
      </div>
    </form>
  );
}
