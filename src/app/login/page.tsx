"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, GraduationCap, Mail, Lock, Fingerprint, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { login } from "@/services/auth.service";

const SCHOOL_STATS = [
  { label: "Active Teachers", value: "240+" },
  { label: "Students Enrolled", value: "8,400+" },
  { label: "Classes Today", value: "320" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("ananya@tarkon.school");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
      router.push("/home");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid credentials";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── LEFT — Illustration (desktop only) ───────────────────── */}
      <div className="hidden lg:flex flex-col w-1/2 gradient-blue p-12 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-[-80px] right-[-80px] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-40px] w-48 h-48 bg-white/10 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="flex items-center gap-3 mb-auto">
          <div className="w-12 h-12 rounded-3xl bg-white/20 flex items-center justify-center">
            <GraduationCap size={28} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-xl">Tarkon</p>
            <p className="text-white/70 text-sm">Teacher Platform</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="my-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles size={14} />
            AI-Powered Teaching
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Your Classroom<br />
            Intelligence Hub
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Complex intelligence underneath.<br />
            Simple experience on the surface.
          </p>

          {/* Live stats */}
          <div className="flex gap-6 mt-10">
            {SCHOOL_STATS.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-white/70 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-4 mt-auto">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-2xl">
            <ShieldCheck size={16} />
            <span className="text-sm">256-bit Encrypted</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-2xl">
            <span className="text-sm">FERPA Compliant</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT — Login Form ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-background">
        {/* Mobile header */}
        <div className="lg:hidden flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-3xl gradient-blue flex items-center justify-center mb-4">
            <GraduationCap size={32} className="text-white" />
          </div>
          <p className="text-2xl font-bold text-text-primary">Tarkon</p>
          <p className="text-text-secondary">Teacher Platform</p>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-page-header font-bold text-text-primary">Welcome back! 👋</h2>
            <p className="text-text-secondary mt-1">Sign in to your teaching dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-caption font-semibold text-text-primary mb-1.5">
                Email / Mobile
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ananya@school.com"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-border bg-white text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-caption font-semibold text-text-primary mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-12 py-3.5 rounded-2xl border border-border bg-white text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <button type="button" className="text-caption text-primary font-medium hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-caption text-red-500 bg-red-50 px-4 py-2 rounded-2xl">{error}</p>
            )}

            {/* Login button */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              iconRight={!loading ? <ArrowRight size={18} /> : undefined}
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>

            {/* Biometric */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-border bg-white text-text-secondary hover:text-primary hover:border-primary transition-all"
            >
              <Fingerprint size={20} />
              <span className="text-body font-medium">Sign in with Biometrics</span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-caption text-text-secondary">
              Having trouble?{" "}
              <button className="text-primary font-medium hover:underline">Contact Support</button>
            </p>
            <p className="text-[12px] text-text-secondary mt-2">
              Tarkon International School · Secure Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
