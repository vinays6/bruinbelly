import { useState } from 'react';
import DaySuggestionCard from '../components/DaySuggestionCard';
import { CALENDAR_DAYS } from '../data/placeholders';

export default function CalendarPage() {
  const [selected, setSelected] = useState(0);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const day = CALENDAR_DAYS[selected];

  return (
    <div className="px-4 pt-10">
      <div className="mb-5 animate-fade-up">
        <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-1">📅 This Week</p>
        <h1 className="font-display text-3xl font-bold text-stone-800">Weekly Picks</h1>
        <p className="text-sm text-stone-400 mt-1">AI-powered dining recommendations just for you</p>
      </div>

      {/* Day pill selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 mb-5 animate-fade-up delay-1">
        {CALENDAR_DAYS.map((d, i) => (
          <button key={d.day} onClick={() => setSelected(i)}
            aria-label={`Select ${d.day} ${d.date}`}
            className={`shrink-0 flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl transition-all
              ${selected === i ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-stone-500 border border-stone-100'}`}>
            <span className="text-xs font-bold uppercase tracking-wider">{d.day}</span>
            <span className="text-lg">{d.emoji}</span>
            <span className="text-xs">{d.date.replace('Mar ', '')}</span>
          </button>
        ))}
      </div>

      {/* Selected day hero card */}
      <div className="mb-6 animate-slide-up delay-1">
        <div className="bg-orange-500 rounded-3xl p-5 shadow-lg text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/70 text-xs uppercase tracking-widest font-semibold mb-1">{day.day}, {day.date}</p>
              <h2 className="font-display font-bold text-2xl leading-tight">{day.meal}</h2>
              <p className="text-white/80 text-sm mt-1">📍 {day.restaurant}</p>
            </div>
            <div className="w-14 h-14 rounded-3xl bg-white/20 flex items-center justify-center text-3xl">{day.emoji}</div>
          </div>
          <div className="bg-white/15 rounded-2xl p-4">
            <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2">✨ Why we recommend this</p>
            <p className="text-sm text-white/90 leading-relaxed">{day.why}</p>
          </div>
        </div>
      </div>

      {/* Horizontal scroll - all days */}
      <div className="mb-6 animate-fade-up delay-2">
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">All Week</p>
        <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4">
          {CALENDAR_DAYS.map((d, i) => (
            <DaySuggestionCard key={d.day} day={d} isSelected={i === selected} onClick={() => setSelected(i)} />
          ))}
        </div>
      </div>

      {/* Export button */}
      <button onClick={handleExport} aria-label="Export weekly meal plan to calendar"
        className={`w-full py-4 rounded-3xl font-semibold text-sm transition-all duration-300 active:scale-[0.98] mb-6
          flex items-center justify-center gap-2
          ${exported ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-white border border-stone-100 text-stone-400 shadow-sm'}`}>
        {exported ? <><span>✅</span> Added to Calendar!</> : <><span>📤</span> Export to Calendar</>}
      </button>
    </div>
  );
}
