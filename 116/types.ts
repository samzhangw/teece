
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Quote {
  text: string;
  author: string;
}

export interface ExamInfo {
  date: string;
  title: string;
  description: string;
}

export interface ScheduleItem {
  event: string;
  date: string;
  isoDate?: string; // 用於倒數計時的 ISO 日期字串
  isConfirmed?: boolean;
  category?: 'exam' | 'admission' | 'result';
}

export interface ExamSession {
  prepTime: string;
  examTime: string;
  subject: string;
  categoryCodes: string;
  sessionTitle: string;
}

export interface ExamDay {
  date: string;
  dayOfWeek: string;
  sessions: ExamSession[];
}

export interface NoticeItem {
  title: string;
  items: string[];
  warning?: string;
}

// Added StudyPlanItem interface to resolve the import error in SubjectCard.tsx
export interface StudyPlanItem {
  subject: string;
  goal: string;
  advice: string;
}
