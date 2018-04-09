import { AuthService } from './../../classes-pipes/auth.service';
import { LoginComponent } from './login.component';

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
    spy = spyOn(service, 'isAuthenticated').and.returnValue(false);
    expect(component.needsLogin()).toBeTruthy();
    expect(service.isAuthenticated).toHaveBeenCalled(); 
  })

  it('needsLogin return false when the user is authenticated', () => {
    spy = spyOn(service, 'isAuthenticated').and.returnValue(true);
    expect(component.needsLogin()).toBeFalsy();
    expect(service.isAuthenticated).toHaveBeenCalled();
  })
});