import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService, private stateStorageService: StateStorageService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: null,
        complete: null,
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 && err.url && !err.url.includes('api/account')) {
              this.loginService.logout();
              this.router.navigate(['login']);
            }
          }
        }
      })
    );
  }
}
