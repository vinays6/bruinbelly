import { useAppStore } from '../store/useAppStore';
import ToggleSwitch from '../components/ToggleSwitch';
import { useState } from 'react';

export default function SettingsPage() {
  const { currentUser, darkMode, toggleDarkMode } = useAppStore();
  const [notifMatches, setNotifMatches] = useState(true);
  const [notifNew, setNotifNew] = useState(false);

  return (
    <div className="px-5 pt-10 animate-fade-in">
      {/* Header */}
      <div className="mb-7">
        <h1 className="font-display text-2xl font-semibold text-brand-text">Settings</h1>
        <p className="font-body text-sm text-brand-muted mt-1">Manage your BruinBites preferences</p>
      </div>

      {/* Profile card */}
      <section aria-label="Profile" className="mb-6">
        <h2 className="font-body text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">
          Profile
        </h2>
        <div className="bg-white rounded-3xl border border-brand-border shadow-soft p-5">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-brand-text font-body shadow-soft"
              style={{ background: 'linear-gradient(135deg, #FFD6CC, #D4C5F9)' }}
            >
              {currentUser.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-body font-semibold text-brand-text text-base">{currentUser}</p>
              <p className="font-body text-xs text-brand-muted mt-0.5">UCLA Student</p>
              <span className="inline-block mt-1.5 bg-pastel-butter text-brand-text text-[10px] font-bold px-2 py-0.5 rounded-full font-body">
                🐻 Bruin Foodie
              </span>
            </div>
          </div>

          <div className="border-t border-brand-border pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-brand-muted">Favorite food</p>
                <p className="font-body text-sm font-semibold text-brand-text mt-0.5">[favorite_item]</p>
              </div>
              <button
                aria-label="Edit favorite food"
                className="text-brand-primary font-body text-sm font-medium"
              >
                Edit
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-brand-muted">Ratings given</p>
                <p className="font-body text-sm font-semibold text-brand-text mt-0.5">[#] total</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-brand-muted">Member since</p>
                <p className="font-body text-sm font-semibold text-brand-text mt-0.5">[date]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section aria-label="Notification settings" className="mb-6">
        <h2 className="font-body text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">
          Notifications
        </h2>
        <div className="bg-white rounded-3xl border border-brand-border shadow-soft p-5 space-y-5">
          <ToggleSwitch
            id="notif-matches"
            label="🔔 Notifications for new ratings"
            checked={notifMatches}
            onChange={() => setNotifMatches((v) => !v)}
          />
          <div className="border-t border-brand-border" />
          <ToggleSwitch
            id="notif-new"
            label="🍽️ New menu item alerts"
            checked={notifNew}
            onChange={() => setNotifNew((v) => !v)}
          />
        </div>
      </section>

      {/* Appearance */}
      <section aria-label="Appearance settings" className="mb-6">
        <h2 className="font-body text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">
          Appearance
        </h2>
        <div className="bg-white rounded-3xl border border-brand-border shadow-soft p-5">
          <ToggleSwitch
            id="dark-mode"
            label="🌙 Dark Mode"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </div>
      </section>

      {/* About */}
      <section aria-label="About" className="mb-8">
        <h2 className="font-body text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">
          About
        </h2>
        <div className="bg-white rounded-3xl border border-brand-border shadow-soft p-5 space-y-3">
          {['Privacy Policy', 'Terms of Service', 'Contact Us', 'Rate the App'].map((item) => (
            <button
              key={item}
              aria-label={item}
              className="w-full flex items-center justify-between py-1 active:opacity-60 transition-opacity"
            >
              <span className="font-body text-sm text-brand-text">{item}</span>
              <span className="text-brand-muted text-sm">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* Sign out */}
      <button
        aria-label="Sign out"
        className="w-full py-3.5 rounded-2xl border border-red-200 bg-red-50 text-red-500 font-body font-semibold text-sm mb-4 active:scale-95 transition-transform"
      >
        Sign Out
      </button>

      <p className="text-center font-body text-xs text-brand-muted mb-4">
        BruinBites v1.0.0 · Made with 🐻 at UCLA
      </p>
    </div>
  );
}
