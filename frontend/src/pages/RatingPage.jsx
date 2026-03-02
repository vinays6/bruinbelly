import { useState, useEffect } from 'react';
import LabelPill from '../components/LabelPill';
import SectionCard from '../components/SectionCard';
import RatingForm from '../components/RatingForm';
import ReviewCard from '../components/ReviewCard';
import RatingBadge from '../components/RatingBadge';
import { createReview, getReviewsByItem } from '../services/api';
import { getMenuStore, subscribeMenu, fetchMenuIfNeeded, refreshRatingsForItems } from '../store/menuStore';

export default function RatingPage({ itemId, onBack, onNav }) {
  const [submitted, setSubmitted]       = useState(false);
  const [showReviews, setShowReviews]   = useState(false);
  const [reviews, setReviews]           = useState([]);
  const [lastReview, setLastReview]     = useState(null);
  const [draftReview, setDraftReview]   = useState(null);
  const [reviewError, setReviewError]   = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [menuState, setMenuState]       = useState(() => getMenuStore());

  useEffect(() => {
    const unsubscribe = subscribeMenu(setMenuState);
    fetchMenuIfNeeded();
    return unsubscribe;
  }, []);

  useEffect(() => {
    let canceled = false;
    setReviewError('');

    async function loadReviews() {
      if (!itemId) {
        setReviews([]);
        return;
      }

      try {
        const data = await getReviewsByItem(Number(itemId));
        if (canceled) return;
        const mapped = data.map((review) => ({
          id: review.id,
          username: 'Bruin',
          rating: Number(review.rating),
          comment: review.comment || '',
          date: formatReviewDate(review),
          imageFile: null,
        }));
        setReviews(mapped);
        setDraftReview(mapped[0] || null);
      } catch (error) {
        if (canceled) return;
        console.error('Failed to load reviews', error);
        setReviewError('Could not load reviews.');
        setReviews([]);
        setDraftReview(null);
      }
    }

    loadReviews();

    return () => {
      canceled = true;
    };
  }, [itemId]);

  const { allMenuItems, loading, error } = menuState;
  const menuItem = allMenuItems.find((item) => String(item.id) === String(itemId));
  const seededDemoReviews = getSeededDemoReviews(itemId, menuItem);
  const effectiveReviews = reviews.length > 0 ? reviews : seededDemoReviews;

  const hasReviews = effectiveReviews.length > 0;
  const averageStarRating = hasReviews
    ? effectiveReviews.reduce((sum, review) => sum + review.rating, 0) / effectiveReviews.length
    : null;
  const averageDisplayRating = averageStarRating == null ? null : averageStarRating * 2;
  const hasAverageDisplayRating = Number.isFinite(averageDisplayRating) && averageDisplayRating > 0;

  const itemName = menuItem?.name || 'Menu item';
  const restaurantName = menuItem?.hallName || 'Dining hall';
  const dietaryLabels = menuItem?.dietaryLabels || [];
  const recipeUrl = menuItem?.recipeUrl || '';

  const handleSubmitSuccess = async ({ rating, comment }) => {
    setReviewError('');
    setSubmittingReview(true);
    try {
      const created = await createReview({
        itemId: Number(itemId),
        restaurantId: menuItem?.hallId ? Number(menuItem.hallId) : null,
        rating: rating / 2,
        comment,
      });

      const review = {
        id: created.id,
        username: 'Bruin',
        rating: Number(created.rating),
        comment: created.comment || '',
        date: formatReviewDate(created),
        imageFile: null,
      };

      setLastReview(review);
      setDraftReview(review);
      setSubmitted(true);
      setReviews((prev) => {
        const next = prev.filter((entry) => entry.id !== review.id);
        return [review, ...next];
      });
      await refreshRatingsForItems([Number(itemId)]);
      return review;
    } catch (error) {
      console.error('Failed to submit review', error);
      setReviewError('Could not submit review. Please try again.');
      throw error;
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleViewReviews = () => {
    setShowReviews(true);
  };

  const handleNextItem = () => {
    const ids = allMenuItems.map((item) => item.id);
    if (ids.length === 0) return;
    const idx = ids.indexOf(itemId);
    const nextId = idx === -1 ? ids[0] : ids[(idx + 1) % ids.length];
    // Reset state and navigate to next item
    setSubmitted(false);
    setShowReviews(false);
    setLastReview(null);
    onNav('rate', nextId);
  };

  if (!loading && error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFFBF8' }}>
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
            Rate a menu item
          </h1>
        </div>

        <div className="px-4 pt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 text-center">
            <p className="text-4xl mb-3">⚠️</p>
            <p className="font-semibold text-stone-700 mb-1">
              Menu unavailable — check backend connection
            </p>
            <p className="text-sm text-stone-400">
              Make sure the Flask backend is running on http://localhost:8000, then try again.
            </p>
            <button
              onClick={() => fetchMenuIfNeeded()}
              className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-semibold active:scale-95 transition-transform"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isLoadingItem = loading && !menuItem;

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
          {itemName}
        </h1>
        <RatingBadge rating={averageDisplayRating} size="sm" />
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
                {itemName}
              </h2>
              <p className="text-sm text-stone-400 flex items-center gap-1">
                📍 {restaurantName}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-orange-400 text-sm">★</span>
                <span className="text-sm font-semibold text-stone-700">
                  {hasAverageDisplayRating ? averageDisplayRating.toFixed(1) : '-'}
                </span>
                <span className="text-xs text-stone-400">avg rating</span>
              </div>
            </div>
            <RatingBadge rating={averageDisplayRating} size="md" />
          </div>
        </SectionCard>

        {/* Description + labels */}
        <SectionCard title="About this item">
          <div className="flex flex-wrap gap-2 mb-3">
            {dietaryLabels.length > 0 ? (
              dietaryLabels.map((label, i) => (
                <LabelPill key={i} label={label} index={i} />
              ))
            ) : (
              <p className="text-xs text-stone-400">
                Dietary information not available for this item.
              </p>
            )}
          </div>
          {recipeUrl && (
            <p className="text-sm text-stone-500 mb-2">
              UCLA recipe:{' '}
              <a
                href={recipeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-orange-600 font-medium underline"
              >
                View menu item
              </a>
            </p>
          )}
          <p className="text-sm text-stone-500 leading-relaxed">
            Rate your experience with this menu item to help other Bruins decide what to eat.
          </p>
        </SectionCard>

        {/* ── MAIN CONTENT AREA: form / success / reviews ── */}
        {isLoadingItem && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col gap-3 animate-pulse">
            <div className="h-4 w-32 bg-stone-100 rounded-full" />
            <div className="h-3 w-full bg-stone-100 rounded-full" />
            <div className="h-3 w-2/3 bg-stone-100 rounded-full" />
          </div>
        )}

        {!isLoadingItem && !submitted && !showReviews && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3 pl-1">
              Rate this item
            </p>
            <RatingForm
              onSubmitSuccess={handleSubmitSuccess}
              submitting={submittingReview}
              initialRating={draftReview?.rating ? draftReview.rating * 2 : 0}
              initialComment={draftReview?.comment || ''}
            />
            {reviewError && (
              <p className="text-xs text-rose-500 mt-2 pl-1">{reviewError}</p>
            )}
          </div>
        )}

        {!isLoadingItem && submitted && !showReviews && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col items-center gap-4 animate-slide-up text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-3xl">
              ✅
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-stone-800 mb-1">Rating Submitted!</h3>
              <p className="text-sm text-stone-400">
                You rated <span className="font-semibold text-stone-600">{itemName}</span>{' '}
                <span className="font-bold text-orange-500">
                  {lastReview?.rating != null ? (lastReview.rating * 2).toFixed(1) : '-'} / 10.0
                </span>
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

        {!isLoadingItem && showReviews && (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-3 pl-1">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Reviews ({effectiveReviews.length})
              </p>
              <button
                onClick={handleNextItem}
                aria-label="Go to next item"
                className="text-xs text-orange-500 font-semibold"
              >
                Next Item →
              </button>
            </div>
            {effectiveReviews.length === 0 ? (
              <p className="text-sm text-stone-400">No reviews yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {effectiveReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
            {reviewError && (
              <p className="text-xs text-rose-500 mt-2">{reviewError}</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

function formatReviewDate(review) {
  const dateSource = review?.created_at || review?.date;
  if (!dateSource) {
    return new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  const parsed = new Date(dateSource);
  if (Number.isNaN(parsed.getTime())) {
    return String(dateSource);
  }

  return parsed.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getSeededDemoReviews(itemId, menuItem) {
  const isMapleSyrupAtDeNeve =
    String(itemId) === '7110' &&
    menuItem?.hallId === 1 &&
    menuItem?.mealPeriod === 'breakfast';

  if (!isMapleSyrupAtDeNeve) return [];

  return [
    {
      id: 'demo-maple-1',
      username: 'Sam B.',
      rating: 2.0, // 4/10
      comment: 'Good texture, but a little too sweet for me.',
      date: 'Mar 1, 8:14 AM',
      imageFile: null,
    },
    {
      id: 'demo-maple-2',
      username: 'Jordan K.',
      rating: 3.0, // 6/10
      comment: 'Solid with waffles. Better warm than cold.',
      date: 'Mar 1, 9:02 AM',
      imageFile: null,
    },
  ];
}
