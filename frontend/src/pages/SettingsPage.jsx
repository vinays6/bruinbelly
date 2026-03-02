import { useState } from 'react';
import ToggleSwitch from '../components/ToggleSwitch';
import { CURRENT_USER } from '../data/placeholders';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [allergyAlerts, setAllergyAlerts] = useState(false);

  const toggleRows = [
    { id: 'notif',   icon: '🔔', label: 'Notifications',    sub: 'Get alerts when friends rate items', val: notifications,  set: () => setNotifications(p => !p) },
    { id: 'dark',    icon: '🌙', label: 'Dark Mode',         sub: 'Switch to dark theme',               val: darkMode,       set: () => setDarkMode(p => !p)       },
    { id: 'allergy', icon: '⚠️', label: 'Allergy Alerts',    sub: 'Warn me about dietary conflicts',    val: allergyAlerts,  set: () => setAllergyAlerts(p => !p)  },
  ];

  const infoRows = [
    { icon: '🍜', label: 'Favorite Food',       value: 'Ramen Bowl' },
    { icon: '🏛️', label: 'Home Dining Hall',    value: 'De Neve Dining Hall' },
    { icon: '🌱', label: 'Dietary Preferences', value: 'No pork, low dairy'  },
    { icon: '🎓', label: 'UCLA Year',           value: 'Senior (2026)'   },
  ];

  return (
    <div className="px-4 pt-10 pb-8">
      <div className="mb-6 animate-fade-up">
        <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-1">⚙️ Account</p>
        <h1 className="font-display text-3xl font-bold text-stone-800">Settings</h1>
      </div>

      {/* Profile card */}
      <div className="animate-fade-up delay-1 mb-6">
        <div className="rounded-3xl p-5 flex items-center gap-4 shadow-sm border border-white/60"
             style={{ background: 'linear-gradient(135deg, #FFD6BA 0%, #FFB5C8 100%)' }}>
          <div className="w-16 h-16 rounded-full bg-white/50 border-2 border-white flex items-center justify-center
                         font-display font-bold text-2xl text-stone-700 shrink-0">
            {CURRENT_USER.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-display font-bold text-xl text-stone-800">{CURRENT_USER}</p>
            <p className="text-sm text-stone-500">🐻 UCLA Student</p>
            <p className="text-xs text-stone-400 mt-0.5">26 ratings · 73 liked</p>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="animate-fade-up delay-2 mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 pl-1">Preferences</p>
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
          {toggleRows.map((row, i) => (
            <div key={row.id}
              className={`flex items-center gap-3 px-4 py-3.5 ${i < toggleRows.length - 1 ? 'border-b border-stone-50' : ''}`}>
              <div className="w-9 h-9 rounded-2xl bg-stone-50 flex items-center justify-center text-lg shrink-0">{row.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-stone-800">{row.label}</p>
                <p className="text-xs text-stone-400 truncate">{row.sub}</p>
              </div>
              <ToggleSwitch enabled={row.val} onToggle={row.set} label={row.label} id={row.id} />
            </div>
          ))}
        </div>
      </div>

      {/* Profile info */}
      <div className="animate-fade-up delay-3 mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 pl-1">Dining Profile</p>
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
          {infoRows.map((row, i) => (
            <div key={row.label}
              className={`flex items-center gap-3 px-4 py-3.5 ${i < infoRows.length - 1 ? 'border-b border-stone-50' : ''}`}>
              <div className="w-9 h-9 rounded-2xl bg-stone-50 flex items-center justify-center text-lg shrink-0">{row.icon}</div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-stone-800">{row.label}</p>
              </div>
              <span className="text-xs text-stone-400 font-medium max-w-[120px] text-right truncate">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8 animate-fade-up delay-4">
<<<<<<< HEAD
        <p className="text-xs text-stone-300">BruinBites v0.9.2-demo · UCLA Exclusive 🐻</p>
        <p className="text-xs text-stone-300 mt-0.5">Backend: Connected</p>
=======
        <p className="text-xs text-stone-300">BruinBelly [version] · UCLA Exclusive 🐻</p>
        <p className="text-xs text-stone-300 mt-0.5">[Backend: Not connected]</p>
>>>>>>> 3eb8c8ef2fb19ac55383927e1fcee2660345776c
      </div>
    </div>
  );
}
