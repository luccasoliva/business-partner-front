import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./interfaces/User";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();
  private baseUrl: string = 'http://localhost:8080/api/v1/owner';

  constructor(    private http: HttpClient,
                  private router: Router
  ) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  login(user: User): Observable<{accessToken: string}> {
    return this.http.post<{accessToken: string}>(`${this.baseUrl}/login`, user)
      .pipe(
        tap((response) => {
          this.storageToken(response.accessToken)
        })
      )
  }

  logout(): void {
    this.removeToken()
    this.router.navigateByUrl('/login')
  }

  storageToken(token: string): void {
    localStorage.setItem('accessToken', token)
  }

  removeToken(): void {
    localStorage.removeItem('accessToken')
  }

  recoverToken(): string | null {
    return localStorage.getItem('accessToken')
  }

  logged(): boolean {
    const token = this.recoverToken()
    if (token == null) {
      return false
    }
    return !this.helper.isTokenExpired(token)
  }

  checkTokenExpiration(): void {
    const token = this.recoverToken();
    if (token && this.helper.isTokenExpired(token)) {
      this.logout();
    }
  }
}
