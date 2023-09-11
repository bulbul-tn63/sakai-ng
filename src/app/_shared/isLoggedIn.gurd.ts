import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';



@Injectable({ providedIn: 'root' })
export class IsLoggedInGuard {

  constructor(private localstorageService: LocalstorageService,protected router: Router,) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // if user is already logged in then redirect to home page
      if(this.localstorageService.isLoggedIn()){
        return true;
      }
      // if user is not logged in then redirect to login page
      this.router.navigate(['/auth/login']);
      return false;

  }
}