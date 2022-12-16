import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Calculation } from '../models/calculation';
import { CalculatorInformation } from '../models/calculationInformation';
import { ValidationResult } from '../models/validationresult';
import { CalculationService } from '../services/calculation.service';
import { CalculationValidationService } from '../services/calculation.validation.service';
import { HistoryService } from '../services/history.service';
import { ReportingService } from '../services/reporting.service';
import { CalculatorComponent } from './calculator.component';
import { ButtonComponent } from './components/buttons/button.component';
import { DisplayComponent } from './components/display/display.component';
import { ErrorComponent } from './components/errors/errors.component';
import { HistoryComponent } from './components/history/history.component';
import { ToggleComponent } from './components/toggle/toggle.component';
describe('Calculator Component', () => {
  let calculationServiceSpy!: jasmine.SpyObj<CalculationService>;
  let calculationValidationServiceSpy!: jasmine.SpyObj<CalculationValidationService>;
  let historyServiceSpy!: jasmine.SpyObj<HistoryService>;
  let reportingServiceSpy!: jasmine.SpyObj<ReportingService>;
  let calculatorComponent!: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  beforeEach(async () => {
    historyServiceSpy = jasmine.createSpyObj('HistoryService', ['Get', 'Add']);
    calculationValidationServiceSpy = jasmine.createSpyObj(
      'CalculationValidationService',
      ['Validate']
    );
    calculationServiceSpy = jasmine.createSpyObj(
      'CalculationValidationServiceSpy',
      ['calculateAnswer']
    );
    reportingServiceSpy = jasmine.createSpyObj('ReportingService', ['Send']);
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        CalculatorComponent,
        ButtonComponent,
        ToggleComponent,
        DisplayComponent,
        ErrorComponent,
        HistoryComponent,
      ],
      providers: [
        { provide: CalculationService, useValue: calculationServiceSpy },
        {
          provide: CalculationValidationService,
          useValue: calculationValidationServiceSpy,
        },
        { provide: HistoryService, useValue: historyServiceSpy },
        { provide: ReportingService, useValue: reportingServiceSpy },
      ],
    })
      .compileComponents()
      .then(() => {
        calculationServiceSpy = TestBed.inject(
          CalculationService
        ) as jasmine.SpyObj<CalculationService>;
        calculationValidationServiceSpy = TestBed.inject(
          CalculationValidationService
        ) as jasmine.SpyObj<CalculationValidationService>;
        historyServiceSpy = TestBed.inject(
          HistoryService
        ) as jasmine.SpyObj<HistoryService>;
        reportingServiceSpy = TestBed.inject(
          ReportingService
        ) as jasmine.SpyObj<ReportingService>;
        fixture = TestBed.createComponent(CalculatorComponent);
        calculatorComponent = fixture.componentInstance;
      });
  });
  it('When all dependencies are provided then the calculator component should initialise', () => {
    const calculationServiceSpy = jasmine.createSpyObj('CalculationService', [
      'calculateAnswer',
    ]);
    const calculationValidationServiceSpy = jasmine.createSpyObj(
      'CalculationValidationService',
      ['Validate']
    );
    const historyServiceServiceSpy = jasmine.createSpyObj('HistoryService', [
      'Add',
      'Get',
    ]);
    const reportingServiceServiceSpy = jasmine.createSpyObj(
      'ReportingService',
      ['Send', 'subscribe']
    );

    const component = new CalculatorComponent(
      calculationServiceSpy,
      calculationValidationServiceSpy,
      historyServiceServiceSpy,
      reportingServiceServiceSpy
    );

    expect(component).toBeTruthy();
  });

  it('When set number is called and there hasnt been an operator set then the first number is populated', () => {
    let number = '1';

    var calculation = CreateCaculation('', '', '', 0);

    calculatorComponent.calculation = calculation;

    calculatorComponent.calculatorInformation = new CalculatorInformation();
    calculatorComponent.calculatorInformation.CorrelationId =
      crypto.randomUUID();
    calculatorComponent.calculatorInformation.SchoolId = crypto.randomUUID();
    calculatorComponent.calculatorInformation.UserId = crypto.randomUUID();
    calculatorComponent.calculatorInformation.QuestionNumber = 1;

    historyServiceSpy.Get.and.returnValue([]);

    fixture.detectChanges();
    calculatorComponent.setNumber(number);

    expect(calculatorComponent.calculation.FirstNumber).toBe(number);
    expect(calculatorComponent.calculation.SecondNumber).toBe('');
  });

  it('When set number is called and there has been an operator set then the 2nd number is populated', () => {
    let number = '1';

    var calculation = CreateCaculation('', '', 'X', 0);

    calculatorComponent.calculation = calculation;

    calculatorComponent.calculatorInformation = CreateCalculatorInformation();

    historyServiceSpy.Get.and.returnValue([]);

    calculatorComponent.setNumber(number);

    expect(calculatorComponent.calculation.FirstNumber).toBe('');
    expect(calculatorComponent.calculation.SecondNumber).toBe(number);
  });

  it('When set number is called and there is already a decimal point added then it will ignore it', () => {
    let number = '.';

    var calculation = CreateCaculation('10.', '0', '', 0);

    calculatorComponent.calculation = calculation;

    calculatorComponent.calculatorInformation = CreateCalculatorInformation();

    historyServiceSpy.Get.and.returnValue([]);

    calculatorComponent.setNumber(number);

    expect(calculatorComponent.calculation.FirstNumber).toBe('10.');
    expect(calculatorComponent.calculation.SecondNumber).toBe('0');
  });

  it('When call addValue then it validates the next number and returns it if it can add', fakeAsync(() => {
    let number = '0';
    let currentNumber = '1';

    var result = calculatorComponent.addValue(number, currentNumber);

    expect(result).toBe('0');
  }));
  it('When addValue is called and the number already has a decimal point then then nothing is returned', () => {
    let number = '.';
    let currentNumber = '1.';

    let result = calculatorComponent.addValue(number, currentNumber);

    expect(result).toBe('');
  });

  it('When set operator is called then an operator is set', () => {
    let operator = '+';
    let calculation = CreateCaculation('10.', '0', '', 0);

    calculatorComponent.calculation = calculation;

    calculatorComponent.setOperator(operator);

    expect(calculatorComponent.calculation.Operator).toBe(operator);
  });

  it('When clear numbers called then the calculation is reset', () => {
    let calculation = CreateCaculation('10', '2', 'X', 20);

    calculatorComponent.calculation = calculation;
    calculatorComponent.validationResult.Messages = ['Invalid calculation'];
    calculatorComponent.clearNumbers();

    expect(calculatorComponent.calculation.Operator).toEqual('');
    expect(calculatorComponent.calculation.FirstNumber).toEqual('');
    expect(calculatorComponent.calculation.SecondNumber).toEqual('');
    expect(calculatorComponent.calculation.Answer).toEqual(0);

    expect(calculatorComponent.validationResult.Messages).toEqual([]);
  });

  it('When showHistory is called then the result is toggled', () => {
    calculatorComponent.toggleShowHistory = true;
    calculatorComponent.showHistory();

    expect(calculatorComponent.toggleShowHistory).toEqual(false);
  });

  it('When selectHistoricCalculation is called then the calculation is reset to the historic one', () => {
    var currentCalculation = CreateCaculation('10', '2', 'X', 20);
    var historicCalculation = CreateCaculation('1', '2', 'X', 2);

    calculatorComponent.calculation = currentCalculation;

    calculatorComponent.selectHistoricCalculation(historicCalculation);

    expect(calculatorComponent.calculation.Operator).toEqual('X');
    expect(calculatorComponent.calculation.FirstNumber).toEqual('1');
    expect(calculatorComponent.calculation.SecondNumber).toEqual('2');
    expect(calculatorComponent.calculation.Answer).toEqual(2);
  });

  it('When- the calculator is maximised toggleDisplayCalculator is called then the result is minimised', () => {
    calculatorComponent.isMaximised = true;
    calculatorComponent.toggleDisplayCalculator();

    expect(calculatorComponent.isMaximised).toEqual(false);
    expect(calculatorComponent.toggleIcon).toEqual(calculatorComponent.maxIcon);
  });
  it('When- the calculator is minimised toggleDisplayCalculator is called then the result is maximised', () => {
    calculatorComponent.isMaximised = false;
    calculatorComponent.toggleDisplayCalculator();

    expect(calculatorComponent.isMaximised).toEqual(true);
    expect(calculatorComponent.toggleIcon).toEqual(calculatorComponent.minIcon);
  });

  it('When calculateSum is called but the validation fails then no calculation is performed', () => {
    var calculation = CreateCaculation('10', '1', '', 0);

    calculatorComponent.calculation = calculation;

    calculatorComponent.calculatorInformation = CreateCalculatorInformation();
    let validationResult: ValidationResult = {
      IsValid: false,
      Messages: ['Add an operator'],
    };
    calculationValidationServiceSpy.Validate.and.returnValue(validationResult);

    calculatorComponent.calculateSum();

    expect(calculatorComponent.calculation.Answer).toEqual(0);
  });

  it('When calculateSum is called then the result is caluclated', () => {
    var calculation = CreateCaculation('10', '1', 'X', 0);

    calculatorComponent.history = [];
    calculatorComponent.calculation = calculation;

    calculatorComponent.calculatorInformation = CreateCalculatorInformation();
    let validationResult: ValidationResult = {
      IsValid: true,
      Messages: [],
    };

    calculationValidationServiceSpy.Validate.and.returnValue(validationResult);

    calculationServiceSpy.calculateAnswer.and.returnValue(10);

    reportingServiceSpy.Send.and.returnValue(of(Observable<unknown>));

    historyServiceSpy.Add.and.returnValue([calculation]);

    expect(calculatorComponent.history).toEqual([]);

    calculatorComponent.calculateSum();

    expect(calculatorComponent.calculation.FirstNumber).toEqual('10');
    expect(calculatorComponent.history.length).toEqual(1);
  });
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
