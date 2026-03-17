"use client";

/**
 * src/components/organisms/ApplyModal.tsx
 * 
 * Advanced Talent Acquisition Engine (Supabase Integrated).
 * Features:
 * - Supabase Database (applicants) & Storage (talent-assets).
 * - Client-side image compression (browser-image-compression).
 * - React Dropzone with Live Preview.
 * - Dual Action: DB persistence + WhatsApp notification.
 */
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, User, Calendar, Ruler, Anchor, 
  Briefcase, X, CheckCircle2, Phone, 
  Camera, Image as ImageIcon, Loader2,
  Trash2
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { supabase } from "@/lib/supabase";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialJob?: string;
}

interface PhotoState {
  file: File | null;
  preview: string | null;
}

export function ApplyModal({ isOpen, onClose, initialJob }: ApplyModalProps) {
  const t = useTranslations("apply");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    weight: "",
    height: "",
    whatsapp: "",
    job: "",
  });

  const [selfie, setSelfie] = useState<PhotoState>({ file: null, preview: null });
  const [bodyPhoto, setBodyPhoto] = useState<PhotoState>({ file: null, preview: null });

  // Auto-fill effect
  useEffect(() => {
    if (initialJob) {
      setFormData(prev => ({ ...prev, job: initialJob }));
    }
  }, [initialJob, isOpen]);

  // Dropzone Setup
  const onDropSelfie = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelfie({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const onDropBody = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setBodyPhoto({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const { getRootProps: getSelfieRoot, getInputProps: getSelfieInput, isDragActive: isSelfieActive } = useDropzone({
    onDrop: onDropSelfie,
    accept: { 'image/*': [] },
    multiple: false
  });

  const { getRootProps: getBodyRoot, getInputProps: getBodyInput, isDragActive: isBodyActive } = useDropzone({
    onDrop: onDropBody,
    accept: { 'image/*': [] },
    multiple: false
  });

  const isFormValid =
    formData.fullName &&
    formData.age &&
    formData.weight &&
    formData.height &&
    formData.whatsapp &&
    formData.job &&
    selfie.file &&
    bodyPhoto.file;

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Compression error:", error);
      return file;
    }
  };

  const uploadToSupabase = async (file: File, folder: string) => {
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    const fileName = `${folder}/${timestamp}_${cleanName}`;
    
    const { data, error } = await supabase.storage
      .from('talent-assets')
      .upload(fileName, file);

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('talent-assets')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isPending) return;

    setIsPending(true);

    try {
      // 1. Compression
      const compressedSelfie = await compressImage(selfie.file!);
      const compressedBody = await compressImage(bodyPhoto.file!);

      // 2. Upload
      const selfieUrl = await uploadToSupabase(compressedSelfie, 'selfie');
      const bodyUrl = await uploadToSupabase(compressedBody, 'body');

      // 3. Save to DB
      const { error: dbError } = await supabase
        .from('applicants')
        .insert({
          full_name: formData.fullName,
          age: parseInt(formData.age),
          weight: parseInt(formData.weight),
          height: parseInt(formData.height),
          whatsapp_number: formData.whatsapp,
          position: formData.job,
          selfie_url: selfieUrl,
          body_url: bodyUrl,
        });

      if (dbError) throw dbError;

      // 4. WhatsApp Redirect
      const adminWhatsApp = "6289669094929";
      const message = `*DATA PELAMAR BARU (SYSTEM)*

Halo Papih Guntur, saya berminat untuk bergabung:
- *Nama:* ${formData.fullName}
- *Usia:* ${formData.age} Tahun
- *Berat:* ${formData.weight}kg
- *Tinggi:* ${formData.height}cm
- *WA:* ${formData.whatsapp}
- *Posisi:* ${formData.job}

*Link Foto:*
- Selfie: ${selfieUrl}
- Full Body: ${bodyUrl}

(Data lengkap sudah tersimpan di Admin Panel)`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${adminWhatsApp}?text=${encodedMessage}`, "_blank");

      setIsSuccess(true);
      toast.success("Pendaftaran Berhasil Dikirim!");
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error(t("errorUpload"), { description: error.message });
    } finally {
      setIsPending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl px-2"
          >
            <div className="glass-card p-6 md:p-10 rounded-[2.5rem] border border-gold/30 shadow-gold-glow-lg bg-black overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/40 hover:text-gold transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20"
                  >
                    <CheckCircle2 className="w-10 h-10 text-gold" />
                  </motion.div>
                  <h2 className={cn(fontJoti.className, "text-3xl text-gold-gradient")}>
                    Terima Kasih!
                  </h2>
                  <p className="font-jost text-neutral-300 leading-relaxed max-w-sm">
                    Data Anda telah tersimpan dan diteruskan ke WhatsApp Admin. Kami akan segera menghubungi Anda.
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="mt-4 px-10 py-3 rounded-full border border-gold/20 text-gold font-jost text-xs uppercase tracking-widest hover:bg-gold/5 transition-all"
                  >
                    Tutup
                  </motion.button>
                </div>
              ) : (
                <div className="relative z-10">
                  <h2 className={cn(
                    fontJoti.className,
                    "text-2xl md:text-3xl text-gold-gradient mb-8 text-center leading-tight"
                  )}>
                    {t("title")}
                  </h2>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-black text-gold/60 uppercase tracking-widest ml-1">
                        {t("fullName")}
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder={t("placeholderName")}
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 pl-11 pr-4 font-jost text-sm text-white focus:outline-none focus:border-gold/30 focus:shadow-gold-small transition-all"
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-black text-gold/60 uppercase tracking-widest ml-1">
                        {t("whatsapp")}
                      </label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                        <input
                          type="tel"
                          name="whatsapp"
                          required
                          placeholder={t("placeholderWhatsapp")}
                          value={formData.whatsapp}
                          onChange={handleChange}
                          className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 pl-11 pr-4 font-jost text-sm text-white focus:outline-none focus:border-gold/30 transition-all"
                        />
                      </div>
                    </div>

                    {/* Grid for Age, Weight, Height */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-black text-gold/60 uppercase tracking-widest ml-1 text-center">
                          {t("age")}
                        </label>
                        <input
                          type="number"
                          name="age"
                          required
                          placeholder="Usia"
                          value={formData.age}
                          onChange={handleChange}
                          className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 px-3 text-center font-jost text-sm text-white focus:outline-none focus:border-gold/30 transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-black text-gold/60 uppercase tracking-widest ml-1 text-center">
                          {t("weight")} (kg)
                        </label>
                        <input
                          type="number"
                          name="weight"
                          required
                          placeholder="BB"
                          value={formData.weight}
                          onChange={handleChange}
                          className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 px-3 text-center font-jost text-sm text-white focus:outline-none focus:border-gold/30 transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-black text-gold/60 uppercase tracking-widest ml-1 text-center">
                          {t("height")} (cm)
                        </label>
                        <input
                          type="number"
                          name="height"
                          required
                          placeholder="TB"
                          value={formData.height}
                          onChange={handleChange}
                          className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 px-3 text-center font-jost text-sm text-white focus:outline-none focus:border-gold/30 transition-all"
                        />
                      </div>
                    </div>

                    {/* Job Select */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-black text-gold/60 uppercase tracking-widest ml-1">
                        {t("job")}
                      </label>
                      <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                        <select
                          name="job"
                          required
                          value={formData.job}
                          onChange={handleChange}
                          className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 pl-11 pr-10 font-jost text-sm text-white appearance-none focus:outline-none focus:border-gold/30 transition-all"
                        >
                          <option value="" disabled>{t("placeholderJob")}</option>
                          <option value="Spa Therapist">Spa Therapist</option>
                          <option value="Ladies Companion">Ladies Companion</option>
                          <option value="Staff Operasional">Staff Operasional</option>
                          <option value="Marketing">Marketing</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>

                    {/* Photo Upload Area */}
                    <div className="grid grid-cols-2 gap-4 mt-2">
                       {/* Selfie Dropzone */}
                       <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-black text-gold/60 uppercase tracking-widest ml-1">
                          {t("photoSelfie")}
                        </label>
                        <div 
                          {...getSelfieRoot()} 
                          className={cn(
                            "relative aspect-square rounded-2xl border border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all overflow-hidden bg-[#0A0A0A]",
                            isSelfieActive ? "border-gold/60 bg-gold/5" : "border-white/10 hover:border-gold/30"
                          )}
                        >
                          <input {...getSelfieInput()} />
                          {selfie.preview ? (
                            <>
                              <img src={selfie.preview} className="w-full h-full object-cover" alt="Selfie Preview" />
                              <button 
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setSelfie({ file: null, preview: null }); }}
                                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:text-red-500 backdrop-blur-md transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-2 p-4 text-center">
                              <Camera className="w-5 h-5 text-white/20" />
                              <span className="text-[8px] text-white/30 uppercase tracking-tighter leading-tight">
                                {t("uploadHint")}
                              </span>
                            </div>
                          )}
                        </div>
                       </div>

                       {/* Body Dropzone */}
                       <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-black text-gold/60 uppercase tracking-widest ml-1">
                          {t("photoBody")}
                        </label>
                        <div 
                          {...getBodyRoot()} 
                          className={cn(
                            "relative aspect-square rounded-2xl border border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all overflow-hidden bg-[#0A0A0A]",
                            isBodyActive ? "border-gold/60 bg-gold/5" : "border-white/10 hover:border-gold/30"
                          )}
                        >
                          <input {...getBodyInput()} />
                          {bodyPhoto.preview ? (
                            <>
                              <img src={bodyPhoto.preview} className="w-full h-full object-cover" alt="Body Preview" />
                              <button 
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setBodyPhoto({ file: null, preview: null }); }}
                                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:text-red-500 backdrop-blur-md transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-2 p-4 text-center">
                              <ImageIcon className="w-5 h-5 text-white/20" />
                              <span className="text-[8px] text-white/30 uppercase tracking-tighter leading-tight">
                                {t("uploadHint")}
                              </span>
                            </div>
                          )}
                        </div>
                       </div>
                    </div>

                    <p className="text-[8px] text-white/20 text-center uppercase tracking-widest mt-1">
                      {t("uploadLimit")} | JPG, PNG
                    </p>

                    {/* Submit Button */}
                    <div className="flex flex-col gap-4 mt-2">
                      <p className="text-[9px] text-neutral-500 text-center leading-relaxed">
                        Dengan mengklik tombol ini, Anda menyatakan data benar, berusia 19+, dan menyetujui <Link href="/terms" className="text-gold hover:underline">Ketentuan Layanan</Link>.
                      </p>

                      <motion.button
                        whileHover={isFormValid && !isPending ? { scale: 1.02 } : {}}
                        whileTap={isFormValid && !isPending ? { scale: 0.98 } : {}}
                        type="submit"
                        disabled={!isFormValid || isPending}
                        className={cn(
                          "group relative w-full py-4 rounded-full overflow-hidden transition-all duration-300",
                          isFormValid && !isPending
                            ? "bg-gold-gradient text-black shadow-gold-glow cursor-pointer" 
                            : "bg-white/5 text-white/10 cursor-not-allowed border border-white/5"
                        )}
                      >
                        <div className="relative z-10 flex items-center justify-center gap-3">
                          {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                          <span className="font-jost font-black text-xs tracking-[0.2em] uppercase">
                            {isPending ? t("processing") : t("submit")}
                          </span>
                        </div>
                        
                        {isFormValid && !isPending && (
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
