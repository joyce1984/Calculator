import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-errors',
  template: `<div
    *ngIf="messages !== null && messages.length > 0"
    id="errorContainer"
    class="alert alert-danger m-2"
    role="alert"
  >
    <p class="message" *ngFor="let message of messages">
      {{ message }}
    </p>
  </div>`,
})
export class ErrorComponent {
  @Input() messages!: Array<string>;
}
