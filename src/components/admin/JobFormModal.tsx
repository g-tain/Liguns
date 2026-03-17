"use client";

import React, { useState, useEffect } from "react";
import { 
  X, Save, Plus, Trash2, 
  Briefcase, MapPin, DollarSign, 
  Image as ImageIcon, Loader2, Sparkles,
  CheckCircle2, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Job {
  id?: string;
  title: string;
  company_name: string;
  location: string;
  salary_range: string;
  description: string;
  qualifications: string[];
  facilities: string[];
  status: 'active' | 'inactive';
  image_url: string;
}

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobToEdit?: Job | null;
  onSuccess: () => void;
}

export function JobFormModal({ isOpen, onClose, jobToEdit, onSuccess }: JobFormModalProps) {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState<Job>({
    title: "",
    company_name: "",
    location: "",
    salary_range: "",
    description: "",
    qualifications: [""],
    facilities: [""],
    status: 'active',
    image_url: ""
  });

  useEffect(() => {
    if (jobToEdit) {
      setFormData({
        ...jobToEdit,
        qualifications: jobToEdit.qualifications.length > 0 ? jobToEdit.qualifications : [""],
        facilities: jobToEdit.facilities.length > 0 ? jobToEdit.facilities : [""]
      });
    } else {
      setFormData({
        title: "",
        company_name: "",
        location: "",
        salary_range: "",
        description: "",
        qualifications: [""],
        facilities: [""],
        status: 'active',
        image_url: ""
      });
    }
  }, [jobToEdit]);

  const handleListChange = (type: 'qualifications' | 'facilities', index: number, value: string) => {
    const newList = [...formData[type]];
    newList[index] = value;
    setFormData(prev => ({ ...prev, [type]: newList }));
  };

  const addListItem = (type: 'qualifications' | 'facilities') => {
    setFormData(prev => ({ ...prev, [type]: [...prev[type], ""] }));
  };

  const removeListItem = (type: 'qualifications' | 'facilities', index: number) => {
    if (formData[type].length <= 1) return;
    const newList = formData[type].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [type]: newList }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      // 1. Clean data (remove empty strings from lists)
      const cleanData = {
        ...formData,
        qualifications: formData.qualifications.filter(q => q.trim() !== ""),
        facilities: formData.facilities.filter(f => f.trim() !== "")
      };

      let error;
      if (jobToEdit?.id) {
        ({ error } = await supabase
          .from('jobs')
          .update(cleanData)
          .eq('id', jobToEdit.id));
      } else {
        ({ error } = await supabase
          .from('jobs')
          .insert([cleanData]));
      }

      if (error) throw error;

      toast.success(jobToEdit ? "Lowongan diperbarui!" : "Lowongan baru ditambahkan!");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error("Gagal menyimpan data", { description: error.message });
    } finally {
      setIsPending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar glass-card rounded-[3rem] border border-gold/30 bg-black/90 shadow-gold-glow-lg"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 px-10 py-8 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20">
                 <Briefcase className="w-6 h-6 text-gold" />
              </div>
              <div>
                 <h2 className={cn(fontJoti.className, "text-2xl text-gold-gradient")}>
                    {jobToEdit ? "Edit Lowongan" : "Tambah Lowongan Baru"}
                 </h2>
                 <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">Job Management Engine</p>
              </div>
           </div>
           <button 
             onClick={onClose}
             className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
           >
              <X className="w-5 h-5" />
           </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-12">
           
           {/* Section 1: Basic Info */}
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <Sparkles className="w-4 h-4 text-gold/40" />
                 <h3 className="text-xs font-black text-white/60 uppercase tracking-widest">Informasi Utama</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] text-gold uppercase tracking-tighter ml-4">Nama Posisi / Jabatan</label>
                    <input 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Contoh: Lady Companion (LC)"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-jost text-white focus:outline-none focus:border-gold/40 transition-all shadow-gold-inner"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] text-gold uppercase tracking-tighter ml-4">Nama Venue / Perusahaan</label>
                    <input 
                      required
                      value={formData.company_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                      placeholder="Contoh: LIGUNS VIP CLUB"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-jost text-white focus:outline-none focus:border-gold/40 transition-all shadow-gold-inner"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] text-gold uppercase tracking-tighter ml-4">Lokasi / Kota</label>
                    <input 
                      required
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Contoh: Jakarta"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-jost text-white focus:outline-none focus:border-gold/40 transition-all shadow-gold-inner"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] text-gold uppercase tracking-tighter ml-4">Range Gaji / Pendapatan</label>
                    <input 
                      value={formData.salary_range}
                      onChange={(e) => setFormData(prev => ({ ...prev, salary_range: e.target.value }))}
                      placeholder="Contoh: 10jt - 25jt++ / Bulan"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-jost text-white focus:outline-none focus:border-gold/40 transition-all shadow-gold-inner"
                    />
                 </div>
              </div>
           </div>

           {/* Section 2: Description & Lists */}
           <div className="space-y-8">
              <div className="space-y-2 text-left">
                 <label className="text-[10px] text-gold uppercase tracking-tighter ml-4">Deskripsi Pekerjaan</label>
                 <textarea 
                   rows={4}
                   value={formData.description}
                   onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                   placeholder="Tuliskan detail pekerjaan secara lengkap..."
                   className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 font-jost text-white focus:outline-none focus:border-gold/40 transition-all shadow-gold-inner resize-none"
                 />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {/* Qualifications */}
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <label className="text-[10px] text-gold uppercase tracking-tighter ml-4 font-black">Kualifikasi Pelamar</label>
                       <button 
                         type="button" 
                         onClick={() => addListItem('qualifications')}
                         className="flex items-center gap-1 text-[9px] text-gold font-black bg-gold/10 px-2 py-1 rounded-md"
                       >
                          <Plus className="w-3 h-3" /> ADD
                       </button>
                    </div>
                    <div className="space-y-3">
                       {formData.qualifications.map((item, id) => (
                         <div key={id} className="flex gap-2">
                            <input 
                              value={item}
                              onChange={(e) => handleListChange('qualifications', id, e.target.value)}
                              className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 px-4 font-jost text-sm text-white"
                              placeholder={`Point ${id + 1}`}
                            />
                            <button 
                              type="button" 
                              onClick={() => removeListItem('qualifications', id)}
                              className="w-10 h-10 flex items-center justify-center text-red-500/40 hover:text-red-500"
                            >
                               <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Facilities */}
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <label className="text-[10px] text-gold uppercase tracking-tighter ml-4 font-black">Fasilitas / Benefit</label>
                       <button 
                         type="button" 
                         onClick={() => addListItem('facilities')}
                         className="flex items-center gap-1 text-[9px] text-gold font-black bg-gold/10 px-2 py-1 rounded-md"
                       >
                          <Plus className="w-3 h-3" /> ADD
                       </button>
                    </div>
                    <div className="space-y-3">
                       {formData.facilities.map((item, id) => (
                         <div key={id} className="flex gap-2">
                            <input 
                              value={item}
                              onChange={(e) => handleListChange('facilities', id, e.target.value)}
                              className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 px-4 font-jost text-sm text-white"
                              placeholder={`Benefit ${id + 1}`}
                            />
                            <button 
                              type="button" 
                              onClick={() => removeListItem('facilities', id)}
                              className="w-10 h-10 flex items-center justify-center text-red-500/40 hover:text-red-500"
                            >
                               <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Section 3: Status & Meta */}
           <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                 <div className="flex flex-col gap-2">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-black ml-4">Status Tayang</span>
                    <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
                       <button 
                         type="button"
                         onClick={() => setFormData(prev => ({ ...prev, status: 'active' }))}
                         className={cn(
                           "px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all",
                           formData.status === 'active' ? "bg-gold text-black shadow-gold-glow" : "text-white/40 hover:text-white"
                         )}
                       >
                          Active
                       </button>
                       <button 
                         type="button"
                         onClick={() => setFormData(prev => ({ ...prev, status: 'inactive' }))}
                         className={cn(
                           "px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all",
                           formData.status === 'inactive' ? "bg-neutral-600 text-white" : "text-white/40 hover:text-white"
                         )}
                       >
                          Inactive
                       </button>
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-black ml-4">URL Logo / Image</span>
                    <input 
                      value={formData.image_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="https://..."
                      className="w-64 bg-white/5 border border-white/10 rounded-2xl py-3 px-6 font-jost text-xs text-white"
                    />
                 </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isPending}
                type="submit"
                className="w-full md:w-auto px-12 py-5 rounded-full bg-gold-gradient text-black font-jost font-black text-xs uppercase tracking-[0.2em] shadow-gold-glow flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    SIMPAN LOWONGAN
                  </>
                )}
              </motion.button>
           </div>

        </form>
      </motion.div>
    </div>
  );
}
