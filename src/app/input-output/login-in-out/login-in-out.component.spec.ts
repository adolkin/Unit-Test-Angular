import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInOutComponent, User } from './login-in-out.component';
import { DebugElement } from '@angular/core';

describe('LoginInOutComponent', () => {

  let component: LoginInOutComponent;
  let fixture: ComponentFixture<LoginInOutComponent>;
  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [LoginInOutComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginInOutComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    submitEl = fixture.debugElement.query(By.css('button'));
    loginEl = fixture.debugElement.query(By.css('input[type=email]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
  });

  //Just because it’s an @Input doesn’t change the fact it’s a still just a 
  //simple property which we can change like any other property, like so:
  it('Setting enabled to false disables the submit button', () => {
    component.enabled = false;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  it('Setting enabled to true enables the submit button', () => {
    component.enabled = true;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeFalsy();
  });

  // Test @Output
  it('Entering email and password emits loggedIn event', () => {
    let user: User;

    // How we actually trigger an event to be fired? We could call the component.login(…​) function ourselves 
    // but for the purposes of this lecture we want to trigger the function from the view.

    // Set some values to our email and password input controls in the view.
    loginEl.nativeElement.value = "test@example.com";
    passwordEl.nativeElement.value = "123456";

    // Since the output event is actually an Observable we can subscribe to it and get a callback for every item emitted.
    // We store the emitted value to a user object and then add some expectations on the user object.
    component.loggedIn.subscribe((value) => user = value);

    // Trigger a click on our submit button, this synchronously emits the user object in the subscribe callback!
    submitEl.triggerEventHandler('click', null); 

    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("123456");
  });
});