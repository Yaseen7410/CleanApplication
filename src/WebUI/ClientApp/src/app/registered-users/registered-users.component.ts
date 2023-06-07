import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { AddEmployeeCommand, DeleteUserCommand, EmployeeClient, GridQuery, RegisterClient, RolesClient } from '../SoftMash-Api';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { EmpDTO } from '../SoftMash-Api';


@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.scss'],
})
export class RegisteredUsersComponent implements OnInit {
  dataSource = new MatTableDataSource<EmpDTO>();
editdata:EmpDTO|any ;
  rol:any= localStorage.getItem('role');
  constructor(private get: RegisterClient,private role:RolesClient, private toastr: ToastrService,private getall:EmployeeClient) {
  }

  ngOnInit(): void {
    this.getAll();
    this.getRoles();
    this.getDepartments();
   this. getDesignations();
  }
  rolesData: any = [];
  getRoles(): void {
    this.role.rolesQuery(this.query).subscribe((response) => {
      if (response.data) {
        this.rolesData = response.data;
      } else {
        this.rolesData = [];
      }
      console.log(this.rolesData);
    });
  }
  Dept:any=[];
  getDepartments():void{
    debugger;
    this.getall.getDepartments(this.query).subscribe((response) => {
      if (response.data) {
        this.Dept = response.data;
        console.log(this.Dept);
      } else {
        this.Dept = [];
      }
      console.log(this.Dept);
    });
  }
  Desg:any=[];
  getDesignations():void{
    debugger;
    this.getall.getDesignations(this.query).subscribe((response)=>{
      if(response.data){
        this.Desg=response.data;
console.log(this.Desg);
      }
    })
  }
  query: GridQuery = <GridQuery>{
    page: 1,
    pageSize: 20,
    filter: {},
    ascending: true,
    sort: 'CreatedOn',
  };
 
  displayedColumns: string[] = ['name', 'email', 'address', 'phoneNo','roles','Actions'];
  getAll(): void {
    this.get.registerQuery(this.query).subscribe((response) => {
      debugger;
      if (response.data) {
        console.log(response);
        this.dataSource.data = response.data;
        this.editdata=response.data;
      } else {
        this.dataSource.data = [];
      }
      console.log(this.dataSource.data);
    });
  }

  

  EditClick(edit:EmpDTO){
  debugger;
  this.editdata=edit
}
  
  exportActive:boolean = false;
  @ViewChild('TABLE') table: ElementRef | any;
  export(){
    debugger;
    this.exportActive = true;
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    ws['!cols'] = [];
    ws['!cols'][5] = { hidden: true };
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }
 
  UpdateClick(){
    debugger;
    if(this.editdata.rolesId==2){
      this.getall.addEmployees(this.editdata).subscribe((response)=>{
        this.get.updateUser(this.editdata).subscribe((res)=>{
          console.log(res)
        })
      console.log(response);
      this.success();
      location.reload(); 
      //this.getAll();
      },(error)=>{
        console.log(error);
      })
    }
    else{
      this.get.updateUser(this.editdata).subscribe((response)=>{
      //console.log(response);
      debugger;
      this.success();
      //this.getAll();
      location.reload();
    
    })
  }
  }
 
  success(): void {
    this.toastr.success('User updated successfully');
  }
  succ(): void {
    this.toastr.success('user Deleted successfully');
  }
  DeleteClick(us:any){
    debugger;
this.get.deleteUser(<DeleteUserCommand>{
  usrId:us
}).subscribe((response)=>{
  console.log(us);
  this.succ();
  this.getAll();
})
}
 
}
