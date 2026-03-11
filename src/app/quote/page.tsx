"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { estimatePrintVolume } from "@/utils/volumeCalculator";
import ModelViewer from "@/components/ModelViewer";
import { formatLKR } from "@/utils/currency";

const MOCK_MATERIALS = [
  { id: "mock-1", name: "PLA (Polylactic Acid)", type: "FDM", price_per_cm3: 15 },
  { id: "mock-2", name: "Resin (SLA/DLP)", type: "SLA", price_per_cm3: 45 },
  { id: "mock-3", name: "TPU (Flexible)", type: "FDM", price_per_cm3: 24 }
];

const COLORS = [
  { name: 'Black', hex: '#18181b', priceMultiplier: 1.0 },
  { name: 'White', hex: '#f8fafc', priceMultiplier: 1.0 },
  { name: 'Industrial Gray', hex: '#64748b', priceMultiplier: 1.0 },
  { name: 'Safety Orange', hex: '#f97316', priceMultiplier: 1.2 },
  { name: 'Electric Blue', hex: '#3b82f6', priceMultiplier: 1.2 }
];

export default function QuotePage() {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [materials, setMaterials] = useState<any[]>(MOCK_MATERIALS);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(MOCK_MATERIALS[0]);
  const [selectedColor, setSelectedColor] = useState<any>(COLORS[0]);
  const [infillDensity, setInfillDensity] = useState<number>(20);
  
  const [file, setFile] = useState<File | null>(null);
  const [estimatedVolume, setEstimatedVolume] = useState<number>(0); // cm3
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

  const [isUploading, setIsUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error'|'success'; text: string } | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data: dbMaterials } = await supabase.from('materials').select('*');
      if (dbMaterials && dbMaterials.length > 0) {
        setMaterials(dbMaterials);
        setSelectedMaterial(dbMaterials[0]);
      }
    }
    loadData();
  }, [supabase]);

  // Recalculate price when dependencies change
  useEffect(() => {
    if (file && estimatedVolume > 0 && selectedMaterial) {
      const basePrice = estimatedVolume * selectedMaterial.price_per_cm3;
      // Infill multiplier: 20% is baseline 1x. 100% is 1.5x
      const infillMultiplier = 1 + ((infillDensity - 20) / 100) * 0.5;
      const finalPrice = basePrice * infillMultiplier * selectedColor.priceMultiplier;
      
      // Add a base setup fee of Rs. 1500
      setEstimatedPrice(Math.max(1500, finalPrice) + 1500);
    } else {
      setEstimatedPrice(0);
    }
  }, [file, estimatedVolume, selectedMaterial, selectedColor, infillDensity]);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleValidFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleValidFile(e.target.files[0]);
    }
  };

  const handleValidFile = async (f: File) => {
    setFile(f);
    // Use ThreeJS to precisely calculate the actual geometry volume
    const exactVolume = await estimatePrintVolume(f);
    setEstimatedVolume(exactVolume);
  };

  const handleSubmit = async () => {
    if (!user) {
      setStatusMsg({ type: 'error', text: 'You must be logged in to request a quote.' });
      return;
    }
    if (!file) {
      setStatusMsg({ type: 'error', text: 'Please select a file to upload.' });
      return;
    }

    setIsUploading(true);
    setStatusMsg(null);

    try {
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('stl_uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;
      const fileUrl = supabase.storage.from('stl_uploads').getPublicUrl(filePath).data.publicUrl;

      // 2. Create Quote Record
      const { error: quoteError } = await supabase.from('quotes').insert({
        user_id: user.id,
        material_id: selectedMaterial.id.startsWith('mock-') ? null : selectedMaterial.id,
        file_url: fileUrl,
        status: 'pending',
        estimated_cost: estimatedPrice,
        notes: `Material: ${selectedMaterial.name}, Color: ${selectedColor.name}, Infill: ${infillDensity}%`
      });

      if (quoteError) throw quoteError;

      setStatusMsg({ type: 'success', text: 'Project submitted successfully! We will review and begin processing shortly.' });
      setFile(null);
      setEstimatedVolume(0);
      setEstimatedPrice(0);
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: 'error', text: err.message || 'Failed to submit project.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="layout-container flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Configuration */}
        <aside className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
          <div className="bg-white dark:bg-zinc-900/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">settings</span>
              Configuration
            </h3>
            
            <div className={`space-y-8 ${!file ? 'opacity-50 pointer-events-none' : ''}`}>
              
              {/* Material Selection */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Material</label>
                  {selectedMaterial && <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded">{selectedMaterial.type}</span>}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {materials.map(mat => (
                    <button 
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                        selectedMaterial?.id === mat.id 
                          ? 'bg-primary/10 border-primary text-primary font-medium shadow-sm' 
                          : 'bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-primary/50 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px]">{mat.type === 'FDM' ? 'layers' : 'opacity'}</span>
                        <span className="text-sm">{mat.name}</span>
                      </div>
                      <span className="text-xs font-bold">Rs. {Number(mat.price_per_cm3).toFixed(2)}/cm³</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Color Variant</label>
                  <span className="text-xs font-medium text-slate-500">{selectedColor.name}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      title={`${color.name} ${color.priceMultiplier > 1 ? '(+Premium)' : ''}`}
                      className={`size-10 rounded-full border-2 transition-all shadow-sm ${selectedColor.name === color.name ? 'border-primary scale-110 ring-2 ring-primary/20' : 'border-zinc-200 dark:border-zinc-700 hover:scale-105'}`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Infill Density */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Infill Density</label>
                  <span className="text-xs font-bold bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded text-slate-700 dark:text-zinc-300">{infillDensity}%</span>
                </div>
                <div className="pt-2">
                  <input 
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" 
                    max="100" min="0" step="5" type="range" 
                    value={infillDensity}
                    onChange={(e) => setInfillDensity(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold mt-2">
                    <span>Hollow</span>
                    <span>Balanced</span>
                    <span>Solid</span>
                  </div>
                </div>
              </div>

              {/* Estimate Summary */}
              {file && (
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Estimated Volume</span>
                    <span className="font-medium text-slate-900 dark:text-white">~{estimatedVolume.toFixed(1)} cm³</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Base Setup Fee</span>
                    <span className="font-medium text-slate-900 dark:text-white">Rs. 1,500</span>
                  </div>
                  <div className="flex justify-between text-xl font-black text-slate-900 dark:text-white mt-4">
                    <span>Estimated Cost</span>
                    <span className="text-primary">{formatLKR(estimatedPrice)}</span>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2">
          {/* Breadcrumbs & Title */}
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Link className="hover:text-primary transition-colors" href="/">Home</Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-slate-900 dark:text-slate-100 font-medium">Custom Request</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">New 3D Printing Project</h1>
          </div>

          {/* Upload Area */}
          <div className="flex-1 flex flex-col min-h-[400px]">
            {statusMsg && (
              <div className={`p-4 mb-4 rounded-lg font-bold text-sm ${statusMsg.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                {statusMsg.text}
              </div>
            )}

            {!file ? (
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/20 px-4 md:px-8 py-16 hover:border-primary dark:hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer relative"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                className="hidden" 
                accept=".stl,.obj,.step,.3mf"
              />
              
              <div className="size-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-6 group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                <span className="material-symbols-outlined text-4xl">cloud_upload</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Drag & Drop 3D Files</h3>
              <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
                Select .STL, .OBJ, or .STEP files to start your print. 
                Maximum file size <span className="font-semibold">50MB</span>.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-primary hover:bg-primary/90 text-white dark:text-background-dark px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">add_circle</span>
                  Browse Files
                </button>
              </div>
            </div>
            ) : (
            <div className="flex-1 rounded-2xl border-2 border-solid border-primary/30 bg-primary/5 dark:bg-primary/5 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                <div className="absolute inset-0 z-0 pointer-events-auto">
                   <ModelViewer file={file} colorHex={selectedColor.hex} />
                </div>
                
                {/* Floating overlay for stats */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs" title={file.name}>{file.name}</h3>
                    <p className="text-slate-500 text-xs font-medium">Size: {(file.size / (1024 * 1024)).toFixed(2)} MB • Est. Vol: {estimatedVolume.toFixed(2)} cm³</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="px-4 py-2 bg-white dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600 rounded-lg font-bold transition-colors text-slate-700 dark:text-slate-200 text-sm"
                    >
                      Remove
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSubmit(); }}
                      disabled={isUploading}
                      className="px-6 bg-primary hover:bg-amber-500 text-white dark:text-background-dark py-2 rounded-lg font-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-sm w-full sm:w-auto"
                    >
                      {isUploading ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>
                          Uploading...
                        </>
                      ) : (
                        <>Submit Request</>
                      )}
                    </button>
                  </div>
                </div>
            </div>
            )}

            {/* File Format Support Badges */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-70 cursor-default">
              <div className="flex flex-col xl:flex-row items-center xl:items-start gap-2 xl:gap-3 p-3 bg-white dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center xl:text-left">
                <div className="size-8 flex items-center justify-center bg-primary/10 text-primary rounded font-bold text-xs shrink-0">STL</div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-tighter mt-1 xl:mt-2">Standard Mesh</span>
              </div>
              <div className="flex flex-col xl:flex-row items-center xl:items-start gap-2 xl:gap-3 p-3 bg-white dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center xl:text-left">
                <div className="size-8 flex items-center justify-center bg-primary/10 text-primary rounded font-bold text-xs shrink-0">OBJ</div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-tighter mt-1 xl:mt-2">Wavefront Object</span>
              </div>
              <div className="flex flex-col xl:flex-row items-center xl:items-start gap-2 xl:gap-3 p-3 bg-white dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center xl:text-left">
                <div className="size-8 flex items-center justify-center bg-primary/10 text-primary rounded font-bold text-xs shrink-0">STP</div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-tighter mt-1 xl:mt-2">CAD Step File</span>
              </div>
              <div className="flex flex-col xl:flex-row items-center xl:items-start gap-2 xl:gap-3 p-3 bg-white dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center xl:text-left">
                <div className="size-8 flex items-center justify-center bg-primary/10 text-primary rounded font-bold text-xs shrink-0">3MF</div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-tighter mt-1 xl:mt-2">3D Mfg Format</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
