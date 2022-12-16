import { CalculatorInformation } from './calculationInformation';
import { ICalculation } from './Icalculation';

export class Calculation implements ICalculation {
  FirstNumber!: string;
  SecondNumber!: string;
  Operator!: string;
  Answer!: number;
  CalculatorInformation!: CalculatorInformation;
}
