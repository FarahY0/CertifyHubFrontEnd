import { Component } from '@angular/core';
import { InstructorService } from 'src/app/instructor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent {
 
  // status: string = ''; 
  // datesForThisWeek: Date[] = []; 
  sections: any[] = []; // Array to hold sections
  selectedSection: any;
  selectedDate: any;
  users: any[] = []; // Array to hold users
constructor(public _instructorService : InstructorService){

}





// isPresent(status: string): boolean {
//   return status.toLowerCase() === 'present';
// }


  ngOnInit(){
    // this.generateDatesForThisWeek();
    this._instructorService.GetAllAttendance();
    this._instructorService.GetStdSectionsBySectionId()
  }

  // generateDatesForThisWeek(): void {
  //   const currentDate = new Date();
  //   const currentDay = currentDate.getDay();
  //   const startDate = new Date(currentDate); 
  //   startDate.setDate(currentDate.getDate() - currentDay); 

  //   for (let i = 0; i < 7; i++) {
  //     const newDate = new Date(startDate);
  //     newDate.setDate(startDate.getDate() + i);
  //     this.datesForThisWeek.push(newDate);
  //   }
  // }





}
