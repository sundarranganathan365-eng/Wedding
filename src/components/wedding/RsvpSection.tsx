import { MessageCircle } from "lucide-react";

const RsvpSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "hsl(0,100%,12%)" }}>
      {/* Subtle radial glow */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsl(40,66%,48%,0.05) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-xl mx-auto text-center px-4 reveal-on-scroll">
        <p className="font-heading text-wedding-gold/60 text-sm tracking-[0.3em] uppercase mb-3">Respond</p>
        <h2 className="font-display text-3xl md:text-5xl text-gold-gradient mb-6">RSVP</h2>
        <p className="font-subtext text-wedding-ivory/60 italic mb-10 leading-relaxed">
          Your presence is the greatest gift. Please let us know if you can join us on our special day.
        </p>

        <a
          href="https://wa.me/919876543210?text=We%20are%20delighted%20to%20attend%20your%20wedding!"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full gold-border-strong bg-wedding-deep-red/60 backdrop-blur-sm text-wedding-gold font-heading text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_0_40px_hsl(40,66%,48%,0.3)] hover:scale-105 animate-pulse-glow"
        >
          <MessageCircle className="w-5 h-5" />
          RSVP via WhatsApp
        </a>
      </div>
    </section>
  );
};

export default RsvpSection;
