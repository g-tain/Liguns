"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Phone, Eye, ExternalLink, 
  MapPin, Calendar, Ruler, 
  Anchor, CheckCircle2, XCircle, 
  Clock, AlertCircle, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Applicant {
  id: string;
  full_name: string;
  age: number;
  weight: number;
  height: number;
  whatsapp_number: string;
  position: string;
  selfie_url: string;
  body_url: string;
  status: string;
  created_at: string;
}

interface AdminTableProps {
  initialData: Applicant[];
}

export function AdminTable({ initialData }: AdminTableProps) {
  const [applicants, setApplicants] = useState<Applicant[]>(initialData);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('applicants')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      toast.success(`Status updated to ${newStatus}`);
    } catch (error: any) {
      toast.error("Failed to update status", { description: error.message });
    }
  };

  const filteredApplicants = applicants.filter(a => {
    const matchesSearch = a.full_name.toLowerCase().includes(search.toLowerCase()) || 
                          a.position.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hired': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'interview': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-gold/60 bg-gold/10 border-gold/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/[0.03] p-4 rounded-3xl border border-white/5">
        <div className="relative w-full md:w-96 group">
          <input 
            type="text"
            placeholder="Search applicants or positions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-5 pr-4 font-jost text-sm text-white focus:outline-none focus:border-gold/40 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-2xl py-3 px-6 font-jost text-sm text-gold/60 focus:outline-none focus:border-gold/40 transition-all cursor-pointer appearance-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="interview">Interview</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-card rounded-[2.5rem] border border-gold/20 bg-black/40 overflow-hidden shadow-gold-glow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="py-6 px-8 text-[11px] font-black text-gold/60 uppercase tracking-widest">Waktu</th>
                <th className="py-6 px-8 text-[11px] font-black text-gold/60 uppercase tracking-widest">Talent</th>
                <th className="py-6 px-6 text-[11px] font-black text-gold/60 uppercase tracking-widest">Fisik</th>
                <th className="py-6 px-6 text-[11px] font-black text-gold/60 uppercase tracking-widest text-center">Foto</th>
                <th className="py-6 px-6 text-[11px] font-black text-gold/60 uppercase tracking-widest">Status</th>
                <th className="py-6 px-8 text-[11px] font-black text-gold/60 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredApplicants.map((applicant) => (
                <tr key={applicant.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-8 px-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-white/80 font-medium">
                        {new Date(applicant.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                      </span>
                      <span className="text-[10px] text-white/40">
                        {new Date(applicant.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                  <td className="py-8 px-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-bold text-white group-hover:text-gold transition-colors">
                        {applicant.full_name}
                      </span>
                      <a 
                        href={`https://wa.me/${applicant.whatsapp_number.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gold/60 hover:text-gold text-xs transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        {applicant.whatsapp_number}
                      </a>
                    </div>
                  </td>
                  <td className="py-8 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] text-white/40 uppercase">Usia</span>
                        <span className="text-xs font-semibold">{applicant.age}y</span>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] text-white/40 uppercase">BB/TB</span>
                        <span className="text-xs font-semibold">{applicant.weight}k/{applicant.height}c</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-8 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setSelectedPhoto(applicant.selfie_url)}
                        className="relative w-10 h-10 rounded-lg border border-white/10 overflow-hidden hover:border-gold/50 transition-all group/img"
                      >
                        <Image src={applicant.selfie_url} fill className="object-cover" alt="Selfie" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                          <Eye className="w-3 h-3 text-white" />
                        </div>
                      </button>
                      <button 
                        onClick={() => setSelectedPhoto(applicant.body_url)}
                        className="relative w-10 h-10 rounded-lg border border-white/10 overflow-hidden hover:border-gold/50 transition-all group/img"
                      >
                        <Image src={applicant.body_url} fill className="object-cover" alt="Body" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                          <Eye className="w-3 h-3 text-white" />
                        </div>
                      </button>
                    </div>
                  </td>
                  <td className="py-8 px-6">
                    <div className="relative inline-block text-left w-full max-w-[140px]">
                      <select
                        value={applicant.status}
                        onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                        className={cn(
                          "w-full appearance-none px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest cursor-pointer focus:outline-none transition-all",
                          getStatusColor(applicant.status)
                        )}
                      >
                        <option value="pending">Pending</option>
                        <option value="interview">Interview</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-40" />
                    </div>
                  </td>
                  <td className="py-8 px-8 text-right">
                    <a 
                      href={`https://wa.me/${applicant.whatsapp_number.replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(applicant.full_name)},%20kami%20dari%20Liguns%20Entertainment%20ingin%20mengundang%20Anda%20untuk%20interview.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold text-black font-jost font-black text-[10px] uppercase tracking-widest hover:shadow-gold-glow transition-all"
                    >
                      CHAT WA
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl aspect-[3/4] rounded-3xl overflow-hidden border border-gold/30 shadow-gold-glow-lg bg-black"
            >
              <Image src={selectedPhoto} fill className="object-contain" alt="Preview" priority />
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-gold transition-colors z-20 border border-white/10"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
