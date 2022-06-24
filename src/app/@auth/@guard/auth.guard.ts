import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * A router guard on authentication
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  /**
   * Returns the observable from authservice that says if a user is authenticated
   * @returns
   */
  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }
}
