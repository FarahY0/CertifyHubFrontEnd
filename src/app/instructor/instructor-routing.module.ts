import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { SectionDetailsComponent } from './section-details/section-details.component';
import { ReporttComponent } from './reportt/reportt.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { QuestionsComponent } from './questions/questions.component';
import { AnswerComponent } from './answer/answer.component';
import { MaterialComponent } from './material/material.component';

const routes: Routes = [
{
    path:'message',
component:MessageComponent,
},
{
  path:'notification/:sectionId',
component:NotificationComponent,
}, 
{
  path:'attendance/:secId',
component:AttendanceComponent,
},
{
  path:'index',
component:InstructorDashboardComponent,
},  
{
  path:'SectionDetails/:sectionId',
component:SectionDetailsComponent,
},
{
  path:'Report/:SectionId',
  component:ReporttComponent ,
},
{
  path:'Assesments/:SectionId',
  component:AssesmentComponent ,
},
{path:'Questions/:AssessmentId',
component:QuestionsComponent ,
},
{path:'Answer/:QuestionId',
component:AnswerComponent ,
},
{path:'Material/:SectionId',
component:MaterialComponent ,
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
