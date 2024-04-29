import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartType } from 'chart.js';
import { AdminService } from 'src/app/admin.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
 
  displayedColumns: string[] = ['firstname', 'lastname', 'address','phonenumber', 'sectionname','coursename','registrationdate'];
  dataSource : any
  empdata:any

  //charts
 public pieChartType: ChartType = 'pie';
 public barChartType: ChartType = 'bar';
 pieChartData:any
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!:MatSort
constructor(public _adminService:AdminService){}


ngOnInit(){
  this._adminService.GetInstructorCount()
  this._adminService.GetStudentCount()
  this.GetStdInfo()

  setTimeout(
    ()=>{
      let arr:any=[this._adminService.instructorCount , this._adminService.studentCount]
      let catarr =["Trainers" , "Students"]
      this.pieChartData ={
        labels:catarr,
        datasets:[
          {data:arr,
          backgroundColor: ["#797EF6", "#1AA7EC"],
          barThickness: 220,
        },
        ],

      };
    },1000);




}

GetStdInfo(){
this._adminService.GetStdSectionsInfo().subscribe(result =>{
  this.empdata = result ;
  this.dataSource = new MatTableDataSource(this.empdata)
  this.dataSource.paginator = this.paginator
  this.dataSource.sort = this.sort
})
}
Filterchange(event :Event){
const filtervalue =(event.target as HTMLInputElement).value ;
this.dataSource.filter = filtervalue 
}



}
