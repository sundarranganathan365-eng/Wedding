import { useRef, useEffect, useState, useCallback } from "react";
import templeImg from "@/assets/temple-hero.jpg";
import FloatingLanterns from "./FloatingLanterns";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Native scroll listener with requestAnimationFrame for buttery 60fps
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
    const rawProgress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
    setScrollProgress(rawProgress);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  // Derived values — pure math, no spring delay
  const imageY = scrollProgress * -60; // vh units
  const textOpacity = Math.max(1 - scrollProgress / 0.12, 0);
  const textScale = 1 - Math.min(scrollProgress / 0.12, 1) * 0.05;
  const textY = -12 - Math.min(scrollProgress / 0.12, 1) * 8; // vh units

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-wedding-dark">
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden hero-gradient">

        {/* Floating Lanterns / Deepam Effect */}
        <FloatingLanterns />

        {/* Temple Artwork: GPU-accelerated pan */}
        <div className="absolute inset-0 z-[2] w-full h-full overflow-hidden">
          <div
            className="relative w-full h-[160vh] origin-top"
            style={{
              transform: `translate3d(0, ${imageY}vh, 0)`,
              willChange: "transform",
            }}
          >
            <img
              src={templeImg}
              alt="Sacred Temple Night View"
              className="w-full h-full object-cover object-top"
              loading="eager"
              style={{
                maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Night Gradients */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-wedding-dark via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Main Content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
          style={{
            opacity: textOpacity,
            transform: `translate3d(0, ${textY}vh, 0) scale(${textScale})`,
            willChange: "transform, opacity",
          }}
        >
          {/* Tamil blessing */}
          <p className="font-tamil text-wedding-gold-light/90 text-xs sm:text-sm md:text-lg mb-3 md:mb-4 tracking-widest drop-shadow-md">
            ஓம் ஸ்ரீ கணேஷாய நமஹ
          </p>

          <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-8 opacity-60">
            <div className="w-8 md:w-12 h-[1px] bg-wedding-gold-light" />
            <div className="w-2 h-2 rounded-full border border-wedding-gold-light" />
            <div className="w-8 md:w-12 h-[1px] bg-wedding-gold-light" />
          </div>

          <div className="flex flex-col gap-1 md:gap-4 mb-4 md:mb-8">
            <h1 className="font-display text-4xl sm:text-5xl md:text-8xl lg:text-9xl text-wedding-gold-light drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] tracking-[0.15em] md:tracking-[0.2em] uppercase">
              The Bride
            </h1>
            <div className="flex items-center justify-center gap-4">
              <span className="font-heading text-wedding-gold-light/60 text-base md:text-xl tracking-[0.5em] uppercase">Weds</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-8xl lg:text-9xl text-wedding-gold-light drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] tracking-[0.15em] md:tracking-[0.2em] uppercase">
              The Groom
            </h1>
          </div>

          <div className="mt-2 md:mt-4 px-6 md:px-8 py-2 md:py-3 border-y border-wedding-gold-light/20 bg-black/40 backdrop-blur-md">
            <p className="font-subtext text-wedding-ivory text-lg md:text-2xl tracking-[0.2em] md:tracking-[0.3em]">
              29 . 05 . 2026
            </p>
          </div>
        </div>

        {/* Scroll Hint */}
        <div
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{ opacity: textOpacity, willChange: "opacity" }}
        >
          <span className="font-subtext text-wedding-gold-light/40 text-[9px] md:text-[10px] tracking-[0.4em] uppercase">Scroll to Reveal</span>
          <div className="w-[1px] h-8 md:h-10 bg-gradient-to-b from-wedding-gold-light/40 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
