"use client";
import { useState } from "react";
import { Plus, Calendar, Clock, ChevronRight, BarChart2, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { EXAMS } from "@/lib/mock-data";
import { cn, formatDate } from "@/lib/utils";
import type { Exam } from "@/types";

const STATUS_CONFIG = {
  upcoming: { label: "Upcoming", variant: "blue" as const, icon: Calendar },
  live: { label: "Live", variant: "green" as const, icon: Clock },
  completed: { label: "Completed", variant: "gray" as const, icon: CheckCircle },
  evaluation: { label: "Evaluation", variant: "amber" as const, icon: BarChart2 },
};

function ExamCard({ exam }: { exam: Exam }) {
  const status = STATUS_CONFIG[exam.status];

  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-body text-text-primary">{exam.title}</p>
          <p className="text-caption text-text-secondary">{exam.grade} · {exam.subject}</p>
        </div>
        <Badge variant={status.variant} dot>{status.label}</Badge>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-xl bg-background text-text-secondary font-medium">
          <Calendar size={11} /> {formatDate(exam.date)}
        </span>
        <span className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-xl bg-background text-text-secondary font-medium">
          <Clock size={11} /> {exam.duration} min
        </span>
        <span className="text-[11px] px-2 py-1 rounded-xl bg-background text-text-secondary font-medium">
          👥 {exam.totalStudents} students
        </span>
      </div>

      {exam.status === "evaluation" && exam.evaluated != null && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-caption mb-1.5">
            <span className="text-text-secondary">Evaluation Progress</span>
            <span className="font-semibold text-text-primary">{exam.evaluated}/{exam.totalStudents}</span>
          </div>
          <ProgressBar value={Math.round((exam.evaluated / exam.totalStudents) * 100)} variant="amber" />
        </div>
      )}

      {exam.averageScore && (
        <div className="flex items-center gap-2 mb-3 bg-background rounded-2xl px-3 py-2">
          <BarChart2 size={14} className="text-primary" />
          <span className="text-caption text-text-secondary">Average Score:</span>
          <span className="text-caption font-bold text-primary">{exam.averageScore}%</span>
        </div>
      )}

      {exam.weakChapters && exam.weakChapters.length > 0 && (
        <div className="flex items-center gap-2 mb-3 bg-red-50 rounded-2xl px-3 py-2">
          <AlertTriangle size={14} className="text-red-500" />
          <span className="text-caption text-red-600 font-medium">Weak: {exam.weakChapters.join(", ")}</span>
        </div>
      )}

      <div className="flex gap-2">
        {exam.status === "evaluation" ? (
          <Button size="sm" variant="primary" className="flex-1">Continue Grading</Button>
        ) : exam.status === "upcoming" ? (
          <>
            <Button size="sm" variant="primary" className="flex-1">View</Button>
            <Button size="sm" variant="ghost"><Sparkles size={14} /></Button>
          </>
        ) : (
          <Button size="sm" variant="secondary" className="flex-1">View Results</Button>
        )}
      </div>
    </div>
  );
}

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Upcoming", "Evaluation", "Completed"];

  const filtered = EXAMS.filter((e) => {
    if (activeTab === "All") return true;
    return e.status === activeTab.toLowerCase();
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-page-header font-bold text-text-primary">Exams</h1>
          <p className="text-text-secondary text-body">{EXAMS.length} exams · 1 pending evaluation</p>
        </div>
        <Button icon={<Plus size={18} />}>Create Exam</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Upcoming", value: "2", color: "text-blue-600 bg-blue-100" },
          { label: "In Evaluation", value: "1", color: "text-amber-600 bg-amber-100" },
          { label: "Completed", value: "1", color: "text-emerald-600 bg-emerald-100" },
          { label: "Avg Score", value: "74%", color: "text-purple-600 bg-purple-100" },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <p className={cn("text-card-title font-bold", s.color.split(" ")[0])}>{s.value}</p>
            <p className="text-[11px] text-text-secondary mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-2xl text-caption font-semibold transition-all",
              activeTab === t ? "bg-primary text-white" : "bg-white border border-border text-text-secondary hover:text-text-primary"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* AI Exam Generator */}
      <div className="card mb-5 flex items-center gap-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
        <div className="w-12 h-12 rounded-2xl gradient-purple flex items-center justify-center flex-shrink-0">
          <Sparkles size={22} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-body text-text-primary">Generate Exam with AI</p>
          <p className="text-caption text-text-secondary">Select syllabus, difficulty level, and question types — AI creates a balanced exam in seconds</p>
        </div>
        <Button variant="ai" size="sm">Generate</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((exam) => <ExamCard key={exam.id} exam={exam} />)}
      </div>
    </div>
  );
}
