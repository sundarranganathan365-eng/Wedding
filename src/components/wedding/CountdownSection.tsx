import { useEffect, useState } from "react";
import nightSky from "@/assets/night-sky.jpg";

const CountdownSection = () => {
  const targetDate = new Date("2026-05-29T07:30:00");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Night sky background */}
      <div className="absolute inset-0">
        <img src={nightSky} alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-background/60" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 reveal-on-scroll">
        <p className="font-heading text-wedding-gold/60 text-sm tracking-[0.3em] uppercase mb-3">Counting Down</p>
        <h2 className="font-display text-3xl md:text-5xl text-gold-gradient mb-12">Until Forever</h2>

        <div className="flex justify-center gap-4 md:gap-8">
          {units.map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="w-16 md:w-24 h-16 md:h-24 rounded-xl gold-border bg-wedding-deep-red/30 backdrop-blur-sm flex items-center justify-center mb-2">
                <span className="font-display text-2xl md:text-4xl text-wedding-gold">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="font-heading text-wedding-ivory/50 text-[10px] md:text-xs tracking-[0.2em] uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default CountdownSection;
