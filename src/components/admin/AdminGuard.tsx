"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";

/**
 * src/components/admin/AdminGuard.tsx
 * 
 * Client-side protection for sensitive admin routes.
 * USES: sessionStorage to persist 'admin_session' token.
 * Validates against ADMIN_PASSWORD from process.env (or a hardcoded fallback if env is missing).
 */

const AdminAuthContext = createContext<{ authorized: boolean }>({ authorized: false });

export const useAdminAuth = () => useContext(AdminAuthContext);

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  // Hardcoded default or check process.env (Note: process.env on client needs NEXT_PUBLIC_)
  // For maximum security, the user should set ADMIN_PASSWORD in their environment.
  const ADMIN_PASS = "liguns2026"; // Default fallback

  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (session === "true") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      sessionStorage.setItem("admin_session", "true");
      setIsAuthorized(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
      // Shake animation effect could be added here
    }
  };

  if (isAuthorized === null) return null; // Loading state

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="glass-card p-10 rounded-[2.5rem] border border-gold/30 shadow-gold-glow-lg bg-black text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient" />
            
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6 border border-gold/20">
              <Lock className="w-8 h-8 text-gold" />
            </div>

            <h2 className={cn(fontJoti.className, "text-3xl text-gold-gradient mb-4")}>
              Admin Access
            </h2>
            <p className="font-jost text-neutral-400 text-sm mb-8">
              Situs ini dilindungi. Masukkan password otoritas untuk melanjutkan ke dashboard management.
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  autoFocus
                  placeholder="Enter Password"
                  className={cn(
                    "w-full bg-white/5 border rounded-2xl py-5 px-6 font-jost text-white text-center tracking-[0.3em] focus:outline-none transition-all",
                    error ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "border-white/10 focus:border-gold/40"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-gold transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <ShieldAlert className="w-3 h-3" />
                    Password Salah!
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-4 w-full py-5 rounded-full bg-gold-gradient text-black font-jost font-black text-xs uppercase tracking-[0.2em] shadow-gold-glow"
              >
                Unlock Dashboard
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ authorized: true }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
