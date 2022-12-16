import { Component, Input } from '@angular/core';
import { Calculation } from '../../../models/calculation';

@Component({
  selector: 'app-display',
  template: `<input
    type="text"
    class="{{ cssClass }}"
    value="{{ calculation.FirstNumber || '' }} {{ calculation.Operator }} {{
      calculation.SecondNumber || ''
    }}"
    disabled
  />`,
})
export class DisplayComponent {
  @Input() calculation!: Calculation;
  @Input() cssClass = '';
}
