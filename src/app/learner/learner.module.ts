import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnerRoutingModule } from './learner-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CourseComponent } from './course/course.component';
import { LearnerService } from '../learner.service';
import { CourseDetailsComponent } from './course-details/course-details.component';




@NgModule({
  declarations: [
    StudentDashboardComponent,
    CourseComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    LearnerRoutingModule,
    SharedModule
  ],
  providers:[
    LearnerService
  ]

})
export class LearnerModule { }
