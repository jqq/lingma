
export interface Article {
  id: string;
  title: string;
  content: string;
  markdown?: string;
  html?: string;
  screenshot?: string;
  url: string;
  sourceName: string;
  savedAt: number;
  readProgress: number; // 0 to 100
}

export enum LearningStatus {
  NEW = 'NEW',
  LEARNING = 'LEARNING',
  REVIEWING = 'REVIEWING',
  MASTERED = 'MASTERED'
}

export interface Word {
  id: string;
  text: string;
  definition: string;
  translation: string;
  example: string;
  status: LearningStatus;
  nextReviewAt: number;
  easinessFactor: number;
  interval: number;
  repetition: number;
  addedAt: number;
}

export interface UserStats {
  articlesRead: number;
  wordsLearned: number;
  studyStreak: number;
  dailyGoal: number;
  weeklyGoal: number;
}

export type View = 'dashboard' | 'articles' | 'reader' | 'wordbank' | 'review';

export interface AppState {
  view: View;
  selectedArticleId: string | null;
  articles: Article[];
  words: Word[];
  stats: UserStats;
}
