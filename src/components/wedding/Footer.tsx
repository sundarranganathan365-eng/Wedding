import { Instagram, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 section-gradient overflow-hidden">
      <div className="max-w-xl mx-auto text-center px-4">
        <h3 className="font-display text-2xl md:text-3xl text-gold-gradient mb-3">
          The Bride & Groom
        </h3>
        <p className="font-subtext text-wedding-ivory/50 text-sm mb-6">
          May 29, 2026 • Tiruchendur, India
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <a
            href="#"
            className="w-10 h-10 rounded-full gold-border flex items-center justify-center text-wedding-gold/60 transition-colors hover:text-wedding-gold hover:bg-wedding-gold/10"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-wedding-ivory/30 text-xs font-body">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-wedding-vermillion fill-current" />
          <span>for our special day</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
