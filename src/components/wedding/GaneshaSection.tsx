import ganeshaImg from "@/assets/ganesha.png";

const GaneshaSection = () => {
  return (
    <section className="relative py-24 md:py-32 section-gradient overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(40,66%,48%) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 reveal-on-scroll">
        <img
          src={ganeshaImg}
          alt="Lord Ganesha"
          loading="lazy"
          width={800}
          height={800}
          className="w-48 md:w-64 h-auto mb-8 drop-shadow-[0_0_30px_hsl(40,66%,48%,0.3)]"
        />
        <p className="font-tamil text-wedding-gold/80 text-lg md:text-xl mb-4">
          வக்ர துன்ட மகாகாயா சூர்ய கோடி சமப்ரபா…
        </p>
        <p className="font-subtext text-wedding-ivory/60 text-sm md:text-base max-w-md italic">
          "O Lord Ganesha, of curved trunk and massive body, whose brilliance is equal to a million suns,
          please bless us that all obstacles be removed."
        </p>
      </div>
    </section>
  );
};

export default GaneshaSection;
