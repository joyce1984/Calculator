import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Calculation } from '../models/calculation';
import { CalculatorInformation } from '../models/calculationInformation';
import { ReportingService } from './reporting.service';

describe('Reporting Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let reportingService: ReportingService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    reportingService = new ReportingService(httpClientSpy);
  });

  it('when the usage is sent then a successful response is returned', () => {
    let mockCalculation = CreateCaculation('10', '2', 'X', 20);
    const createdResponse = new HttpResponse({
      status: 201,
      statusText: 'created',
    });

    httpClientSpy.post.and.returnValue(of(Observable<unknown>));

    let result = reportingService
      .Send<Calculation>(mockCalculation)
      .subscribe();

    expect(result).toBeTruthy();
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
