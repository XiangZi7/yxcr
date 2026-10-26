export interface MarkdownDocument {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}
export interface PracticeSession {
  id: string;
  date: string;
  category: string;
  total: number;
  completed: number;
  duration: number;
}
export interface LearningState {
  hydrated: boolean;
  theme: "light" | "dark";
  saved: string[];
  mastered: string[];
  mistakes: string[];
  notes: Record<string, string>;
  plan: string[];
  dailyGoal: number;
  displayName: string;
  activity: Record<string, string[]>;
  sessions: PracticeSession[];
  documents: MarkdownDocument[];
  toast: string;
  setTheme: (theme: "light" | "dark") => void;
  toggleSaved: (slug: string) => void;
  toggleMastered: (slug: string) => void;
  toggleMistake: (slug: string) => void;
  setNote: (slug: string, value: string) => void;
  togglePlan: (slug: string) => void;
  setDailyGoal: (goal: number) => void;
  setDisplayName: (name: string) => void;
  recordSession: (session: Omit<PracticeSession, "id" | "date">) => void;
  saveDocument: (document: MarkdownDocument) => void;
  deleteDocument: (id: string) => void;
  notify: (message: string) => void;
}
