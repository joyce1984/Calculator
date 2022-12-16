import {
  TestBed,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ButtonComponent } from './button.component';

let component: ButtonComponent;
let fixture: ComponentFixture<ButtonComponent>;
let button: HTMLElement;
describe('ButtonComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ButtonComponent],
      providers: [],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        button = fixture.nativeElement.querySelector('button');
      });
  });

  it('when the button is loaded then it will display the value', () => {
    let buttonText = 'Test Button';

    component.value = buttonText;

    fixture.detectChanges();

    expect(button.textContent).toEqual(buttonText);
  });

  it('when the button is loaded then it will display the passed in css', () => {
    let cssName = 'TestClass';

    component.cssClass = cssName;

    fixture.detectChanges();

    expect(button.className).toEqual(cssName);
  });

  it('When the button is clicked then it calls the setSelectedValue function', fakeAsync(() => {
    spyOn(component, 'setSelectedValue');

    button.click();

    tick();

    expect(component.setSelectedValue).toHaveBeenCalled();
  }));

  it('When the button is clicked then the value is emitted to the parent', fakeAsync(() => {
    spyOn(component.onClickEvent, 'emit');
    const buttonValue = '1';

    component.value = buttonValue;
    button.click();

    tick();

    expect(component.onClickEvent.emit).toHaveBeenCalledWith(buttonValue);
  }));
});
