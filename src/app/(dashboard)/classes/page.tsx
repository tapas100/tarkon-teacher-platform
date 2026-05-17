"use client";
import { Plus, Users, AlertTriangle, Play, Calendar, ChevronRight, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CLASSES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ACCENT: Record<string, { bar: string; icon: string; badge: string }> = {
  "gradient-blue":    { bar: "from-blue-500 to-blue-600",    icon: "bg-blue-600",    badge: "bg-blue-50 text-blue-700" },
  "gradient-emerald": { bar: "from-emerald-500 to-emerald-400", icon: "bg-emerald-600", badge: "bg-emerald-50 text-emerald-700" },
  "gradient-purple":  { bar: "from-violet-600 to-violet-500", icon: "bg-violet-600", badge: "bg-violet-50 text-violet-700" },
};

function ClassCard({ cls }: { cls: typeof CLASSES[0] }) {
  const accent = ACCENT[cls.color] ?? ACCENT["gradient-blue"];
  const isLive = cls.schedule.some((s) => s.status === "live");

  return (
    <Link href={`/classes/${cls.id}`}>
      <div className="group bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-200 overflow-hidden">
        {/* Color bar */}
        <div className={cn("h-1 bg-gradient-to-r", accent.bar)} />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", accent.icon)}>
                <span className="text-white font-bold text-[15px]">{cls.name.split(" ").map(w => w[0]).join("").slice(0,2)}</span>
              </div>
              <div>
                <p className="font-bold text-[15px] text-slate-900 group-hover:text-blue-600 transition-colors">{cls.name}</p>
                <p className="text-[12px] text-slate-400 mt-0.5">{cls.studentCount} students · {cls.section}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 items-end">
              {isLive && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />LIVE
                </span>
              )}
              {cls.upcomingExams > 0 && (
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  {cls.upcomingExams} exam{cls.upcomingExams > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: "Attendance", value: cls.attendanceToday, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Homework",   value: cls.homeworkStatus,  color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Engagement", value: cls.engagementScore, color: "text-violet-600", bg: "bg-violet-50" },
              { label: "Attention",  value: cls.attentionScore,  color: "text-amber-600", bg: "bg-amber-50" },
            ].map((stat) => (
              <div key={stat.label} className={cn("rounded-xl px-3 py-2.5", stat.bg)}>
                <p className={cn("text-[20px] font-bold leading-none", stat.color)}>{stat.value}%</p>
                <p className="text-[11px] text-slate-500 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Weak students */}
          {cls.weakStudentsCount > 0 && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-4">
              <AlertTriangle size={12} className="text-red-500 flex-shrink-0" />
              <p className="text-[12px] text-red-600 font-semibold">{cls.weakStudentsCount} students need attention</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all",
              accent.icon, "hover:opacity-90 active:scale-[0.98]"
            )}>
              <Play size={13} />
              {isLive ? "Join Live" : "Start Class"}
            </button>
            <button className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">
              <Users size={13} />
            </button>
            <button className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">
              <BarChart3 size={13} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ClassesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900">My Classes</h1>
          <p className="text-[13px] text-slate-400 mt-0.5">3 active classes · Saturday, 17 May 2026</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-[13px] font-semibold hover:bg-blue-700 shadow-[0_4px_12px_rgba(37,99,235,0.25)] active:scale-[0.98] transition-all">
          <Plus size={15} />
          Add Class
        </button>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Students", value: "113", icon: Users, bg: "bg-blue-50", color: "text-blue-600" },
          { label: "Live Now",       value: "1",   icon: Play,  bg: "bg-emerald-50", color: "text-emerald-600" },
          { label: "Upcoming",       value: "3",   icon: Calendar, bg: "bg-amber-50", color: "text-amber-600" },
          { label: "Need Attention", value: "12",  icon: AlertTriangle, bg: "bg-red-50", color: "text-red-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", s.bg)}>
              <s.icon size={16} className={s.color} />
            </div>
            <div>
              <p className="text-[20px] font-bold text-slate-900 leading-none">{s.value}</p>
              <p className="text-[11px] text-slate-400 font-medium mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Class cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {CLASSES.map((cls) => (
          <ClassCard key={cls.id} cls={cls} />
        ))}
      </div>
    </div>
  );
}


