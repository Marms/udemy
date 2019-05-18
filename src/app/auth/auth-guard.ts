import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService) {}

  canActivate(activeRouteSnap: ActivatedRouteSnapshot,
              routerStateSnap: RouterStateSnapshot) {
    return this.authSvc.isAuthentificated();
  }
}
