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
  const imgRef = useRef<HTMLImageElement>(null);
  
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Reference for holding preloaded image elements natively (Mobile Safari memory optimized)
  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT + 1).fill(null));

  // Framer Motion Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isMobile = window.innerWidth < 768;

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.001,
  });

  // RAW NATIVE SCROLL: Mobile gets 1:1 thumb pixel binding. 
  // Eliminating 'useSpring' physics completely cures the "lag/delay" feeling on touch screens.
  const activeProgress = isMobile ? scrollYProgress : smoothProgress;

  // Story Mapping interpolation: Mapping scroll uniformly for smooth sequence playback
  const currentFrameIndex = useTransform(
    activeProgress, 
    [0, 1], 
    [1, FRAME_COUNT]
  );

  useEffect(() => {
    let isCancelled = false;

    const loadImages = async () => {
      let loadedCount = 0;
      
      // Load all frames to ensure 60fps visual smoothness without frame-skipping chop
      const indicesToLoad: number[] = [];
      for (let i = 1; i <= FRAME_COUNT; i++) {
        indicesToLoad.push(i);
      }
      const totalToLoad = indicesToLoad.length;

      const fetchImage = async (idx: number) => {
        try {
          const img = new Image();
          img.src = getFrameUrl(idx);
          await new Promise((resolve) => {
            img.onload = () => {
              if (!isCancelled) {
                framesRef.current[idx] = img;
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / totalToLoad) * 100));
              }
              resolve(true); // Always resolve so Promise.all doesn't crash on individual timeout
            };
            img.onerror = () => resolve(false);
          });
        } catch (e) {
          console.warn(`Failed to preload frame ${idx}`, e);
        }
      };

      // 1. Force fetch absolutely crucial first frame sequentially
      await fetchImage(indicesToLoad[0]);

      // 2. Priority Batch: Network fetch lag freezes the frame. 
      // We force mobile to cache 50% of the sequence heavily before unlocking UI to guarantee 0% network shudder.
      const priorityCount = isMobile ? 60 : 30;
      const batch1 = indicesToLoad.slice(1, priorityCount).map(fetchImage);
      await Promise.all(batch1);

      if (isCancelled) return;
      setLoaded(true); // Unlock UI for user

      // 3. Lazy Async fetch the remaining in micro-chunks to keep CPU/Network breathable
      const chunkSize = isMobile ? 5 : 10;
      for (let i = priorityCount; i < indicesToLoad.length; i += chunkSize) {
        if (isCancelled) break;
        const chunk = indicesToLoad.slice(i, i + chunkSize).map(fetchImage);
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

  // Frame Renderer syncing native image compositor to scroll state
  useEffect(() => {
    if (!loaded) return;

    let animationFrameId: number;
    let lastDrawnIndex = -1;
    let lastDrawTime = 0;

    const render = (time: number) => {
      let index = Math.round(currentFrameIndex.get());
      index = Math.max(1, Math.min(index, FRAME_COUNT));

      // Display most recent cached frame if scanning too fast
      while (!framesRef.current[index] && index > 1) {
        index--;
      }

      const img = framesRef.current[index];

      // FATAL MOBILE LAG FIX: Using native <img> compositor instead of heavy Canvas drawImage.
      if (img && imgRef.current) {
        if (lastDrawnIndex !== index) {
          const timeSinceLastDraw = time - lastDrawTime;
          
          // Limit mobile decoding specifically to ~30 FPS to stop 1080p JPEGs from thermal throttling the CPU
          if (!isMobile || timeSinceLastDraw > 30) {
            imgRef.current.src = img.src;
            lastDrawnIndex = index;
            lastDrawTime = time;
          }
        }
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

        {/* Native Image Scrollytelling Pipeline */}
        <div className="absolute inset-0 z-[2] w-full h-full overflow-hidden bg-[#0a0a0a]">
          <img
            ref={imgRef}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            alt="Cinematic Scroll Reveal"
          />
        </div>

        {/* Night Gradients to blend UI */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-wedding-dark via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* 
          No explicit React typography overlays are needed here because the 
          user has brilliantly baked all typography seamlessly into the 120 video frames itself! 
          Rendering duplicate text creates a ghosting effect that mimics stutter/lag.
        */}
        
      </div>
    </div>
  );
};

export default HeroSection;
