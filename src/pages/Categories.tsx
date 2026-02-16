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
      <div className="p-8 lg:p-12">
        <h1 className="font-display text-4xl font-bold mb-2 animate-fade-in">{title}</h1>
        <p className="text-muted-foreground mb-10">Choose a category to explore designs</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filtered.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/designs/${gender}/${cat.id}`)}
              className="group bg-card rounded-2xl p-6 text-center shadow-sm border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {cat.image}
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">{cat.name}</h3>
              <p className="text-sm text-muted-foreground">{cat.designCount} designs</p>
            </button>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
