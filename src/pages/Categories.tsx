import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { categories } from "@/data/designs";

export default function Categories() {
  const { gender } = useParams<{ gender: string }>();
  const navigate = useNavigate();
  const filtered = categories.filter((c) => c.gender === gender);
  const title = gender === "women" ? "Women's Collection" : "Men's Collection";

  return (
    <MainLayout>
      <div className="p-6 lg:p-10">
        <h1 className="font-display text-4xl font-bold mb-2 animate-fade-in">{title}</h1>
        <p className="text-muted-foreground mb-8">Choose a category to explore designs</p>

        <div className="grid grid-cols-3 gap-4">
          {filtered.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/designs/${gender}/${cat.id}`)}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <h3 className="font-display text-lg font-bold text-white mb-0.5">{cat.name}</h3>
                <p className="text-sm text-white/70">{cat.designCount} designs</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
