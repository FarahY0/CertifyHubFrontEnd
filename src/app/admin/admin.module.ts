import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AdminService } from '../admin.service';
import { CourseComponent } from './course/course.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { UserComponent } from './user/user.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ProgramComponent } from './program/program.component';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    CourseComponent,
    CoursedetailsComponent,
    UserComponent,
    AdduserComponent,
    ProgramComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers:[
    AdminService
  ]
})
export class AdminModule { }
