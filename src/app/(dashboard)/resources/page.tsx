"use client";
import { useState } from "react";
import { Plus, Search, FileText, Video, BookOpen, Grid, Download, Sparkles, Filter } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RESOURCES } from "@/lib/mock-data";
import { cn, formatDate } from "@/lib/utils";
import type { Resource } from "@/types";

const TYPE_ICONS: Record<string, React.ElementType> = {
  note: FileText,
  ppt: Grid,
  video: Video,
  worksheet: FileText,
  template: FileText,
  "question-bank": BookOpen,
};

const TYPE_COLORS: Record<string, string> = {
  note: "bg-blue-100 text-blue-600",
  ppt: "bg-amber-100 text-amber-600",
  video: "bg-red-100 text-red-600",
  worksheet: "bg-emerald-100 text-emerald-600",
  template: "bg-purple-100 text-purple-600",
  "question-bank": "bg-sky-100 text-sky-600",
};

function ResourceCard({ res }: { res: Resource }) {
  const Icon = TYPE_ICONS[res.type] || FileText;
  const color = TYPE_COLORS[res.type] || "bg-gray-100 text-gray-600";

  return (
    <div className="card card-hover">
      <div className="flex items-start gap-3">
        <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0", color)}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-semibold text-body text-text-primary truncate">{res.title}</p>
            {res.isAiGenerated && (
              <Sparkles size={13} className="text-purple-600 flex-shrink-0" />
            )}
          </div>
          <p className="text-caption text-text-secondary">{res.subject} · Grade {res.grade}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <Badge variant={res.type === "worksheet" ? "green" : res.type === "video" ? "red" : "blue"}>
              {res.type.replace("-", " ")}
            </Badge>
            {res.fileSize && (
              <span className="text-[11px] text-text-secondary">{res.fileSize}</span>
            )}
            {res.isAiGenerated && (
              <Badge variant="purple">AI Generated</Badge>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button size="sm" variant="secondary" className="flex-1">Open</Button>
        <Button size="sm" variant="ghost" icon={<Download size={14} />}>Download</Button>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const types = ["All", "Notes", "PPT", "Video", "Worksheet", "Question Bank"];
  const filtered = RESOURCES.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.subject.toLowerCase().includes(search.toLowerCase());
    if (filter === "All") return matchSearch;
    return matchSearch && r.type.includes(filter.toLowerCase().replace(" ", "-"));
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-page-header font-bold text-text-primary">Resource Library</h1>
          <p className="text-text-secondary text-body">{RESOURCES.length} resources · Organised by subject</p>
        </div>
        <div className="flex gap-2">
          <Button icon={<Sparkles size={16} />} variant="ai" size="sm">AI Generate</Button>
          <Button icon={<Plus size={16} />} size="sm">Upload</Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search resources…"
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-border text-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {types.map((t) => (
            <button key={t} onClick={() => setFilter(t)}
              className={cn("flex-shrink-0 px-3.5 py-2 rounded-2xl text-caption font-semibold transition-all",
                filter === t ? "bg-primary text-white" : "bg-white border border-border text-text-secondary hover:text-text-primary")}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((r) => <ResourceCard key={r.id} res={r} />)}
      </div>
    </div>
  );
}
