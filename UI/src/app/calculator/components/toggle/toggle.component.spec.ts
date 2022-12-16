import {
  TestBed,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ToggleComponent } from './toggle.component';

let component: ToggleComponent;
let fixture: ComponentFixture<ToggleComponent>;
let button: HTMLElement;
describe('ToggleComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ToggleComponent],
      providers: [],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ToggleComponent);
        component = fixture.componentInstance;
        button = fixture.nativeElement.querySelector('button');
      });
  });

  it('when the toggle component is loaded then it will display the value', () => {
    let buttonText = 'Test Button';
    let iconText = 'Icon';
    component.value = buttonText;
    component.icon = iconText;

    fixture.detectChanges();

    expect(button.innerHTML).toEqual(
      '<span>' + buttonText + '</span><span>' + iconText + '</span>'
    );
  });

  it('when the toggle component is loaded then it will display the passed in css', () => {
    let cssName = 'TestClass';

    component.cssClass = cssName;

    fixture.detectChanges();

    expect(button.className).toEqual(cssName);
  });

  it('When the toggle component is clicked then it calls the setSelectedValue function', fakeAsync(() => {
    spyOn(component, 'setSelectedValue');

    button.click();

    tick();

    expect(component.setSelectedValue).toHaveBeenCalled();
  }));

  it('When the toggle component is clicked then the value is emitted to the parent', fakeAsync(() => {
    spyOn(component.onClickEvent, 'emit');
    const buttonValue = '1';

    component.value = buttonValue;
    button.click();

    tick();

    expect(component.onClickEvent.emit).toHaveBeenCalledWith(buttonValue);
  }));
});
