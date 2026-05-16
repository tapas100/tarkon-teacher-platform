"use client";
import { useState } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, AreaChart, Area,
} from "recharts";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  WEEKLY_SCORES, CONCEPT_MASTERY, WEAKNESS_MAP_STUDENTS,
  WEAKNESS_MAP_CONCEPTS, WEAKNESS_MAP_SCORES
} from "@/lib/mock-data";
import { cn, getStrengthColor } from "@/lib/utils";

const TABS = ["Student Analytics", "Class Analytics", "Subject Analytics", "Cognitive Analytics", "Parent Engagement"];

const COGNITIVE_DATA = [
  { subject: "Confidence", A: 65, fullMark: 100 },
  { subject: "Focus", A: 72, fullMark: 100 },
  { subject: "Retention", A: 58, fullMark: 100 },
  { subject: "Speed", A: 80, fullMark: 100 },
  { subject: "Problem Solving", A: 70, fullMark: 100 },
  { subject: "Creativity", A: 60, fullMark: 100 },
];

const ATTENDANCE_DATA = [
  { day: "Mon", attendance: 95 },
  { day: "Tue", attendance: 88 },
  { day: "Wed", attendance: 92 },
  { day: "Thu", attendance: 85 },
  { day: "Fri", attendance: 90 },
];

function WeaknessHeatmap() {
  return (
    <div className="card">
      <h3 className="font-semibold text-body text-text-primary mb-4">🔥 Weakness Heatmap</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-[11px] text-text-secondary font-semibold py-2 pr-4 min-w-[80px]">Student</th>
              {WEAKNESS_MAP_CONCEPTS.map((c) => (
                <th key={c} className="text-center text-[11px] text-text-secondary font-semibold py-2 px-2 min-w-[80px]">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {WEAKNESS_MAP_STUDENTS.map((student, si) => (
              <tr key={student}>
                <td className="text-[12px] font-medium text-text-primary py-2 pr-4">{student}</td>
                {WEAKNESS_MAP_SCORES[si].map((score, ci) => (
                  <td key={ci} className="py-1.5 px-1 text-center">
                    <div className={cn(
                      "w-full h-8 rounded-xl flex items-center justify-center text-[11px] font-bold text-white",
                      getStrengthColor(score)
                    )}>
                      {score}%
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-4 mt-4 text-caption text-text-secondary">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-emerald-400" /> Strong (≥70%)</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-400" /> Medium (40-69%)</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-red-400" /> Weak (&lt;40%)</div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-page-header font-bold text-text-primary">Analytics</h1>
        <p className="text-text-secondary text-body">Deep insights into student performance & learning patterns</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)}
            className={cn("flex-shrink-0 px-4 py-2 rounded-2xl text-caption font-semibold transition-all",
              activeTab === i ? "bg-primary text-white" : "bg-white border border-border text-text-secondary hover:text-text-primary")}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 0 && (
        <div className="space-y-6">
          {/* Weekly Scores Chart */}
          <div className="card">
            <h3 className="font-semibold text-body text-text-primary mb-4">📈 Weekly Performance Trend</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={WEEKLY_SCORES}>
                <defs>
                  <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="purple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#64748B" }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 12, fill: "#64748B" }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} />
                <Legend />
                <Area type="monotone" dataKey="grade5" name="Grade 5" stroke="#2563EB" fill="url(#blue)" strokeWidth={2} dot={{ r: 4 }} />
                <Area type="monotone" dataKey="grade6" name="Grade 6" stroke="#10B981" fill="url(#green)" strokeWidth={2} dot={{ r: 4 }} />
                <Area type="monotone" dataKey="grade7" name="Grade 7" stroke="#7C3AED" fill="url(#purple)" strokeWidth={2} dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Concept Mastery */}
          <div className="card">
            <h3 className="font-semibold text-body text-text-primary mb-4">🎯 Concept Mastery – Grade 5A</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={CONCEPT_MASTERY} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: "#64748B" }} />
                <YAxis dataKey="concept" type="category" tick={{ fontSize: 12, fill: "#64748B" }} width={80} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} />
                <Bar dataKey="score" radius={[0, 8, 8, 0]}
                  fill="#2563EB"
                  label={{ position: "right", fontSize: 11, fill: "#64748B", formatter: (v: number) => `${v}%` }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Heatmap */}
          <WeaknessHeatmap />
        </div>
      )}

      {activeTab === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Class Avg Score", value: "74%", change: "+3%", color: "text-primary" },
              { label: "Attendance Rate", value: "91%", change: "-1%", color: "text-emerald-600" },
              { label: "Homework Rate", value: "76%", change: "+8%", color: "text-amber-600" },
            ].map((s) => (
              <div key={s.label} className="card text-center">
                <p className={cn("text-3xl font-bold", s.color)}>{s.value}</p>
                <p className="text-body text-text-secondary mt-1">{s.label}</p>
                <p className="text-caption text-emerald-600 font-medium mt-1">{s.change} this week</p>
              </div>
            ))}
          </div>
          <div className="card">
            <h3 className="font-semibold text-body text-text-primary mb-4">📅 Daily Attendance Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ATTENDANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#64748B" }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 12, fill: "#64748B" }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "none" }} />
                <Bar dataKey="attendance" name="Attendance %" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <WeaknessHeatmap />
        </div>
      )}

      {activeTab === 3 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-semibold text-body text-text-primary mb-4">🧠 Cognitive Profile – Class Average</h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={COGNITIVE_DATA}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748B" }} />
                  <Radar name="Score" dataKey="A" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.2} strokeWidth={2} dot={{ r: 4 }} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: "none" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="card space-y-4">
              <h3 className="font-semibold text-body text-text-primary">AI Cognitive Insights</h3>
              {[
                { label: "Confidence Level", value: 65, note: "Below average – boost with quick wins", variant: "amber" as const },
                { label: "Learning Speed", value: 80, note: "Good pace – ready for advanced topics", variant: "green" as const },
                { label: "Retention Strength", value: 58, note: "Forgetting curve detected – schedule revision", variant: "red" as const },
                { label: "Problem Solving", value: 70, note: "Developing well – add challenge problems", variant: "blue" as const },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-caption mb-1">
                    <span className="font-medium text-text-primary">{item.label}</span>
                    <span className="font-bold text-text-primary">{item.value}%</span>
                  </div>
                  <ProgressBar value={item.value} variant={item.variant} size="sm" />
                  <p className="text-[11px] text-text-secondary mt-1">💡 {item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(activeTab === 2 || activeTab === 4) && (
        <div className="card py-12 text-center">
          <p className="text-4xl mb-3">📊</p>
          <p className="text-card-title font-semibold text-text-primary mb-1">{TABS[activeTab]}</p>
          <p className="text-text-secondary text-body">Coming soon — rich analytics for this view</p>
        </div>
      )}
    </div>
  );
}
