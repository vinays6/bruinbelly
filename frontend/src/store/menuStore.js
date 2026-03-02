import { getItemRatingsSummary, getItemsByMealPeriod } from '../services/api';

export const DINING_HALLS_META = [
  {
    id: 1,
    slug: 'de-neve',
    name: 'De Neve Dining Hall',
    emoji: '🏛️',
    bgColor: '#FFD6BA',
  },
  {
    id: 3,
    slug: 'epicuria',
    name: 'Epicuria at Covel',
    emoji: '🌿',
    bgColor: '#C8ECDC',
  },
  {
    id: 2,
    slug: 'bruin-plate',
    name: 'Bruin Plate',
    emoji: '🥦',
    bgColor: '#B8F0D4',
  },
  {
    id: 8,
    slug: 'feast',
    name: 'Feast at Rieber',
    emoji: '🍜',
    bgColor: '#FFF3B8',
  },
];

let store = {
  menuByHall: {},
  allMenuItems: [],
  selectedDate: getTodayDateString(),
  loading: false,
  error: null,
};

const listeners = new Set();

function notify() {
  const snapshot = { ...store };
  listeners.forEach((fn) => fn(snapshot));
}

export function getMenuStore() {
  return store;
}

export function subscribeMenu(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

let inFlightPromise = null;
let latestRequestToken = 0;

export async function fetchMenuIfNeeded(date = store.selectedDate) {
  const requestedDate = normalizeDate(date);
  const requestToken = ++latestRequestToken;
  console.log('[menu] Fetch requested for date:', requestedDate);

  if (store.loading && inFlightPromise && store.selectedDate === requestedDate) {
    return inFlightPromise;
  }

  if (
    store.selectedDate === requestedDate &&
    store.allMenuItems.length > 0 &&
    !store.error
  ) {
    console.log('[menu] Using cached menu for date:', requestedDate);
    return store;
  }

  store = { ...store, selectedDate: requestedDate, loading: true, error: null };
  notify();

  const promise = (async () => {
    // console.log("HI1");
    try {
      // console.log("HI");
      const menuByHall = {};
      const allMenuItems = [];

      for (const hall of DINING_HALLS_META) {
        // console.log("HI3");
        const itemsByMealPeriod = await getItemsByMealPeriod(hall.id, requestedDate);

        const categories = Object.entries(itemsByMealPeriod).map(
          ([mealPeriod, items]) => {
            // console.log("HI4");
            const categoryId = `${hall.id}-${mealPeriod}`;
            const categoryName = formatMealPeriod(mealPeriod);

            const categoryItems = items
              .filter((item) => {
                if (!item?.date) return true;
                return normalizeDate(item.date) === requestedDate;
              })
              .map((item) => {
              const dietaryLabels = buildDietaryLabels(item);
              const allergens = buildAllergenLabels(item);

              const menuItem = {
                id: item.id,
                name: item.name,
                hallId: hall.id,
                hallName: hall.name,
                mealPeriod,
                category: categoryName,
                dietaryLabels,
                allergens,
                ingredients: [],
                rating: 0,
                dietary: dietaryLabels[0] || '',
                recipeUrl: buildRecipeUrl(item.id),
              };

              allMenuItems.push(menuItem);
              return menuItem;
            });

            return {
              id: categoryId,
              name: categoryName,
              hallId: hall.id,
              hallName: hall.name,
              items: categoryItems,
            };
          },
        );

        menuByHall[hall.id] = {
          hall,
          categories,
        };
      }

      const uniqueItemIds = [...new Set(allMenuItems.map((item) => Number(item.id)).filter(Number.isFinite))];
      const ratingsSummaryById = uniqueItemIds.length > 0
        ? await getItemRatingsSummary(uniqueItemIds)
        : {};

      applyRatingsSummaryToItems(allMenuItems, ratingsSummaryById);

      // if (requestToken !== latestRequestToken) {
      //   console.log("hi6");
      //   return store;
      // }

      // console.log("hi5");

      store = {
        ...store,
        menuByHall,
        allMenuItems,
        selectedDate: requestedDate,
        loading: false,
        error: null,
      };
      notify();
      console.log('[menu] Loaded menu items:', allMenuItems.length);
      return store;
    } catch (error) {
      console.error('Failed to load menu', error);

      const isTimeout = error?.code === 'ECONNABORTED';
      const isNetworkError =
        error?.message === 'Network Error' ||
        error?.response == null;

      const message =
        isTimeout || isNetworkError
          ? 'Menu unavailable — check backend connection'
          : 'Failed to load menu';

      if (requestToken !== latestRequestToken) {
        return store;
      }

      store = {
        ...store,
        selectedDate: requestedDate,
        loading: false,
        error: message,
      };
      notify();
      return store;
    } finally {
      inFlightPromise = null;
    }
  })();

  inFlightPromise = promise;
  return promise;
}

export async function refreshRatingsForItems(itemIds) {
  const normalizedIds = [...new Set((itemIds || []).map((id) => Number(id)).filter(Number.isFinite))];
  if (normalizedIds.length === 0) return store;
  if (!store.allMenuItems.length) return store;

  try {
    const ratingsSummaryById = await getItemRatingsSummary(normalizedIds);
    const nextAllItems = store.allMenuItems.map((item) => ({ ...item }));
    applyRatingsSummaryToItems(nextAllItems, ratingsSummaryById);
    const itemById = new Map(nextAllItems.map((item) => [String(item.id), item]));
    const nextMenuByHall = Object.fromEntries(
      Object.entries(store.menuByHall).map(([hallId, hallEntry]) => ([
        hallId,
        {
          ...hallEntry,
          categories: hallEntry.categories.map((category) => ({
            ...category,
            items: category.items.map((item) => itemById.get(String(item.id)) || item),
          })),
        },
      ])),
    );

    store = {
      ...store,
      menuByHall: nextMenuByHall,
      allMenuItems: nextAllItems,
    };
    notify();
    return store;
  } catch (error) {
    console.error('Failed to refresh item ratings', error);
    return store;
  }
}

function getTodayDateString() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;
  const iso = `${year}-${month}-${day}`;
  return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : new Date().toISOString().slice(0, 10);
}

function normalizeDate(date) {
  if (typeof date !== 'string') return getTodayDateString();
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : getTodayDateString();
}

function formatMealPeriod(key) {
  if (!key) return 'Menu';
  return key
    .toString()
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
}

function buildDietaryLabels(item) {
  const labels = [];
  if (item.vegetarian) labels.push('Vegetarian');
  if (item.vegan) labels.push('Vegan');
  if (item.low_carbon) labels.push('Low carbon');
  if (item.high_carbon) labels.push('High carbon');
  if (item.halal) labels.push('Halal');
  return labels;
}

function buildAllergenLabels(item) {
  const labels = [];
  if (item.soy) labels.push('Contains soy');
  if (item.gluten) labels.push('Contains gluten');
  if (item.wheat) labels.push('Contains wheat');
  if (item.dairy) labels.push('Contains dairy');
  if (item.egg) labels.push('Contains egg');
  if (item.sesame) labels.push('Contains sesame');
  if (item.tree_nuts) labels.push('Contains tree nuts');
  if (item.fish) labels.push('Contains fish');
  if (item.shellfish) labels.push('Contains shellfish');
  if (item.alcohol) labels.push('Contains alcohol');
  if (item.peanuts) labels.push('Contains peanuts');
  return labels;
}

function buildRecipeUrl(itemId) {
  if (!itemId) return '';
  return `https://dining.ucla.edu/menu-item/?recipe=${itemId}`;
}

function applyRatingsSummaryToItems(items, ratingsSummaryById) {
  for (const item of items) {
    const summary = ratingsSummaryById?.[String(item.id)];
    const avgRating = summary?.avg_rating;
    item.rating = Number.isFinite(avgRating) ? avgRating * 2 : null;
  }
}
