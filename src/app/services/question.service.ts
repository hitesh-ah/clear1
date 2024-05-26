import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question, QuizProperty } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private mockQuestionDataUrl = 'assets/sampleQuestions.json';
  constructor(private _http: HttpClient) {}

  getSampleQuestions(): Observable<Question[]> {
    return this._http.get<Question[]>(this.mockQuestionDataUrl);
  }
  getMinimumPassMark(): Observable<number> {
    return of(QuizProperty.MinimumPassMark);
  }
}
