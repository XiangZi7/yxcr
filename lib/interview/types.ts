export interface ArticleSection {
  title: string;
  text: string;
  code: string;
}

export interface Article {
  slug: string;
  topic: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  related: string[];
  introduction: string;
  sections: ArticleSection[];
  followups: string[];
  comparison: string;
  summary: string;
}

export type Panel =
  "library" | "today" | "saved" | "practice" | "help" | "profile";
