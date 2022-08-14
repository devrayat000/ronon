export interface Question {
  ID: number;
  User: number;
  "User's Name": string;
  Que: string;
  img?: string;
  subject: string;
  chapter: string;
  created_at: string;
  verified: true;
  upvoteStatus: boolean;
  downvoteStatus: boolean;
  upvotes?: number;
  downvotes?: number;
}

export interface Subject {
  subId: string;
  subject: string;
}

export interface Chapter {
  tagId: string;
  chapter: string;
}
