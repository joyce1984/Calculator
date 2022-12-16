import { Component, Input, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { CalculatorInformation } from '../models/calculationInformation';
import { ValidationResult } from '../models/validationresult';
import { CalculationService } from '../services/calculation.service';
import { CalculationValidationService } from '../services/calculation.validation.service';
import { HistoryService } from '../services/history.service';
import { Calculation } from '../models/calculation';
import { ReportingService } from '../services/reporting.service';
import { ResizeEvent } from 'angular-resizable-element';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styles: [
    `
      .rectangle 
        position: relative
        top: 200px
        display: flex
        align-items: center
        justify-content: center
        width: 300px
        height: 150px
        background-color: #fd4140
        border: solid 1px #121621
        color: #121621
        margin: auto

      .mwlResizable 
        box-sizing: border-box // required for the enableGhostResize option to work

      .resize-handle-top,
      .resize-handle-bottom 
        position: absolute
        height: 5px
        cursor: row-resize
        width: 100%

      .resize-handle-top 
        top: 0

      .resize-handle-bottom 
        bottom: 0

      .resize-handle-left,
      .resize-handle-right 
        position: absolute
        height: 100%
        cursor: col-resize
        width: 5px

      .resize-handle-left 
        left: 0

      .resize-handle-right 
        right: 0
    `,
  ],
})
export class CalculatorComponent implements OnInit {
  constructor(
    private calculationService: CalculationService,
    private validatorService: CalculationValidationService,
    private historyService: HistoryService,
    private reportingService: ReportingService
  ) {}

  @Input() calculatorInformation!: CalculatorInformation;

  calculation!: Calculation;

  validationResult: ValidationResult = {
    IsValid: false,
    Messages: Array<string>(),
  };

  history!: Array<Calculation>;

  toggleShowHistory = false;

  isMaximised = true;

  minIcon = '&#128469;';

  maxIcon = '&#128470;';

  toggleIcon = this.minIcon;

  key = '';
  ngOnInit() {
    this.InitialiseComponent();
  }

  ngOnChanges(changes: CalculatorInformation) {
    this.InitialiseComponent();
  }

  private InitialiseComponent() {
    this.InitialiseCalculation();
    this.calculation.CalculatorInformation = this.calculatorInformation;
    this.key =
      this.calculatorInformation.SchoolId +
      '/' +
      this.calculatorInformation.QuestionNumber;
    this.history = this.historyService.Get(this.key);
  }

  setNumber(number: string) {
    if (this.hasOperator()) {
      this.setFirstNumber(number);
    } else {
      this.setSecondNumber(number);
    }
  }

  private hasOperator(): boolean {
    return this.calculation.Operator == '';
  }

  private setFirstNumber(number: string) {
    this.calculation.FirstNumber += this.addValue(
      number,
      this.calculation.FirstNumber
    );
  }
  addValue(value: string, currentValue: string): string {
    let canAddValue = true;
    if (value === '.' && currentValue.includes('.')) {
      canAddValue = false;
    }
    return canAddValue ? value : '';
  }

  private setSecondNumber(number: string) {
    this.calculation.SecondNumber += this.addValue(
      number,
      this.calculation.SecondNumber
    );
  }

  setOperator(operator: string) {
    this.calculation.Operator = operator;
  }

  clearNumbers() {
    this.InitialiseCalculation();
    this.validationResult.Messages = [];
  }

  private InitialiseCalculation() {
    this.calculation = new Calculation();
    this.calculation.FirstNumber = '';
    this.calculation.SecondNumber = '';
    this.calculation.Operator = '';
    this.calculation.Answer = 0;
    this.calculation.CalculatorInformation = this.calculatorInformation;
  }

  calculateSum() {
    this.validationResult = this.validatorService.Validate(this.calculation);

    if (this.validationResult.IsValid) {
      this.calculation.Answer = this.calculationService.calculateAnswer(
        this.calculation
      );

      this.reportingService.Send<Calculation>(this.calculation).subscribe();

      this.history = this.historyService.Add(this.calculation);

      this.resetCalculation();
    }
  }
  resetCalculation() {
    let previousAnswer = this.calculation.Answer.toString();
    this.calculation = new Calculation();
    this.calculation.FirstNumber = previousAnswer;
    this.calculation.SecondNumber = '';
    this.calculation.Operator = '';
    this.calculation.Answer = 0;
    this.calculation.CalculatorInformation = this.calculatorInformation;
  }

  showHistory() {
    this.toggleShowHistory = !this.toggleShowHistory;
  }

  selectHistoricCalculation(historicCalculation: Calculation) {
    this.calculation = historicCalculation;
  }
  toggleDisplayCalculator() {
    this.isMaximised = !this.isMaximised;
    this.toggleIcon = this.isMaximised ? this.minIcon : this.maxIcon;
  }
}
