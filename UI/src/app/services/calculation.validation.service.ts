import { Injectable } from '@angular/core';
import { Calculation } from '../models/calculation';
import { ValidationResult } from '../models/validationresult';

@Injectable({
  providedIn: 'root',
})
export class CalculationValidationService {
  constructor() {}
  Validate(calculation: Calculation): ValidationResult {
    let validationResult: ValidationResult = { IsValid: false, Messages: [] };
    validationResult.Messages = this.ValidateNumber(
      calculation.FirstNumber,
      1,
      validationResult.Messages
    );
    validationResult.Messages = this.ValidateNumber(
      calculation.SecondNumber,
      2,
      validationResult.Messages
    );
    validationResult.Messages = this.ValidateOperator(
      calculation.Operator,
      validationResult.Messages
    );
    validationResult.IsValid = validationResult.Messages.length === 0;

    return validationResult;
  }
  private ValidateNumber(
    number: string,
    numberPosition: number,
    messages: Array<string>
  ): Array<string> {
    let position = numberPosition === 1 ? 'first' : 'second';
    if (number === '') {
      messages.push('Please enter a valid ' + position + ' number');
    }

    //Validate the size of the number??
    return messages;
  }
  private ValidateOperator(
    operator: string,
    messages: Array<string>
  ): Array<string> {
    if (operator === '') {
      messages.push('Please enter an operator');
    }
    if (operator !== 'X') {
      messages.push('Please select a valid operator');
    }
    return messages;
  }
}
