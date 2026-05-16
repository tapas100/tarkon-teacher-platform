"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Play, Users, ClipboardList, FileText, BarChart2, FolderOpen, Sparkles, Wifi, Mic, MonitorPlay, CheckSquare } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CLASSES, STUDENTS, ASSIGNMENTS, STUDENT_ALERTS } from "@/lib/mock-data";
import { cn, getStrengthColor } from "@/lib/utils";

const TABS = ["Overview", "Students", "Assignments", "Exams", "Analytics", "Resources", "AI Insights"];

export default function ClassDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const cls = CLASSES.find((c) => c.id === id) || CLASSES[0];
  const classStudents = STUDENTS.filter((s) => s.grade === cls.grade);

  const isLive = cls.schedule.some((s) => s.status === "live");

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 flex items-center gap-3 border-b border-border bg-white sticky top-16 z-20">
        <Link href="/classes" className="w-9 h-9 rounded-2xl bg-background flex items-center justify-center text-text-secondary hover:text-primary flex-shrink-0">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-card-title font-bold text-text-primary truncate">{cls.name}</h1>
            {isLive && <Badge variant="green" dot>Live Now</Badge>}
          </div>
          <p className="text-caption text-text-secondary">{cls.studentCount} students · Section {cls.section}</p>
        </div>
        {isLive ? (
          <Button icon={<Play size={16} />} variant="success">Join Live</Button>
        ) : (
          <Button icon={<Play size={16} />}>Start Class</Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 md:px-6 py-3 overflow-x-auto no-scrollbar border-b border-border bg-white">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)}
            className={cn("flex-shrink-0 px-3.5 py-2 rounded-2xl text-caption font-semibold transition-all",
              activeTab === i ? "bg-primary text-white" : "text-text-secondary hover:text-text-primary hover:bg-background")}>
            {t}
          </button>
        ))}
      </div>

      <div className="p-4 md:p-6">
        {/* ── Overview Tab ─────────────────────────────────── */}
        {activeTab === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stats */}
            <div className="card">
              <h3 className="font-semibold text-body text-text-primary mb-4">Class Health</h3>
              <div className="space-y-4">
                {[
                  { label: "Attendance Today", value: cls.attendanceToday, variant: "blue" as const },
                  { label: "Homework Submitted", value: cls.homeworkStatus, variant: "green" as const },
                  { label: "Engagement Score", value: cls.engagementScore, variant: "purple" as const },
                  { label: "Attention Score", value: cls.attentionScore, variant: "amber" as const },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-caption mb-1.5">
                      <span className="text-text-secondary">{item.label}</span>
                      <span className="font-bold text-text-primary">{item.value}%</span>
                    </div>
                    <ProgressBar value={item.value} variant={item.variant} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="card">
              <h3 className="font-semibold text-body text-text-primary mb-4">Class Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: CheckSquare, label: "Take Attendance", color: "bg-blue-100 text-blue-600" },
                  { icon: MonitorPlay, label: "Start Live Class", color: "bg-emerald-100 text-emerald-600" },
                  { icon: Sparkles, label: "AI Notes", color: "bg-purple-100 text-purple-600" },
                  { icon: Wifi, label: "Live Poll", color: "bg-amber-100 text-amber-600" },
                  { icon: Mic, label: "Voice Recording", color: "bg-red-100 text-red-600" },
                  { icon: ClipboardList, label: "Quick Quiz", color: "bg-sky-100 text-sky-600" },
                ].map((action) => (
                  <button key={action.label} className="flex items-center gap-2 p-3 rounded-2xl bg-background hover:shadow-card transition-all text-left card-hover">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", action.color)}>
                      <action.icon size={16} />
                    </div>
                    <span className="text-caption font-medium text-text-primary">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming schedule */}
            <div className="card md:col-span-2">
              <h3 className="font-semibold text-body text-text-primary mb-4">Schedule</h3>
              <div className="space-y-3">
                {cls.schedule.map((s) => (
                  <div key={s.id} className="flex items-center gap-4">
                    <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0",
                      s.status === "live" ? "bg-emerald-500 animate-pulse" : s.status === "completed" ? "bg-slate-300" : "bg-primary")}>
                    </div>
                    <div className="flex-1">
                      <span className="text-body font-medium text-text-primary">{s.time}</span>
                      <span className="text-body text-text-secondary ml-2">{s.duration} min</span>
                    </div>
                    <Badge variant={s.status === "live" ? "green" : s.status === "completed" ? "gray" : "blue"}>
                      {s.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Students Tab ──────────────────────────────────── */}
        {activeTab === 1 && (
          <div className="space-y-3">
            {classStudents.map((student) => (
              <div key={student.id} className="card card-hover">
                <div className="flex items-center gap-3">
                  <Avatar name={student.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-body text-text-primary">{student.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-text-secondary">Attendance: {student.attendance}%</span>
                      <span className="text-[11px] text-text-secondary">·</span>
                      <span className="text-[11px] text-text-secondary">HW: {student.homeworkConsistency}%</span>
                    </div>
                    {student.weakConcepts.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {student.weakConcepts.map((c) => (
                          <span key={c} className="text-[10px] px-1.5 py-0.5 rounded-md bg-red-50 text-red-600 font-medium">{c}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-lg",
                      student.aiRiskScore >= 60 ? "bg-red-50 text-red-600" : student.aiRiskScore >= 30 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600")}>
                      Risk {student.aiRiskScore}%
                    </span>
                    <Button size="sm" variant="ghost">Message</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── AI Insights Tab ───────────────────────────────── */}
        {activeTab === 6 && (
          <div className="space-y-4">
            <div className="card bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl gradient-purple flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-body text-text-primary">AI Insights for {cls.name}</p>
                  <p className="text-caption text-text-secondary">Updated just now</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: "🧠", text: `${cls.weakStudentsCount} students struggling with core concepts — remedial session recommended` },
                  { icon: "📈", text: "Engagement is above average — perfect time to introduce advanced topics" },
                  { icon: "⚠️", text: "Attention drop detected after 30-minute mark — consider micro-breaks" },
                  { icon: "💡", text: "Suggested: Peer-learning groups based on AI-analysed skill distribution" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/80 rounded-2xl p-3">
                    <span className="text-lg">{item.icon}</span>
                    <p className="text-caption text-text-primary">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {(activeTab === 2 || activeTab === 3 || activeTab === 4 || activeTab === 5) && (
          <div className="card py-12 text-center">
            <p className="text-3xl mb-3">{["📋", "📝", "📊", "📁"][activeTab - 2]}</p>
            <p className="text-card-title font-semibold text-text-primary mb-1">{TABS[activeTab]}</p>
            <p className="text-text-secondary text-body">Content for this tab is loaded here</p>
          </div>
        )}
      </div>
    </div>
  );
}
