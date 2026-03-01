// In-memory global ratings store (no backend)
// Keyed by itemId → array of Review objects

let store = {
  ratingsByItemId: {},
};

const listeners = new Set();

function notify() {
  listeners.forEach(fn => fn({ ...store }));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getStore() {
  return store;
}

export function addReview(itemId, review) {
  const existing = store.ratingsByItemId[itemId] || [];
  store = {
    ...store,
    ratingsByItemId: {
      ...store.ratingsByItemId,
      [itemId]: [review, ...existing],
    },
  };
  notify();
}

export function getReviews(itemId) {
  return store.ratingsByItemId[itemId] || [];
}
