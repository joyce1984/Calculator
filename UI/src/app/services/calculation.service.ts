import { Injectable } from '@angular/core';
import { Calculation } from '../models/calculation';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {

  constructor() { }
  calculateAnswer(calculation:Calculation): number {
    return parseFloat(calculation.FirstNumber) * parseFloat(calculation.SecondNumber)
  }
  
}