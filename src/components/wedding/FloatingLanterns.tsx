import { useEffect, useState } from "react";

interface Lantern {
  id: number;
  left: string;
  duration: string;
  delay: string;
  size: string;
  floatX: string;
}

const FloatingLanterns = () => {
  const [lanterns, setLanterns] = useState<Lantern[]>([]);

  useEffect(() => {
    // Only 6 lanterns for maximum performance during scroll-heavy parallax
    const newLanterns = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      duration: `${18 + Math.random() * 15}s`,
      delay: `${Math.random() * -20}s`, // Negative delay for staggered start
      size: `${14 + Math.random() * 12}px`,
      floatX: `${(Math.random() - 0.5) * 60}px`,
    }));
    setLanterns(newLanterns);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[4]">
      {lanterns.map((lantern) => (
        <div
          key={lantern.id}
          className="absolute bottom-[-50px] animate-float-lantern"
          style={{
            left: lantern.left,
            "--float-duration": lantern.duration,
            "--float-x": lantern.floatX,
            animationDelay: lantern.delay,
            willChange: "transform, opacity"
          } as React.CSSProperties}
        >
          {/* Simple Deepam / Lantern */}
          <div 
            style={{ width: lantern.size, height: lantern.size }}
            className="relative"
          >
            {/* Glow animation moved to a single blur div for performance */}
            <div className="absolute inset-[-100%] bg-wedding-gold-light/20 blur-xl rounded-full animate-pulse" />
            
            {/* Static SVG with one simple flickering flame */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]"
            >
              <path
                d="M12 2L15 8H9L12 2Z"
                fill="#FFD700"
                className="animate-flame origin-bottom"
              />
              <path
                d="M4 10C4 8.89543 4.89543 8 6 8H18C19.1046 8 20 8.89543 20 10V14C20 17.3137 17.3137 20 14 20H10C6.68629 20 4 17.3137 4 14V10Z"
                fill="#8B4513"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingLanterns;
