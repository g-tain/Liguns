"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Edit, Trash2, Plus, 
  MapPin, DollarSign, Briefcase,
  ToggleLeft as Toggle, ToggleRight as ToggleOn,
  AlertCircle, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { JobFormModal } from "./JobFormModal";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Job {
  id: string;
  created_at: string;
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

interface JobTableProps {
  initialJobs: Job[];
}

export function JobTable({ initialJobs }: JobTableProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setJobs(data);
  };

  const handleToggleStatus = async (job: Job) => {
    const newStatus = job.status === 'active' ? 'inactive' : 'active';
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ status: newStatus })
        .eq('id', job.id);

      if (error) throw error;
      setJobs(prev => prev.map(j => j.id === job.id ? { ...j, status: newStatus } : j));
      toast.success(`Job status set to ${newStatus}`);
    } catch (error: any) {
      toast.error("Failed to update status", { description: error.message });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;
    setIsDeleting(id);
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setJobs(prev => prev.filter(j => j.id !== id));
      toast.success("Job deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete job", { description: error.message });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-white/90 uppercase tracking-widest flex items-center gap-3">
           <Briefcase className="w-5 h-5 text-gold/60" />
           Daftar Lowongan
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingJob(null);
            setIsModalOpen(true);
          }}
          className="px-8 py-3 rounded-full bg-gold text-black font-jost font-black text-[10px] uppercase tracking-widest shadow-gold-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          TAMBAH LOWONGAN
        </motion.button>
      </div>

      {/* Grid View for Jobs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "glass-card p-6 rounded-[2.5rem] border transition-all space-y-6 relative overflow-hidden group",
                job.status === 'active' ? "border-gold/20 bg-black/40 shadow-gold-glow-sm" : "border-white/5 bg-white/[0.02] opacity-60"
              )}
            >
              {/* Header: Title & Company */}
              <div className="flex gap-4 items-start">
                 <div className="relative w-14 h-14 rounded-2xl border border-white/5 overflow-hidden bg-white/5 flex-shrink-0">
                    {job.image_url ? (
                      <Image src={job.image_url} fill className="object-cover" alt="Logo" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                         <Briefcase className="w-6 h-6 text-white/20" />
                      </div>
                    )}
                 </div>
                 <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white truncate leading-tight">{job.title}</h3>
                    <p className="text-xs text-gold font-medium uppercase tracking-widest truncate">{job.company_name}</p>
                 </div>
              </div>

              {/* Basic Info Tags */}
              <div className="flex flex-wrap gap-2">
                 <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-white/60">
                    <MapPin className="w-3 h-3 text-gold/40" />
                    {job.location}
                 </div>
                 <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-white/60">
                    <DollarSign className="w-3 h-3 text-gold/40" />
                    {job.salary_range || "N/A"}
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-4">
                 <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setEditingJob(job);
                        setIsModalOpen(true);
                      }}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-gold transition-colors hover:bg-gold/10"
                    >
                       <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      disabled={isDeleting === job.id}
                      onClick={() => handleDelete(job.id)}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-red-500/40 hover:text-red-500 transition-colors hover:bg-red-500/10"
                    >
                       {isDeleting === job.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                 </div>

                 <motion.button
                   whileTap={{ scale: 0.9 }}
                   onClick={() => handleToggleStatus(job)}
                   className={cn(
                     "flex items-center gap-2 px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all",
                     job.status === 'active' 
                       ? "bg-gold/10 border-gold/40 text-gold" 
                       : "bg-white/5 border-white/10 text-white/40"
                   )}
                 >
                    {job.status === 'active' ? <ToggleOn className="w-4 h-4" /> : <Toggle className="w-4 h-4" />}
                    {job.status}
                 </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {jobs.length === 0 && (
          <div className="col-span-full py-24 text-center glass-card rounded-[3rem] border border-white/5 bg-white/[0.02]">
             <AlertCircle className="w-12 h-12 text-white/10 mx-auto mb-6" />
             <p className="font-jost text-neutral-500 text-lg">Belum ada lowongan yang terdaftar.</p>
          </div>
        )}
      </div>

      {/* Modal Integration */}
      <JobFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobToEdit={editingJob}
        onSuccess={fetchJobs}
      />
    </div>
  );
}
