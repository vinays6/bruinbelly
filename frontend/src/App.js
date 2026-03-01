import { useState } from 'react';
import './index.css';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import FeedPage from './pages/FeedPage';
import CalendarPage from './pages/CalendarPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [page, setPage] = useState('home');

  const pages = {
    home:     <HomePage onNav={setPage} />,
    menu:     <MenuPage />,
    feed:     <FeedPage />,
    calendar: <CalendarPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: '#FFFBF8' }}>
      <div className="w-full max-w-md relative">
        <main className="pb-24 min-h-screen">
          {pages[page]}
        </main>
        <BottomNav active={page} onNav={setPage} />
      </div>
    </div>
  );
}
