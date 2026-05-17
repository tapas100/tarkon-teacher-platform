"use client";
import {
  BookOpen, ClipboardCheck, FileText, AlertTriangle, MessageCircle,
  Play, Users, Sparkles, ChevronRight, TrendingUp, TrendingDown,
  CheckCircle, ArrowRight, Zap, Brain, BarChart3, Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  DASHBOARD_STATS, TODAY_SCHEDULE, STUDENT_ALERTS,
  AI_RECOMMENDATIONS, CLASSES, TEACHER
} from "@/lib/mock-data";
import { cn, getSeverityColor } from "@/lib/utils";
import Link from "next/link";

const STAT_CONFIG: Record<string, {
  icon: React.ElementType;
  bg: string;
  iconBg: string;
  iconColor: string;
  accent: string;
}> = {
  BookOpen:      { icon: BookOpen,      bg: "bg-blue-600",   iconBg: "bg-blue-500",   iconColor: "text-white", accent: "from-blue-400/20 to-transparent" },
  ClipboardCheck:{ icon: ClipboardCheck,bg: "bg-amber-500",  iconBg: "bg-amber-400",  iconColor: "text-white", accent: "from-amber-300/20 to-transparent" },
  FileText:      { icon: FileText,      bg: "bg-emerald-600",iconBg: "bg-emerald-500",iconColor: "text-white", accent: "from-emerald-400/20 to-transparent" },
  AlertTriangle: { icon: AlertTriangle, bg: "bg-red-500",    iconBg: "bg-red-400",    iconColor: "text-white", accent: "from-red-300/20 to-transparent" },
  MessageCircle: { icon: MessageCircle, bg: "bg-violet-600", iconBg: "bg-violet-500", iconColor: "text-white", accent: "from-violet-400/20 to-transparent" },
};

function StatCard({ stat }: { stat: typeof DASHBOARD_STATS[0] }) {
  const cfg = STAT_CONFIG[stat.icon] ?? STAT_CONFIG.BookOpen;
  const Icon = cfg.icon;
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl p-5 text-white min-w-[148px] flex-shrink-0 flex flex-col gap-4",
      cfg.bg
    )}>
      {/* Decorative circle */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/[0.08]" />
      <div className="absolute -bottom-4 -right-2 w-16 h-16 rounded-full bg-white/[0.05]" />

      <div className="flex items-center justify-between relative z-10">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", cfg.iconBg)}>
          <Icon size={17} className={cfg.iconColor} />
        </div>
        {stat.change && (
          <span className="flex items-center gap-1 text-[11px] font-semibold bg-white/20 backdrop-blur px-2 py-1 rounded-lg">
            {stat.changeType === "up" ? <TrendingUp size={9} /> : stat.changeType === "down" ? <TrendingDown size={9} /> : null}
            {stat.change}
          </span>
        )}
      </div>
      <div className="relative z-10">
        <p className="text-[32px] font-bold leading-none tracking-tight">{stat.value}</p>
        <p className="text-white/70 text-[12px] font-medium mt-1.5 leading-tight">{stat.label}</p>
      </div>
    </div>
  );
}

function ScheduleCard({ item }: { item: typeof TODAY_SCHEDULE[0] }) {
  return (
    <div className={cn(
      "group flex items-center gap-4 px-4 py-3.5 rounded-2xl border transition-all duration-200",
      item.status === "live"
        ? "bg-emerald-50 border-emerald-200 shadow-[0_0_0_1px_#10b981]"
        : item.status === "completed"
        ? "bg-slate-50 border-slate-100"
        : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm"
    )}>
      {/* Time indicator */}
      <div className="flex flex-col items-center w-12 flex-shrink-0">
        <div className={cn(
          "w-2.5 h-2.5 rounded-full mb-1",
          item.status === "live" ? "bg-emerald-500 ring-4 ring-emerald-200 animate-pulse" :
          item.status === "completed" ? "bg-slate-300" : "bg-blue-500"
        )} />
        <p className="text-[11px] font-semibold text-slate-400 tabular-nums">{item.time}</p>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={cn(
            "font-semibold text-[14px] truncate",
            item.status === "completed" ? "text-slate-400 line-through" : "text-slate-800"
          )}>{item.className}</p>
          {item.status === "live" && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE
            </span>
          )}
        </div>
        <p className="text-[12px] text-slate-400 mt-0.5">{item.room}</p>
      </div>

      {/* Actions */}
      {item.status === "live" && (
        <Button size="sm" variant="success" icon={<Play size={13} />}>Join</Button>
      )}
      {item.status === "upcoming" && (
        <Button size="sm" variant="secondary" icon={<Play size={13} />}>Start</Button>
      )}
      {item.status === "completed" && (
        <CheckCircle size={18} className="text-slate-300 flex-shrink-0" />
      )}
    </div>
  );
}

function AlertCard({ alert }: { alert: typeof STUDENT_ALERTS[0] }) {
  const isCritical = alert.severity === "critical";
  return (
    <div className={cn(
      "rounded-2xl border p-4 transition-all duration-200 hover:shadow-sm",
      isCritical ? "bg-red-50/60 border-red-100" : "bg-amber-50/60 border-amber-100"
    )}>
      <div className="flex items-start gap-3">
        <Avatar name={alert.studentName} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-semibold text-[14px] text-slate-800">{alert.studentName}</p>
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
              isCritical ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"
            )}>
              {alert.severity}
            </span>
          </div>
          <p className="text-[13px] text-slate-500 mb-2">{alert.message}</p>
          <div className="flex items-start gap-1.5 bg-white/80 rounded-xl px-3 py-2 border border-slate-100">
            <Zap size={12} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-[12px] text-slate-600 leading-snug">{alert.suggestedIntervention}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button size="sm" variant="primary">Intervene</Button>
        <Button size="sm" variant="ghost">Message Parent</Button>
      </div>
    </div>
  );
}

function AIRecommendationCard({ rec }: { rec: typeof AI_RECOMMENDATIONS[0] }) {
  const typeConfig: Record<string, { icon: string; color: string; bg: string }> = {
    remedial: { icon: "🧠", color: "text-violet-600", bg: "bg-violet-50" },
    quiz:     { icon: "📝", color: "text-blue-600",   bg: "bg-blue-50" },
    revision: { icon: "🔄", color: "text-emerald-600",bg: "bg-emerald-50" },
    grouping: { icon: "👥", color: "text-amber-600",  bg: "bg-amber-50" },
  };
  const cfg = typeConfig[rec.type] ?? typeConfig.quiz;
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0", cfg.bg)}>
        {cfg.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[14px] text-slate-800">{rec.title}</p>
        <p className="text-[12px] text-slate-500 mt-0.5 line-clamp-2">{rec.description}</p>
      </div>
      <button className="flex-shrink-0 text-[12px] font-semibold text-violet-600 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
        {rec.actionLabel}
      </button>
    </div>
  );
}

function ClassHealthCard({ cls }: { cls: typeof CLASSES[0] }) {
  return (
    <Link href={`/classes/${cls.id}`}>
      <div className="p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 group">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-[14px] text-slate-800">{cls.name}</p>
            <p className="text-[12px] text-slate-400 mt-0.5">{cls.studentCount} students</p>
          </div>
          <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
        </div>
        <div className="space-y-3">
          {[
            { label: "Attendance", value: cls.attendanceToday, variant: "blue" as const },
            { label: "Homework", value: cls.homeworkStatus, variant: "green" as const },
            { label: "Engagement", value: cls.engagementScore, variant: "purple" as const },
          ].map(({ label, value, variant }) => (
            <div key={label}>
              <div className="flex justify-between mb-1">
                <span className="text-[11px] text-slate-400 font-medium">{label}</span>
                <span className="text-[11px] font-bold text-slate-600">{value}%</span>
              </div>
              <ProgressBar value={value} variant={variant} size="sm" />
            </div>
          ))}
        </div>
        {cls.weakStudentsCount > 0 && (
          <div className="mt-3 flex items-center gap-1.5 text-[12px] bg-red-50 px-3 py-1.5 rounded-xl">
            <AlertTriangle size={11} className="text-red-500" />
            <span className="text-red-600 font-semibold">{cls.weakStudentsCount} need attention</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function HomeDashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">

      {/* ── Page header (mobile only) ─────────────────── */}
      <div className="md:hidden">
        <h1 className="text-[22px] font-bold text-slate-900">
          {greeting}, <span className="text-blue-600">Ananya Ma&apos;am</span> 👋
        </h1>
        <p className="text-[13px] text-slate-400 mt-0.5">Saturday, 16 May 2026</p>
      </div>

      {/* ── Overview stats ─────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[17px] font-bold text-slate-900">Today&apos;s Overview</h2>
            <p className="text-[12px] text-slate-400 mt-0.5">Saturday, 16 May 2026</p>
          </div>
          <Link href="/analytics" className="flex items-center gap-1 text-[13px] text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            View all <ArrowRight size={13} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {DASHBOARD_STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
      </section>

      {/* ── Main 3-column grid ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left + Center (2 cols) ──────────────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Today's Classes */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock size={14} className="text-blue-600" />
                </div>
                <h2 className="text-[16px] font-bold text-slate-900">Today&apos;s Classes</h2>
              </div>
              <Link href="/classes" className="flex items-center gap-1 text-[12px] text-blue-600 font-semibold hover:text-blue-700">
                All Classes <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-2">
              {TODAY_SCHEDULE.map((item) => (
                <ScheduleCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Student Alerts */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle size={14} className="text-red-500" />
                </div>
                <h2 className="text-[16px] font-bold text-slate-900">Student Alerts</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-red-600 bg-red-100 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {STUDENT_ALERTS.filter(a => a.severity === "critical").length} Critical
              </span>
            </div>
            <div className="space-y-3">
              {STUDENT_ALERTS.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </section>

          {/* Pending Reviews */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                <ClipboardCheck size={14} className="text-amber-600" />
              </div>
              <h2 className="text-[16px] font-bold text-slate-900">Pending Reviews</h2>
            </div>
            <div className="space-y-2">
              {[
                { label: "Fractions Worksheet", sub: "28/38 submitted · Grade 5A", type: "Homework", badge: "blue" as const, action: "Review" },
                { label: "English Grammar Test", sub: "8 ungraded · Grade 7A", type: "Exam", badge: "amber" as const, action: "Grade" },
                { label: "Parent Meeting Request", sub: "Rahul's parent · Urgent", type: "Parent", badge: "red" as const, action: "Respond" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 px-4 py-3.5 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[14px] text-slate-800">{item.label}</p>
                    <p className="text-[12px] text-slate-400 mt-0.5">{item.sub}</p>
                  </div>
                  <Badge variant={item.badge}>{item.type}</Badge>
                  <button className="text-[12px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Right Column ────────────────────────────── */}
        <div className="space-y-6">

          {/* Class Health */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                <BarChart3 size={14} className="text-emerald-600" />
              </div>
              <h2 className="text-[16px] font-bold text-slate-900">Class Health</h2>
            </div>
            <div className="space-y-3">
              {CLASSES.map((cls) => (
                <ClassHealthCard key={cls.id} cls={cls} />
              ))}
            </div>
          </section>

          {/* AI Recommendations */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
                <Brain size={14} className="text-violet-600" />
              </div>
              <h2 className="text-[16px] font-bold text-slate-900">AI Recommendations</h2>
            </div>
            <div className="space-y-2.5">
              {AI_RECOMMENDATIONS.map((rec) => (
                <AIRecommendationCard key={rec.id} rec={rec} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
