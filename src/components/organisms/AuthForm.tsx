"use client";

/**
 * src/components/organisms/AuthForm.tsx
 * 
 * Luxury Authentication Form combining:
 * - Login / Register state switching with Framer Motion
 * - Zod validation + React Hook Form
 * - Sonner for premium toast messages
 * - Server Actions integration
 * - Google Login button (glassmorphism)
 */
import React, { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { login, signup, signInWithGoogle } from "@/app/[locale]/auth/actions";
import { cn } from "@/lib/utils";

// ── Validation Schemas ──────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().min(1, "emailRequired").email("emailInvalid"),
  password: z.string().min(1, "passwordRequired").min(6, "passwordMin"),
});

const signupSchema = loginSchema.extend({
  confirmPassword: z.string().min(1, "passwordRequired"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "passwordsMustMatch",
  path: ["confirmPassword"],
});

type SignupValues = z.infer<typeof signupSchema>;
type LoginValues = z.infer<typeof loginSchema>;

type AuthMode = "login" | "register";

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("auth");
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(mode === "login" ? loginSchema : signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const toggleMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    reset(); // clear errors and values
  };

  const onSubmit = (data: SignupValues | LoginValues) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      if (mode === "login") {
        const result = await login(formData, locale);
        if (result?.error) {
          toast.error(t("errorTitle"), { description: result.error });
        } else {
          toast.success(t("successTitle"));
        }
      } else {
        const result = await signup(formData, locale);
        if (result?.error) {
          toast.error(t("errorTitle"), { description: result.error });
        } else {
          toast.success(t("registerSuccess"));
          setMode("login");
        }
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ── Social Login ── */}
      <Button
        variant="ghost"
        className="w-full flex items-center justify-center gap-3 border border-white/5 bg-white/5 hover:bg-white/10"
        onClick={() => signInWithGoogle(locale)}
      >
        <svg viewBox="0 0 48 48" className="w-5 h-5">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
        {t("signInGoogle")}
      </Button>

      <div className="relative flex items-center justify-center py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full h-[1px] bg-white/5" />
        </div>
        <span className="relative z-10 bg-ink px-4 text-xs font-jost text-white/20 uppercase tracking-widest-caps">
          OR
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="email"
            label={t("email")}
            type="email"
            error={errors.email?.message ? t(errors.email.message as any) : undefined}
            {...register("email")}
          />

          <Input
            id="password"
            label={t("password")}
            type="password"
            error={errors.password?.message ? t(errors.password.message as any) : undefined}
            {...register("password")}
          />

          <AnimatePresence mode="popLayout">
            {mode === "register" && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="overflow-hidden"
              >
                <Input
                  id="confirmPassword"
                  label={t("confirmPassword")}
                  type="password"
                  error={errors.confirmPassword?.message ? t(errors.confirmPassword.message as any) : undefined}
                  {...register("confirmPassword")}
                />
              </motion.div>
            )}
          </AnimatePresence>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? t("processing") : (mode === "login" ? t("login") : t("register"))}
          </Button>
        </div>
      </form>

      <div className="text-center pt-2">
        <button
          onClick={toggleMode}
          className="text-sm font-medium text-gold/60 hover:text-gold transition-colors"
        >
          {mode === "login" ? t("noAccount") : t("hasAccount")}
        </button>
      </div>
    </div>
  );
}
