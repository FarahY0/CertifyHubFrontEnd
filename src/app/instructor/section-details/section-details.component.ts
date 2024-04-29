import { Component , ViewChild} from '@angular/core';
import { InstructorService } from 'src/app/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-section-details',
  templateUrl: './section-details.component.html',
  styleUrls: ['./section-details.component.css']
})
export class SectionDetailsComponent {
  @ViewChild('UpdateDialog') UpdateAttendanceDialog: any
  AttendanceForm : FormGroup = new FormGroup(
    {
      status : new FormControl('', [Validators.required]),
      dateofattendance: new FormControl('' , [Validators.required])

    }
  )

  constructor(public _instructorService:InstructorService , public dialog : MatDialog ,  private route: ActivatedRoute){}

  UpdateAttendanceForm : FormGroup = new FormGroup(
    {
      attendanceid :new FormControl(),
      dateofattendance : new FormControl('', [Validators.required , Validators.minLength(2)]),
      sectionid : new FormControl('', [Validators.required]),
      userid: new FormControl('' , [Validators.required]),
      status: new FormControl('' , [Validators.required]),
    }
  )
  sectionId: number = 0
  ngOnInit(){
    this.route.paramMap.subscribe(
  param => this.sectionId = Number(param.get('sectionId'))
    )
    this._instructorService.GetSectionById(this.sectionId)
   this._instructorService.GetUsersInSection(this.sectionId)
   this._instructorService.GetNotificationsBySectionId(this.sectionId)

  //  this._instructorService.GetNotificationByDate(this.sectionId)
  }
  GetUsersInSection(){
    this._instructorService.GetUsersInSection(this.AttendanceForm.value)
  }
  
  UpdateAttendance(){
    this._instructorService.UpdateAttendance(this.UpdateAttendanceForm.value)
  }


  saveAttendance() {
    if (this.AttendanceForm.valid) {
      const formData = this.AttendanceForm.value;
      
      this._instructorService.saveAttendanceData(formData).subscribe(
        (response) => {
          console.log('Attendance data saved successfully:', response);
          
        },
        (error) => {
          console.error('Error while saving attendance data:', error);
        }
      );
    }
  }


  students: any[] = [];
  updateAttendanceStatus() {
    console.log(this.students);
  }


}
