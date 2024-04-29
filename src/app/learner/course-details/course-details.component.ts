import { Component } from '@angular/core';
import { LearnerService } from 'src/app/learner.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {


  constructor (public _learnerService : LearnerService , private route: ActivatedRoute){

  }
// ngOnInit(){

// }

// ngOnInit(courseId:number){
//   this._learnerService.GetCourseById(courseId)
// }
courseId: number = 0
ngOnInit(){
  this.route.paramMap.subscribe(
param => this.courseId = Number(param.get('courseId'))
  )
  this._learnerService.GetCourseById(this.courseId)
}
}

  // ngOnInit(){
  //   this.retrieveCourseById();
  //   }
  //   retrieveCourseById() {
  //     this._learnerService.GetCourseById(this.courseId).subscribe(
  //       (data: any) => {
  //         this.courseData = data;
          
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   }


