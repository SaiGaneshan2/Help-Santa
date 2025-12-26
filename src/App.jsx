
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from './config/supabase';
import { setUser } from './redux/authSlice';
import HomePage from './pages/HomePage';
import LevelPage from './pages/LevelPage';
import MapScreen from './pages/MapScreen';
import LevelReadingPage from './pages/LevelReadingPage';
import AuthGuard from './components/auth/AuthGuard';
import UserProfile from './components/UserProfile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setUser(session?.user ?? null));
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(session?.user ?? null));
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Routes>
          {/* Public route - no authentication required */}
          <Route path="/" element={<HomePage />} />
          
          {/* Protected routes - authentication required */}
          <Route path="/map" element={
            <AuthGuard>
              <MapScreen />
            </AuthGuard>
          } />
          <Route path="/level/:id" element={
            <AuthGuard>
              <LevelPage />
            </AuthGuard>
          } />
          <Route path="/level-reading/:levelId" element={
            <AuthGuard>
              <LevelReadingPage />
            </AuthGuard>
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
