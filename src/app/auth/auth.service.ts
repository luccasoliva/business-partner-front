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

  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }
  login(user: User): Observable<{accessToken: string}> {
    return this.http.post<{accessToken: string}>(`${this.baseUrl}/login`, user)
      .pipe(
        tap((response) => {
          this.armazenarToken(response.accessToken)
        })
      )
  }

  logout(): void {
    this.removerToken()
    this.router.navigateByUrl('/login')
  }

  armazenarToken(token: string): void {
    localStorage.setItem('accessToken', token)
  }

  removerToken(): void {
    localStorage.removeItem('accessToken')
  }

  recuperarToken(): string | null {
    return localStorage.getItem('accessToken')
  }

  logado(): boolean {
    const token = this.recuperarToken()
    if (token == null) {
      return false
    }
    return !this.helper.isTokenExpired(token)
  }
}
