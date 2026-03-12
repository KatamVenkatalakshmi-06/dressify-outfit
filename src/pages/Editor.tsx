import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { designs, availableColors } from "@/data/designs";
import { useApp } from "@/contexts/AppContext";
import { Save, Palette, Layers, GripVertical } from "lucide-react";
import DraggableCanvas from "@/components/editor/DraggableCanvas";
import ElementPanel from "@/components/editor/ElementPanel";
import { PlacedElement } from "@/components/editor/designElements";

type Part = "body" | "sleeve" | "border";

export default function Editor() {
  const { designId } = useParams<{ designId: string }>();
  const navigate = useNavigate();
  const { saveDesign } = useApp();
  const design = designs.find((d) => d.id === designId);

  const [colors, setColors] = useState(design?.colors || { body: "#8B1A4A", sleeve: "#A0285C", border: "#D4A853" });
  const [activePart, setActivePart] = useState<Part>("body");
  const [isEditing, setIsEditing] = useState(false);
  const [placedElements, setPlacedElements] = useState<PlacedElement[]>([]);
  const [activeTab, setActiveTab] = useState<"elements" | "colors">("elements");

  if (!design) return <MainLayout><div className="p-12">Design not found</div></MainLayout>;

  const handleColorChange = (color: string) => {
    setColors((prev) => ({ ...prev, [activePart]: color }));
  };

  const handleSave = () => {
    const saved = {
      id: `saved-${Date.now()}`,
      designId: design.id,
      name: design.name,
      colors: { ...colors },
      pattern: "custom",
      measurements: null,
      fabricInfo: null,
    };
    saveDesign(saved);
    navigate(`/canvas/${saved.id}`);
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-8 max-w-7xl">
        <button onClick={() => navigate(-1)} className="text-sm text-muted-foreground hover:text-primary mb-3 inline-block">
          ← Back
        </button>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold">{design.name}</h1>
            <p className="text-muted-foreground capitalize text-sm">{design.fabric} · {design.categoryId}</p>
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

        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          {/* Canvas with drag-drop */}
          <DraggableCanvas
            imageSrc={design.image}
            imageAlt={design.name}
            placedElements={placedElements}
            onElementsChange={setPlacedElements}
            colors={colors}
          />

          {/* Right Panel */}
          {isEditing ? (
            <div className="space-y-6 animate-fade-in overflow-y-auto max-h-[80vh]">
              {/* Tab switcher */}
              <div className="flex gap-2 bg-muted rounded-xl p-1">
                <button
                  onClick={() => setActiveTab("elements")}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "elements" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <GripVertical size={14} /> Elements
                </button>
                <button
                  onClick={() => setActiveTab("colors")}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "colors" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Palette size={14} /> Colors
                </button>
              </div>

              {activeTab === "elements" && <ElementPanel />}

              {activeTab === "colors" && (
                <div className="space-y-6">
                  {/* Part Selector */}
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                      <Layers size={18} /> Select Part
                    </h3>
                    <div className="flex gap-2">
                      {(["body", "sleeve", "border"] as Part[]).map((part) => (
                        <button
                          key={part}
                          onClick={() => setActivePart(part)}
                          className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
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
                    <div className="grid grid-cols-6 gap-2">
                      {availableColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleColorChange(color)}
                          className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${
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
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-display text-lg font-semibold mb-4">Design Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span className="font-medium capitalize">{design.categoryId}</span></div>
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
              <p className="text-sm text-muted-foreground">Click "Edit Design" to drag & drop design elements like flowers, mandalas, and geometric patterns onto the garment.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
