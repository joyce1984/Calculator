import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Calculation } from '../../../models/calculation';

@Component({
  selector: 'app-history',
  template: `<div *ngIf="toggleShowHistory === true" class="history">
    <div *ngFor="let hist of history" id="historyContainer" class="mt-2">
      <app-button
        [value]="getLabel(hist)"
        id="calc"
        (onClickEvent)="selectHistoricCalculation(hist)"
        [cssClass]="'w-100 btn btn-light waves-effect'"
        >{{ getLabel(hist) }}</app-button
      >
    </div>
  </div>`,
})
export class HistoryComponent {
  @Input() toggleShowHistory!: boolean;
  @Input() history!: Array<Calculation>;
  @Output() onClickEvent = new EventEmitter<Calculation>();

  selectHistoricCalculation(historicCalculation: Calculation) {
    this.onClickEvent.emit(historicCalculation);
  }
  getLabel(calculation: Calculation) {
    return (
      calculation.FirstNumber +
      ' ' +
      calculation.Operator +
      ' ' +
      calculation.SecondNumber +
      '= ' +
      calculation.Answer
    );
  }
}
