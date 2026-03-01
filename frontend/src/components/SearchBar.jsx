export default function SearchBar({ value, onChange, placeholder = 'Search menu items...' }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-base pointer-events-none">🔍</span>
      <input
        type="text" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} aria-label="Search food items"
        className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-stone-100
                   text-stone-800 placeholder-stone-400 text-sm font-medium
                   shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all" />
      {value && (
        <button onClick={() => onChange('')} aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-sm">✕</button>
      )}
    </div>
  );
}
