import { type Answer, createMockAnswers } from "./answer.server";

export interface Question {
  id: number;
  postedAt: string;
  title: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
  answers: Answer[];
}

export const createMockQuestions = (): Question[] =>
  Array.from(new Array(20).keys()).map((id) => ({
    id,
    title: "What is your name?",
    body: "In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night ...",
    author: {
      name: "Mofiz",
      image: "https://randomuser.me/api/portraits/med/men/69.jpg",
    },
    postedAt: new Date().toISOString(),
    answers: createMockAnswers(),
  }));
