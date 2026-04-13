import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AUDIO_SRC = "https://cdn.pixabay.com/download/audio/2021/04/15/audio_2ba2f2ae0a.mp3?filename=indian-flute-13-88220.mp3";

// Extend window for TS
declare global {
  interface Window {
    __weddingAudio: HTMLAudioElement | null;
  }
}

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // 1. Kill any ghost/orphan audio from a previous Vite hot-reload.
    if (window.__weddingAudio) {
      window.__weddingAudio.pause();
      window.__weddingAudio.removeAttribute('src'); // Force drop buffer
      window.__weddingAudio = null;
    }

    // 2. Initialize the fresh, true singleton Audio instance.
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.4;
    window.__weddingAudio = audio;

    // 3. Keep UI in perfect sync with the singleton
    const syncPlay = () => setPlaying(true);
    const syncPause = () => setPlaying(false);
    
    audio.addEventListener("play", syncPlay);
    audio.addEventListener("pause", syncPause);

    return () => {
      // Clean up cleanly on unmount (Vite reload)
      audio.removeEventListener("play", syncPlay);
      audio.removeEventListener("pause", syncPause);
      audio.pause();
      audio.removeAttribute('src');
      if (window.__weddingAudio === audio) {
         window.__weddingAudio = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    const audio = window.__weddingAudio;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(console.warn);
    } else {
      audio.pause();
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className={`fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 hover:scale-110 shadow-xl backdrop-blur-md
        ${playing ? 'bg-wedding-dark/90 border-wedding-gold-light/40 animate-none' : 'bg-wedding-deep-red/80 border-wedding-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] animate-pulse-glow'}
      `}
      aria-label="Toggle music"
    >
      {playing ? (
        <Volume2 className="w-5 h-5 text-wedding-gold-light opacity-80" />
      ) : (
        <VolumeX className="w-5 h-5 text-wedding-gold opacity-100" />
      )}
    </button>
  );
};

export default MusicToggle;
