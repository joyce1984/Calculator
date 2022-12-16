import { Calculation } from '../models/calculation';
import { CalculatorInformation } from '../models/calculationInformation';
import { CalculationValidationService } from './calculation.validation.service';

let service: CalculationValidationService;
describe('Calculation Validation Service', () => {
  service = new CalculationValidationService();

  it('when the calculation is valid then isValid is returned', () => {
    var calculation = CreateCaculation('10', '2', 'X', 20);
    calculation.CalculatorInformation = CreateCalculatorInformation();
    let result = service.Validate(calculation);
    expect(result.IsValid).toEqual(true);
  });

  it('when the first number is missing then isValid is false is returned', () => {
    var calculation = CreateCaculation('', '2', 'X', 20);
    calculation.CalculatorInformation = CreateCalculatorInformation();
    let result = service.Validate(calculation);
    expect(result.IsValid).toEqual(false);
    expect(result.Messages.length).toEqual(1);
  });

  it('when the second number is missing then isValid is false is returned', () => {
    var calculation = CreateCaculation('10', '', 'X', 20);
    calculation.CalculatorInformation = CreateCalculatorInformation();
    let result = service.Validate(calculation);
    expect(result.IsValid).toEqual(false);
    expect(result.Messages.length).toEqual(1);
  });

  it('when the operation is missing then isValid is false is returned', () => {
    var calculation = CreateCaculation('10', '20', '', 20);
    calculation.CalculatorInformation = CreateCalculatorInformation();
    let result = service.Validate(calculation);
    expect(result.IsValid).toEqual(false);
    expect(result.Messages.length).toEqual(2);
  });

  it('when the operation is not valid then isValid is false is returned', () => {
    var calculation = CreateCaculation('10', '20', '!', 20);
    calculation.CalculatorInformation = CreateCalculatorInformation();
    let result = service.Validate(calculation);
    expect(result.IsValid).toEqual(false);
    expect(result.Messages.length).toEqual(1);
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
  function CreateCalculatorInformation(): CalculatorInformation {
    var calculatorInformation = new CalculatorInformation();
    calculatorInformation.CorrelationId = crypto.randomUUID();
    calculatorInformation.SchoolId = crypto.randomUUID();
    calculatorInformation.UserId = crypto.randomUUID();
    calculatorInformation.QuestionNumber = 1;
    return calculatorInformation;
  }
});
