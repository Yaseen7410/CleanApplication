import { EmpDTO, UpdateEmployeeCommand } from './../SoftMash-Api';
import { Component, OnInit } from '@angular/core';
import { EmployeeClient, GetByIdEmployee, RegUpdateDto } from '../SoftMash-Api';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
 data:any=[];
 img:EmpDTO|any={
  Image:'',
 }
  constructor(private emp: EmployeeClient) { }

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
}
selectedImage:any;
imageBase64:any;
uploadchng(event: any) {
    debugger;

    this.selectedImage = event.target.files[0];

    if (this.selectedImage) {

      const reader = new FileReader();

      reader.onload = () => {

        this.imageBase64 = reader.result as string;

        this.img.Image = this.imageBase64;

      };

      reader.readAsDataURL(this.selectedImage);

    } else {

      this.img.Image = '';

    }

  }
  EditClick(edit:EmpDTO){
    debugger;
    this.data=edit
  }
uploadImage():void{
  debugger;
  this.emp.updateEmployees(<UpdateEmployeeCommand>{
    image:this.img.Image,
    id:this.data.id,
    name:this.data.name,
    address:this.data.address,
    email:this.data.email,
    salary:this.data.salary,
    departmentId:this.data.departmentId,
    designationId:this.data.designationId,  
    rolesId:this.data.rolesId
  }).subscribe((response)=>{
    console.log(response);
    alert("Image Saved")
    
  })
}
} 
