import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MenuItemCard from '../components/MenuItemCard';
import { getMenuStore, subscribeMenu, fetchMenuIfNeeded } from '../store/menuStore';

export default function MenuPage({ onNav }) {
  const [query, setQuery]     = useState('');
  const [selectedDate, setSelectedDate] = useState(
    () => getValidDateOrToday(getMenuStore().selectedDate),
  );
  const [expanded, setExpanded] = useState({ 1: true });
  const [menuState, setMenuState] = useState(() => getMenuStore());
  const isCompleteDate = /^\d{4}-\d{2}-\d{2}$/.test(selectedDate);
  const requestDate = isCompleteDate ? selectedDate : getValidDateOrToday(selectedDate);

  useEffect(() => {
    const unsubscribe = subscribeMenu(setMenuState);
    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchMenuIfNeeded(requestDate);
    if (!isCompleteDate) {
      setSelectedDate(requestDate);
    }
  }, [requestDate, isCompleteDate]);

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const { menuByHall, loading, error } = menuState;

  const normalizedQuery = query.trim().toLowerCase();

  const halls = Object.values(menuByHall).map(({ hall, categories }) => {
    const filteredCategories = categories
      .map((category) => {
        const filteredItems = category.items.filter((item) => {
          if (!normalizedQuery) return true;
          const inName = item.name.toLowerCase().includes(normalizedQuery);
          const inCategory = category.name.toLowerCase().includes(normalizedQuery);
          const inHall = hall.name.toLowerCase().includes(normalizedQuery);
          return inName || inCategory || inHall;
        });
        return { ...category, items: filteredItems };
      })
      .filter((category) => category.items.length > 0 || !normalizedQuery);

    const itemsCount = filteredCategories.reduce(
      (acc, category) => acc + category.items.length,
      0,
    );

    return { hall, categories: filteredCategories, itemsCount };
  }).filter((entry) => entry.categories.length > 0 || !normalizedQuery);

  const totalResults = halls.reduce(
    (acc, h) =>
      acc +
      h.categories.reduce((inner, c) => inner + c.items.length, 0),
    0,
  );

  return (
    <div className="px-4 pt-10">
      <div className="mb-5 animate-fade-up">
        <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-1">Menu</p>
        <h1 className="font-display text-3xl font-bold text-stone-800">The Hill Dining</h1>
        <p className="text-sm text-stone-400 mt-1">
          {loading
            ? 'Loading items...'
            : `${menuState.allMenuItems.length || 0} items available`}
        </p>
      </div>

      {/* Sticky search */}
      <div className="sticky top-0 bg-[#FFFBF8]/95 backdrop-blur-sm pt-1 pb-3 z-10 animate-fade-up delay-1">
        <div className="mb-3">
          <label
            htmlFor="menu-date-picker"
            className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-1 block"
          >
            Menu Date
          </label>
          <input
            id="menu-date-picker"
            type="date"
            value={selectedDate}
            onChange={(event) => {
              const nextValue = event.target.value;
              setSelectedDate(nextValue);
            }}
            className="w-full rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>
        <SearchBar value={query} onChange={setQuery} />
        {query && (
          <p className="text-xs text-stone-400 mt-2 pl-1">
            {totalResults} results for "{query}"
          </p>
        )}
      </div>

      <div className="space-y-4 animate-fade-up delay-2">
        {loading && !Object.keys(menuByHall).length && (
          <div className="space-y-3">
            {[1, 2, 3].map((key) => (
              <div
                key={key}
                className="w-full flex items-center gap-3 p-3.5 rounded-3xl bg-white border border-stone-100 shadow-sm animate-pulse"
              >
                <div className="w-11 h-11 rounded-2xl bg-stone-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 rounded-full bg-stone-100" />
                  <div className="h-3 w-20 rounded-full bg-stone-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">⚠️</p>
            <p className="font-semibold text-stone-600">{error}</p>
            <p className="text-sm text-stone-400 mt-1">
              Make sure the Flask backend is running on http://localhost:8000.
            </p>
            <button
              onClick={() => fetchMenuIfNeeded(selectedDate)}
              className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-semibold active:scale-95 transition-transform"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && halls.map(({ hall, categories, itemsCount }) => (
          <div key={hall.id}>
            <button
              onClick={() => toggle(hall.id)}
              aria-label={`${expanded[hall.id] ? 'Collapse' : 'Expand'} ${hall.name}`}
              className="w-full flex items-center gap-3 p-3.5 rounded-3xl bg-white border border-stone-100 shadow-sm active:scale-[0.99] transition-transform"
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: hall.bgColor }}
              >
                {hall.emoji}
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-sm text-stone-800">{hall.name}</p>
                <p className="text-xs text-stone-400">{itemsCount} items</p>
              </div>
              <span className={`text-stone-400 text-sm transition-transform duration-200 ${expanded[hall.id] ? 'rotate-180' : ''}`}>
                ▾
              </span>
            </button>

            {expanded[hall.id] && (
              <div className="mt-2 space-y-4 pl-2">
                {categories.map((category) => (
                  <div key={category.id}>
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1 pl-1">
                      {category.name}
                    </p>
                    <div className="space-y-2">
                      {category.items.map((item, i) => (
                        <div
                          key={`${hall.id}-${category.id}-${item.id}-${i}`}
                          className="animate-fade-up"
                          style={{ animationDelay: `${i * 0.05}s` }}
                        >
                          <MenuItemCard
                            item={item}
                            restaurant={hall.name}
                            onRate={(itemId) => onNav('rate', itemId)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {!loading && !error && halls.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-stone-400">No items found</p>
            <p className="text-sm text-stone-300 mt-1">Try a different search</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getValidDateOrToday(value) {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
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
