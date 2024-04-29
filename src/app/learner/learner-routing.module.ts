import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CourseComponent } from './course/course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

const routes: Routes = [{
  path:'StudentDashboard',
  component:StudentDashboardComponent,
},
{
path:'course',
component:CourseComponent,
},
{
  path:'CourseDetails/:courseId',
  component:CourseDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnerRoutingModule { }
