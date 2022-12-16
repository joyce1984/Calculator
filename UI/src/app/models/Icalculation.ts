import { CalculatorInformation } from './calculationInformation';

export interface ICalculation {
  FirstNumber: string;
  SecondNumber: string;
  Operator: string;
  Answer: number;
  CalculatorInformation: CalculatorInformation;
}
