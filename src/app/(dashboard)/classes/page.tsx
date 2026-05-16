"use client";
import { useState } from "react";
import { Plus, Users, AlertTriangle, BookOpen, BarChart2, ChevronRight, Play, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Avatar } from "@/components/ui/Avatar";
import { CLASSES, STUDENTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const TABS = ["Overview", "Students", "Assignments", "Exams", "Analytics", "Resources", "AI Insights"];

function ClassCard({ cls }: { cls: typeof CLASSES[0] }) {
  const gradients: Record<string, string> = {
    "gradient-blue": "from-blue-500 to-blue-600",
    "gradient-emerald": "from-emerald-500 to-emerald-600",
    "gradient-purple": "from-purple-600 to-purple-700",
  };

  return (
    <Link href={`/classes/${cls.id}`}>
      <div className="card card-hover overflow-hidden">
        {/* Top gradient */}
        <div className={cn("h-3 rounded-t-2xl -mx-4 -mt-4 mb-4 bg-gradient-to-r", gradients[cls.color] || "from-blue-500 to-blue-600")} />

        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-bold text-card-title text-text-primary">{cls.name}</p>
            <p className="text-caption text-text-secondary">{cls.studentCount} students · {cls.section}</p>
          </div>
          <div className="flex flex-col gap-1 items-end">
            {cls.schedule.some((s) => s.status === "live") && (
              <Badge variant="green" dot>Live</Badge>
            )}
            {cls.upcomingExams > 0 && (
              <Badge variant="amber">{cls.upcomingExams} exam{cls.upcomingExams > 1 ? "s" : ""}</Badge>
            )}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: "Attendance", value: `${cls.attendanceToday}%`, color: "text-primary" },
            { label: "Homework", value: `${cls.homeworkStatus}%`, color: "text-emerald-600" },
            { label: "Engagement", value: `${cls.engagementScore}%`, color: "text-purple-600" },
            { label: "Attention", value: `${cls.attentionScore}%`, color: "text-amber-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-background rounded-2xl px-3 py-2.5">
              <p className={cn("text-card-title font-bold", stat.color)}>{stat.value}</p>
              <p className="text-[11px] text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Weak students warning */}
        {cls.weakStudentsCount > 0 && (
          <div className="flex items-center gap-2 bg-red-50 rounded-2xl px-3 py-2 mb-3">
            <AlertTriangle size={14} className="text-red-500" />
            <p className="text-caption text-red-600 font-medium">{cls.weakStudentsCount} students need attention</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" variant="primary" icon={<Play size={14} />} className="flex-1">
            {cls.schedule.some((s) => s.status === "live") ? "Join Live" : "Start Class"}
          </Button>
          <Button size="sm" variant="secondary" icon={<Users size={14} />}>
            Students
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default function ClassesPage() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-page-header font-bold text-text-primary">My Classes</h1>
          <p className="text-text-secondary text-body">3 active classes · Saturday, 16 May 2026</p>
        </div>
        <Button icon={<Plus size={18} />} size="sm">Add Class</Button>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Students", value: "113", icon: Users, color: "text-primary bg-primary-100" },
          { label: "Live Now", value: "1", icon: Play, color: "text-emerald-600 bg-emerald-100" },
          { label: "Upcoming", value: "3", icon: Calendar, color: "text-amber-600 bg-amber-100" },
          { label: "Need Attention", value: "12", icon: AlertTriangle, color: "text-red-600 bg-red-100" },
        ].map((s) => (
          <div key={s.label} className="card flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0", s.color)}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-card-title font-bold text-text-primary">{s.value}</p>
              <p className="text-[11px] text-text-secondary">{s.label}</p>
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
