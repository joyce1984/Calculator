import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button (click)="setSelectedValue(value)" class="{{ cssClass }}">
    {{ value }}
  </button>`,
})
export class ButtonComponent {
  @Input() value = '';
  @Input() disabled: boolean = false;
  @Input() cssClass = '';
  @Output() onClickEvent = new EventEmitter<string>();

  setSelectedValue(value: string) {
    this.onClickEvent.emit(value);
  }
}
