import { JsonpModule, Jsonp, BaseRequestOptions, Response, ResponseOptions, Http } from "@angular/http";
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend } from "@angular/http/testing";
import { SearchService } from './search.service';

describe('SearchService', () => {

  let service: SearchService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JsonpModule],
      providers: [
        SearchService,
        MockBackend,
        BaseRequestOptions,
        {
          // We are configuring a dependency for the token Http
          provide: Jsonp,
          // The injector calls this function in order to return a new instance of the Http class. 
          // The arguments to the useFactory function are themselves injected in.
          useFactory: (backend, options) => new Jsonp(backend, options),
          // We define the dependencies to our useFactory function via the deps property.
          deps: [MockBackend, BaseRequestOptions]

          // The above configuration ensures that the Jsonp service is constructed using the MockBackend 
          // so we can control it later on in testing.
        }
      ]
    });

    // Get the MockBackend
    backend = TestBed.get(MockBackend);

    // Returns a service with the MockBackend so we can test with dummy responses
    service = TestBed.get(SearchService);
  });

  // Just by using the MockBackend instead of the real Backend 
  // we have stopped the tests from triggering real http requests from being sent out.
  it('search should return SearchItems', fakeAsync(() => {
    // 	We create some fake data we want the API to response with.
    let response = {
      "resultCount": 1,
      "results": [
        {
          "artistId": 78500,
          "artistName": "U2",
          "trackName": "Beautiful Day",
          "artworkUrl60": "image.jpg",
        }]
    };

    // The mock backend connections property is an observable that emits an connection every time an API request is made.
    // When the request subscribes for results on a connection, return a fake response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        // For every connection that is requested we tell it to mockRespond with our dummy data.
        body: JSON.stringify(response)
      }));
    });

    // Perform a request and make sure we get the response we expect
    service.search("U2"); // We make the asynchronous call to service.search(…​)
    tick(); // 	We issue a tick() which blocks execution and waits for all the pending promises to be resolved.

    // We now know that the service has received and parsed the response so we can write some expectations.
    expect(service.results.length).toBe(1);
    expect(service.results[0].artist).toBe("U2");
    expect(service.results[0].name).toBe("Beautiful Day");
    expect(service.results[0].thumbnail).toBe("image.jpg");
    // expect(service.results[0].artistId).toBe(78500");
  }));

});
