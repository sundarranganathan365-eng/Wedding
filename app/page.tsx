import TempleScrollHero from './TempleScrollHero';

export const metadata = {
  title: 'Divine Journey | Cinematic Scrollytelling',
  description: 'An immersive, spiritual visual journey.',
};

export default function Home() {
  return (
    <main className="bg-black text-white selection:bg-white/20 font-sans">
      <TempleScrollHero />
      
      {/* Footer / continuation of the page. Keeps the cinematic dark mode feel. */}
      <section className="h-screen flex items-center justify-center bg-black">
        <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-light">
          The Journey Continues...
        </p>
      </section>
    </main>
  );
}
