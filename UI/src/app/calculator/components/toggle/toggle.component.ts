import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-toggle',
  template : `<button (click)="setSelectedValue(value)" class="{{cssClass}}"><span>{{value}}</span><span [innerHTML]="icon"></span></button>`
})
export class ToggleComponent {
  @Input() value ='';
  @Input() icon ='';
  @Input() disabled:boolean = false;
  @Input() cssClass='';
  @Output() onClickEvent = new EventEmitter<string>();

  setSelectedValue(value: string)
  {
      this.onClickEvent.emit(value);
  }
}

