import { useEffect, useState } from 'react';
import './index.css';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import FeedPage from './pages/FeedPage';
import CalendarPage from './pages/CalendarPage';
import SettingsPage from './pages/SettingsPage';
import RatingPage from './pages/RatingPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './AuthContext';
import { fetchMenuIfNeeded } from './store/menuStore';

function AppMain() {
  const [page, setPage]         = useState('home');
  const [itemId, setItemId]     = useState(null);
  const [history, setHistory]   = useState(['home']);
  const { user, login, logout } = useAuth();

  useEffect(() => {
    fetchMenuIfNeeded();
  }, []);

  // Navigate forward
  const handleNav = (nextPage, nextItemId = null) => {
    setHistory((h) => [...h, nextPage]);
    setPage(nextPage);
    setItemId(nextItemId);
    window.scrollTo(0, 0);
  };

  // Navigate back
  const handleBack = () => {
    if (history.length <= 1) {
      handleNav('home');
      return;
    }
    const prev = history[history.length - 2];
    setHistory((h) => h.slice(0, -1));
    setPage(prev);
    setItemId(null);
    window.scrollTo(0, 0);
  };

  const isRatingPage = page === 'rate';

  if (!user) {
    return (
      <LoginPage onLogin={login} />
    );
  }

  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: '#FFFBF8' }}>
      <div className="w-full max-w-md relative">
        <main className={isRatingPage ? 'min-h-screen' : 'pb-24 min-h-screen'}>
          {page === 'home'     && <HomePage     onNav={handleNav} />}
          {page === 'menu'     && <MenuPage     onNav={handleNav} />}
          {page === 'feed'     && <FeedPage />}
          {page === 'calendar' && <CalendarPage />}
          {page === 'settings' && <SettingsPage />}
          {page === 'rate'     && (
            <RatingPage
              itemId={itemId}
              onBack={handleBack}
              onNav={handleNav}
            />
          )}
        </main>

        {/* Hide bottom nav on rating page for immersive experience */}
        {!isRatingPage && (
          <BottomNav active={page} onNav={handleNav} />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppMain />
    </AuthProvider>
  );
}
