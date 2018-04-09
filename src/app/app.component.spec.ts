import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

import { AppComponent } from './app.component';
import { SearchComponent } from './routing/search/search.component';
import { HomeComponent } from './routing/home/home.component';
import { routes } from './app-routing.module';

describe('AppComponent and Routing', () => {

  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Testing routing we use the RouterTestingModule
      imports: [RouterTestingModule.withRoutes(routes)],
      // We import and declare our components in the test bed configuration.
      declarations: [
        HomeComponent,
        SearchComponent,
        AppComponent
      ]
    });

    // We grab a reference to the injected Router.
    router = TestBed.get(Router);

    fixture = TestBed.createComponent(AppComponent);

    //	This sets up the location change listener and performs the initial navigation.
    router.initialNavigation();
  });

  it('fakeAsync works', fakeAsync(() => {
    let promise = new Promise((resolve) => {
      setTimeout(resolve, 10)
    });
    let done = false;
    promise.then(() => done = true);
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    // We trigger the router to navigate to the empty path.
    router.navigate([''])
      .then(() => {
        expect(router.url).toBe('/home');
      })
  }));

  it('navigate to "search" takes you to /search', fakeAsync(() => {
    router.navigate(['/search'])
      .then(() => {
        expect(router.url).toBe('/search');
      })
  }));
});