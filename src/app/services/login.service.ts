import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.urlAuth;
  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {

    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/auth/login`, {email, password}).pipe(tap((value) => {
      sessionStorage.setItem("auth-token", value.token)
      sessionStorage.setItem("username", value.name)
    }))
  }

  signup(name: string, email: string, password: string) {

    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/auth/register`, {name, email, password}).pipe(tap((value) => {
      sessionStorage.setItem("auth-token", value.token)
      sessionStorage.setItem("username", value.name)
    }))
  }
}
