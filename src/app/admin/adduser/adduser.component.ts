import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  constructor(public _adminService : AdminService  , private toastr: ToastrService , public dialog : MatDialog ,  private route: ActivatedRoute){

  }
  CreateUserForm : FormGroup = new FormGroup(
    {
      firstname : new FormControl('', [Validators.required]),
      lastname: new FormControl('' , [Validators.required]),
      dateofbirth: new FormControl('' , [Validators.required]),
      //  imagepath: new FormControl('' , [Validators.required]),
      address: new FormControl('' , [Validators.required]),
      phonenumber: new FormControl('' , [Validators.required])
    }
  )

  CreateUser(){
    this._adminService.CreateUser(this.CreateUserForm.value).subscribe(
      {
        next:()=>{
          this.toastr.toastrConfig.timeOut = 0;
               this.toastr.toastrConfig.closeButton = true;
               this.toastr.toastrConfig.tapToDismiss = false;
               this.toastr.toastrConfig.progressBar = false;
          
               this.toastr.info('Created', 'Success', {
                 closeButton: true,
                 disableTimeOut: true,
                 enableHtml: true
               });
         },
         error:err => {console.log("Error occured")}
      }
    )
  }



}
