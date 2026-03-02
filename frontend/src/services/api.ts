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

function normalizeDateParam(date: string): string {
  return date.replace(/-/g, '');
}
