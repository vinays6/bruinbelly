import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

export async function getItemsByMealPeriod(restaurantId, date) {
  const normalizedDate = normalizeDateParam(date);
  const response = await apiClient.get(
    `/restaurant/${restaurantId}/items-by-meal-period/${normalizedDate}`,
  );
  return response.data;
}

export async function getReviewsByItem(itemId) {
  const response = await apiClient.get(`/item/${itemId}/reviews`);
  return response.data;
}

export async function createReview({
  itemId,
  restaurantId,
  rating,
  comment,
}) {
  const response = await apiClient.post('/create-review', {
    item_id: itemId,
    restaurant_id: restaurantId,
    rating,
    comment,
  });
  return response.data;
}

export async function getItemRatingsSummary(itemIds) {
  const response = await apiClient.post('/items/ratings-summary', {
    item_ids: itemIds,
  });
  return response.data;
}

function normalizeDateParam(date) {
  if (!date) return date;
  return date.replace(/-/g, '');
}
