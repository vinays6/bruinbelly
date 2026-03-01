import { useState, useEffect } from 'react';
import LabelPill from '../components/LabelPill';
import SectionCard from '../components/SectionCard';
import RatingForm from '../components/RatingForm';
import ReviewCard from '../components/ReviewCard';
import RatingBadge from '../components/RatingBadge';
import { ITEM_DETAILS, DEFAULT_ITEM_DETAIL, PLACEHOLDER_REVIEWS } from '../data/placeholders';
import { getReviews } from '../store/ratingsStore';

export default function RatingPage({ itemId, onBack, onNav }) {
  const detail = ITEM_DETAILS[itemId] || { ...DEFAULT_ITEM_DETAIL, name: `[item_name for ${itemId}]` };

  const [submitted, setSubmitted]       = useState(false);
  const [showReviews, setShowReviews]   = useState(false);
  const [reviews, setReviews]           = useState([]);
  const [lastReview, setLastReview]     = useState(null);

  useEffect(() => {
    // Load any existing reviews from store
    setReviews(getReviews(itemId));
  }, [itemId]);

  const handleSubmitSuccess = (review) => {
    setLastReview(review);
    setSubmitted(true);
    setReviews(getReviews(itemId));
  };

  const handleViewReviews = () => {
    setShowReviews(true);
  };

  const handleNextItem = () => {
    // Derive next itemId - cycle through dining hall items
    const allIds = ['dn-1','dn-2','dn-3','dn-4','ep-1','ep-2','ep-3','bp-1','bp-2','bp-3','fe-1','fe-2'];
    const idx = allIds.indexOf(itemId);
    const nextId = allIds[(idx + 1) % allIds.length];
    // Reset state and navigate to next item
    setSubmitted(false);
    setShowReviews(false);
    setLastReview(null);
    onNav('rate', nextId);
  };

  const displayedReviews = reviews.length > 0 ? reviews : PLACEHOLDER_REVIEWS;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBF8' }}>
      {/* Back button header */}
      <div className="sticky top-0 z-20 bg-[#FFFBF8]/95 backdrop-blur-sm border-b border-stone-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="w-9 h-9 rounded-full bg-white border border-stone-100 shadow-sm
                     flex items-center justify-center text-stone-600 text-sm font-bold
                     active:scale-95 transition-transform hover:bg-stone-50"
        >
          ←
        </button>
        <h1 className="font-display font-semibold text-base text-stone-800 truncate flex-1">
          {detail.name}
        </h1>
        <RatingBadge rating={detail.avgRating} size="sm" />
      </div>

      <div className="px-4 pb-36 pt-4 flex flex-col gap-4">

        {/* Image placeholder */}
        <div className="w-full rounded-2xl overflow-hidden border border-stone-100 shadow-sm"
             style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #F5F0EB 0%, #EDE8E3 100%)' }}>
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span className="text-4xl opacity-30">🍽️</span>
            <p className="text-xs text-stone-400 font-medium">No pictures found</p>
          </div>
        </div>

        {/* Item header card */}
        <SectionCard>
          <div className="flex items-start justify-between gap-3 pt-2">
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-xl text-stone-800 leading-tight mb-1">
                {detail.name}
              </h2>
              <p className="text-sm text-stone-400 flex items-center gap-1">
                📍 {detail.restaurant}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-orange-400 text-sm">★</span>
                <span className="text-sm font-semibold text-stone-700">{detail.avgRating.toFixed(1)}</span>
                <span className="text-xs text-stone-400">avg rating</span>
              </div>
            </div>
            <RatingBadge rating={detail.avgRating} size="md" />
          </div>
        </SectionCard>

        {/* Description + labels */}
        <SectionCard title="About this item">
          <div className="flex flex-wrap gap-2 mb-3">
            {detail.labels.map((label, i) => (
              <LabelPill key={i} label={label} index={i} />
            ))}
          </div>
          <p className="text-sm text-stone-500 leading-relaxed">{detail.description}</p>
        </SectionCard>

        {/* Ingredients + allergens */}
        <SectionCard title="Specifics">
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Ingredients</h3>
            <ul className="space-y-1" aria-label="Ingredients list">
              {detail.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-stone-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-300 shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Dietary Restrictions</h3>
            <ul className="space-y-1" aria-label="Allergens list">
              {detail.allergens.map((a, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-stone-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-300 shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>

        {/* ── MAIN CONTENT AREA: form / success / reviews ── */}
        {!submitted && !showReviews && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 pl-1">
              Rate this item
            </p>
            <RatingForm itemId={itemId} onSubmitSuccess={handleSubmitSuccess} />
          </div>
        )}

        {submitted && !showReviews && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col items-center gap-4 animate-slide-up text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-3xl">
              ✅
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-stone-800 mb-1">Rating Submitted!</h3>
              <p className="text-sm text-stone-400">
                You rated <span className="font-semibold text-stone-600">{detail.name}</span>{' '}
                <span className="font-bold text-orange-500">{lastReview?.rating.toFixed(1)} / 5.0</span>
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={handleViewReviews}
                aria-label="View all reviews for this item"
                className="w-full bg-orange-500 text-white font-semibold py-3.5 rounded-2xl
                           active:scale-[0.98] transition-transform text-sm shadow-sm"
              >
                View Reviews
              </button>
              <button
                onClick={handleNextItem}
                aria-label="Go to next item"
                className="w-full bg-white border border-stone-200 text-stone-600 font-semibold
                           py-3.5 rounded-2xl active:scale-[0.98] transition-transform text-sm"
              >
                Next Item →
              </button>
            </div>
          </div>
        )}

        {showReviews && (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-3 pl-1">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Reviews ({displayedReviews.length})
              </p>
              <button
                onClick={handleNextItem}
                aria-label="Go to next item"
                className="text-xs text-orange-500 font-semibold"
              >
                Next Item →
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {displayedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
