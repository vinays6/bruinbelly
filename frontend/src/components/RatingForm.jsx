import { useEffect, useState } from 'react';
import StarRatingInput from './StarRatingInput';
import ImageUploadPreview from './ImageUploadPreview';

export default function RatingForm({
  onSubmitSuccess,
  submitting = false,
  initialRating = 0,
  initialComment = '',
}) {
  const [rating, setRating]     = useState(0);
  const [comment, setComment]   = useState('');
  const [imageFile, setImage]   = useState(null);
  const [error, setError]       = useState('');

  useEffect(() => {
    setRating(initialRating || 0);
    setComment(initialComment || '');
  }, [initialRating, initialComment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (rating === 0) {
      setError('Please select a star rating before submitting.');
      return;
    }
    if (rating < 0 || rating > 10) {
      setError('Rating must be between 0 and 10.');
      return;
    }
    setError('');

    try {
      const review = await onSubmitSuccess({
        rating,
        comment: comment.trim(),
        imageFile: imageFile || null,
      });

      if (review) {
        setRating(review.rating != null ? review.rating * 2 : 0);
        setComment(review.comment || '');
        setImage(null);
      }
    } catch {
      setError('Unable to submit review right now. Please try again.');
    }
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
          disabled={submitting}
          className="w-full bg-orange-500 text-white font-semibold py-4 rounded-2xl
                     shadow-lg active:scale-[0.98] transition-transform text-sm disabled:opacity-60
                     hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          {submitting ? 'Submitting…' : 'Submit Rating'}
        </button>
      </div>
    </form>
  );
}
