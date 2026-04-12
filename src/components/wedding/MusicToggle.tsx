import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      onClick={() => setPlaying(!playing)}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center gold-border-strong animate-pulse-glow bg-wedding-deep-red/80 backdrop-blur-sm transition-transform hover:scale-110"
      aria-label="Toggle music"
    >
      {playing ? (
        <Volume2 className="w-5 h-5 text-wedding-gold" />
      ) : (
        <VolumeX className="w-5 h-5 text-wedding-gold" />
      )}
    </button>
  );
};

export default MusicToggle;
