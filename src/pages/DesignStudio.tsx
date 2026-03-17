import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Paintbrush, Pen, Eraser, PaintBucket, Square, MousePointer,
  Undo2, Redo2, RotateCw, Trash2, Save, Download, Sparkles,
  ChevronDown, Loader2, ArrowLeft, X,
} from "lucide-react";
import html2canvas from "html2canvas";
import { supabase } from "@/integrations/supabase/client";

/* ── Types ── */
type Tool = "brush" | "pen" | "eraser" | "fill" | "shape" | "select";
type Gender = "women" | "men";

interface HistoryEntry {
  dataUrl: string;
}

/* ── Outfit templates (SVG outlines) ── */
const outfitTemplates: Record<Gender, { id: string; label: string; svg: string }[]> = {
  women: [
    { id: "saree", label: "Saree", svg: `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"><path d="M100,60 Q90,100 85,180 Q80,260 100,350 L200,350 Q220,260 215,180 Q210,100 200,60 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M100,60 Q130,40 150,38 Q170,40 200,60" fill="none" stroke="currentColor" stroke-width="2"/><path d="M85,180 Q60,200 50,280 L80,350 L100,350" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/><ellipse cx="150" cy="45" rx="25" ry="15" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>` },
    { id: "lehenga", label: "Lehenga", svg: `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"><path d="M120,50 Q115,80 110,120 L110,150 L190,150 L190,120 Q185,80 180,50 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M110,150 Q80,250 60,370 L240,370 Q220,250 190,150 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M120,50 Q140,40 150,38 Q160,40 180,50" fill="none" stroke="currentColor" stroke-width="2"/><line x1="110" y1="150" x2="190" y2="150" stroke="currentColor" stroke-width="2.5"/></svg>` },
    { id: "dress", label: "Dress", svg: `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"><path d="M120,50 L110,140 Q90,200 80,350 L220,350 Q210,200 190,140 L180,50 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M120,50 Q140,42 150,40 Q160,42 180,50" fill="none" stroke="currentColor" stroke-width="2"/><path d="M110,140 Q90,120 75,100" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M190,140 Q210,120 225,100" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>` },
    { id: "blouse", label: "Blouse", svg: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><path d="M110,50 L100,200 L200,200 L190,50 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M110,50 Q80,60 60,100 L80,120 L100,80" fill="none" stroke="currentColor" stroke-width="2"/><path d="M190,50 Q220,60 240,100 L220,120 L200,80" fill="none" stroke="currentColor" stroke-width="2"/><path d="M110,50 Q140,40 150,38 Q160,40 190,50" fill="none" stroke="currentColor" stroke-width="2"/></svg>` },
  ],
  men: [
    { id: "shirt", label: "Shirt", svg: `<svg viewBox="0 0 300 350" xmlns="http://www.w3.org/2000/svg"><path d="M110,50 L100,300 L200,300 L190,50 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M110,50 Q80,60 55,100 L80,120 L100,80" fill="none" stroke="currentColor" stroke-width="2"/><path d="M190,50 Q220,60 245,100 L220,120 L200,80" fill="none" stroke="currentColor" stroke-width="2"/><path d="M110,50 L135,70 L150,50 L165,70 L190,50" fill="none" stroke="currentColor" stroke-width="2"/><line x1="150" y1="70" x2="150" y2="300" stroke="currentColor" stroke-width="1" stroke-dasharray="6 4"/></svg>` },
    { id: "kurta", label: "Kurta", svg: `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"><path d="M110,50 L95,350 L205,350 L190,50 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M110,50 Q80,60 55,110 L80,130 L100,85" fill="none" stroke="currentColor" stroke-width="2"/><path d="M190,50 Q220,60 245,110 L220,130 L200,85" fill="none" stroke="currentColor" stroke-width="2"/><path d="M130,50 Q150,40 170,50" fill="none" stroke="currentColor" stroke-width="2"/><line x1="150" y1="50" x2="150" y2="200" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3"/></svg>` },
    { id: "jacket", label: "Jacket", svg: `<svg viewBox="0 0 300 350" xmlns="http://www.w3.org/2000/svg"><path d="M105,50 L90,300 L210,300 L195,50 Z" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M105,50 Q75,60 50,110 L75,130 L95,85" fill="none" stroke="currentColor" stroke-width="2"/><path d="M195,50 Q225,60 250,110 L225,130 L205,85" fill="none" stroke="currentColor" stroke-width="2"/><path d="M150,50 L130,300" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M150,50 L170,300" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M105,50 L135,70 L150,50 L165,70 L195,50" fill="none" stroke="currentColor" stroke-width="2"/></svg>` },
    { id: "pants", label: "Pants", svg: `<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg"><path d="M90,40 L90,60 Q88,200 80,370 L150,370 L150,180 L150,370 L220,370 Q212,200 210,60 L210,40 Z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="90" y1="40" x2="210" y2="40" stroke="currentColor" stroke-width="2.5"/></svg>` },
  ],
};

/* ── Pattern library (drag onto canvas) ── */
const patternSwatches = [
  { id: "paisley", label: "Paisley", css: "radial-gradient(ellipse at 50% 0%, hsl(var(--accent)/0.3) 0%, transparent 60%), radial-gradient(ellipse at 0% 50%, hsl(var(--accent)/0.2) 0%, transparent 60%)" },
  { id: "brocade", label: "Brocade", css: "repeating-linear-gradient(45deg, hsl(var(--gold)/0.15) 0px, hsl(var(--gold)/0.15) 2px, transparent 2px, transparent 8px)" },
  { id: "floral", label: "Floral", css: "radial-gradient(circle at 25% 25%, hsl(var(--primary)/0.15) 2px, transparent 6px), radial-gradient(circle at 75% 75%, hsl(var(--primary)/0.15) 2px, transparent 6px)" },
  { id: "geometric", label: "Geometric", css: "linear-gradient(45deg, hsl(var(--accent)/0.1) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--accent)/0.1) 25%, transparent 25%)" },
  { id: "stripes", label: "Stripes", css: "repeating-linear-gradient(90deg, hsl(var(--primary)/0.1) 0px, hsl(var(--primary)/0.1) 3px, transparent 3px, transparent 10px)" },
  { id: "checks", label: "Checks", css: "repeating-conic-gradient(hsl(var(--accent)/0.1) 0% 25%, transparent 0% 50%) 0 0 / 16px 16px" },
];

/* ── Fabric textures ── */
const fabricTextures = [
  { id: "silk", label: "Silk", color: "hsl(35 65% 55% / 0.15)" },
  { id: "cotton", label: "Cotton", color: "hsl(35 20% 88% / 0.3)" },
  { id: "velvet", label: "Velvet", color: "hsl(345 60% 40% / 0.12)" },
  { id: "chiffon", label: "Chiffon", color: "hsl(35 30% 97% / 0.2)" },
  { id: "denim", label: "Denim", color: "hsl(220 40% 50% / 0.15)" },
  { id: "linen", label: "Linen", color: "hsl(40 25% 80% / 0.25)" },
];

/* ── Color palette ── */
const colorPalette = [
  "#8B1A4A", "#D4A853", "#1a1a2e", "#e94560", "#0f3460",
  "#533483", "#2b2d42", "#ef233c", "#f77f00", "#06d6a0",
  "#118ab2", "#ffd166", "#073b4c", "#e63946", "#457b9d",
  "#f4a261", "#2a9d8f", "#264653", "#c77dff", "#ff006e",
  "#fb5607", "#3a86ff", "#8338ec", "#ffbe0b",
];

/* ── Tool config ── */
const tools: { id: Tool; icon: typeof Paintbrush; label: string }[] = [
  { id: "select", icon: MousePointer, label: "Select" },
  { id: "brush", icon: Paintbrush, label: "Brush" },
  { id: "pen", icon: Pen, label: "Pen" },
  { id: "eraser", icon: Eraser, label: "Eraser" },
  { id: "fill", icon: PaintBucket, label: "Fill" },
  { id: "shape", icon: Square, label: "Shape" },
];

export default function DesignStudio() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeTool, setActiveTool] = useState<Tool>("brush");
  const [activeColor, setActiveColor] = useState("#8B1A4A");
  const [brushSize, setBrushSize] = useState(4);
  const [gender, setGender] = useState<Gender>("women");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState("silk");

  const CANVAS_W = 600;
  const CANVAS_H = 700;

  /* ── Init canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    saveToHistory();
  }, []);

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    setHistory((prev) => {
      const newHist = prev.slice(0, historyIndex + 1);
      newHist.push({ dataUrl });
      return newHist;
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    const img = new Image();
    img.onload = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.drawImage(img, 0, 0);
    };
    img.src = history[newIndex].dataUrl;
    setHistoryIndex(newIndex);
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    const newIndex = historyIndex + 1;
    const img = new Image();
    img.onload = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.drawImage(img, 0, 0);
    };
    img.src = history[newIndex].dataUrl;
    setHistoryIndex(newIndex);
  }, [history, historyIndex]);

  /* ── Drawing handlers ── */
  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    if ("touches" in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.nativeEvent.offsetX) * scaleX, y: (e.nativeEvent.offsetY) * scaleY };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (activeTool === "select") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);

    if (activeTool === "fill") {
      // Simple fill at point
      ctx.fillStyle = activeColor;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      saveToHistory();
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = activeTool === "eraser" ? "#ffffff" : activeColor;
    ctx.lineWidth = activeTool === "eraser" ? brushSize * 3 : brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (activeTool === "pen") {
      ctx.lineWidth = Math.max(1, brushSize * 0.5);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const endDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveToHistory();
  };

  /* ── Apply template ── */
  const applyTemplate = (templateId: string) => {
    const templates = outfitTemplates[gender];
    const tpl = templates.find((t) => t.id === templateId);
    if (!tpl || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    const img = new Image();
    const blob = new Blob([tpl.svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const scale = Math.min(CANVAS_W / 300, CANVAS_H / 400);
      const w = 300 * scale;
      const h = 400 * scale;
      ctx.drawImage(img, (CANVAS_W - w) / 2, (CANVAS_H - h) / 2, w, h);
      URL.revokeObjectURL(url);
      saveToHistory();
    };
    img.src = url;
    setSelectedTemplate(templateId);
  };

  /* ── Clear canvas ── */
  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    saveToHistory();
    setSelectedTemplate(null);
  };

  /* ── Download ── */
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "dressify-design.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast({ title: "Downloaded!", description: "Your design has been saved as PNG." });
  };

  /* ── AI Generate Outfit ── */
  const handleGenerateOutfit = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sketchDataUrl = canvas.toDataURL("image/png");
    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-outfit", {
        body: {
          sketchDataUrl,
          outfitType: selectedTemplate || "outfit",
          gender,
          fabric: selectedFabric,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast({ title: "Outfit Generated!", description: "Your AI-generated outfit is ready." });
      } else {
        throw new Error("No image returned");
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      toast({
        title: "Generation failed",
        description: err.message || "Could not generate outfit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  /* ── Save design ── */
  const handleSave = () => {
    toast({ title: "Design saved!", description: "Your creation has been saved to your designs." });
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-screen">
        {/* Top toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/home")} className="text-sm text-muted-foreground hover:text-foreground">← Home</button>
            <span className="text-border">|</span>
            <h1 className="font-display text-lg font-bold">Design Studio</h1>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={undo} disabled={historyIndex <= 0}><Undo2 size={16} /></Button>
            <Button variant="ghost" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}><Redo2 size={16} /></Button>
            <Button variant="ghost" size="sm" onClick={clearCanvas}><Trash2 size={16} /></Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button variant="outline" size="sm" onClick={handleDownload}><Download size={14} className="mr-1" /> PNG</Button>
            <Button size="sm" className="burgundy-gradient border-none text-primary-foreground" onClick={handleSave}><Save size={14} className="mr-1" /> Save</Button>
          </div>
        </div>

        {/* 3-panel layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar — Tools & Templates */}
          <div className="w-56 bg-card border-r border-border overflow-y-auto shrink-0 p-3 space-y-5">
            {/* Drawing tools */}
            <div>
              <h3 className="font-display text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Tools</h3>
              <div className="grid grid-cols-3 gap-1.5">
                {tools.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTool(t.id)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition-all ${
                      activeTool === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <t.icon size={16} />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <label className="text-xs text-muted-foreground">Brush size: {brushSize}px</label>
                <input type="range" min={1} max={20} value={brushSize} onChange={(e) => setBrushSize(+e.target.value)} className="w-full mt-1" />
              </div>
            </div>

            {/* Gender & Templates */}
            <div>
              <h3 className="font-display text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Templates</h3>
              <div className="flex gap-1 mb-3">
                {(["women", "men"] as Gender[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      gender === g ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {g === "women" ? "👩 Women" : "👨 Men"}
                  </button>
                ))}
              </div>
              <div className="space-y-1.5">
                {outfitTemplates[gender].map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => applyTemplate(tpl.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedTemplate === tpl.id ? "bg-accent text-accent-foreground" : "bg-muted/50 text-foreground hover:bg-muted"
                    }`}
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Patterns */}
            <div>
              <h3 className="font-display text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Patterns</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {patternSwatches.map((p) => (
                  <button
                    key={p.id}
                    className="h-14 rounded-lg border border-border hover:border-primary transition-colors relative overflow-hidden"
                    style={{ background: p.css, backgroundColor: "hsl(var(--card))" }}
                    title={p.label}
                  >
                    <span className="absolute bottom-0.5 left-1 text-[9px] text-muted-foreground font-medium">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center — Drawing Canvas */}
          <div className="flex-1 flex items-center justify-center bg-muted/30 overflow-auto p-4" ref={containerRef}>
            <div className="relative shadow-2xl rounded-xl overflow-hidden bg-white">
              <canvas
                ref={canvasRef}
                className="cursor-crosshair block"
                style={{ width: "100%", maxWidth: 600, maxHeight: 700 }}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
              />
            </div>
          </div>

          {/* Right sidebar — Colors & Fabrics */}
          <div className="w-56 bg-card border-l border-border overflow-y-auto shrink-0 p-3 space-y-5">
            {/* Color Palette */}
            <div>
              <h3 className="font-display text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Colors</h3>
              <div className="grid grid-cols-6 gap-1.5">
                {colorPalette.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                      activeColor === c ? "border-foreground scale-110 ring-2 ring-primary" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input type="color" value={activeColor} onChange={(e) => setActiveColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                <span className="text-xs font-mono text-muted-foreground">{activeColor}</span>
              </div>
            </div>

            {/* Fabric Textures */}
            <div>
              <h3 className="font-display text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Fabrics</h3>
              <div className="space-y-1.5">
                {fabricTextures.map((f) => (
                  <button
                    key={f.id}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm bg-muted/50 hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <div className="w-6 h-6 rounded border border-border" style={{ backgroundColor: f.color }} />
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Generate */}
            <div className="bg-muted/50 rounded-xl p-3">
              <h3 className="font-display text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Sparkles size={14} className="text-accent" /> AI Generate
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Convert your sketch into a realistic outfit design.</p>
              <Button size="sm" className="w-full gold-gradient border-none text-secondary-foreground">
                <Sparkles size={14} className="mr-1.5" /> Generate Outfit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}