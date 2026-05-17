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
      {/* ── LEFT — Brand panel (desktop only) ─────────────── */}
      <div className="hidden lg:flex flex-col w-[46%] bg-[#0F172A] p-12 text-white relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-[-100px] right-[-100px] w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-60px] w-56 h-56 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
            <GraduationCap size={22} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-[17px] text-white">Tarkon</p>
            <p className="text-white/40 text-[11px] font-medium tracking-widest uppercase">Teacher Platform</p>
          </div>
        </div>

        {/* Hero */}
        <div className="my-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded-full text-[13px] font-medium text-blue-300 mb-8">
            <Sparkles size={13} />
            AI-Powered Classroom Intelligence
          </div>
          <h1 className="text-[40px] font-bold leading-[1.15] mb-5 text-white">
            Your Classroom<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Intelligence Hub
            </span>
          </h1>
          <p className="text-white/50 text-[15px] leading-relaxed max-w-xs">
            Complex intelligence underneath.<br />
            Simple experience on the surface.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            {SCHOOL_STATS.map((s) => (
              <div key={s.label}>
                <p className="text-[26px] font-bold text-white">{s.value}</p>
                <p className="text-white/40 text-[12px] font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex items-center gap-2 bg-white/[0.06] border border-white/10 px-3 py-2 rounded-xl">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-[12px] text-white/60">256-bit Encrypted</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.06] border border-white/10 px-3 py-2 rounded-xl">
            <span className="text-[12px] text-white/60">FERPA Compliant</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT — Login Form ─────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
        {/* Mobile logo */}
        <div className="lg:hidden flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-4 shadow-lg">
            <GraduationCap size={28} className="text-white" />
          </div>
          <p className="text-[22px] font-bold text-slate-900">Tarkon</p>
          <p className="text-slate-400 text-[13px]">Teacher Platform</p>
        </div>

        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h2 className="text-[26px] font-bold text-slate-900">Welcome back 👋</h2>
            <p className="text-slate-400 text-[14px] mt-1">Sign in to your teaching dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Email / Mobile</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ananya@school.com"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Password</label>
                <button type="button" className="text-[12px] text-blue-600 font-medium hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-12 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-[13px] text-red-600 bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[15px] shadow-[0_4px_16px_rgba(37,99,235,0.30)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.40)] active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={17} /></>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[12px] text-slate-400 font-medium">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Biometric */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-300 text-[14px] font-semibold transition-all shadow-sm"
            >
              <Fingerprint size={18} className="text-blue-500" />
              Sign in with Biometrics
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-[13px] text-slate-400">
              Having trouble?{" "}
              <button className="text-blue-600 font-semibold hover:underline">Contact Support</button>
            </p>
            <p className="text-[11px] text-slate-300 mt-2">
              Tarkon International School · Secure Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
