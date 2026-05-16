"use client";
import { useState } from "react";
import { Search, Filter, MessageCircle, AlertTriangle, BookOpen, Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { STUDENTS } from "@/lib/mock-data";
import { cn, getRiskColor } from "@/lib/utils";
import type { Student } from "@/types";

function StudentCard({ student }: { student: Student }) {
  const riskColor = getRiskColor(student.aiRiskScore);

  return (
    <div className="card card-hover">
      <div className="flex items-center gap-3 mb-4">
        <Avatar name={student.name} size="lg" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-body text-text-primary">{student.name}</p>
          <p className="text-caption text-text-secondary">Grade {student.grade}{student.section} · Roll #{student.rollNumber}</p>
          <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-lg mt-1 inline-block", riskColor)}>
            AI Risk: {student.aiRiskScore}%
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2.5 mb-4">
        <div>
          <div className="flex items-center justify-between text-caption mb-1">
            <span className="text-text-secondary">Attendance</span>
            <span className="font-semibold">{student.attendance}%</span>
          </div>
          <ProgressBar value={student.attendance} variant={student.attendance > 80 ? "green" : student.attendance > 60 ? "amber" : "red"} size="sm" />
        </div>
        <div>
          <div className="flex items-center justify-between text-caption mb-1">
            <span className="text-text-secondary">Homework Consistency</span>
            <span className="font-semibold">{student.homeworkConsistency}%</span>
          </div>
          <ProgressBar value={student.homeworkConsistency} variant={student.homeworkConsistency > 75 ? "green" : "amber"} size="sm" />
        </div>
      </div>

      {/* Weak concepts */}
      {student.weakConcepts.length > 0 && (
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-text-secondary mb-1.5">Weak Concepts</p>
          <div className="flex flex-wrap gap-1.5">
            {student.weakConcepts.map((c) => (
              <span key={c} className="text-[11px] px-2 py-0.5 rounded-lg bg-red-50 text-red-600 font-medium">{c}</span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button size="sm" variant="primary" icon={<MessageCircle size={13} />} className="flex-1">
          Message Parent
        </Button>
        <Button size="sm" variant="ghost" icon={<Sparkles size={13} />}>
          AI Plan
        </Button>
      </div>
    </div>
  );
}

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filters = ["All", "At Risk", "Strong", "Absent Today"];
  const filtered = STUDENTS.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.grade.includes(search) || s.rollNumber.toLowerCase().includes(search.toLowerCase());
    if (filter === "All") return matchSearch;
    if (filter === "At Risk") return matchSearch && s.aiRiskScore >= 50;
    if (filter === "Strong") return matchSearch && s.aiRiskScore < 30;
    return matchSearch;
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-page-header font-bold text-text-primary">Students</h1>
          <p className="text-text-secondary text-body">{STUDENTS.length} students across 3 classes</p>
        </div>
        <Button icon={<Filter size={16} />} variant="secondary" size="sm">Filter</Button>
      </div>

      {/* Risk summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "At Risk", value: STUDENTS.filter(s => s.aiRiskScore >= 60).length, color: "text-red-600 bg-red-100", icon: AlertTriangle },
          { label: "Needs Watch", value: STUDENTS.filter(s => s.aiRiskScore >= 30 && s.aiRiskScore < 60).length, color: "text-amber-600 bg-amber-100", icon: AlertTriangle },
          { label: "On Track", value: STUDENTS.filter(s => s.aiRiskScore < 30).length, color: "text-emerald-600 bg-emerald-100", icon: BookOpen },
        ].map((s) => (
          <div key={s.label} className="card flex items-center gap-3">
            <div className={cn("w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0", s.color)}>
              <s.icon size={16} />
            </div>
            <div>
              <p className={cn("text-card-title font-bold", s.color.split(" ")[0])}>{s.value}</p>
              <p className="text-[11px] text-text-secondary">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, grade, roll…"
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-border text-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn("flex-shrink-0 px-3.5 py-2 rounded-2xl text-caption font-semibold transition-all",
                filter === f ? "bg-primary text-white" : "bg-white border border-border text-text-secondary hover:text-text-primary")}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((s) => <StudentCard key={s.id} student={s} />)}
      </div>
    </div>
  );
}
