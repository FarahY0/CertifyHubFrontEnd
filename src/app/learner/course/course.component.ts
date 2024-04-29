import { Component, ViewChild, numberAttribute } from '@angular/core';
import { LearnerService } from 'src/app/learner.service';
import{MatDialog}from '@angular/material/dialog';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {

// @ViewChild('CourseDetails') DisplayCourseDetails : any
constructor (public _learnerService : LearnerService){

}
ngOnInit(){
this._learnerService.GetAllCoursesByUserId();
}


// openCourseDialog(id : number){
//  var dialog= this.dialog.open(this.DisplayCourseDetails)
//  dialog.afterOpened().subscribe(
//   ()=>{
//     this.GetCourseById(id);
//   }

//  )
// }

}
