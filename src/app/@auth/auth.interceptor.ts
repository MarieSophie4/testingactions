import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * TODO : intercept auhtentication token from the authservice
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  /**
   * Intercepting the autentication token
   * @param req the http request of the user
   * @param next TODO
   * @returns
   */
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.auth.accesToken$.pipe(
      mergeMap(token => {
        const tokenReq = req.clone({
          setHeaders: { authorization: `Bearer ${token}` }
        });
        return next.handle(tokenReq);
      }),
      tap(
        (error) => {
          // todo relaunch authentication once?
          if (error instanceof HttpErrorResponse && error.status === 401) {
            console.error('unauthorized');
          }
          return of(false);
        }),
      catchError(err => {
        console.error('error', err);
        return throwError(err);
      } )
    );
  }
}
