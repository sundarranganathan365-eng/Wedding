import { useEffect, useRef } from "react";
import HeroSection from "@/components/wedding/HeroSection";
import GaneshaSection from "@/components/wedding/GaneshaSection";
import BlessingSection from "@/components/wedding/BlessingSection";
import EventsSection from "@/components/wedding/EventsSection";
import CoupleSection from "@/components/wedding/CoupleSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import Footer from "@/components/wedding/Footer";
import FloatingLamps from "@/components/wedding/FloatingLamps";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      const bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = `${progress}%`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = containerRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll progress bar */}
      <div id="scroll-progress" className="scroll-progress" style={{ width: "0%" }} />

      {/* Floating lamps */}
      <FloatingLamps />

      {/* Sections */}
      <HeroSection />
      <GaneshaSection />
      <BlessingSection />
      <EventsSection />
      <CoupleSection />
      <CountdownSection />
      <Footer />
    </div>
  );
};

export default Index;
