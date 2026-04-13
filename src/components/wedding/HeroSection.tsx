import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 120;
const FRAME_PREFIX = '/Frames/ezgif-frame-';
const FRAME_SUFFIX = '.jpg';

function getFrameUrl(index: number) {
  return `${FRAME_PREFIX}${index.toString().padStart(3, '0')}${FRAME_SUFFIX}`;
}

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Reference for holding preloaded image elements natively (Mobile Safari memory optimized)
  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT + 1).fill(null));

  // Framer Motion Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40, // Reduced for a heavier, cinematic drag
    damping: 25,   // Increased to prevent bounce, smoothing out fast stops
    restDelta: 0.001,
  });

  // Story Mapping interpolation: Mapping scroll uniformly for smooth sequence playback
  const currentFrameIndex = useTransform(
    smoothProgress, 
    [0, 0.2, 0.6, 0.85, 1], 
    [1, 24, 72, 108, FRAME_COUNT]
  );

  // Typographic Opacity maps for the cinematic title (fades out as you scroll)
  const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.15], [1, 0.5, 0]);
  const titleScale = useTransform(smoothProgress, [0, 0.15], [1, 0.95]);
  const titleY = useTransform(smoothProgress, [0, 0.15], ["0%", "-30%"]);

  // Opacity maps for cinematic story layers later in the scroll
  const text1Opacity = useTransform(smoothProgress, [0.18, 0.22, 0.4, 0.45], [0, 1, 1, 0]);
  const text2Opacity = useTransform(smoothProgress, [0.45, 0.5, 0.75, 0.8], [0, 1, 1, 0]);
  const text3Opacity = useTransform(smoothProgress, [0.85, 0.9, 1], [0, 1, 1]);

  useEffect(() => {
    let isCancelled = false;

    const loadImages = async () => {
      let loadedCount = 0;

      const fetchImage = async (idx: number) => {
        try {
          const img = new Image();
          img.src = getFrameUrl(idx);
          await new Promise((resolve, reject) => {
            img.onload = () => {
              if (!isCancelled) {
                framesRef.current[idx] = img;
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
              }
              resolve(true);
            };
            img.onerror = reject;
          });
        } catch (e) {
          console.warn(`Failed to preload frame ${idx}`, e);
        }
      };

      // Progressive caching: priority stream
      const batch1 = [];
      for (let i = 1; i <= 30; i++) batch1.push(fetchImage(i));
      await Promise.all(batch1);

      if (isCancelled) return;
      setLoaded(true);

      // Async fetch remaining
      const chunkSize = 15;
      for (let i = 31; i <= FRAME_COUNT; i += chunkSize) {
        if (isCancelled) break;
        const chunk = [];
        for (let j = i; j < i + chunkSize && j <= FRAME_COUNT; j++) chunk.push(fetchImage(j));
        await Promise.all(chunk);
      }
    };

    loadImages();

    return () => {
      isCancelled = true;
      framesRef.current.forEach(img => {
        if (img) img.src = "";
      });
    };
  }, []);

  // Frame Renderer syncing canvas paint to scroll state
  useEffect(() => {
    if (!loaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      let index = Math.round(currentFrameIndex.get());
      index = Math.max(1, Math.min(index, FRAME_COUNT));

      // Display most recent cached frame if scanning too fast
      while (!framesRef.current[index] && index > 1) {
        index--;
      }

      const img = framesRef.current[index];

      if (img) {
        const { innerWidth, innerHeight } = window;
        if (canvas.width !== innerWidth || canvas.height !== innerHeight) {
          canvas.width = innerWidth;
          canvas.height = innerHeight;
        }

        ctx.fillStyle = "#0a0a0a"; // Matches wedding-dark base
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Calculate aspect ratios
        const hRatio = canvas.width / img.naturalWidth;
        const vRatio = canvas.height / img.naturalHeight;
        const ratio = Math.max(hRatio, vRatio); // object-cover logic

        const centerShiftX = (canvas.width - img.naturalWidth * ratio) / 2;
        const centerShiftY = (canvas.height - img.naturalHeight * ratio) / 2;

        ctx.drawImage(
          img,
          0,
          0,
          img.naturalWidth,
          img.naturalHeight,
          centerShiftX,
          centerShiftY,
          img.naturalWidth * ratio,
          img.naturalHeight * ratio
        );
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [loaded, currentFrameIndex]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-wedding-dark">
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden hero-gradient bg-black">
        
        {/* Preloader Phase */}
        {!loaded && (
          <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center text-wedding-gold-light/80 backdrop-blur-md bg-black w-full h-full">
            <div className="w-12 h-12 border-2 border-wedding-gold-light/10 border-t-wedding-gold-light/80 rounded-full animate-spin mb-6" />
            <p className="font-subtext text-xs tracking-[0.3em] font-light uppercase">
              Preparing the Journey <span className="tabular-nums ml-2 font-mono opacity-60 text-[10px]">{loadingProgress}%</span>
            </p>
          </div>
        )}

        {/* Canvas Scrollytelling */}
        <div className="absolute inset-0 z-[2] w-full h-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className={`w-full h-full origin-top transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Night Gradients to blend UI */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-wedding-dark via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* The Initial Main Content / Typography */}
        <motion.div
          style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
          className="relative z-[20] flex flex-col items-center justify-center h-full text-center px-4"
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
          
          {/* Scroll Hint */}
          <div className="absolute -bottom-32 flex flex-col items-center gap-2">
            <span className="font-subtext text-wedding-gold-light/40 text-[9px] md:text-[10px] tracking-[0.4em] uppercase">Scroll to Reveal</span>
            <div className="w-[1px] h-8 md:h-10 bg-gradient-to-b from-wedding-gold-light/40 to-transparent animate-pulse" />
          </div>
        </motion.div>

        {/* Cinematic Scrollytelling Layers during descent */}
        <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none z-[15] flex flex-col items-center justify-end pb-24 md:pb-32">
          
          <motion.div style={{ opacity: text1Opacity }} className="absolute bottom-32 text-center max-w-lg px-6">
            <h2 className="text-wedding-gold-light font-heading text-xl md:text-3xl tracking-[0.3em] font-light mb-3">THE ASCENT</h2>
            <p className="text-wedding-ivory/60 font-subtext text-sm md:text-base tracking-widest uppercase">Approaching the sacred gopuram</p>
          </motion.div>

          <motion.div style={{ opacity: text2Opacity }} className="absolute bottom-32 text-center max-w-lg px-6">
            <h2 className="text-wedding-gold-light font-heading text-xl md:text-3xl tracking-[0.3em] font-light mb-3">THE INNER SANCTUM</h2>
            <p className="text-wedding-ivory/60 font-subtext text-sm md:text-base tracking-widest uppercase">Descending into a realm of peace</p>
          </motion.div>

          <motion.div style={{ opacity: text3Opacity }} className="absolute bottom-32 text-center max-w-lg px-6">
            <h2 className="text-wedding-gold-light font-heading text-2xl md:text-4xl tracking-[0.4em] font-semibold mb-4 drop-shadow-2xl">OM SARAVANABHAVA</h2>
            <p className="text-wedding-ivory/80 font-subtext flex items-center justify-center gap-4 text-xs tracking-[0.4em] uppercase">
               <span className="w-8 h-[1px] bg-wedding-gold-light/50" />
               Lord Murugan Revealed
               <span className="w-8 h-[1px] bg-wedding-gold-light/50" />
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
