import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { LoginPromiseComponent } from './login-promise.component';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthPromiseService } from '../auth-promise.service';

describe('LoginPromiseComponent', () => {
  let component: LoginPromiseComponent;
  let fixture: ComponentFixture<LoginPromiseComponent>;
  let authService: AuthPromiseService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPromiseComponent],
      providers: [AuthPromiseService]
    });

    fixture = TestBed.createComponent(LoginPromiseComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthPromiseService);
    el = fixture.debugElement.query(By.css('a'));
  }));

  // ******** NO ASYNCHROMOUS HANDLING ********
  xit('Button label no asynchronous handling', () => {
    // We issue our first change detection run so the view does it’s initial update
    fixture.detectChanges();

    // We expect the button text to display Login
    expect(el.nativeElement.textContent.trim()).toBe('Login');

    // We change our AuthService so it returns a promise resolved to true.
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));

    // We call component.ngOnInit()
    // When performing testing we need to call component lifecycle hooks ourselves, like ngOnInit()
    component.ngOnInit();

    // We issue our second change detection run.
    fixture.detectChanges();

    // We now expect the button text to read Logout.
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  });
  // This test fails because by the time we run the last expectation 
  // the AuthPromiseService.isAuthenticated() function hasn’t yet resolved to a value. 
  // Therefore the needsLogin property on the LoginComponent hasn’t been updated.


  // ******** JASMINE DONE FUNCTION ********
  //	The jasmine test spec function is passed a function as the first param, we usually call this parameter done.
  it('Button label via jasmine.done', (done) => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.ngOnInit();

    // We can add a callback function (using the spy) which is called when the promise returned from isAuthenticated function resolved.
    // In this function we know that the component has the new value of needsLogin and we can add our additional expectation here.
    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Logout');

      // When we are done with our asynchronous tasks we tell Jasmine via the done function.
      // Jasmine lets us create asynchronous tests by giving us an explict done function which we call when the test is complete.
      done();
    });
  });

  // ******** ASYNC AND WHENSTABLE FUNCTION ********
  //We wrap our test spec function in another function called async.
  it('Button label via async() and whenStable()', async(() => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));

    // We place the tests we need to run after the isAuthenticated promise resolves inside this function.
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
    });
    component.ngOnInit();
  }));

  // ******** FAKEASYNC AND TICK FUNCTION ********
  // We wrap the test spec function in a function called fakeAsync.
  it('Button label via fakeAsync() and tick()', fakeAsync(() => { 
    expect(el.nativeElement.textContent.trim()).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    component.ngOnInit();
    
    //	We call tick() when there are pending asynchronous activities we want to complete.
    tick(); 
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  }));
});
