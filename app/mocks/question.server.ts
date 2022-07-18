import { type Answer, createMockAnswers } from "./answer.server";

export interface Question {
  id: number;
  question: string;
  askedBy: string;
  askedDate: Date;
  answers: Answer[];
}

export const createMockQuestions = (): Question[] =>
  Array.from(new Array(20).keys()).map((id) => ({
    id,
    question: "What is your name?",
    askedBy: "Mofiz",
    askedDate: new Date(),
    answers: createMockAnswers(),
  }));
