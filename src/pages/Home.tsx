import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroMan from "@/assets/hero-man.jpg";
import heroWoman from "@/assets/hero-woman.jpg";
import heroLehenga from "@/assets/hero-lehenga.jpg";

const slides = [
  {
    image: heroMan,
    title: "Men's Collection",
    subtitle: "Kurtas, Shirts & More",
    gender: "men" as const,
  },
  {
    image: heroWoman,
    title: "Women's Collection",
    subtitle: "Sarees, Lehenga & More",
    gender: "women" as const,
  },
  {
    image: heroLehenga,
    title: "Bridal Collection",
    subtitle: "Customize Your Dream Outfit",
    gender: "women" as const,
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <MainLayout>
      <div className="h-screen flex flex-col">
        {/* Hero Carousel */}
        <div className="relative flex-1 overflow-hidden">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
            >
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              <div className="hero-overlay absolute inset-0" />
            </div>
          ))}

          {/* Content */}
          <div className="absolute inset-0 flex items-center z-10 px-12">
            <div className="max-w-lg animate-fade-in" key={current}>
              <h2 className="font-display text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
                {slide.title}
              </h2>
              <p className="text-primary-foreground/80 text-xl mb-8">{slide.subtitle}</p>
              <Button
                onClick={() => navigate(`/categories/${slide.gender}`)}
                className="h-14 px-10 text-lg font-semibold gold-gradient border-none text-secondary-foreground hover:opacity-90 rounded-full"
              >
                Explore Now
              </Button>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur flex items-center justify-center text-primary-foreground hover:bg-background/40 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur flex items-center justify-center text-primary-foreground hover:bg-background/40 transition"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-gold" : "w-2 bg-primary-foreground/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
