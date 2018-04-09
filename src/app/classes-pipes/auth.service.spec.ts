import { AuthService } from './auth.service';

describe('AuthService', () => {

  let service: AuthService;
  //	Before each test spec is run we create a new instance of AuthService and store on the service variable.
  beforeEach(() => {
    service = new AuthService();
  });

  // After each test spec is finished we null out our service and also remove any tokens we stored in localStorage.
  afterEach(() => {
    service = null;
    localStorage.removeItem('token');
  })

  //We pass to the it function a human readable description of what we are testing. 
  // This is shown in the test report and makes it easy to understand what feature isn’t working
  it('should return true from isAuthenticated when there is a token', () => { 
    localStorage.setItem('token', '1234'); 
    expect(service.isAuthenticated()).toBeTruthy(); 
  });

  it('should return false from isAuthenticated when there is no token', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });
});
