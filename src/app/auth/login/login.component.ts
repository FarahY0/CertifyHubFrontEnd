import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin.service';
import { InstructorService } from 'src/app/instructor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor( public _adminService : AdminService ){}
loginForm : FormGroup = new FormGroup({
  username : new FormControl('',[Validators.required]),
  password : new FormControl('',[Validators.required])
})
Login(){
  console.log(this.loginForm.value);

this._adminService.Login(this.loginForm.value)
}
}
