export interface Question {
  questionText: string;
  options: Answer[];
  answer: number;
  isAnswered?: boolean;
}

export interface Answer {
  displayText: string;
  explanation?: string;
}

export enum QuestionProperty {
  MAXIMUM_COUNT = 10,
  MAXIMUM_MARK = 10,
  MAXIMUM_OPTIONS = 4,
}

export enum MarkingSchemeMultiplier {
  CORRECT = 1,
  WRONG = -1,
  UNANSWERED = 0,
}

export enum MessageBox {
  VALID_ANSWERED_SUBMISSION = 'Answer Submitted',
  VALID_NO_ANSWER_SUBMISSION = 'No Answer submitted, skipping to next.',
  INVALID_ANSWERED_SUBMISSION = 'Invalid Submission: Cannot Skip',
  SHOW_RESULT = 'Quiz Ends',
}
export enum QuizMessageBox {
  PASS = 'Congratulations! You passed the quiz.',
  FAIL = "You didn't pass the quiz. Please try again."
}
export enum QuizProperty{
  MinimumPassMark = 60
}
