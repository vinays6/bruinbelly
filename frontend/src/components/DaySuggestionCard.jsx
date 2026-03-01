export default function DaySuggestionCard({ day, isSelected, onClick }) {
  return (
    <div onClick={onClick} className={`rounded-3xl p-4 shrink-0 w-52 cursor-pointer transition-all border
      ${isSelected
        ? 'bg-orange-500 text-white border-orange-400 shadow-lg'
        : 'bg-white text-stone-700 border-stone-100 shadow-sm hover:shadow-md'}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className={`text-xs font-bold uppercase tracking-widest ${isSelected ? 'text-white/70' : 'text-stone-400'}`}>{day.day}</p>
          <p className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-stone-600'}`}>{day.date}</p>
        </div>
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl ${isSelected ? 'bg-white/20' : 'bg-stone-50'}`}>
          {day.emoji}
        </div>
      </div>
      {isSelected && <span className="inline-block text-xs font-bold bg-white/25 text-white px-2 py-0.5 rounded-full mb-2">Today</span>}
      <p className={`font-display font-semibold text-sm leading-tight mb-1 ${isSelected ? 'text-white' : 'text-stone-800'}`}>{day.meal}</p>
      <p className={`text-xs mb-3 ${isSelected ? 'text-white/70' : 'text-stone-400'}`}>📍 {day.restaurant}</p>
      <div className={`rounded-2xl p-2.5 ${isSelected ? 'bg-white/15' : 'bg-stone-50'}`}>
        <p className={`text-xs leading-relaxed ${isSelected ? 'text-white/90' : 'text-stone-500'}`}>
          <span className="font-semibold">Why: </span>{day.why}
        </p>
      </div>
    </div>
  );
}
