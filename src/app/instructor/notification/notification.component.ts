import { Component, ViewChild } from '@angular/core';
import { InstructorService } from 'src/app/instructor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
 @ViewChild('CreateDialog') CreateNotificationDialog : any
 @ViewChild('ConfirmationDialog') ConfirmDeleteDialog : any
@ViewChild('UpdateDialog') UpdateNotificationDialog: any
constructor(public _instructorService : InstructorService , public dialog : MatDialog ,  private route: ActivatedRoute){

}
CreateNotificationForm : FormGroup = new FormGroup(
  {
    notificationtext : new FormControl('', [Validators.required , Validators.minLength(2)]),
    notificationstartdate: new FormControl('' , [Validators.required]),
    notificationenddate: new FormControl('' , [Validators.required])
  }
)

UpdateNotificationForm : FormGroup = new FormGroup(
  {
    notificationid :new FormControl(),
    notificationtext : new FormControl('', [Validators.required , Validators.minLength(2)]),
     sectionid : new FormControl('', [Validators.required]),
    notificationstartdate: new FormControl('' , [Validators.required]),
    notificationenddate: new FormControl('' , [Validators.required]),
     section:new FormControl()
  }
)

sectionId: number = 0
ngOnInit(){
  this.route.paramMap.subscribe(
    param => this.sectionId = Number(param.get('sectionId'))
      )
      // this._learnerService.GetCourseById(this.courseId)
this._instructorService.GetNotificationsBySectionId(this.sectionId)
this._instructorService.GetAllSections()
}
DeleteNotification(id : number ,sectionId:any){
this._instructorService.DeleteNotification(id , sectionId)
}
CreateNotification(sectionId: any){
  console.log(sectionId);
  this._instructorService.CreateNotification(this.CreateNotificationForm.value  , sectionId)
 
}
OpenCreateDialog(){
  this.dialog.open(this.CreateNotificationDialog , {
    width:'500px',
    height:'600px',
    enterAnimationDuration:800,
    exitAnimationDuration:800
    // panelClass: 'custom-dialog'
  })
}
OpenConfirmationDialog(id :number ,sectionId:any){
  var dialog = this.dialog.open(this.ConfirmDeleteDialog)
  dialog.afterClosed().subscribe(
    
    (result)=>{
      if(result == 'yes')
      this.DeleteNotification(id , sectionId);}
      )
}
OpenUpdateDialog(n :any ){
  console.log(n)
  this.UpdateNotificationForm.setValue(n)
this.dialog.open(this.UpdateNotificationDialog)
}
UpdateNotification(sectionId: any){
  console.log(sectionId);
  this._instructorService.UpdateNotification(this.UpdateNotificationForm.value , sectionId)
}
}
