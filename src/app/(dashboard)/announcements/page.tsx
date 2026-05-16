"use client";
import { useState } from "react";
import { Plus, Megaphone, School, BookOpen, FileText, AlertOctagon, Pin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ANNOUNCEMENTS } from "@/lib/mock-data";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { Announcement } from "@/types";

const TYPE_CONFIG = {
  school: { label: "School", variant: "blue" as const, icon: School },
  class: { label: "Class", variant: "green" as const, icon: BookOpen },
  homework: { label: "Homework", variant: "amber" as const, icon: FileText },
  exam: { label: "Exam", variant: "purple" as const, icon: FileText },
  urgent: { label: "Urgent", variant: "red" as const, icon: AlertOctagon },
};

function AnnouncementCard({ a }: { a: Announcement }) {
  const config = TYPE_CONFIG[a.type];
  const Icon = config.icon;

  return (
    <div className={cn("card card-hover", a.pinned && "ring-2 ring-primary/30")}>
      <div className="flex items-start gap-3">
        <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0",
          a.type === "urgent" ? "bg-red-100" : a.type === "exam" ? "bg-purple-100" : "bg-primary-100")}>
          <Icon size={18} className={a.type === "urgent" ? "text-red-500" : a.type === "exam" ? "text-purple-600" : "text-primary"} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {a.pinned && <Pin size={12} className="text-primary" />}
            <p className="font-semibold text-body text-text-primary">{a.title}</p>
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
          <p className="text-caption text-text-secondary mb-2">{a.content}</p>
          <div className="flex items-center gap-3 text-[11px] text-text-secondary">
            <span>By {a.author}</span>
            <span>·</span>
            <span>{formatRelativeTime(a.publishedAt)}</span>
            <span>·</span>
            <span>📣 {a.targetGrades.join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnnouncementsPage() {
  const [filter, setFilter] = useState("All");
  const types = ["All", "School", "Class", "Exam", "Homework", "Urgent"];

  const filtered = ANNOUNCEMENTS.filter((a) => {
    if (filter === "All") return true;
    return a.type === filter.toLowerCase();
  });

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-page-header font-bold text-text-primary">Announcements</h1>
          <p className="text-text-secondary text-body">{ANNOUNCEMENTS.length} announcements</p>
        </div>
        <Button icon={<Plus size={18} />}>New</Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar">
        {types.map((t) => (
          <button key={t} onClick={() => setFilter(t)}
            className={cn("flex-shrink-0 px-4 py-2 rounded-2xl text-caption font-semibold transition-all",
              filter === t ? "bg-primary text-white" : "bg-white border border-border text-text-secondary hover:text-text-primary")}>
            {t}
          </button>
        ))}
      </div>

      {/* Compose hint */}
      <div className="card mb-5 flex items-center gap-3 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100">
        <div className="w-10 h-10 rounded-2xl gradient-blue flex items-center justify-center">
          <Megaphone size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-body text-text-primary">Compose an Announcement</p>
          <p className="text-caption text-text-secondary">AI can simplify, translate, and tone-adjust your message automatically</p>
        </div>
        <Button size="sm" variant="primary">Compose</Button>
      </div>

      <div className="space-y-3">
        {filtered.map((a) => <AnnouncementCard key={a.id} a={a} />)}
      </div>
    </div>
  );
}
