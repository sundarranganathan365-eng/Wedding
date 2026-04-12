import carpetWalkway from "@/assets/carpet-walkway.jpg";

const WalkwaySection = () => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={carpetWalkway}
          alt="Wedding walkway"
          loading="lazy"
          className="w-full h-full object-cover"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        />
      </div>
      {/* Perspective overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center reveal-on-scroll">
          <p className="font-subtext text-wedding-gold/60 text-lg md:text-xl italic">
            Walk with us on this sacred path
          </p>
        </div>
      </div>
    </section>
  );
};

export default WalkwaySection;
