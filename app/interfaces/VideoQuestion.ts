export interface VideoQuestionResponse {
  questions: VideoQuestion[];
  page: number;
  pages: number;
}

export interface VideoQuestion {
  id: number;
  user: {
    id: number;
    name: string;
    profile_pic?: string;
  };
  question: string;
  video_url: string;
  subject: string;
  chapter: string;
  created_at: string;
}

export interface Subject {
  subId: string;
  subject: string;
}

export interface Chapter {
  tagId: string;
  chapter: string;
}
