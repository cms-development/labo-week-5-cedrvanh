import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const updatedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });

    return next.handle(updatedRequest).pipe(
      tap(
        succes => console.log(succes),
        error => {
          if (error instanceof HttpErrorResponse) {
            console.log(error);
            return this.handleError(request, next);
          }
        }
      )
    );
  }

  handleError(request: HttpRequest<any>, next: HttpHandler) {
    this.authService.refreshToken()
      .subscribe(user => {
        this.authService.setTokens(user);
        const token = this.authService.getToken();

        const updateRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

        return next.handle(updateRequest);
      }, error => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        return this.router.navigate(['login']);
      }
    );
  }

}
