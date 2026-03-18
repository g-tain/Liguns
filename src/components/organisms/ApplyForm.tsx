"use client";

/**
 * src/components/organisms/ApplyForm.tsx
 * 
 * Luxury Application Form for recruitment.
 * Features:
 * - Specific fields (Name, Age, Weight, Height, Job)
 * - WhatsApp redirection logic (Number: 089669094929)
 * - Cyberpunk Luxury styling (Black/Gold)
 * - Framer Motion animations
 */
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Send, User, Calendar, Ruler, Anchor, Briefcase } from "lucide-react";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function ApplyForm() {
  const t = useTranslations("apply");
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    weight: "",
    height: "",
    job: "",
  });

  const isFormValid =
    formData.fullName &&
    formData.age &&
    formData.weight &&
    formData.height &&
    formData.job;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const phoneNumber = "6289669094929";
    const text = `Halo Admin Liguns Entertainment, saya ingin melamar:

- Nama: ${formData.fullName}
- Usia: ${formData.age} Tahun
- Berat Badan: ${formData.weight} kg
- Tinggi Badan: ${formData.height} cm
- Lowongan: ${formData.job}

(Saya akan mengirimkan Foto Selfie dan Full Body setelah pesan ini)`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto w-full px-page-m"
    >
      <div className="glass-card p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] border-[0.5px] border-gold/30 shadow-gold-glow-lg bg-black relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full" />

        <div className="relative z-10">
          <h2 className={cn(
            fontJoti.className,
            "text-fluid-h1 md:text-4xl text-gold-gradient mb-8 md:mb-10 text-center leading-[1.1]"
          )}>
            {t("title")}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5 md:gap-2">
              <label className="text-[9px] md:text-[10px] font-black text-gold/60 uppercase tracking-widest ml-1">
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
                  className="w-full h-11 md:h-14 bg-[#0A0A0A] border-[0.5px] border-white/5 rounded-xl md:rounded-2xl pl-12 pr-4 font-jost text-base md:text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-gold/40 transition-all"
                />
              </div>
            </div>

            {/* Grid for Age, Weight, Height */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <div className="flex flex-col gap-1.5 md:gap-2">
                <label className="text-[9px] md:text-[10px] font-black text-gold/60 uppercase tracking-widest ml-1">
                  {t("age")}
                </label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                  <input
                    type="number"
                    name="age"
                    required
                    placeholder={t("placeholderAge")}
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full h-11 md:h-14 bg-[#0A0A0A] border-[0.5px] border-white/5 rounded-xl md:rounded-2xl pl-12 pr-4 font-jost text-base md:text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-gold/40 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 md:gap-2">
                <label className="text-[9px] md:text-[10px] font-black text-gold/60 uppercase tracking-widest ml-1">
                  {t("weight")}
                </label>
                <div className="relative group">
                  <Anchor className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                  <input
                    type="number"
                    name="weight"
                    required
                    placeholder={t("placeholderWeight")}
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full h-11 md:h-14 bg-[#0A0A0A] border-[0.5px] border-white/5 rounded-xl md:rounded-2xl pl-12 pr-4 font-jost text-base md:text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-gold/40 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 md:gap-2">
                <label className="text-[9px] md:text-[10px] font-black text-gold/60 uppercase tracking-widest ml-1">
                  {t("height")}
                </label>
                <div className="relative group">
                  <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                  <input
                    type="number"
                    name="height"
                    required
                    placeholder={t("placeholderHeight")}
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full h-11 md:h-14 bg-[#0A0A0A] border-[0.5px] border-white/5 rounded-xl md:rounded-2xl pl-12 pr-4 font-jost text-base md:text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-gold/40 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Job Select */}
            <div className="flex flex-col gap-1.5 md:gap-2">
              <label className="text-[9px] md:text-[10px] font-black text-gold/60 uppercase tracking-widest ml-1">
                {t("job")}
              </label>
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors" />
                <select
                  name="job"
                  required
                  value={formData.job}
                  onChange={handleChange}
                  className="w-full h-11 md:h-14 bg-[#0A0A0A] border-[0.5px] border-white/5 rounded-xl md:rounded-2xl pl-12 pr-10 font-jost text-base md:text-sm text-white appearance-none focus:outline-none focus:border-gold/40 transition-all cursor-pointer"
                >
                  <option value="" disabled className="bg-black">{t("placeholderJob")}</option>
                  <option value={t("jobs.spa")} className="bg-black">{t("jobs.spa")}</option>
                  <option value={t("jobs.lc")} className="bg-black">{t("jobs.lc")}</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-black italic">
                {t("notePhoto")}
              </p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-black italic">
                {t("noteBody")}
              </p>
            </div>

            {/* Submit Button & Compliance */}
            <div className="flex flex-col gap-4">
              <motion.button
                whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                type="submit"
                disabled={!isFormValid}
                className={cn(
                  "group relative w-full py-5 rounded-full overflow-hidden transition-all duration-300",
                  isFormValid
                    ? "bg-gold-gradient text-black shadow-gold-glow cursor-pointer"
                    : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
                )}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Send className="w-5 h-5" />
                  <span className="font-jost font-black text-sm tracking-[0.2em] uppercase">
                    {t("submit")}
                  </span>
                </div>

                {isFormValid && (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                )}
              </motion.button>
              
              <p className="text-[10px] md:text-xs text-neutral-500 font-jost text-center leading-relaxed px-4">
                Dengan menekan tombol di atas, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami. Data Anda akan diproses secara rahasia dan aman.
              </p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
