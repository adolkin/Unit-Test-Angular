import { AuthService } from './classes-pipes/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DefaultPipe } from './classes-pipes/default.pipe';
import { LoginComponent } from './mocks-spies/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
