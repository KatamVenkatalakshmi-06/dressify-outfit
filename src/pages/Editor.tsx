import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { designs, availablePatterns, availableColors } from "@/data/designs";
import { useApp } from "@/contexts/AppContext";
import { Save, Palette, Layers } from "lucide-react";

type Part = "body" | "sleeve" | "border";

export default function Editor() {
  const { designId } = useParams<{ designId: string }>();
  const navigate = useNavigate();
  const { saveDesign } = useApp();
  const design = designs.find((d) => d.id === designId);

  const [colors, setColors] = useState(design?.colors || { body: "#8B1A4A", sleeve: "#A0285C", border: "#D4A853" });
  const [pattern, setPattern] = useState(design?.pattern || "solid");
  const [activePart, setActivePart] = useState<Part>("body");
  const [isEditing, setIsEditing] = useState(false);

  if (!design) return <MainLayout><div className="p-12">Design not found</div></MainLayout>;

  const patternClass = availablePatterns.find((p) => p.id === pattern)?.className || "";

  const handleColorChange = (color: string) => {
    setColors((prev) => ({ ...prev, [activePart]: color }));
  };

  const handleSave = () => {
    const saved = {
      id: `saved-${Date.now()}`,
      designId: design.id,
      name: design.name,
      colors: { ...colors },
      pattern,
      measurements: null,
      fabricInfo: null,
    };
    saveDesign(saved);
    navigate(`/canvas/${saved.id}`);
  };

  return (
    <MainLayout>
      <div className="p-8 lg:p-12 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block"
        >
          ← Back
        </button>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">{design.name}</h1>
            <p className="text-muted-foreground capitalize">{design.fabric} · {pattern}</p>
          </div>
          <div className="flex gap-3">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="burgundy-gradient border-none text-primary-foreground">
                <Palette className="mr-2" size={18} /> Edit Design
              </Button>
            ) : (
              <Button onClick={handleSave} className="gold-gradient border-none text-secondary-foreground">
                <Save className="mr-2" size={18} /> Save & Continue
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Preview — actual design image */}
          <div className="bg-card rounded-3xl shadow-sm border border-border overflow-hidden min-h-[400px]">
            <div className="relative w-full aspect-[3/4]">
              <img
                src={design.image}
                alt={design.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Color overlay for body */}
              <div
                className="absolute inset-0 mix-blend-multiply opacity-25"
                style={{ backgroundColor: colors.body }}
              />
              {/* Pattern overlay */}
              {patternClass && (
                <div className={`absolute inset-0 ${patternClass} opacity-15`} />
              )}
              {/* Border color strip at bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-12 mix-blend-multiply opacity-30"
                style={{ backgroundColor: colors.border }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>

          {/* Editor Panel */}
          {isEditing && (
            <div className="space-y-8 animate-fade-in">
              {/* Part Selector */}
              <div>
                <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                  <Layers size={18} /> Select Part
                </h3>
                <div className="flex gap-3">
                  {(["body", "sleeve", "border"] as Part[]).map((part) => (
                    <button
                      key={part}
                      onClick={() => setActivePart(part)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium capitalize transition-all ${
                        activePart === part
                          ? "burgundy-gradient text-primary-foreground shadow-md"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {part}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Picker */}
              <div>
                <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                  <Palette size={18} /> Colors
                </h3>
                <div className="grid grid-cols-10 gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                        colors[activePart] === color ? "border-foreground scale-110 ring-2 ring-primary" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <label className="text-sm text-muted-foreground">Custom:</label>
                  <input
                    type="color"
                    value={colors[activePart]}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-10 h-8 rounded cursor-pointer"
                  />
                  <span className="text-xs text-muted-foreground font-mono">{colors[activePart]}</span>
                </div>
              </div>

              {/* Pattern Selector */}
              <div>
                <h3 className="font-display text-lg font-semibold mb-3">Patterns</h3>
                <div className="grid grid-cols-4 gap-3">
                  {availablePatterns.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPattern(p.id)}
                      className={`relative h-16 rounded-xl border-2 transition-all ${
                        pattern === p.id
                          ? "border-primary shadow-md"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div
                        className={`absolute inset-1 rounded-lg ${p.className}`}
                        style={{ backgroundColor: colors.body + "33" }}
                      />
                      <span className="relative z-10 text-xs font-medium">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Non-editing info */}
          {!isEditing && (
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold mb-4">Design Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span className="font-medium capitalize">{design.categoryId}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Pattern</span><span className="font-medium capitalize">{pattern}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Fabric</span><span className="font-medium">{design.fabric}</span></div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Colors</span>
                    <div className="flex gap-1">
                      {Object.values(colors).map((c, i) => (
                        <div key={i} className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Click "Edit Design" to customize colors, patterns, and styles.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
