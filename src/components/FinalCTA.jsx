// components/FinalCTA.jsx
import React, { useEffect } from "react";
import PixelCard from "../assets/style/PixelCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FinalCTA = () => {
  const nav = useNavigate();
  const game = useSelector((state) => state.game);
  const audioRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [musicPlaying, setMusicPlaying] = React.useState(false);

  // Preload video for instant playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  // Play/Pause music
  const handleMusicToggle = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play();
      setMusicPlaying(true);
    }
  };

  // Stop music when PLAY NOW is clicked
  const handlePlayNow = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setMusicPlaying(false);
    }
    nav("/map");
  };

  return (
    <section
      className="relative bg-gradient-to-t from-black via-blue-950 to-black snap-start flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 text-white overflow-hidden"
    >
      {/* Background music before PLAY NOW */}
      <audio
        ref={audioRef}
        src="./musicbeforeplaybutton.mp3"
        loop
        volume={0.5}
        style={{ display: "none" }}
      />
      {/* Play/Pause Music Button */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={handleMusicToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold shadow-lg border-2 border-white/30 focus:outline-none transition-all duration-300 ${musicPlaying ? 'animate-spin-slow' : ''}`}
          style={{ minWidth: 120 }}
        >
          {musicPlaying ? (
            <span role="img" aria-label="pause">⏸️</span>
          ) : (
            <span role="img" aria-label="play">▶️</span>
          )}
          {musicPlaying ? 'Pause Music' : 'Play Music'}
        </button>
      </div>
      {/* Enhanced Hero Section with Icons */}
      <div className="relative flex flex-col items-center justify-center flex-1 w-full max-w-7xl mx-auto py-12">
        {/* Title Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-widest mb-4 bg-gradient-to-r from-cyan-300 via-purple-300 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">
            BEGIN YOUR QUEST
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto shadow-lg shadow-cyan-400/50 mb-4" />
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-md mx-auto">
            Embark on a magical quest: Use your SQL skills to rescue Santa from the dragon's lair and bring joy back to waiting children! 🎅🐉✨
          </p>
        </div>

        {/* Game Icons + PixelCard Container */}
        <div className="relative flex items-center justify-center">
          {/* Floating Game Icons */}
          <GameIcon
            icon="⚔️"
            className="absolute -top-16 -left-16 sm:-top-20 sm:-left-20 lg:-top-24 lg:-left-32"
            delay="0s"
          />
          <GameIcon
            icon="🐉"
            className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 lg:-top-20 lg:-right-28"
            delay="0.5s"
          />
          <GameIcon
            icon="📜"
            className="absolute -bottom-12 -left-8 sm:-bottom-16 sm:-left-12 lg:-bottom-20 lg:-left-24"
            delay="1s"
          />
          <GameIcon
            icon="💎"
            className="absolute -bottom-8 -right-16 sm:-bottom-12 sm:-right-20 lg:-bottom-16 lg:-right-32"
            delay="1.5s"
          />
          <GameIcon
            icon="🗡️"
            className="absolute top-1/2 -left-20 sm:-left-28 lg:-left-40 transform -translate-y-1/2"
            delay="2s"
          />
          <GameIcon
            icon="🔮"
            className="absolute top-1/2 -right-20 sm:-right-28 lg:-right-40 transform -translate-y-1/2"
            delay="2.5s"
          />
          <GameIcon
            icon="🏰"
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 sm:-top-12 lg:-top-16"
            delay="3s"
          />
          <GameIcon
            icon="⭐"
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 sm:-bottom-8 lg:-bottom-12"
            delay="3.5s"
          />

          {/* Autoplay video (looping, muted) placed above the CTA button */}
          <div className="w-full flex justify-center mb-6">
            <video
              ref={videoRef}
              src="./Santa_s_Mysterious_Jungle_Cage.mp4"
              className="w-full max-w-4xl rounded-xl shadow-2xl"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>

          {/* Enhanced Responsive PixelCard */}
          <div className="scale-75 sm:scale-90 md:scale-100 transition-transform duration-300">
            <PixelCard variant="blue">
              <div className="flex flex-col items-center gap-2">
                {/* Festive decorations above */}
                <div className="flex gap-2 text-xl md:text-2xl lg:text-3xl animate-pulse">
                  <span role="img" aria-label="snowflake">❄️</span>
                  <span role="img" aria-label="sparkles">✨</span>
                  <span role="img" aria-label="snowflake">❄️</span>
                </div>
                <button
                  className="cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-500 text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold tracking-widest px-6 py-2 rounded-xl shadow-lg border-2 border-white/60 hover:scale-105 hover:from-blue-400 hover:to-cyan-500 hover:border-cyan-300 transition-all duration-200 flex items-center gap-2"
                  onClick={handlePlayNow}
                >
                  <span role="img" aria-label="game controller">🎮</span>
                  PLAY NOW
                  <span role="img" aria-label="tree">🎄</span>
                </button>
                {/* Festive decorations below */}
                <div className="flex gap-2 text-xl md:text-2xl lg:text-3xl animate-pulse">
                  <span role="img" aria-label="sparkles">✨</span>
                  <span role="img" aria-label="snowflake">❄️</span>
                  <span role="img" aria-label="sparkles">✨</span>
                </div>
              </div>
            </PixelCard>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="w-full flex flex-col sm:flex-row items-center justify-between border-t border-white/30 pt-6 pb-4 text-sm text-white/80 max-w-6xl mx-auto gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl w-8">
            <img 
             src= "./rock.webp"
            />
          </span>
          <div className="tracking-widest font-semibold text-base md:text-lg text-white drop-shadow-sm">
            Mission Rescue Santa
          </div>
        </div>

        <div className="text-center sm:text-right leading-snug">
          <div className="font-semibold text-white/90 uppercase tracking-wide text-sm md:text-base">
            Innovators 2099
          </div>
          <div className="text-white/70 text-xs md:text-sm">SRM institute of science and technologies, KTR</div>
        </div>
      </footer>
    </section>
  );
};

// Floating Game Icon Component
const GameIcon = ({ icon, className, delay = "0s" }) => (
  <div
    className={`text-2xl sm:text-3xl md:text-4xl opacity-20 hover:opacity-60 transition-all duration-500 animate-bounce ${className}`}
    style={{
      animationDelay: delay,
      animationDuration: "3s",
      filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))",
    }}
  >
    {icon}
  </div>
);

// Mini Stat Cards
const StatCard = ({ icon, label }) => (
  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
    <span className="text-lg">{icon}</span>
    <span className="text-xs sm:text-sm font-medium">{label}</span>
  </div>
);

export default FinalCTA;
