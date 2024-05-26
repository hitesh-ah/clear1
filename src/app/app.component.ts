import { Component, OnInit } from '@angular/core';
import {
  MarkingSchemeMultiplier,
  MessageBox,
  Question,
  QuestionProperty,
  QuizMessageBox,
} from './models/question';
import { Observable } from 'rxjs';
import { QuestionService } from './services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _questionService: QuestionService,
    private _snackBar: MatSnackBar
  ) {}
  sessionQuestions$: Observable<Question[]> =
    this._questionService.getSampleQuestions();
  public minimumPassMark$ = this._questionService.getMinimumPassMark();
  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedAnswers: number[] = [];
  showResult: boolean = false;
  passMessage = QuizMessageBox.PASS;
  failMessage = QuizMessageBox.FAIL;
  questions: Question[] = [
    {
      questionText: 'What is the main goal of Cleareye.ai?',
      options: [
        { displayText: 'To launch space missions' },
        { displayText: 'To simplify banking' },
        { displayText: 'To create social media platforms' },
        { displayText: 'To develop video games' },
      ],
      answer: 1,
    },
    {
      questionText: 'Where is Cleareye.ai headquartered?',
      options: [
        { displayText: 'New York' },
        { displayText: 'India' },
        { displayText: 'California' },
        { displayText: 'Texas' },
      ],
      answer: 2,
    },
    {
      questionText: 'What is the name of Cleareye.ai’s flagship product?',
      options: [
        { displayText: 'ClearBank' },
        { displayText: 'ClearFinance' },
        { displayText: 'ClearTrade®' },
        { displayText: 'ClearDoc' },
      ],
      answer: 2,
    },
    {
      questionText: 'What does ClearTrade® aim to improve in Global Trade Finance operations?',
      options: [
        { displayText: 'Gaming experience' },
        { displayText: 'Document handling and operational efficiency' },
        { displayText: 'Social networking' },
        { displayText: 'Weather forecasting' },
      ],
      answer: 1,
    },
    {
      questionText: 'Which technology does Cleareye.ai leverage to simplify banking?',
      options: [
        { displayText: 'Virtual Reality' },
        { displayText: 'NLP and Machine Learning' },
        { displayText: 'Blockchain' },
        { displayText: 'Quantum Computing' },
      ],
      answer: 1,
    },
    {
      questionText: 'What benefits does Cleareye.ai claim to provide banks with?',
      options: [
        { displayText: 'Exceptional customer service' },
        { displayText: 'Short-term gains and long-term growth' },
        { displayText: 'Insights to sustain momentum at digital scale' },
        { displayText: 'All of the above' },
      ],
      answer: 3,
    },
    {
      questionText: 'In addition to California, where else does Cleareye.ai have offices?',
      options: [
        { displayText: 'Texas and New York' },
        { displayText: 'New York and India' },
        { displayText: 'India and Texas' },
        { displayText: 'Florida and New York' },
      ],
      answer: 1,
    },
    {
      questionText: 'What are the three modules of the ClearTrade® platform?',
      options: [
        { displayText: 'Digitization, Compliance, and Auto Doc Exam' },
        { displayText: 'Compliance, Automation, and Digitization' },
        { displayText: 'Digitization, Document Handling, and Automation' },
        { displayText: 'Compliance, Governance, and Data Management' },
      ],
      answer: 0,
    },
    {
      questionText: 'What industry experience do the founders of Cleareye.ai have?',
      options: [
        { displayText: 'Retail and E-commerce' },
        { displayText: 'Global technology and banking' },
        { displayText: 'Healthcare and Pharmaceuticals' },
        { displayText: 'Education and Research' },
      ],
      answer: 1,
    },
    {
      questionText: 'What is the effect of ClearTrade® on document handling?',
      options: [
        { displayText: 'Slows down the process' },
        { displayText: 'Eliminates manual processes and improves efficiency' },
        { displayText: 'Makes the process more complicated' },
        { displayText: 'Increases the need for manual intervention' },
      ],
      answer: 1,
    }
  ];

  ngOnInit(): void {
    this.currentQuestionIndex = 0;
  }

  selectAnswer(index: number) {
    this.selectedAnswers[this.currentQuestionIndex] = index;
  }

  nextQuestion(): void {
    if (this.selectedAnswers[this.currentQuestionIndex] !== undefined) {
      this.currentQuestionIndex++;
      this.openSnackBar(MessageBox.VALID_ANSWERED_SUBMISSION);
      if (this.currentQuestionIndex === this.questions.length) {
        this.calculateScore();
        this.showResult = true;
        this.openSnackBar(MessageBox.SHOW_RESULT);
      }
    } else if(this.currentQuestionIndex!==QuestionProperty.MAXIMUM_COUNT){
      this.openSnackBar(MessageBox.INVALID_ANSWERED_SUBMISSION);
    }
  }

  calculateScore(): void {
    this.score = this.questions.reduce((acc, question, index) => {
      return acc + (this.selectedAnswers[index] === question.answer ? QuestionProperty.MAXIMUM_MARK*MarkingSchemeMultiplier.CORRECT : 0);
    }, 0);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close');
  }

  getFinalScore(): number {
    return this.score;
  }

  retryQuiz(): void {
    this.currentQuestionIndex = 0;
    this.selectedAnswers = [];
    this.score = 0;
    this.showResult = false;
  }
}
