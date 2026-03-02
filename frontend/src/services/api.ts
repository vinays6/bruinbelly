import axios from 'axios';
import type { MenuItemsByMealPeriodResponse } from '../types/menu';

export const API_BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

export async function getItemsByMealPeriod(
  restaurantId: number,
  date: string,
): Promise<MenuItemsByMealPeriodResponse> {
  const normalizedDate = normalizeDateParam(date);
  const response = await apiClient.get<MenuItemsByMealPeriodResponse>(
    `/restaurant/${restaurantId}/items-by-meal-period/`,
    {
      params: { date: normalizedDate },
    },
  );
  return response.data;
}

export interface ReviewResponse {
  id: number;
  rating: number;
  comment: string | null;
  user_id: number | null;
  restaurant_id: number | null;
  item_id: number | null;
  created_at?: string | null;
}

export interface ItemRatingSummary {
  item_id: number;
  avg_rating: number | null;
  reviews_count: number;
  latest_comment: string | null;
}

export async function getReviewsByItem(itemId: number): Promise<ReviewResponse[]> {
  const response = await apiClient.get<ReviewResponse[]>(`/item/${itemId}/reviews`);
  return response.data;
}

export async function createReview(payload: {
  itemId: number;
  restaurantId?: number | null;
  rating: number;
  comment?: string;
}): Promise<ReviewResponse> {
  const response = await apiClient.post<ReviewResponse>('/create-review', {
    item_id: payload.itemId,
    restaurant_id: payload.restaurantId,
    rating: payload.rating,
    comment: payload.comment ?? '',
  });
  return response.data;
}

export async function getItemRatingsSummary(itemIds: number[]): Promise<Record<string, ItemRatingSummary>> {
  const response = await apiClient.post<Record<string, ItemRatingSummary>>('/items/ratings-summary', {
    item_ids: itemIds,
  });
  return response.data;
}

function normalizeDateParam(date: string): string {
  return date.replace(/-/g, '');
}
