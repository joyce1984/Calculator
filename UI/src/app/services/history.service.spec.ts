import { TestBed } from '@angular/core/testing';
import { Calculation } from '../models/calculation';
import { CalculatorInformation } from '../models/calculationInformation';
import { HistoryService } from './history.service';
import { HistoryRepository } from './historyrepository';

describe('History Service', () => {
  let historyRepository!: jasmine.SpyObj<HistoryRepository>;
  historyRepository = jasmine.createSpyObj('HistoryService', ['Get', 'Add']);

  it('when the history gets requested then it is returned', () => {
    let mockCalculation = CreateCaculation('10', '2', 'X', 20);

    historyRepository.Get.and.returnValues(JSON.stringify([mockCalculation]));
    let service = new HistoryService(historyRepository);
    let results = service.Get('dummyKey');
    expect(results.length).toEqual(1);
  });

  it('when the history is added then it is added to our repository', () => {
    let historicCalculation = CreateCaculation('10', '2', 'X', 20);
    let newCalculation = CreateCaculation('20', '2', 'X', 40);
    historyRepository.Get.and.returnValues(
      JSON.stringify([historicCalculation])
    );
    let service = new HistoryService(historyRepository);
    let result = service.Add(newCalculation);
    expect(result.length).toEqual(2);
  });

  it('when the max history has been reached the new result is at the bottom of the list', () => {
    let historicCalculation = CreateCaculation('10', '2', 'X', 20);
    let newCalculation = CreateCaculation('20', '2', 'X', 40);
    historyRepository.Get.and.returnValues(
      JSON.stringify([
        historicCalculation,
        historicCalculation,
        historicCalculation,
        historicCalculation,
        historicCalculation,
      ])
    );
    let service = new HistoryService(historyRepository);
    let result = service.Add(newCalculation);
    expect(result.length).toEqual(5);

    expect(result[4].FirstNumber).toEqual(newCalculation.FirstNumber);
    expect(result[4].SecondNumber).toEqual(newCalculation.SecondNumber);
    expect(result[4].Operator).toEqual(newCalculation.Operator);
    expect(result[4].Answer).toEqual(newCalculation.Answer);
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
    calculation.CalculatorInformation = CreateCalculatorInformation();
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
