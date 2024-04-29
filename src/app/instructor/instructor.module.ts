import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { MessageComponent } from './message/message.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationComponent } from './notification/notification.component';
import { InstructorService } from '../instructor.service';
import { AttendanceComponent } from './attendance/attendance.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { SectionDetailsComponent } from './section-details/section-details.component';
import { ReporttComponent } from './reportt/reportt.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { QuestionsComponent } from './questions/questions.component';
import { AnswerComponent } from './answer/answer.component';
import { MaterialComponent } from './material/material.component';


@NgModule({
  declarations: [
    MessageComponent,
    NotificationComponent,
    AttendanceComponent,
    InstructorDashboardComponent,
    SectionDetailsComponent,
    ReporttComponent,
    AssesmentComponent,
    QuestionsComponent,
    AnswerComponent,
    MaterialComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    SharedModule
  ],
  providers:[
    InstructorService
    
  ]
})
export class InstructorModule { }
