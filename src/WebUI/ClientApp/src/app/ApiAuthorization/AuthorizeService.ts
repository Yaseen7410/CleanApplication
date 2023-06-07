import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountClient, LoginCommand, LoginDTO } from '../SoftMash-Api';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LoginDTO> | any;
  public currentUser: Observable<LoginDTO>;
  private isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private empClient: AccountClient,
    private toastr: ToastrService,
    private jwt: JwtHelperService
  ) {
    this.currentUserSubject = new BehaviorSubject<LoginDTO>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): LoginDTO {
    return this.currentUserSubject.value;
  }
  login(email: string, password: string) {
    return this.empClient
      .loginRequest(<LoginCommand>{
        email,
        password,
      })
      .pipe(
        map((user) => {
          debugger;
          console.log(user);
          if (user.succeeded == true) {
           const role = user.lists.role;
            const token = user.lists.token;
            const name= user.lists.name;
            const email =user.lists.email;
            localStorage.setItem('currentUser', JSON.stringify( name));
            localStorage.setItem('token', token );
            localStorage.setItem('role',role);
            localStorage.setItem('email',email);
            //console.log(name);
           // localStorage.setItem('currentUser', JSON.stringify(user.lists.token));
           // localStorage.setItem('currentUser', JSON.stringify(user.lists.role));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }
  logout() {
    // remove user from local storage to log user out
    this.logouttoast();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    this.currentUserSubject.next(null);
  }
  logouttoast(): void {
    this.toastr.error('User Logedout Successfully');
  }
  isAuthenticatedUser(): boolean {
    debugger;
    if (this.currentUser) {
      return false;
    } else {
      return true;
    }
  }
}
