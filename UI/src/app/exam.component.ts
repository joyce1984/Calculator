import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalculatorInformation } from './models/calculationInformation';

@Component({
  selector: 'app-exam',
  template: `
  <app-calculator [calculatorInformation]="calculatorInformation"></app-calculator>
              <router-outlet></router-outlet>`
})

export class ExamComponent {

  schoolId = '';
  questionId = 0;
  userId = crypto.randomUUID();
  calculatorInformation!:CalculatorInformation;
  constructor(private route: ActivatedRoute) {
  this.route.params.subscribe( params => {
    this.schoolId = params['schoolId'];
    this.questionId = params['questionId']
    this.setCalculatorInformation();
  });
  }
  
  setCalculatorInformation()
  {
    this.calculatorInformation = new CalculatorInformation();
    this.calculatorInformation.SchoolId = this.schoolId,
    this.calculatorInformation.QuestionNumber = this.questionId,
    this.calculatorInformation.UserId = this.userId,
    this.calculatorInformation.CorrelationId = this.userId
  };
}
