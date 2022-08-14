export interface Answer {
  "Answer ID": number;
  User: number;
  "User Name": string;
  Answer: string;
  "PQue ID": number;
  img?: string;
  created_at: string;
  verified: boolean;
  upvoteStatus: boolean;
  downvoteStatus: boolean;
  upvotes?: number;
  downvotes?: number;
}
