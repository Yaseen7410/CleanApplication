import { Component, OnInit } from '@angular/core';
import { EmployeeClient, GetByIdEmployee } from '../SoftMash-Api';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
data:any=[];
  constructor(private emp:EmployeeClient) { }

  ngOnInit(): void {
    this.getData();
  }
  email=localStorage.getItem('email')
  getData():void{
    debugger;
    this.emp.employeesQueryByEmail(<GetByIdEmployee>{
      email:this.email
     }).subscribe((response)=>{
       if(response){
        console.log(response);
        this.data=response;
        console.log(this.data);
        
       }
     });
}}
