import { AuthService } from './../../classes-pipes/auth.service';
import { LoginComponent } from './login.component';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// ******** REAL SERVICE ********
describe('LoginComponent with real service', () => {
  let component: LoginComponent;
  let service: AuthService;

  // We create an instance of AuthService and inject it into out LoginComponent when we create it
  beforeEach(() => {
    service = new AuthService();
    component = new LoginComponent(service);
  });

  // We clean up data and localStorage after each test spec has been run.
  afterEach(() => {
    localStorage.removeItem('token');
    service = null;
    component = null;
  });

  it('needsLogin return true when the user is not authenticated', () => {
    expect(component.needsLogin()).toBeTruthy();
  })

  it('needsLogin return false when the user is authenticated', () => {
    // We setup some data in localStorage in order to get the behaviour we want from AuthService.
    localStorage.setItem('token', '12345');
    expect(component.needsLogin()).toBeFalsy();
  })
});

// ******** FAKE SERVICE ********
// We create a class called MockAuthService 
// which has the same isAuthenticated function as the real AuthService class. 
// The one difference is that we can control what isAuthenticated returns by setting the value of the authenticated property.
class MockAuthService extends AuthService {
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }
}

describe('LoginComponent with fake service', () => {

  let component: LoginComponent;
  let service: MockAuthService;

  // We inject into our LoginComponent an instance of the MockAuthService instead of the real AuthService.
  beforeEach(() => {
    service = new MockAuthService();
    component = new LoginComponent(service);
  });

  afterEach(() => {
    service = null;
    component = null;
  });

  //In our tests we trigger the behaviour we want from the service by setting the authenticated property.
  it('needsLogin returns true when the user is not authenticated', () => {
    service.authenticated = false;
    expect(component.needsLogin()).toBeTruthy();
  });

  it('needsLogin returns false when the user is authenticated', () => {
    service.authenticated = true;
    expect(component.needsLogin()).toBeFalsy();
  });
});

// ******** REAL SERVICE WITH SPY ********
describe('LoginComponent with real service and spyOn', () => {
  let component: LoginComponent;
  let service: AuthService;
  let spy: any;

  // We create a real instance of AuthService and inject it into the LoginComponent.
  beforeEach(() => {
    service = new AuthService();
    component = new LoginComponent(service);
  });

  // In our teardown function there is no need to delete the token from localStorage
  afterEach(() => {
    service = null;
    component = null;
  });

  it('needsLogin return true when the user is not authenticated', () => {
    //We create a spy on our service so that if the isAuthenticated function is called it returns false.
    spy = spyOn(service, 'isAuthenticated').and.returnValue(false);
    expect(component.needsLogin()).toBeTruthy();
    //We can even check to see if the isAuthenticated function was called.
    expect(service.isAuthenticated).toHaveBeenCalled();
  })

  it('needsLogin return false when the user is authenticated', () => {
    spy = spyOn(service, 'isAuthenticated').and.returnValue(true);
    expect(component.needsLogin()).toBeFalsy();
    expect(service.isAuthenticated).toHaveBeenCalled();
  })
});


// ******** TESTBED ********
describe('LoginComponent TestBed', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  beforeEach(() => {
    //We configure it in exactly the same way as we would configure a normal NgModule
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });

    // create component and test fixture
    // We create an instance of a component fixture through the TestBed, this injects the AuthService into the component constructor.
    fixture = TestBed.createComponent(LoginComponent);

    //We can find the actual component from the componentInstance on the fixture.
    component = fixture.componentInstance;

    //We can find the actual component from the componentInstance on the fixture.
    authService = TestBed.get(AuthService);
  });

  it('needsLogin returns true when the user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    expect(component.needsLogin()).toBeTruthy();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });

  it('needsLogin returns false when the user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    expect(component.needsLogin()).toBeFalsy();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });
});

// ******** CHANGE DETETCTION ********
describe('LoginComponent Change Detection', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  // The fixture as well as holding an instance of the component also holds a reference to something called a DebugElement, 
  // this is a wrapper to the low level DOM element that represents the components view, via the debugElement property
  let el: DebugElement;

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    // UserService provided to the TestBed
    authService = TestBed.get(AuthService);

    // We can get references to other child nodes by querying this debugElement with a By class. 
    // The By class lets us query using a a number of methods, 
    // one is via a css class like we have in our example another way is to request by a type of directive like By.directive(MyDirective).
    //  Get the "a" element by CSS selector (e.g., by class name) and store to el variable
    el = fixture.debugElement.query(By.css('a'));
  });

  it('login button hidden when the user is authenticated', () => {
    // We can find out the text content of the tag by calling el.nativeElement.textContent.trim()

    // When Angular first loads no change detection has been triggered and therefore the view doesn’t show either the Login or Logout text.
    expect(el.nativeElement.textContent.trim()).toBe('');

    // Trigger change detection we call the function fixture.detectChanges()
    fixture.detectChanges();

    // Since the AuthService defaults to not authenticated we show the text Login
    expect(el.nativeElement.textContent.trim()).toBe('Login');

    // Change the AuthService so it now returns authenticated
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    // But at this point the button content still isn’t Logout
    expect(el.nativeElement.textContent.trim()).toBe('Login');

    // We need to trigger another change detection
    fixture.detectChanges();
    // AuthService returns true and the button text updated to Logout accordingly.
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  });
});

// ******** TEST DEPENDENCY INJECTION ********
describe('LoginComponent DI', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let testBedService: AuthService;
  let componentService: AuthService;

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });

    // Configure the component with another set of Providers
    TestBed.overrideComponent(
        LoginComponent,
        {set: {providers: [{provide: AuthService, useClass: MockAuthService}]}}
    );

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    // AuthService provided to the TestBed
    testBedService = TestBed.get(AuthService);

    // AuthService provided by Component, (should return MockAuthService)
    componentService = fixture.debugElement.injector.get(AuthService);
  });

  // DI Inject Function
  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
      inject([AuthService], (injectService: AuthService) => {
        expect(injectService).toBe(testBedService);
      })
  );

  it('Service injected via component should be and instance of MockAuthService', () => {
    expect(componentService instanceof MockAuthService).toBeTruthy();
  });
});