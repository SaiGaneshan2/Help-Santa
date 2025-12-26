
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
import React from 'react';
import MusicControl from './components/MusicControl';

function App() {
  const dispatch = useDispatch();
  const audioRef = React.useRef(null);
  const [musicPlaying, setMusicPlaying] = React.useState(false);

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
      {/* Persistent background music */}
      <audio
        ref={audioRef}
        src="/sorrythisbeforeplay.mp3"
        loop
        volume={0.5}
        style={{ display: "none" }}
      />
      <MusicControl audioRef={audioRef} musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} />
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
