import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

export class User {
  constructor(public email: string,
              public password: string) {
  }
}

describe('Login Form', () => {

  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // We add the required ReactiveFormsModule and FormsModule to our test beds imports list.
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [LoginFormComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginFormComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    // We manually trigger the ngOnInit lifecycle function on our component, Angular won’t call this for us.
    component.ngOnInit();
  });

  // We can easily check to see if the form is valid by checking the value of component.form.valid.
  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    // We grab a reference to the actual field itself from the form.controls property.
    let email = component.form.controls['email'];
    // Just like the form we can check if the field is valid through email.valid.
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    // expect(errors['pattern']).toBeTruthy();

    // Set email to something correct
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('submitting a form emits a user', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['password'].setValue("123456789");
    expect(component.form.valid).toBeTruthy();

    let user: User;
    // Subscribe to the Observable and store the user in a local variable.
    component.loggedIn.subscribe((value) => user = value);

    // Trigger the login function
    component.login();

    // Now we can check to make sure the emitted value is correct
    expect(user.email).toBe("test@test.com");
    expect(user.password).toBe("123456789");
  });
});
