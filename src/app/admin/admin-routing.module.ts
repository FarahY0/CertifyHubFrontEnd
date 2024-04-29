import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CourseComponent } from './course/course.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { UserComponent } from './user/user.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ProgramComponent } from './program/program.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
 {
  path:'index',
  component:AdminDashboardComponent,
 },
 {
  path:'course',
  component:CourseComponent ,
},
{
  path:'CourseDetails',
  component:CoursedetailsComponent ,
},
{
  path:'user',
  component:UserComponent ,
},
{
  path:'adduser',
  component:AdduserComponent,
},
{
  path:'program',
  component:ProgramComponent,
},
{
  path :'Report',
  component:ReportComponent
}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
