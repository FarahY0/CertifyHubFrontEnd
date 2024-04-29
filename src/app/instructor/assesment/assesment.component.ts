import { Component , ViewChild} from '@angular/core';
import { InstructorService } from 'src/app/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.css']
})
export class AssesmentComponent {
  constructor(public _instructorService :InstructorService,private route: ActivatedRoute,public dialog:MatDialog,private toastr: ToastrService,public location: Location)
  {
   
  }
  SectionId: number = 0
ngOnInit(){
  this.route.paramMap.subscribe(param => this.SectionId = Number(param.get('SectionId'))
  )
  this._instructorService.GetAssessmentsBySectionId(this.SectionId);
  this._instructorService.GetAllSections();
}

CreateAssessmentForm : FormGroup=new FormGroup({
  title :new FormControl('',[Validators.required,Validators.minLength(2)]),
  description:new FormControl('',[Validators.required]),
  assessmenttype:new FormControl('',[Validators.required]),
  startdate:new FormControl('',[Validators.required]),
  enddate:new FormControl('',[Validators.required]),
  starttime:new FormControl('',[Validators.required]),
  endtime:new FormControl('',[Validators.required]),
  assessmentscore:new FormControl('',[Validators.required]),
  attachfile:new FormControl()

})
@ViewChild('CreateDialog')CreateAssessmentDialog:any
OpenAssessmentDialog(){
  this.dialog.open(this.CreateAssessmentDialog,{
    width:'500px',
    height:'600px',
    enterAnimationDuration:1000,
    exitAnimationDuration:1000
  })

}

UpdateAssessmentForm : FormGroup=new FormGroup({
  assessmentid:new FormControl(),
  title :new FormControl('',[Validators.required]),
  description:new FormControl('',[Validators.required]),
  assessmenttype:new FormControl('',[Validators.required]),
  startdate:new FormControl('',[Validators.required]),
  enddate:new FormControl('',[Validators.required]),
  starttime:new FormControl('',[Validators.required]),
  endtime:new FormControl('',[Validators.required]),
  assessmentscore:new FormControl('',[Validators.required]),
  attachfile:new FormControl(),
  sectionid:new FormControl(),
  section:new FormControl(),
  grades:new FormControl(),
  questions:new FormControl(),
  usersolutions:new FormControl()

})
@ViewChild('UpdateDialog')UpdateAssessmentDialog:any
OpenUpdateDialog(assessment:any){
this.UpdateAssessmentForm.setValue(assessment)
  this.dialog.open(this.UpdateAssessmentDialog,{
    width:'500px',
    height:'600px',
    enterAnimationDuration:1000,
    exitAnimationDuration:1000
  })
}


UpdateAssessment(){
  const totalScore = this.UpdateAssessmentForm.controls['assessmentscore'].value;
  if (totalScore > 100) {
    this.toastr.error('Cannot update assessment. Total score exceeds 100');
  } else {
  console.log(this.UpdateAssessmentForm.value);

  const [hours, minutes] = this.UpdateAssessmentForm.get('starttime')?.value.split(':').map(Number);
  const currentDate = new Date();
  currentDate.setHours(hours, minutes, 0, 0);      
// let formatedDate = formatDate(currentDate , 'yyyy-MM-dd HH:mm:ss','en-US')
const formattedDate = currentDate.toISOString();




  this.UpdateAssessmentForm.controls['starttime'].setValue(formattedDate)


const [hours1, minutes1] = this.UpdateAssessmentForm.get('endtime')?.value.split(':').map(Number);
  const currentDate1 = new Date();
  currentDate.setHours(hours1, minutes1, 0, 0);      
// let formatedDate = formatDate(currentDate , 'yyyy-MM-dd HH:mm:ss','en-US')
const formattedDate1 = currentDate1.toISOString();




  this.UpdateAssessmentForm.controls['endtime'].setValue(formattedDate1)

 
  console.log(this.UpdateAssessmentForm.value);



  this._instructorService.UpdateAssessment(this.UpdateAssessmentForm.value,this.SectionId);

  }
}

/*CreateAssessment(){
  console.log(this.CreateAssessmentForm.value)
  this._instructorService.CreateAssessment(this.CreateAssessmentForm.value);
}*/



CreateAssessment() {

  const totalScore = this.CreateAssessmentForm.controls['assessmentscore'].value;
  if (totalScore > 100) {
    this.toastr.success('Cannot create a new assessment. Total score exceeds 100');
  } else {
  
  console.log(this.CreateAssessmentForm.value);

    const [hours, minutes] = this.CreateAssessmentForm.get('starttime')?.value.split(':').map(Number);
    const currentDate = new Date();
    currentDate.setHours(hours, minutes, 0, 0);      
  // let formatedDate = formatDate(currentDate , 'yyyy-MM-dd HH:mm:ss','en-US')
  const formattedDate = currentDate.toISOString();




    this.CreateAssessmentForm.controls['starttime'].setValue(formattedDate)


 const [hours1, minutes1] = this.CreateAssessmentForm.get('endtime')?.value.split(':').map(Number);
    const currentDate1 = new Date();
    currentDate.setHours(hours1, minutes1, 0, 0);      
  // let formatedDate = formatDate(currentDate , 'yyyy-MM-dd HH:mm:ss','en-US')
  const formattedDate1 = currentDate1.toISOString();




    this.CreateAssessmentForm.controls['endtime'].setValue(formattedDate1)

   
    console.log(this.CreateAssessmentForm.value);
  

  this._instructorService.CreateAssessment(this.CreateAssessmentForm.value,this.SectionId);
  }


}

DeleteAssessment(assessmentId:number){
  this._instructorService.DeleteAssessment(assessmentId,this.SectionId);
}

@ViewChild('ConfirmationDialog')ConfirmDeleteDialog:any
OpenConfirmDialog(assessmentId:number){
  var dialog=this.dialog.open(this.ConfirmDeleteDialog)
  dialog.afterClosed().subscribe(
    (result)=>{
      if(result!=undefined)
      if(result=='yes')
      this.DeleteAssessment(assessmentId);
    }
  )
}
UploadAssessmentFile(event:any){
  let file=event.target.files[0]
  let form=new FormData()
  form.append('file',file)
  this._instructorService.UploadAssessmentFile(form,this.SectionId)
  }

  goBack() {
    this.location.back();
  }
}
