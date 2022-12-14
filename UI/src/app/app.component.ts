import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CalculatorInformation } from './models/calculationInformation';

@Component({
  selector: 'app-root',
  template: `
  <nav>
  <ul>
    <li><a routerLink="/2e205348-f0b5-43b5-a508-4af0f70aaa9b/maths/1" routerLinkActive="active" ariaCurrentWhenActive="page">School 1 - Question 1</a></li>
    <li><a routerLink="/2e205348-f0b5-43b5-a508-4af0f70aaa9b/maths/2" routerLinkActive="active" ariaCurrentWhenActive="page">School 1 - Question 2</a></li>
    <li><a routerLink="/4966c586-ef9b-420d-9787-68be3c291bbf/maths/1" routerLinkActive="active" ariaCurrentWhenActive="page">School 2 - Question 1</a></li>
    <li><a routerLink="/4966c586-ef9b-420d-9787-68be3c291bbf/maths/2" routerLinkActive="active" ariaCurrentWhenActive="page">School 2 - Question 2</a></li>
  </ul>
</nav>
  <router-outlet></router-outlet>`
})

export class AppComponent {
  title = 'Calculator';

}
