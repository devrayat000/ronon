export interface Answer {
  id: number;
  answer: string;
  answeredBy: string;
  answeredDate: Date;
}

export const createMockAnswers = (): Answer[] =>
  Array.from(new Array(20).keys()).map((id) => ({
    id,
    answer: "My name is Samsu",
    answeredBy: "Samsu",
    answeredDate: new Date(),
  }));
