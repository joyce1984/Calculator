import { Calculation } from '../models/calculation';
import { CalculationService } from './calculation.service';

let service: CalculationService;
describe('Calculation Service', () => {
  service = new CalculationService();

  it('when a multiplication sum is requested then the numbers are multiplied together', () => {
    let result = service.calculateAnswer(CreateCaculation('10', '2', 'X', 20));
    expect(result).toEqual(20);
  });

  it('when a multiplication sum with a decimal is requested then the numbers are multiplied together', () => {
    let result = service.calculateAnswer(
      CreateCaculation('10.5', '2.5', 'X', 0)
    );
    expect(result).toEqual(26.25);
  });

  function CreateCaculation(
    firstNumber: string,
    secondNumber: string,
    operator: string,
    answer: number
  ) {
    var calculation = new Calculation();
    calculation.FirstNumber = firstNumber;
    calculation.SecondNumber = secondNumber;
    calculation.Operator = operator;
    calculation.Answer = answer;
    return calculation;
  }
});
