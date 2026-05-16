// ── Mock Data for all screens ─────────────────────────────────────────────────
import type {
  Teacher,
  Student,
  ClassRoom,
  Assignment,
  Exam,
  ChatThread,
  Message,
  StudentAlert,
  AiRecommendation,
  Notification,
  Resource,
  Announcement,
  Parent,
  DashboardStat,
} from "@/types";

// ── Teacher ───────────────────────────────────────────────────────────────────
export const TEACHER: Teacher = {
  id: "t1",
  name: "Ananya Sharma",
  email: "ananya@tarkon.school",
  subject: "Mathematics",
  school: "Tarkon International School",
  role: "teacher",
};

// ── Dashboard Stats ───────────────────────────────────────────────────────────
export const DASHBOARD_STATS: DashboardStat[] = [
  {
    label: "Classes Today",
    value: 5,
    change: "+1",
    changeType: "up",
    gradient: "gradient-blue",
    icon: "BookOpen",
  },
  {
    label: "Pending Reviews",
    value: 23,
    change: "-4",
    changeType: "down",
    gradient: "gradient-amber",
    icon: "ClipboardCheck",
  },
  {
    label: "Submissions",
    value: 87,
    change: "+12",
    changeType: "up",
    gradient: "gradient-emerald",
    icon: "FileText",
  },
  {
    label: "Weak Students",
    value: 7,
    change: "+2",
    changeType: "down",
    gradient: "gradient-red",
    icon: "AlertTriangle",
  },
  {
    label: "Parent Messages",
    value: 4,
    change: "New",
    changeType: "neutral",
    gradient: "gradient-purple",
    icon: "MessageCircle",
  },
];

// ── Classes ───────────────────────────────────────────────────────────────────
export const CLASSES: ClassRoom[] = [
  {
    id: "c1",
    name: "Grade 5 – Maths",
    grade: "5",
    section: "A",
    subject: "Mathematics",
    studentCount: 38,
    attendanceToday: 95,
    homeworkStatus: 78,
    weakStudentsCount: 4,
    upcomingExams: 1,
    engagementScore: 82,
    attentionScore: 74,
    color: "gradient-blue",
    schedule: [
      { id: "s1", time: "08:30", date: "2026-05-16", duration: 45, status: "completed" },
      { id: "s2", time: "10:00", date: "2026-05-16", duration: 45, status: "live" },
    ],
  },
  {
    id: "c2",
    name: "Grade 6 – Science",
    grade: "6",
    section: "B",
    subject: "Science",
    studentCount: 35,
    attendanceToday: 88,
    homeworkStatus: 65,
    weakStudentsCount: 6,
    upcomingExams: 2,
    engagementScore: 70,
    attentionScore: 65,
    color: "gradient-emerald",
    schedule: [
      { id: "s3", time: "01:00", date: "2026-05-16", duration: 45, status: "upcoming" },
    ],
  },
  {
    id: "c3",
    name: "Grade 7 – English",
    grade: "7",
    section: "A",
    subject: "English",
    studentCount: 40,
    attendanceToday: 92,
    homeworkStatus: 85,
    weakStudentsCount: 2,
    upcomingExams: 0,
    engagementScore: 91,
    attentionScore: 88,
    color: "gradient-purple",
    schedule: [
      { id: "s4", time: "11:30", date: "2026-05-16", duration: 45, status: "upcoming" },
    ],
  },
];

// ── Timeline ──────────────────────────────────────────────────────────────────
export const TODAY_SCHEDULE = [
  { id: "ts1", time: "08:30", className: "Grade 5 Maths", room: "Room 12", status: "completed" as const },
  { id: "ts2", time: "10:00", className: "Grade 6 Science Lab", room: "Lab 3", status: "live" as const },
  { id: "ts3", time: "11:30", className: "Grade 7 English", room: "Room 8", status: "upcoming" as const },
  { id: "ts4", time: "01:00", className: "Grade 5 Revision", room: "Room 12", status: "upcoming" as const },
  { id: "ts5", time: "03:00", className: "Parent Meeting", room: "Conf Room", status: "upcoming" as const },
];

// ── Students ──────────────────────────────────────────────────────────────────
export const STUDENTS: Student[] = [
  {
    id: "st1",
    name: "Rahul Verma",
    grade: "5",
    section: "A",
    rollNumber: "5A01",
    attendance: 72,
    homeworkConsistency: 55,
    weakConcepts: ["Fractions", "Division"],
    aiRiskScore: 68,
    parentContact: "+91 98765 43210",
  },
  {
    id: "st2",
    name: "Priya Nair",
    grade: "5",
    section: "A",
    rollNumber: "5A02",
    attendance: 95,
    homeworkConsistency: 48,
    weakConcepts: ["Algebra"],
    aiRiskScore: 42,
    parentContact: "+91 98765 43211",
  },
  {
    id: "st3",
    name: "Arjun Singh",
    grade: "6",
    section: "B",
    rollNumber: "6B05",
    attendance: 88,
    homeworkConsistency: 80,
    weakConcepts: [],
    aiRiskScore: 15,
    parentContact: "+91 98765 43212",
  },
  {
    id: "st4",
    name: "Meera Pillai",
    grade: "6",
    section: "B",
    rollNumber: "6B08",
    attendance: 65,
    homeworkConsistency: 40,
    weakConcepts: ["Photosynthesis", "Cell Structure", "Ecosystems"],
    aiRiskScore: 78,
    parentContact: "+91 98765 43213",
  },
  {
    id: "st5",
    name: "Kiran Joshi",
    grade: "7",
    section: "A",
    rollNumber: "7A03",
    attendance: 98,
    homeworkConsistency: 92,
    weakConcepts: [],
    aiRiskScore: 8,
    parentContact: "+91 98765 43214",
  },
];

// ── Alerts ────────────────────────────────────────────────────────────────────
export const STUDENT_ALERTS: StudentAlert[] = [
  {
    id: "a1",
    studentId: "st1",
    studentName: "Rahul Verma",
    severity: "critical",
    message: "Struggling with fractions — 3 consecutive low scores",
    suggestedIntervention: "Schedule 1:1 remedial session on fractions",
    grade: "5A",
    subject: "Mathematics",
    timestamp: "2026-05-16T07:30:00",
  },
  {
    id: "a2",
    studentId: "st2",
    studentName: "Priya Nair",
    severity: "medium",
    message: "Missed 3 assignments this week",
    suggestedIntervention: "Send parent notification and assign catch-up work",
    grade: "5A",
    subject: "Mathematics",
    timestamp: "2026-05-16T08:00:00",
  },
  {
    id: "a3",
    studentId: "st4",
    studentName: "Meera Pillai",
    severity: "critical",
    message: "Attention drop detected in last 2 classes",
    suggestedIntervention: "Parent meeting recommended + learning style assessment",
    grade: "6B",
    subject: "Science",
    timestamp: "2026-05-16T06:45:00",
  },
  {
    id: "a4",
    studentId: "st3",
    studentName: "Class 7A (5 students)",
    severity: "medium",
    message: "Low confidence detected in algebra topic cluster",
    suggestedIntervention: "Run a confidence-boosting mini quiz + group discussion",
    grade: "7A",
    subject: "Mathematics",
    timestamp: "2026-05-15T15:00:00",
  },
];

// ── AI Recommendations ────────────────────────────────────────────────────────
export const AI_RECOMMENDATIONS: AiRecommendation[] = [
  {
    id: "r1",
    type: "remedial",
    title: "Remedial Class Suggested",
    description: "4 students in Grade 5A need a fractions remedial session before the exam.",
    actionLabel: "Schedule Now",
    priority: "critical",
  },
  {
    id: "r2",
    type: "quiz",
    title: "Auto-Generated Quiz Ready",
    description: "AI has generated a 10-question quiz on Photosynthesis for Grade 6B.",
    actionLabel: "Review & Publish",
    priority: "medium",
  },
  {
    id: "r3",
    type: "revision",
    title: "Concept Revision Needed",
    description: "Algebra revision recommended for Grade 7A — forgetting curve analysis triggered.",
    actionLabel: "Create Revision",
    priority: "medium",
  },
  {
    id: "r4",
    type: "grouping",
    title: "Smart Grouping Suggestion",
    description: "Pair strong algebra students with weak ones for peer-to-peer learning.",
    actionLabel: "View Groups",
    priority: "low",
  },
];

// ── Assignments ───────────────────────────────────────────────────────────────
export const ASSIGNMENTS: Assignment[] = [
  {
    id: "as1",
    title: "Fractions Worksheet – Chapter 5",
    subject: "Mathematics",
    grade: "5A",
    topic: "Fractions",
    deadline: "2026-05-17T23:59:00",
    status: "pending",
    submissionsCount: 28,
    totalStudents: 38,
    aiChecked: true,
    bloomLevel: "Apply",
    estimatedMinutes: 30,
  },
  {
    id: "as2",
    title: "Photosynthesis Lab Report",
    subject: "Science",
    grade: "6B",
    topic: "Photosynthesis",
    deadline: "2026-05-18T23:59:00",
    status: "pending",
    submissionsCount: 15,
    totalStudents: 35,
    aiChecked: false,
    bloomLevel: "Analyse",
    estimatedMinutes: 45,
  },
  {
    id: "as3",
    title: "Creative Writing – My Hero",
    subject: "English",
    grade: "7A",
    topic: "Creative Writing",
    deadline: "2026-05-15T23:59:00",
    status: "graded",
    submissionsCount: 40,
    totalStudents: 40,
    aiChecked: true,
    bloomLevel: "Create",
    estimatedMinutes: 60,
  },
];

// ── Exams ─────────────────────────────────────────────────────────────────────
export const EXAMS: Exam[] = [
  {
    id: "ex1",
    title: "Unit Test – Fractions & Decimals",
    subject: "Mathematics",
    grade: "5A",
    date: "2026-05-20",
    duration: 60,
    status: "upcoming",
    totalStudents: 38,
  },
  {
    id: "ex2",
    title: "Mid-Term Science Exam",
    subject: "Science",
    grade: "6B",
    date: "2026-05-22",
    duration: 90,
    status: "upcoming",
    totalStudents: 35,
  },
  {
    id: "ex3",
    title: "English Grammar Test",
    subject: "English",
    grade: "7A",
    date: "2026-05-10",
    duration: 45,
    status: "evaluation",
    totalStudents: 40,
    evaluated: 32,
    averageScore: 74,
    weakChapters: ["Tenses", "Prepositions"],
  },
];

// ── Chats ─────────────────────────────────────────────────────────────────────
export const CHAT_THREADS: ChatThread[] = [
  {
    id: "ch1",
    name: "Grade 5A – Maths Group",
    type: "class-group",
    lastMessage: "Don't forget to submit worksheet by tomorrow!",
    lastMessageTime: "2026-05-16T08:45:00",
    unreadCount: 3,
    hasAiAlert: true,
    priorityColor: "bg-blue-500",
  },
  {
    id: "ch2",
    name: "Grade 6B – Parents",
    type: "parent-dm",
    lastMessage: "Thank you for the update on Meera",
    lastMessageTime: "2026-05-16T07:30:00",
    unreadCount: 1,
    priorityColor: "bg-emerald-500",
    isOnline: false,
  },
  {
    id: "ch3",
    name: "Rahul's Parent",
    type: "parent-dm",
    lastMessage: "When can we have a meeting?",
    lastMessageTime: "2026-05-16T06:00:00",
    unreadCount: 2,
    hasAiAlert: true,
    priorityColor: "bg-red-500",
    isOnline: true,
  },
  {
    id: "ch4",
    name: "Homework Review Thread",
    type: "homework",
    lastMessage: "Priya: I have submitted the assignment",
    lastMessageTime: "2026-05-15T22:00:00",
    unreadCount: 0,
    priorityColor: "bg-amber-500",
  },
  {
    id: "ch5",
    name: "AI Assistant",
    type: "ai",
    lastMessage: "Here is the quiz I generated for you…",
    lastMessageTime: "2026-05-16T09:00:00",
    unreadCount: 0,
    priorityColor: "bg-purple-600",
    isOnline: true,
  },
  {
    id: "ch6",
    name: "School Announcements",
    type: "announcement",
    lastMessage: "Sports Day scheduled for May 25",
    lastMessageTime: "2026-05-15T10:00:00",
    unreadCount: 0,
  },
];

export const MESSAGES: Message[] = [
  {
    id: "m1",
    senderId: "t1",
    senderName: "Ananya Ma'am",
    content: "Good morning everyone! Please submit fractions worksheet by tomorrow 11:59 PM.",
    type: "text",
    timestamp: "2026-05-16T08:30:00",
    isTeacher: true,
  },
  {
    id: "m2",
    senderId: "st1",
    senderName: "Rahul Verma",
    content: "Ma'am, I have a doubt in question 4.",
    type: "text",
    timestamp: "2026-05-16T08:45:00",
    isTeacher: false,
  },
  {
    id: "m3",
    senderId: "t1",
    senderName: "Ananya Ma'am",
    content: "Rahul, let me explain. In question 4 you need to find the LCM first before adding.",
    type: "text",
    timestamp: "2026-05-16T08:47:00",
    isTeacher: true,
  },
  {
    id: "m4",
    senderId: "st2",
    senderName: "Priya Nair",
    content: "Ma'am I also have the same doubt!",
    type: "text",
    timestamp: "2026-05-16T08:50:00",
    isTeacher: false,
  },
];

// ── Notifications ─────────────────────────────────────────────────────────────
export const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "Critical Alert",
    message: "Rahul Verma's performance has dropped significantly",
    type: "critical",
    timestamp: "2026-05-16T07:30:00",
    read: false,
    icon: "AlertTriangle",
  },
  {
    id: "n2",
    title: "Assignment Submitted",
    message: "28/38 students submitted Fractions Worksheet",
    type: "medium",
    timestamp: "2026-05-16T08:00:00",
    read: false,
    icon: "FileText",
  },
  {
    id: "n3",
    title: "Parent Message",
    message: "Rahul's parent requested a meeting",
    type: "critical",
    timestamp: "2026-05-16T06:00:00",
    read: true,
    icon: "MessageCircle",
  },
  {
    id: "n4",
    title: "AI Generated Quiz Ready",
    message: "Photosynthesis quiz is ready for review",
    type: "low",
    timestamp: "2026-05-15T20:00:00",
    read: true,
    icon: "Sparkles",
  },
];

// ── Resources ─────────────────────────────────────────────────────────────────
export const RESOURCES: Resource[] = [
  {
    id: "res1",
    title: "Fractions Mastery Notes",
    type: "note",
    subject: "Mathematics",
    grade: "5",
    uploadedAt: "2026-05-14",
    isAiGenerated: false,
    fileSize: "2.4 MB",
  },
  {
    id: "res2",
    title: "Photosynthesis Slides",
    type: "ppt",
    subject: "Science",
    grade: "6",
    uploadedAt: "2026-05-13",
    isAiGenerated: false,
    fileSize: "8.1 MB",
  },
  {
    id: "res3",
    title: "AI Worksheet – Algebra",
    type: "worksheet",
    subject: "Mathematics",
    grade: "7",
    uploadedAt: "2026-05-16",
    isAiGenerated: true,
    fileSize: "1.2 MB",
  },
  {
    id: "res4",
    title: "Grade 5 Question Bank",
    type: "question-bank",
    subject: "Mathematics",
    grade: "5",
    uploadedAt: "2026-05-10",
    isAiGenerated: false,
    fileSize: "4.5 MB",
  },
];

// ── Announcements ─────────────────────────────────────────────────────────────
export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "an1",
    title: "Sports Day 2026",
    content: "Sports Day is scheduled for May 25. All students must wear PE kits.",
    type: "school",
    targetGrades: ["All"],
    publishedAt: "2026-05-15T10:00:00",
    author: "Principal",
    pinned: true,
  },
  {
    id: "an2",
    title: "Unit Test – Grade 5 Maths",
    content: "Reminder: Unit Test on Fractions & Decimals on May 20. Syllabus: Ch 5 & 6.",
    type: "exam",
    targetGrades: ["5A"],
    publishedAt: "2026-05-16T08:00:00",
    author: "Ananya Sharma",
    pinned: false,
  },
  {
    id: "an3",
    title: "Lab Safety Rules",
    content: "All Grade 6 students must read the updated lab safety guidelines before Science Lab.",
    type: "class",
    targetGrades: ["6B"],
    publishedAt: "2026-05-16T07:00:00",
    author: "Ananya Sharma",
    pinned: false,
  },
];

// ── Parents ───────────────────────────────────────────────────────────────────
export const PARENTS: Parent[] = [
  {
    id: "p1",
    name: "Mr. Rajesh Verma",
    studentName: "Rahul Verma",
    studentGrade: "5A",
    lastContact: "2026-05-16T06:00:00",
    pendingMessages: 2,
  },
  {
    id: "p2",
    name: "Mrs. Sunita Nair",
    studentName: "Priya Nair",
    studentGrade: "5A",
    lastContact: "2026-05-14T18:00:00",
    pendingMessages: 0,
  },
  {
    id: "p3",
    name: "Mr. Harish Pillai",
    studentName: "Meera Pillai",
    studentGrade: "6B",
    lastContact: "2026-05-16T07:30:00",
    pendingMessages: 1,
    meetings: [{ date: "2026-05-18", purpose: "Performance discussion" }],
  },
];

// ── Weakness Map Data ─────────────────────────────────────────────────────────
export const WEAKNESS_MAP_STUDENTS = ["Rahul", "Priya", "Arjun", "Meera", "Kiran"];
export const WEAKNESS_MAP_CONCEPTS = ["Fractions", "Decimals", "Algebra", "Geometry", "Division"];
export const WEAKNESS_MAP_SCORES: number[][] = [
  [35, 60, 72, 85, 40],
  [55, 70, 45, 80, 75],
  [90, 88, 85, 92, 95],
  [65, 50, 30, 45, 60],
  [95, 98, 92, 96, 97],
];

// ── Weekly Score Chart Data ───────────────────────────────────────────────────
export const WEEKLY_SCORES = [
  { week: "Week 1", grade5: 72, grade6: 68, grade7: 85 },
  { week: "Week 2", grade5: 75, grade6: 71, grade7: 87 },
  { week: "Week 3", grade5: 68, grade6: 65, grade7: 82 },
  { week: "Week 4", grade5: 80, grade6: 74, grade7: 90 },
  { week: "Week 5", grade5: 78, grade6: 70, grade7: 88 },
];

// ── Concept Mastery Data ──────────────────────────────────────────────────────
export const CONCEPT_MASTERY = [
  { concept: "Fractions", score: 58 },
  { concept: "Decimals", score: 72 },
  { concept: "Algebra", score: 65 },
  { concept: "Geometry", score: 80 },
  { concept: "Division", score: 70 },
  { concept: "Multiplication", score: 85 },
];
