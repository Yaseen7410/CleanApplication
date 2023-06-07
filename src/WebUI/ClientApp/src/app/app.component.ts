import { AuthenticationService } from './ApiAuthorization/AuthorizeService';
import { Component,ViewChild,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeClient, GetByIdEmployee, GetEMPDTO, LoginDTO } from './SoftMash-Api';
import { NavbarServiceService } from './navbar-service.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
  title = 'ClientApp';
  currentUser: LoginDTO | any;
  name1:any
  email:any
  roleid:any
  collapsedNav: boolean|any;
  mobileQuery: MediaQueryList;
 img:any;

  private _mobileQueryListener: () => void;
  isSidebarOpen: boolean|any;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public nav: NavbarServiceService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private emp: EmployeeClient
  ) 
  {
      this.mobileQuery = media.matchMedia('(max-width:600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    }
    ngOnInit(): void {
      this.getData();
    this.roleid=localStorage.getItem('role')
    this.email=localStorage.getItem('email')
    this.authenticationService.currentUser.subscribe(
    (x) => (this.currentUser = x) );
      this.name1 = localStorage.getItem('currentUser');

    }
    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }
    @ViewChild('sidenav') sidenav: MatSidenavModule | any;
    toggleSidenav() {
      this.sidenav.toggle();
    }

   
  logout() {
    this.authenticationService.logout();
    //this.name1='';
    this.router.navigate(['/login']);
  }

  email1=localStorage.getItem('email')
  getData():void{
    debugger;
    this.emp.employeesQueryByEmail(<GetByIdEmployee>{
      email:this.email1
     }).subscribe((response:any)=>{
       if(response){
        console.log(response);
       this.img=response.image;
       console.log(this.img)
       }
     });
  }
  toggleSidebar() {

    this.isSidebarOpen = !this.isSidebarOpen;

  }
}
