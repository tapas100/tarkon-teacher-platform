"use client";
import { MessageCircle, Calendar, TrendingUp, AlertTriangle, Sparkles, Phone } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, CountBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PARENTS } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/utils";
import type { Parent } from "@/types";

function ParentCard({ parent }: { parent: Parent }) {
  return (
    <div className="card card-hover">
      <div className="flex items-start gap-3 mb-4">
        <Avatar name={parent.name} size="md" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-body text-text-primary">{parent.name}</p>
          <p className="text-caption text-text-secondary">Parent of {parent.studentName} · {parent.studentGrade}</p>
          <p className="text-[11px] text-text-secondary mt-0.5">Last contact: {formatRelativeTime(parent.lastContact)}</p>
        </div>
        {parent.pendingMessages > 0 && (
          <CountBadge count={parent.pendingMessages} variant="red" />
        )}
      </div>

      {parent.meetings && parent.meetings.length > 0 && (
        <div className="bg-amber-50 rounded-2xl px-3 py-2 mb-3 flex items-center gap-2">
          <Calendar size={13} className="text-amber-600" />
          <p className="text-caption text-amber-700 font-medium">
            Meeting: {parent.meetings[0].date} · {parent.meetings[0].purpose}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Button size="sm" variant="primary" icon={<MessageCircle size={13} />} className="flex-1">Message</Button>
        <Button size="sm" variant="secondary" icon={<TrendingUp size={13} />}>Progress</Button>
        <Button size="sm" variant="ghost" icon={<Sparkles size={13} />}>AI Note</Button>
      </div>
    </div>
  );
}

export default function ParentsPage() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-page-header font-bold text-text-primary">Parents</h1>
          <p className="text-text-secondary text-body">{PARENTS.length} parent connections</p>
        </div>
        <Button icon={<Sparkles size={16} />} variant="ai">AI Communication</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Pending Messages", value: PARENTS.reduce((a, p) => a + p.pendingMessages, 0), icon: MessageCircle, color: "text-red-600 bg-red-100" },
          { label: "Meetings Scheduled", value: PARENTS.filter(p => p.meetings?.length).length, icon: Calendar, color: "text-amber-600 bg-amber-100" },
          { label: "Progress Shared", value: 2, icon: TrendingUp, color: "text-emerald-600 bg-emerald-100" },
        ].map((s) => (
          <div key={s.label} className="card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className={`text-card-title font-bold ${s.color.split(" ")[0]}`}>{s.value}</p>
              <p className="text-[11px] text-text-secondary">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Communication helper */}
      <div className="card mb-6 flex items-center gap-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
        <div className="w-12 h-12 rounded-2xl gradient-purple flex items-center justify-center flex-shrink-0">
          <Sparkles size={22} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-body text-text-primary">Smart Parent Communication</p>
          <p className="text-caption text-text-secondary">AI simplifies feedback · Translates to parent&apos;s language · Generates positive action plans</p>
        </div>
        <Button size="sm" variant="ai">Start</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {PARENTS.map((p) => <ParentCard key={p.id} parent={p} />)}
      </div>
    </div>
  );
}
