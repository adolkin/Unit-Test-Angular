import { By } from '@angular/platform-browser';
import { HoverFocusDirective } from './hover-focus.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

// To test a directive we typically create a dummy testing component
// so we can interact with the directive and test it’s effect on the components view
@Component({
  template: `<input type="text" hoverfocus>`
})
class TestHoverFocusComponent {
}

// We can trigger events on DebugElements by using the triggerEventHandler function
// and if we want to see what styles are applied to it we can find it via the nativeElement.style property.
describe('Directive: HoverFocus', () => {
  let component: TestHoverFocusComponent;
  let fixture: ComponentFixture<TestHoverFocusComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //	We declare both the directive we want to test and the dummy test component.
      declarations: [TestHoverFocusComponent, HoverFocusDirective]
    });
    fixture = TestBed.createComponent(TestHoverFocusComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('hovering over input', () => {
    // We use triggerEventHandler to simulate events.
    inputEl.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    // The style property on the nativeElement is what we can inspect to see the current style applied to an element.
    expect(inputEl.nativeElement.style.backgroundColor).toBe('blue');

    inputEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    console.log(inputEl.nativeElement.style.backgroundColor);
    expect(inputEl.nativeElement.style.backgroundColor).toBe('inherit');
  });
});