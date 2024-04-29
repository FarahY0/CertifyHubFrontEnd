import { Component,ViewChild} from '@angular/core';
import { InstructorService } from 'src/app/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {
  constructor(public _instructorService :InstructorService,private route: ActivatedRoute,public dialog:MatDialog,public location: Location)
  {
   
  }
  AssessmentId: number = 0
  SectionId: number = 0
  QuestionId:number=0
ngOnInit(){
  this.route.paramMap.subscribe(param => this.AssessmentId = Number(param.get('AssessmentId'))
  )
  this._instructorService.GetQuestionsByAssessmentId(this.AssessmentId);
  this.route.paramMap.subscribe(param => this.SectionId = Number(param.get('SectionId'))
  )
  this._instructorService.GetAssessmentsBySectionId(this.SectionId);
  this.route.paramMap.subscribe(param => this.QuestionId = Number(param.get('QuestionId'))
  )
  this._instructorService.GetAnswerByQuestionId(this.QuestionId);
  this._instructorService.GetAllSections();
}
DeleteAnswer(answerId:number){
  this._instructorService.DeleteAnswer(answerId,this.QuestionId);
}


@ViewChild('ConfirmationDialog')ConfirmDeleteDialog:any
OpenConfirmDialog(answerId:number){
  var dialog=this.dialog.open(this.ConfirmDeleteDialog)
  dialog.afterClosed().subscribe(
    (result)=>{
      if(result!=undefined)
      if(result=='yes')
      this.DeleteAnswer(answerId);
    }
  )
}


UpdateAnswerForm : FormGroup=new FormGroup({
  answerid:new FormControl(),
  answertext :new FormControl('',[Validators.required]),
  questionid:new FormControl(),
  iscorrect:new FormControl('',[Validators.required]),
  question:new FormControl(),
  usersolutions:new FormControl()
})

@ViewChild('UpdateDialog')UpdateAnswerDialog:any
OpenUpdateDialog(answer:any){
this.UpdateAnswerForm.setValue(answer)
  this.dialog.open(this.UpdateAnswerDialog,{
    width:'500px',
    height:'300px',
    enterAnimationDuration:1000,
    exitAnimationDuration:1000
  })
}
UpdateAnswer(){
  this._instructorService.UpdateAnswer(this.UpdateAnswerForm.value,this.QuestionId);
}

CreateAnswerForm : FormGroup=new FormGroup({
  answertext :new FormControl('',[Validators.required]),
  iscorrect:new FormControl('',[Validators.required])
})

@ViewChild('CreateDialog')CreateAnswerDialog:any
OpenCreateDialog(){
  this.dialog.open(this.CreateAnswerDialog,{
    width:'500px',
    height:'300px',
    enterAnimationDuration:1000,
    exitAnimationDuration:1000
  })
}
CreateAnswer(){
  console.log(this.CreateAnswerForm.value)
  this._instructorService.CreateAnswer(this.CreateAnswerForm.value,this.QuestionId);
}
goBack() {
  this.location.back();
}

}
