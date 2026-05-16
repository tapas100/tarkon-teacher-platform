"use client";
import { useState } from "react";
import { Plus, Filter, Clock, CheckCircle, AlertCircle, Search, Sparkles, Upload, Mic } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ASSIGNMENTS } from "@/lib/mock-data";
import { cn, formatDate } from "@/lib/utils";
import type { Assignment } from "@/types";
import Link from "next/link";

const STATUS_CONFIG = {
  pending: { label: "Pending", variant: "amber" as const, icon: Clock },
  submitted: { label: "Submitted", variant: "blue" as const, icon: CheckCircle },
  graded: { label: "Graded", variant: "green" as const, icon: CheckCircle },
  overdue: { label: "Overdue", variant: "red" as const, icon: AlertCircle },
};

const BLOOM_COLORS: Record<string, string> = {
  Remember: "bg-blue-100 text-blue-700",
  Understand: "bg-sky-100 text-sky-700",
  Apply: "bg-emerald-100 text-emerald-700",
  Analyse: "bg-amber-100 text-amber-700",
  Evaluate: "bg-orange-100 text-orange-700",
  Create: "bg-purple-100 text-purple-700",
};

function AssignmentCard({ a }: { a: Assignment }) {
  const status = STATUS_CONFIG[a.status];
  const Icon = status.icon;
  const pct = Math.round((a.submissionsCount / a.totalStudents) * 100);

  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-body text-text-primary">{a.title}</p>
          <p className="text-caption text-text-secondary">{a.grade} · {a.subject} · {a.topic}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 ml-3">
          <Badge variant={status.variant} dot>{status.label}</Badge>
          {a.aiChecked && (
            <span className="flex items-center gap-1 text-[10px] text-purple-600 font-semibold">
              <Sparkles size={10} /> AI Checked
            </span>
          )}
        </div>
      </div>

      {/* Submission progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-caption mb-1.5">
          <span className="text-text-secondary">Submissions</span>
          <span className="font-semibold text-text-primary">{a.submissionsCount}/{a.totalStudents}</span>
        </div>
        <ProgressBar value={pct} variant={pct > 80 ? "green" : pct > 50 ? "blue" : "amber"} />
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 mb-3">
        {a.bloomLevel && (
          <span className={cn("text-[11px] px-2 py-0.5 rounded-lg font-semibold", BLOOM_COLORS[a.bloomLevel])}>
            🎯 {a.bloomLevel}
          </span>
        )}
        {a.estimatedMinutes && (
          <span className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-medium">
            ⏱ {a.estimatedMinutes} min
          </span>
        )}
        <span className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-medium">
          📅 Due {formatDate(a.deadline)}
        </span>
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="primary" className="flex-1">Review</Button>
        <Button size="sm" variant="secondary">Feedback</Button>
        <Button size="sm" variant="ghost">
          <Sparkles size={14} />
        </Button>
      </div>
    </div>
  );
}

export default function AssignmentsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filters = ["All", "Pending", "Submitted", "Graded", "Overdue"];
  const filtered = ASSIGNMENTS.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subject.toLowerCase().includes(search.toLowerCase());
    if (filter === "All") return matchSearch;
    return matchSearch && a.status === filter.toLowerCase();
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-page-header font-bold text-text-primary">Assignments</h1>
          <p className="text-text-secondary text-body">{ASSIGNMENTS.length} total · 2 pending review</p>
        </div>
        <Link href="/assignments/create">
          <Button icon={<Plus size={18} />}>Create</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Pending", value: "2", color: "text-amber-600 bg-amber-100" },
          { label: "Submitted", value: "28", color: "text-blue-600 bg-blue-100" },
          { label: "Graded", value: "1", color: "text-emerald-600 bg-emerald-100" },
          { label: "AI Checked", value: "2", color: "text-purple-600 bg-purple-100" },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <p className={cn("text-card-title font-bold", s.color.split(" ")[0])}>{s.value}</p>
            <p className="text-[11px] text-text-secondary mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assignments…"
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-border text-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex-shrink-0 px-3.5 py-2 rounded-2xl text-caption font-semibold transition-all",
                filter === f ? "bg-primary text-white" : "bg-white border border-border text-text-secondary hover:text-text-primary"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((a) => <AssignmentCard key={a.id} a={a} />)}
      </div>
    </div>
  );
}
