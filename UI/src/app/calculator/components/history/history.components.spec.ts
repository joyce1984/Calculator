import {
  TestBed,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Calculation } from 'src/app/models/calculation';
import { ButtonComponent } from '../buttons/button.component';
import { HistoryComponent } from './history.component';

let component: HistoryComponent;
let fixture: ComponentFixture<HistoryComponent>;
let div: HTMLElement;
describe('HistoryComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HistoryComponent, ButtonComponent],
      providers: [],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HistoryComponent);
        component = fixture.componentInstance;
        component.toggleShowHistory = true;
        div = fixture.nativeElement.querySelector('div');
      });
  });

  it('when there is no history then it is hidden', () => {
    component.toggleShowHistory = true;

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#historyContainer'))).toBeNull();
  });

  it('when there is some historical calculations then the div it is shown', () => {
    const historicalCalulation = new Calculation();

    historicalCalulation.FirstNumber = '1';
    historicalCalulation.SecondNumber = '2';
    historicalCalulation.Operator = 'X';
    historicalCalulation.Answer = 2;

    component.toggleShowHistory = true;
    component.history = [historicalCalulation];

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      console.log(fixture.debugElement);
      expect(
        fixture.debugElement.query(By.css('#historyContainer'))
      ).toBeDefined();
    });
  });

  it('when there is some historical calculations then they are displayed', () => {
    const historicalCalulation = new Calculation();

    historicalCalulation.FirstNumber = '1';
    historicalCalulation.SecondNumber = '2';
    historicalCalulation.Operator = 'X';
    historicalCalulation.Answer = 2;

    component.toggleShowHistory = true;
    component.history = [historicalCalulation, historicalCalulation];

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('#historyContainer'))
    ).toBeDefined();

    let buttons = fixture.debugElement.queryAll(By.css('#calc'));

    for (let index = 0; index < buttons.length; index++) {
      let button = buttons[index].nativeElement;
      let calculation = component.history[index];
      expect(button.innerText).toBe(
        calculation.FirstNumber +
          ' ' +
          calculation.Operator +
          ' ' +
          calculation.SecondNumber +
          '= ' +
          calculation.Answer
      );
    }
  });

  it('when a historical calculation is clicked then selectHistoricCalculation is called', fakeAsync(() => {
    spyOn(component, 'selectHistoricCalculation');
    const historicalCalulation = new Calculation();

    historicalCalulation.FirstNumber = '1';
    historicalCalulation.SecondNumber = '2';
    historicalCalulation.Operator = 'X';
    historicalCalulation.Answer = 2;

    component.toggleShowHistory = true;
    component.history = [historicalCalulation];

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('#historyContainer'))
      ).toBeDefined();

      let button = fixture.nativeElement.querySelector('button');

      button.click();

      tick();

      expect(component.selectHistoricCalculation).toHaveBeenCalled();
    });
  }));

  it('when a historical calculation is clicked then the output is emitted to the parent', fakeAsync(() => {
    spyOn(component.onClickEvent, 'emit');
    const historicalCalulation = new Calculation();

    historicalCalulation.FirstNumber = '1';
    historicalCalulation.SecondNumber = '2';
    historicalCalulation.Operator = 'X';
    historicalCalulation.Answer = 2;

    component.toggleShowHistory = true;
    component.history = [historicalCalulation];

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('#historyContainer'))
      ).toBeDefined();

      let button = fixture.nativeElement.querySelector('button');

      button.click();

      tick();

      expect(component.onClickEvent.emit).toHaveBeenCalledWith(
        historicalCalulation
      );
    });
  }));
});
