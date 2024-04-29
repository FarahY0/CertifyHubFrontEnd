import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartType } from 'chart.js';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
 
  displayedColumns: string[] = ['firstname', 'lastname', 'address','phonenumber', 'dateofbirth' ,'actions'];
  dataSource : any
  empdata:any=[{}];

  @ViewChild('ConfirmationDialog') ConfirmDeleteDialog : any
 @ViewChild('UpdateDialog') UpdateUserDialog: any

 @ViewChild(MatPaginator) paginator!:MatPaginator
 @ViewChild(MatSort) sort!:MatSort
  constructor(public _adminService : AdminService  , public dialog : MatDialog ,  private route: ActivatedRoute){

  }

  UpdateUserForm : FormGroup = new FormGroup(
    {
      userid:new FormControl('',[Validators.required]),
      firstname : new FormControl('', [Validators.required]),
      lastname: new FormControl('' , [Validators.required]),
      dateofbirth: new FormControl('' , [Validators.required]),
      imagepath: new FormControl('' , [Validators.required]),
      address: new FormControl('' , [Validators.required]),
      phonenumber: new FormControl('' , [Validators.required]),
      registrationdate: new FormControl('' , [Validators.required]),
      isactive: new FormControl('' , [Validators.required]),
      attendances: new FormControl('' , [Validators.required]),
      certificates: new FormControl('' , [Validators.required]),
      cvs: new FormControl('' , [Validators.required]),
      grades: new FormControl('' , [Validators.required]),
      logins: new FormControl('' , [Validators.required]),
      messageReceivers: new FormControl('' , [Validators.required]),
      messageSenders: new FormControl('' , [Validators.required]),
      pollresponses: new FormControl('' , [Validators.required]),
      sections: new FormControl('' , [Validators.required]),
      stdsections: new FormControl('' , [Validators.required]),
      testimonials: new FormControl('' , [Validators.required]),
      usersolutions: new FormControl('' , [Validators.required]),
     
    }
  )
  ngOnInit(){
    this.GetAll();
    // this._adminService.GetAllUsers()
  }
  DeleteUser(id : number){
    this._adminService.DeleteUser(id )
    }
  
    UpdateUser(){
      this._adminService.UpdateUser(this.UpdateUserForm.value)
    }
 
    OpenConfirmationDialog(userId :number){
      var dialog = this.dialog.open(this.ConfirmDeleteDialog)
      dialog.afterClosed().subscribe(
        
        (result)=>{
          if(result == 'yes')
          this.DeleteUser(userId);}
          )
    }
    OpenUpdateDialog(element :any ){
      console.log(element)
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '40%';
      this.UpdateUserForm.setValue(element)
    this.dialog.open(this.UpdateUserDialog , dialogConfig)
    }


    GetAll(){
      this._adminService.GetAllUsers().subscribe(
        result =>{
          this.empdata = result ;
          this.dataSource = new MatTableDataSource(this.empdata)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        }
      )
    }
    Filterchange(event :Event){
      const filtervalue =(event.target as HTMLInputElement).value ;
      this.dataSource.filter = filtervalue 
      }
}
