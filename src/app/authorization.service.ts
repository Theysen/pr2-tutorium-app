import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  login(name: string, password: string) {
    // call DB and reroute
  }

  constructor() { }
}
