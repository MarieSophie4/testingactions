import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { RoutesEnum } from 'src/app/@shared/routes.enum';

/**
 * A router guard checking the cif value in the activated route
 */
@Injectable({
  providedIn: 'root'
})
export class CifGuard implements CanActivate {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  /**
   * Returns a boolean that is true when a cif is present
   * and will return to search page when no cif is present
   * @returns
   */
  canActivate(): boolean {
    const routerData : Record<string, string> = this.activatedRoute.snapshot.data;
    if(routerData['cif']){
      return true;
    } else {
      void this.router.navigateByUrl(RoutesEnum.SEARCH);
      return false;
    }
  }
}
