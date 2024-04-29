import { Component , ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent {

  @ViewChild('createdilog') createprogrmDialog: any;
  @ViewChild('confirmDeleteProgram') confirmdeletdiolg: any;
  @ViewChild('updatedilog') updateprogramdiolg: any;


  constructor (public _adminService :AdminService,public dialog:MatDialog)
  {
  
  }

  createprogramform: FormGroup = new FormGroup(   //formgroup
  {
    trackname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    imagepath: new FormControl('' , Validators.required),
    description: new FormControl(),
    programperiod: new FormControl()

  }
)


Updateprogramform: FormGroup = new FormGroup(   //formgroup
  {
    trackname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    imagepath: new FormControl(),
    description: new FormControl(),
    programperiod: new FormControl(),
    programid : new FormControl() ,
    batches :  new FormControl(),
    courses : new FormControl()

  }
)


ngOnInit() {

  this._adminService.GetAllPrograms();

}


DeletProgram(id :number){
  this._adminService.DeletProgram(id);


}


CreateProgram(){
  console.log (this.createprogramform.value);



  this._adminService.CreateProgram(this.createprogramform.value);


}

Updateprogram(){
  this._adminService.UpdateProgram(this.Updateprogramform.value)
}



opencreatedilog(){

this.dialog.open(this.createprogrmDialog , {
width: "370px",
    height: "370px",

    enterAnimationDuration: 1000,
    exitAnimationDuration: 1000



})

}

openconfirmdilog(id: number) {
  var dialog = this.dialog.open(this.confirmdeletdiolg);
  dialog.afterClosed().subscribe(
    (result) => {
      if(result!=undefined)
      if(result=='yes')
        this.DeletProgram(id);
      }
  )
}

openupdatedilog(pr : any){
  this.Updateprogramform.setValue(pr)
this.dialog.open(this.updateprogramdiolg,   {
  width: "370px",
      height: "400px",
      enterAnimationDuration: 1000,
      exitAnimationDuration: 1000
 })
}


UploadProgramImage( event : any){
  console.log(event);
 let file =  event.target.files[0]
 let form = new FormData()
 form.append('file' , file)
 this._adminService.UploadImage(form)


}   

}
