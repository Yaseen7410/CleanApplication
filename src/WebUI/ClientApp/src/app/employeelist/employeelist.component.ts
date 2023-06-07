import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Department, Designations, EmpDTO, EmployeeClient, GetByIdEmployee, GridQuery } from '../SoftMash-Api';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss'],
})
export class EmployeelistComponent implements OnInit {
  empdto: EmpDTO[] = [];
  dataSource = new MatTableDataSource<any>();
  //dataSources:any = new MatTableDataSource<EmpDTO>();
  totalRecords:number=0;

  constructor(private emp: EmployeeClient) {
  
  }
AllData:any={};
  displayedColumns: string[] = ['name', 'address', 'phone','salary','department','designation','actions'];
  @ViewChild(MatPaginator)matPaginator!:MatPaginator
  ngOnInit(): void {
    this.getData();
    this.dataSource.paginator=this.matPaginator
    this.query={...this.query,...this.init}
  }

  query: GridQuery = <GridQuery>{
    page: 1,
    pageSize: 5,
    filter: {},
    ascending: true,
    sort: 'CreatedOn',
  };
 
  init:any={
    filter: {},
    ascending: true,
    sort: 'CreatedOn',
  };
  onSelection(event:any):void{
debugger;
this.query={...this.query,...event};
this.query.page=event.pageIndex +1 ;
this.query.pageSize=event.pageSize;
this.getData();
}
rolID=localStorage.getItem('role')


email=localStorage.getItem('email')
// id:any= Number(this.id1);

  getData(): void {
    debugger;
    if(this.rolID=='2'){
      this.emp.employeesQueryByEmail(<GetByIdEmployee>{
       email:this.email
      }).subscribe((response)=>{
        if(response){
         // this.dataSource=response
       // console.log(response)
        this.AllData=response
        this.dataSource.data=this.AllData
        console.log(this.dataSource.data)
        
        }
      });
    }else{
      this.emp.employeesQuery(this.query).subscribe((response) => {
        if (response.data) {
          this.dataSource.data = response.data;
          this.totalRecords=response.total!==undefined?response.total:0;
        } else {
          this.dataSource.data = [];
        }
        console.log(this.dataSource.data);
      });
    }
   
  }
  //@ViewChild('TABLE') table: ElementRef | any;
  exportActive:boolean = false;
  query1: GridQuery = <GridQuery>{
    page: 1,
    pageSize: 100,
    filter: {},
    ascending: true,
    sort: 'CreatedOn',
  };
  det:any
  export():void{
    debugger;
    this.emp.employeesQuery(this.query1).subscribe((response)=>{
      var dat:any=response.data
    console.log(dat);
    this.det=response.data?.map((item)=>{
      const {department,designations,...rest}=item;
    const dep =department ? department.name : '';
    const desgs = designations ? designations.name : '';
    return {...rest,Department:dep,Designations:desgs}
    })
    this.exportActive = true;
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.det);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  });
  
  }
  
  addEmployee() {}
  editEmployee(emp: any) {}
  deleteEmployee(id: number) {}
 
}
