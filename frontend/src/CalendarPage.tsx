import { useState } from 'react';
import DaySuggestionCard from '../components/DaySuggestionCard';

const DAYS = [
  { day: 'Mon', date: '[date]', restaurantName: '[restaurant_name]', llmSummary: '[llm_summary]', emoji: '🍜' },
  { day: 'Tue', date: '[date]', restaurantName: '[restaurant_name]', llmSummary: '[llm_summary]', emoji: '🥗' },
  { day: 'Wed', date: '[date]', restaurantName: '[restaurant_name]', llmSummary: '[llm_summary]', emoji: '🍕' },
  { day: 'Thu', date: '[date]', restaurantName: '[restaurant_name]', llmSummary: '[llm_summary]', emoji: '🌮' },
  { day: 'Fri', date: '[date]', restaurantName: '[restaurant_name]', llmSummary: '[llm_summary]', emoji: '🍱' },
  { day: 'Sat', date: '[date]', restaurantName: '[restaurant_name]', llmSummary: '[llm_summary]', emoji: '🥘' },
  { day: 'Sun', date: '[date]', restaurantName: '[restaurant_name]', llmSummary: '[llm_summary]', emoji: '🍔' },
];

export default function CalendarPage() {
  const [todayIdx] = useState(2); // Wednesday as "today"
  const [selected, setSelected] = useState(todayIdx);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="px-5 pt-10 animate-fade-in">
      {/* Header */}
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-brand-text">Weekly Picks</h1>
        <p className="font-body text-sm text-brand-muted mt-1">AI-suggested meals for each day</p>
      </div>

      {/* Day selector — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-5 -mx-5 px-5">
        {DAYS.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setSelected(i)}
            aria-label={`${d.day} ${d.date}`}
            aria-pressed={selected === i}
            className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-2xl transition-all ${
              selected === i
                ? 'bg-brand-primary text-white shadow-soft'
                : i === todayIdx
                ? 'bg-pastel-peach text-brand-text border border-brand-primary/30'
                : 'bg-white text-brand-muted border border-brand-border'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wide font-body">{d.day}</span>
            <span className="text-lg">{d.emoji}</span>
            {i === todayIdx && (
              <span className={`text-[9px] font-bold font-body ${selected === i ? 'text-white/70' : 'text-brand-primary'}`}>
                TODAY
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Selected day detail */}
      <div className="mb-5 animate-scale-in" key={selected}>
        <div
          className="rounded-3xl p-5 shadow-float"
          style={{ background: 'linear-gradient(135deg, #FFD6CC, #D4C5F9)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-brand-text/60">
              {DAYS[selected].day} · {DAYS[selected].date}
            </span>
            <span className="text-3xl">{DAYS[selected].emoji}</span>
          </div>
          <h2 className="font-display text-xl font-semibold text-brand-text mb-2">
            {DAYS[selected].restaurantName}
          </h2>
          <p className="font-body text-sm text-brand-text/70 leading-relaxed">
            Why: {DAYS[selected].llmSummary}
          </p>
        </div>
      </div>

      {/* Full week grid */}
      <div>
        <h2 className="font-body text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">
          Full Week
        </h2>
        <div className="space-y-2.5">
          {DAYS.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setSelected(i)}
              className="w-full text-left"
              aria-label={`Select ${d.day}`}
            >
              <DaySuggestionCard
                {...d}
                isToday={i === selected}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Export button */}
      <div className="mt-6 mb-2">
        <button
          onClick={handleExport}
          aria-label="Export week to calendar"
          className={`w-full py-3.5 rounded-2xl font-body font-semibold text-sm transition-all active:scale-95 ${
            exported
              ? 'bg-pastel-mint text-brand-text'
              : 'bg-brand-soft border border-brand-border text-brand-text'
          }`}
        >
          {exported ? '✅ Added to Calendar!' : '📅 Export to Calendar'}
        </button>
      </div>
    </div>
  );
}
