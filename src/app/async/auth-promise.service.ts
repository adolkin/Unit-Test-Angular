import { Injectable } from '@angular/core';

@Injectable()
export class AuthPromiseService {
  
  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!localStorage.getItem('token'));
  }
}
