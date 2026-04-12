import { Hash, Cloud, Hotel, Shirt, Car, Gift } from "lucide-react";

const details = [
  { icon: Hash, title: "Hashtag", text: "#PriyaWedArjun" },
  { icon: Cloud, title: "Weather", text: "25°C, Pleasant & Sunny" },
  { icon: Hotel, title: "Stay", text: "Taj Coromandel, Chennai" },
  { icon: Shirt, title: "Dress Code", text: "Traditional South Indian" },
  { icon: Car, title: "Transport", text: "Shuttle from hotel provided" },
  { icon: Gift, title: "Gifts", text: "Your blessings are enough" },
];

const DetailsSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 reveal-on-scroll">
          <p className="font-heading text-wedding-gold/60 text-sm tracking-[0.3em] uppercase mb-3">Information</p>
          <h2 className="font-display text-3xl md:text-5xl text-gold-gradient">Details</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {details.map((item, i) => (
            <div
              key={item.title}
              className="reveal-on-scroll text-center p-6 rounded-xl gold-border bg-wedding-deep-red/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_hsl(40,66%,48%,0.15)]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <item.icon className="w-6 h-6 text-wedding-gold/60 mx-auto mb-3" />
              <h4 className="font-heading text-wedding-gold text-xs tracking-[0.2em] uppercase mb-2">{item.title}</h4>
              <p className="font-body text-wedding-ivory/70 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
