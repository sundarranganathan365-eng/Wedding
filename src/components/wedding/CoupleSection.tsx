import ornateFrame from "@/assets/ornate-frame.png";
import floralCorner from "@/assets/floral-corner.png";

const CoupleSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Floral corners */}
      <img src={floralCorner} alt="" loading="lazy" className="absolute top-0 left-0 w-32 md:w-48 opacity-30" />
      <img src={floralCorner} alt="" loading="lazy" className="absolute top-0 right-0 w-32 md:w-48 opacity-30 -scale-x-100" />
      <img src={floralCorner} alt="" loading="lazy" className="absolute bottom-0 left-0 w-32 md:w-48 opacity-30 -scale-y-100" />
      <img src={floralCorner} alt="" loading="lazy" className="absolute bottom-0 right-0 w-32 md:w-48 opacity-30 scale-x-[-1] scale-y-[-1]" />

      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16 reveal-on-scroll">
          <p className="font-heading text-wedding-gold/60 text-sm tracking-[0.3em] uppercase mb-3">The Couple</p>
          <h2 className="font-display text-3xl md:text-5xl text-gold-gradient">Two Souls, One Journey</h2>
        </div>

        {/* Ornate frame with couple placeholder */}
        <div className="flex justify-center mb-16 reveal-on-scroll">
          <div className="relative w-72 md:w-96 aspect-square">
            <img src={ornateFrame} alt="Ornate frame" loading="lazy" className="absolute inset-0 w-full h-full z-10" />
            <div className="absolute inset-[15%] rounded-sm overflow-hidden bg-wedding-deep-red/40 flex items-center justify-center">
              <p className="font-subtext text-wedding-gold/40 text-sm text-center px-4">
                Your Couple Photo
              </p>
            </div>
          </div>
        </div>

        {/* Bride & Groom */}
        <div className="grid md:grid-cols-2 gap-16 text-center">
          <div className="reveal-on-scroll">
            <h3 className="font-display text-2xl md:text-3xl text-gold-gradient mb-4">The Bride</h3>
            <p className="font-subtext text-wedding-ivory/60 italic mb-4 leading-relaxed">
              A radiant soul whose grace mirrors the morning light, 
              she carries the warmth of a thousand temples in her smile.
            </p>
            <p className="font-body text-wedding-gold/40 text-sm">
              "Where love begins, her story blossoms."
            </p>
          </div>
          <div className="reveal-on-scroll">
            <p className="font-heading text-wedding-gold/50 text-xs tracking-[0.3em] uppercase mb-3">The Groom</p>
            <h3 className="font-display text-2xl md:text-3xl text-gold-gradient mb-4">The Groom</h3>
            <p className="font-subtext text-wedding-ivory/60 italic mb-4 leading-relaxed">
              A steadfast heart with the courage of ancient kings, 
              his devotion runs deep as the rivers that shaped the land.
            </p>
            <p className="font-body text-wedding-gold/40 text-sm">
              "In every lifetime, his heart finds hers."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
