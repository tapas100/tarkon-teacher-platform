"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles, Upload, Mic, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const STEPS = ["Class & Subject", "Questions", "AI Review", "Publish"];

const CLASSES_LIST = ["Grade 5A – Maths", "Grade 6B – Science", "Grade 7A – English"];
const SUBJECTS_LIST = ["Mathematics", "Science", "English", "Social Studies"];
const BLOOM_LEVELS = ["Remember", "Understand", "Apply", "Analyse", "Evaluate", "Create"];

export default function CreateAssignmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([{ text: "", type: "mcq", bloom: "Apply" }]);
  const [isAiAnalysing, setIsAiAnalysing] = useState(false);
  const [aiDone, setAiDone] = useState(false);

  const handleNext = async () => {
    if (step === 2) {
      setIsAiAnalysing(true);
      await new Promise((r) => setTimeout(r, 2000));
      setIsAiAnalysing(false);
      setAiDone(true);
    }
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => step > 0 ? setStep(step - 1) : router.back()}
          className="w-9 h-9 rounded-2xl bg-white border border-border flex items-center justify-center text-text-secondary hover:text-primary"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-page-header font-bold text-text-primary">Create Assignment</h1>
          <p className="text-caption text-text-secondary">Step {step + 1} of {STEPS.length}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-caption font-bold flex-shrink-0 transition-all",
              i < step ? "bg-emerald-500 text-white" : i === step ? "bg-primary text-white" : "bg-background text-text-secondary border border-border"
            )}>
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className={cn("text-[11px] font-medium hidden sm:block truncate", i === step ? "text-primary" : "text-text-secondary")}>
              {s}
            </span>
            {i < STEPS.length - 1 && <div className={cn("flex-1 h-0.5 rounded-full", i < step ? "bg-emerald-400" : "bg-border")} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="card p-6 animate-fade-in">
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-card-title font-semibold text-text-primary mb-4">Select Class & Subject</h2>
            <div>
              <label className="block text-caption font-semibold text-text-primary mb-2">Class</label>
              <div className="grid grid-cols-1 gap-2">
                {CLASSES_LIST.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedClass(c)}
                    className={cn(
                      "px-4 py-3 rounded-2xl border text-body text-left transition-all",
                      selectedClass === c ? "border-primary bg-primary-50 text-primary font-semibold" : "border-border bg-background text-text-primary hover:border-primary/50"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-caption font-semibold text-text-primary mb-2">Subject</label>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS_LIST.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSubject(s)}
                    className={cn(
                      "px-3.5 py-2 rounded-2xl border text-caption font-semibold transition-all",
                      selectedSubject === s ? "border-primary bg-primary text-white" : "border-border bg-background text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-caption font-semibold text-text-primary mb-2">Topic</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Fractions – Adding unlike denominators"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-card-title font-semibold text-text-primary">Add Questions</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background border border-border text-caption text-text-secondary hover:text-primary">
                  <Upload size={14} /> Upload PDF
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background border border-border text-caption text-text-secondary hover:text-primary">
                  <Mic size={14} /> Voice
                </button>
              </div>
            </div>
            {questions.map((q, i) => (
              <div key={i} className="border border-border rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-caption font-semibold text-text-primary">Q{i + 1}</span>
                  <div className="flex gap-2">
                    <select
                      value={q.bloom}
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[i].bloom = e.target.value;
                        setQuestions(updated);
                      }}
                      className="text-[11px] px-2 py-1 rounded-xl border border-border bg-background outline-none"
                    >
                      {BLOOM_LEVELS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                    {questions.length > 1 && (
                      <button onClick={() => setQuestions(questions.filter((_, idx) => idx !== i))} className="text-text-secondary hover:text-red-500">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={q.text}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[i].text = e.target.value;
                    setQuestions(updated);
                  }}
                  placeholder="Enter your question here…"
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                />
              </div>
            ))}
            <button
              onClick={() => setQuestions([...questions, { text: "", type: "mcq", bloom: "Apply" }])}
              className="w-full py-3 rounded-2xl border-2 border-dashed border-border text-text-secondary hover:text-primary hover:border-primary transition-colors flex items-center justify-center gap-2 text-body"
            >
              <Plus size={18} /> Add Question
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl gradient-purple flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-card-title font-semibold text-text-primary">AI Analysis</h2>
                <p className="text-caption text-text-secondary">Reviewing difficulty & alignment</p>
              </div>
            </div>
            {isAiAnalysing ? (
              <div className="py-8 flex flex-col items-center gap-4">
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-3 h-3 rounded-full bg-purple-ai"
                      style={{ animation: `thinking 1.4s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
                <p className="text-body text-text-secondary">AI is analysing your assignment…</p>
              </div>
            ) : aiDone ? (
              <div className="space-y-3">
                {[
                  { label: "Difficulty Balance", value: "Well balanced across Easy (40%), Medium (40%), Hard (20%)", ok: true },
                  { label: "Bloom's Taxonomy", value: "Covers Remember, Apply, Analyse — good for Grade 5", ok: true },
                  { label: "Estimated Time", value: "~28 minutes to complete", ok: true },
                  { label: "Weakness Alignment", value: "2 questions directly target fractions weakness detected in 4 students", ok: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 bg-emerald-50 rounded-2xl p-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <div>
                      <p className="text-caption font-semibold text-text-primary">{item.label}</p>
                      <p className="text-caption text-text-secondary">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-body text-text-secondary text-center py-4">Click Next to run AI analysis</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-card-title font-semibold text-text-primary mb-4">Review & Publish</h2>
            <div className="bg-background rounded-2xl p-4 space-y-3">
              {[
                { label: "Class", value: selectedClass || "Grade 5A – Maths" },
                { label: "Subject", value: selectedSubject || "Mathematics" },
                { label: "Topic", value: topic || "Fractions" },
                { label: "Questions", value: `${questions.length} questions` },
                { label: "Deadline", value: "Tomorrow, 11:59 PM" },
                { label: "AI Verified", value: "✅ Yes" },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-caption text-text-secondary">{r.label}</span>
                  <span className="text-caption font-semibold text-text-primary">{r.value}</span>
                </div>
              ))}
            </div>
            <Button fullWidth size="lg" variant="success" icon={<Check size={18} />} onClick={() => router.push("/assignments")}>
              Publish Assignment
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="ghost"
          icon={<ArrowLeft size={16} />}
          onClick={() => step > 0 ? setStep(step - 1) : router.back()}
        >
          {step === 0 ? "Cancel" : "Back"}
        </Button>
        {step < STEPS.length - 1 && (
          <Button iconRight={<ArrowRight size={16} />} onClick={handleNext} loading={isAiAnalysing}>
            {step === 2 && !aiDone ? "Run AI Review" : "Next"}
          </Button>
        )}
      </div>
    </div>
  );
}
