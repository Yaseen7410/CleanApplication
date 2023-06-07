import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { AuthenticationService } from './ApiAuthorization/AuthorizeService';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private logg: AuthenticationService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    debugger;
    const currentUser = this.logg.currentUserValue;
    const role = localStorage.getItem('role');
    if (role==='1'||role==='2') {
      return true;
    } else {
      alert('You are Not Authorized');
      this.router.navigate(['/home']);
      return false;
    }
  }
}


     
