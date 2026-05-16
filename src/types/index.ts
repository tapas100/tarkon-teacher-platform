// ── Types ────────────────────────────────────────────────────────────────────

export type AlertSeverity = "critical" | "medium" | "low";
export type AssignmentStatus = "pending" | "submitted" | "graded" | "overdue";
export type ExamStatus = "upcoming" | "live" | "completed" | "evaluation";
export type AttendanceStatus = "present" | "absent" | "late";
export type MessageType =
  | "text"
  | "voice"
  | "image"
  | "pdf"
  | "quiz"
  | "announcement"
  | "poll"
  | "whiteboard";

// ── Teacher ───────────────────────────────────────────────────────────────────
export interface Teacher {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subject: string;
  school: string;
  role: "teacher" | "hod" | "principal";
}

// ── Student ───────────────────────────────────────────────────────────────────
export interface Student {
  id: string;
  name: string;
  avatar?: string;
  grade: string;
  section: string;
  rollNumber: string;
  attendance: number; // percentage
  homeworkConsistency: number; // percentage
  weakConcepts: string[];
  aiRiskScore: number; // 0-100
  parentContact: string;
  behaviourNotes?: string;
}

// ── Class ─────────────────────────────────────────────────────────────────────
export interface ClassRoom {
  id: string;
  name: string;
  grade: string;
  section: string;
  subject: string;
  studentCount: number;
  attendanceToday: number;
  homeworkStatus: number; // % submitted
  weakStudentsCount: number;
  upcomingExams: number;
  engagementScore: number;
  attentionScore: number;
  schedule: ClassSchedule[];
  color: string;
}

export interface ClassSchedule {
  id: string;
  time: string;
  date: string;
  duration: number; // minutes
  status: "upcoming" | "live" | "completed";
}

// ── Assignment ────────────────────────────────────────────────────────────────
export interface Assignment {
  id: string;
  title: string;
  subject: string;
  grade: string;
  topic: string;
  deadline: string;
  status: AssignmentStatus;
  submissionsCount: number;
  totalStudents: number;
  aiChecked: boolean;
  bloomLevel?: string;
  estimatedMinutes?: number;
}

// ── Exam ──────────────────────────────────────────────────────────────────────
export interface Exam {
  id: string;
  title: string;
  subject: string;
  grade: string;
  date: string;
  duration: number;
  status: ExamStatus;
  averageScore?: number;
  weakChapters?: string[];
  totalStudents: number;
  evaluated?: number;
}

// ── Chat ──────────────────────────────────────────────────────────────────────
export interface ChatThread {
  id: string;
  name: string;
  avatar?: string;
  type:
    | "class-group"
    | "subject-group"
    | "student-dm"
    | "parent-dm"
    | "ai"
    | "announcement"
    | "homework"
    | "exam";
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  hasAiAlert?: boolean;
  priorityColor?: string;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: MessageType;
  timestamp: string;
  isTeacher?: boolean;
  reactions?: { emoji: string; count: number }[];
  attachmentUrl?: string;
}

// ── Alerts ────────────────────────────────────────────────────────────────────
export interface StudentAlert {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  severity: AlertSeverity;
  message: string;
  suggestedIntervention: string;
  grade: string;
  subject: string;
  timestamp: string;
}

// ── Analytics ─────────────────────────────────────────────────────────────────
export interface ConceptMastery {
  concept: string;
  score: number; // 0-100
}

export interface StudentAnalytics {
  studentId: string;
  weeklyScores: { week: string; score: number }[];
  conceptMastery: ConceptMastery[];
  focusLevel: number;
  attendanceRate: number;
  homeworkRate: number;
  confidenceLevel: number;
  learningSpeed: number;
  retentionStrength: number;
}

export interface WeaknessMapCell {
  studentId: string;
  studentName: string;
  concept: string;
  strength: "strong" | "medium" | "weak";
}

// ── AI ────────────────────────────────────────────────────────────────────────
export interface AiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isLoading?: boolean;
}

export interface AiRecommendation {
  id: string;
  type: "remedial" | "quiz" | "revision" | "grouping";
  title: string;
  description: string;
  actionLabel: string;
  priority: AlertSeverity;
}

// ── Notification ──────────────────────────────────────────────────────────────
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "critical" | "medium" | "low";
  timestamp: string;
  read: boolean;
  icon?: string;
}

// ── Resource ──────────────────────────────────────────────────────────────────
export interface Resource {
  id: string;
  title: string;
  type: "note" | "ppt" | "video" | "worksheet" | "template" | "question-bank";
  subject: string;
  grade: string;
  uploadedAt: string;
  isAiGenerated?: boolean;
  fileSize?: string;
  thumbnailUrl?: string;
}

// ── Announcement ──────────────────────────────────────────────────────────────
export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "school" | "class" | "homework" | "exam" | "urgent";
  targetGrades: string[];
  publishedAt: string;
  author: string;
  pinned?: boolean;
}

// ── Parent ────────────────────────────────────────────────────────────────────
export interface Parent {
  id: string;
  name: string;
  avatar?: string;
  studentName: string;
  studentGrade: string;
  lastContact: string;
  pendingMessages: number;
  meetings?: { date: string; purpose: string }[];
}

// ── Dashboard Summary ─────────────────────────────────────────────────────────
export interface DashboardStat {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  gradient: string;
  icon: string;
}
