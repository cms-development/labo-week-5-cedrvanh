import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const body = {
      grant_type: 'password',
      client_id: '0da7bd8c-0f28-4afe-8ff7-e2a7f65b7f4d',
      client_secret: 'secret',
      username: username,
      password: password,
    };

    const bodyData = this.handleFormData(body);

    return this.http.post<User>('http://localhost:80/oauth/token', bodyData)
      .pipe(map(user => {
        if (user && user.access_token) {
          console.log('Setting access token..');
          this.setTokens(user);
        }

        return user;
      }));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  refreshToken() {
    const body = {
      grant_type: 'refresh_token',
      client_id: '0da7bd8c-0f28-4afe-8ff7-e2a7f65b7f4d',
      client_secret: 'secret',
      refresh_token: this.getRefreshToken()
    };

    const bodyData = this.handleFormData(body);

    return this.http.post<User>('http://localhost:80/oauth/token', bodyData);
  }

  setTokens(user: User): void {
    localStorage.setItem('access_token', user.access_token);
    localStorage.setItem('refresh_token', user.refresh_token);
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  handleFormData(obj: Object): FormData {
    const data = new FormData();
    Object.keys(obj).forEach(key => data.append(key, obj[key]));
    return data;
  }
}
