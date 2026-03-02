import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { useApp } from "@/contexts/AppContext";
import { designs } from "@/data/designs";
import { Download, Edit, Eye } from "lucide-react";

export default function SavedDesigns() {
  const { savedDesigns } = useApp();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="p-8 lg:p-12">
        <h1 className="font-display text-4xl font-bold mb-2 animate-fade-in">Saved Designs</h1>
        <p className="text-muted-foreground mb-10">Your customized outfits</p>

        {savedDesigns.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">✨</p>
            <h3 className="font-display text-xl font-semibold mb-2">No saved designs yet</h3>
            <p className="text-muted-foreground mb-6">Start exploring and customize your first outfit!</p>
            <button
              onClick={() => navigate("/home")}
              className="text-primary font-semibold hover:underline"
            >
              Browse Collections →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedDesigns.map((saved) => {
              const design = designs.find((d) => d.id === saved.designId);
              return (
                <div
                  key={saved.id}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full aspect-[3/4]">
                    <img
                      src={design?.image || ""}
                      alt={saved.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 mix-blend-multiply opacity-20" style={{ backgroundColor: saved.colors.body }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold mb-1">{saved.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize mb-4">{saved.pattern} pattern</p>

                    <div className="flex gap-2">
                      {saved.measurements && saved.fabricInfo ? (
                        <>
                          <button
                            onClick={() => navigate(`/final/${saved.id}`)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
                          >
                            <Eye size={14} /> View
                          </button>
                          <button
                            onClick={() => navigate(`/final/${saved.id}`)}
                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gold text-secondary-foreground text-sm font-medium hover:opacity-90 transition"
                          >
                            <Download size={14} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => navigate(`/canvas/${saved.id}`)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gold text-secondary-foreground text-sm font-medium hover:opacity-90 transition"
                        >
                          <Edit size={14} /> Add Measurements
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
