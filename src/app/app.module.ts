import { AuthService } from './classes-pipes/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DefaultPipe } from './classes-pipes/default.pipe';
import { LoginComponent } from './mocks-spies/login/login.component';
import { LoginPromiseComponent } from './async/login-promise/login-promise.component';
import { LoginInOutComponent } from './input-output/login-in-out/login-in-out.component';
import { HoverFocusDirective } from './directives/hover-focus.directive';
import { LoginFormComponent } from './reactive-form/login-form/login-form.component';
import { HomeComponent } from './routing/home/home.component';
import { SearchComponent } from './routing/search/search.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DefaultPipe,
    LoginComponent,
    LoginPromiseComponent,
    LoginInOutComponent,
    HoverFocusDirective,
    LoginFormComponent,
    HomeComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
