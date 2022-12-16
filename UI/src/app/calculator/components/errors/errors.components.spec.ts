import {
  TestBed,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ErrorComponent } from './errors.component';

let component: ErrorComponent;
let fixture: ComponentFixture<ErrorComponent>;
let div: HTMLElement;
describe('ErrorComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ErrorComponent],
      providers: [],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        div = fixture.nativeElement.querySelector('div');
      });
  });

  it('when there are no error messages then then div is hidden', () => {
    expect(fixture.debugElement.query(By.css('#errorContainer'))).toBeNull();
  });

  it('when there are error messages then the div should be shown', () => {
    component.messages = ['Error 1', 'Error 2'];

    expect(fixture.debugElement.query(By.css('#errorContainer'))).toBeDefined();
  });

  it('when there are error messages then each message should be shown', () => {
    component.messages = ['Error 1', 'Error 2'];

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#errorContainer'))).toBeDefined();

    let messages = fixture.debugElement.queryAll(By.css('.message'));

    for (let index = 0; index < messages.length; index++) {
      var message = messages[index].nativeElement;

      expect(message.innerText).toBe(component.messages[index]);
    }
  });
});
