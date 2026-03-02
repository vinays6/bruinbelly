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

function normalizeDateParam(date) {
  if (!date) return date;
  return date.replace(/-/g, '');
}
