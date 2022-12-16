import {
  TestBed,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Calculation } from 'src/app/models/calculation';
import { DisplayComponent } from './display.component';

let component: DisplayComponent;
let fixture: ComponentFixture<DisplayComponent>;
let input: HTMLElement;
describe('DisplayComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [DisplayComponent],
      providers: [],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DisplayComponent);
        component = fixture.componentInstance;
        input = fixture.nativeElement.querySelector('input');
      });
  });

  it('when the calculation is null then the display is empty', () => {
    component.calculation = new Calculation();

    fixture.detectChanges();

    expect(input.textContent).toEqual('');
  });

  it('when the calculation is populated then it will be displayed', () => {
    var calculation = new Calculation();
    calculation.FirstNumber = '1';
    calculation.SecondNumber = '2';
    calculation.Operator = 'X';
    calculation.Answer = 2;

    component.calculation = calculation;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('input'));
      let el = input.nativeElement;
      expect(el.value).toEqual('1 X 2');
    });
  });

  it('when the display is loaded then it will display the passed in css', () => {
    let cssName = 'TestClass';

    component.calculation = new Calculation();

    component.cssClass = cssName;

    fixture.detectChanges();

    expect(input.className).toEqual(cssName);
  });
});
