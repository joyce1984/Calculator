import { Injectable } from '@angular/core';
import { Calculation } from '../models/calculation';
import { HistoryRepository } from './historyrepository';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private historyrepository: HistoryRepository) {}
  Add(calculation: Calculation): Array<Calculation> {
    let key =
      calculation.CalculatorInformation.SchoolId +
      '/' +
      calculation.CalculatorInformation.QuestionNumber;
    let history = this.Get(key);

    if (history !== null && history.length >= 5) {
      history.shift();
    }
    history.push(calculation);
    this.historyrepository.Add<Array<Calculation>>(key, history);
    return history;
  }

  Get(key: string): Array<Calculation> {
    let storedHistory = this.historyrepository.Get(key);
    let history = JSON.parse(storedHistory!);
    return history === null ? [] : history;
  }
}
