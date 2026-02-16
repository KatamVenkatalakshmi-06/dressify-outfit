import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import GarmentPreview from "@/components/GarmentPreview";
import { designs, categories } from "@/data/designs";

export default function Designs() {
  const { gender, categoryId } = useParams<{ gender: string; categoryId: string }>();
  const navigate = useNavigate();
  const filtered = designs.filter((d) => d.categoryId === categoryId);
  const category = categories.find((c) => c.id === categoryId);

  return (
    <MainLayout>
      <div className="p-8 lg:p-12">
        <button
          onClick={() => navigate(`/categories/${gender}`)}
          className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block"
        >
          ← Back to categories
        </button>
        <h1 className="font-display text-4xl font-bold mb-2 animate-fade-in">
          {category?.name || "Designs"}
        </h1>
        <p className="text-muted-foreground mb-10">{filtered.length} designs available</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((design, i) => (
            <button
              key={design.id}
              onClick={() => navigate(`/editor/${design.id}`)}
              className="group bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="mb-4">
                <GarmentPreview colors={design.colors} pattern={design.pattern} size="sm" />
              </div>
              <h3 className="font-medium text-sm mb-1">{design.name}</h3>
              <p className="text-xs text-muted-foreground capitalize">{design.pattern} · {design.fabric}</p>
            </button>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
