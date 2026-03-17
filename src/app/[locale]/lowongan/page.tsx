"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, SlidersHorizontal, Sparkles, Briefcase, DollarSign } from "lucide-react";
import { JobCardSkeleton } from "@/components/molecules/JobCardSkeleton";
import { JobFilter } from "@/components/organisms/JobFilter";
import { JobCard } from "@/components/molecules/JobCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fontJoti } from "@/lib/fonts";
import { Skeleton } from "@/components/atoms/SkeletonLoader";
import { supabase } from "@/lib/supabase";

/**
 * src/app/[locale]/lowongan/page.tsx
 * 
 * Public Career Portal - High Fidelity & Supabase Integrated.
 * - Dynamic data fetching from 'jobs' table.
 * - City filtering and search logic.
 * - Premium Cyberpunk Luxury animations.
 */

interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  salary_range: string;
  description: string;
  image_url: string;
  status: string;
}

export default function LowonganPage() {
  const t = useTranslations("jobs");
  const [search, setSearch] = useState("");
  const [activeCity, setActiveCity] = useState("all");
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);

  // 1. Fetching logic from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('jobs')
          .select('*')
          .eq('status', 'active');

        if (activeCity !== 'all') {
          query = query.ilike('location', `%${activeCity}%`);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        setJobs(data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        // Aesthetic delay for smooth transition
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchJobs();
  }, [activeCity]);

  // Filter Data
  const cities = [
    { id: "all", label: t("filters.all") },
    { id: "bandung", label: t("filters.bandung") },
    { id: "jakarta", label: t("filters.jakarta") },
    { id: "surabaya", label: t("filters.surabaya") },
    { id: "bali", label: t("filters.bali") },
    { id: "medan", label: t("filters.medan") },
  ];

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(search.toLowerCase()) || 
    job.company_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* ── Background Master ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-[-10%] w-[60%] h-[60%] bg-gold/[0.05] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[50%] h-[50%] bg-gold/[0.03] blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 pt-48 pb-32">
        {/* Header Content */}
        <div className="flex flex-col gap-10 max-w-4xl mb-24 md:mb-32 text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 px-5 py-2 rounded-full bg-gold/5 border border-gold/10 w-fit backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-gold-light" />
            <span className="text-[11px] font-black text-gold-light uppercase tracking-[0.4em] translate-x-[0.2em]">Career Portal</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              fontJoti.className,
              "text-6xl md:text-[8rem] font-black leading-[0.9] tracking-tight-display text-neutral-100"
            )}
          >
            {t("title").split(" ").map((word, i) => (
              <span key={i} className={cn(i === 2 && "text-gold-gradient block md:inline")}>
                {word}{" "}
              </span>
            ))}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-jost text-xl text-neutral-400 max-w-2xl leading-premium tracking-premium-body"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* ── Control Center (Sticky) ── */}
        <div className="sticky top-28 z-40 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="group relative p-6 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-xxl border border-gold/10 shadow-glass overflow-hidden"
          >
            <div className="absolute inset-0 bg-shimmer-gold opacity-[0.03] group-hover:animate-shimmer pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row gap-10 relative z-10">
              <div className="flex-[1.5] relative group/input">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-600 group-focus-within/input:text-gold-light transition-colors" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-8 font-jost text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-gold/30 focus:bg-gold/[0.03] transition-all text-lg shadow-gold-inner"
                />
              </div>

              <div className="hidden lg:block w-px h-16 bg-white/10 self-center" />
              
              <div className="flex-[2] flex items-center">
                <JobFilter 
                  cities={cities} 
                  activeCity={activeCity} 
                  onCityChange={(id) => setActiveCity(id)}
                  activeLocale="id"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Dynamic Job Listings ── */}
        <div className="min-h-[500px] relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {[...Array(6)].map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </motion.div>
            ) : filteredJobs.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={{
                      id: job.id,
                      title: job.title,
                      venue: job.company_name,
                      city: job.location,
                      salary: job.salary_range,
                      image: job.image_url || "/images/placeholder.jpg",
                      tags: ["NEW", "PREMIUM"] // Dynamic tags could be added later
                    }} 
                    locale="id"
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-32 h-32 rounded-[3rem] bg-gold/5 border border-gold/10 flex items-center justify-center mb-10 relative group">
                  <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full group-hover:animate-pulse transition-all opacity-0 group-hover:opacity-100" />
                  <SlidersHorizontal className="w-14 h-14 text-gold/40 relative z-10 transition-transform group-hover:rotate-90 duration-700" />
                </div>
                <h2 className={cn(fontJoti.className, "text-4xl md:text-6xl font-black text-neutral-100 mb-6 italic text-center")}>
                  {t("status.noJobs")}
                </h2>
                <p className="font-jost text-neutral-500 max-w-md mx-auto text-lg leading-premium tracking-premium-body">
                  Belum ada lowongan aktif untuk kriteria ini. Coba ubah filter atau cari dengan kata kunci lain.
                </p>
                <Link href="/gabung">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-12 px-12 py-5 rounded-full bg-gold-gradient text-black font-jost font-black tracking-[0.3em] uppercase text-xs shadow-gold-glow"
                  >
                     Hubungi Admin Agency
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="fixed bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full z-0 pointer-events-none opacity-40" />
    </div>
  );
}
