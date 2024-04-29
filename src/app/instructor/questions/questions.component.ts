import { Component , ViewChild } from '@angular/core';
import { InstructorService } from 'src/app/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  constructor(public _instructorService :InstructorService,private route: ActivatedRoute,public dialog:MatDialog, private location: Location)
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

DeleteQuestion(questionId:number){
  this._instructorService.DeleteQuestion(questionId,this.AssessmentId);
}


@ViewChild('ConfirmationDialog')ConfirmDeleteDialog:any
OpenConfirmDialog(questionId:number){
  var dialog=this.dialog.open(this.ConfirmDeleteDialog)
  dialog.afterClosed().subscribe(
    (result)=>{
      if(result!=undefined)
      if(result=='yes')
      this.DeleteQuestion(questionId);
    }
  )
}

UpdateQuestionForm : FormGroup=new FormGroup({
  questionid:new FormControl(),
  questiontext :new FormControl('',[Validators.required]),
  marks:new FormControl('',[Validators.required]),
  assessmentid:new FormControl(),
  assessment:new FormControl(),
  answers:new FormControl(),
  usersolutions:new FormControl()
})

@ViewChild('UpdateDialog')UpdateQuestionDialog:any
OpenUpdateDialog(course:any){
this.UpdateQuestionForm.setValue(course)
  this.dialog.open(this.UpdateQuestionDialog,{
    width:'400px',
    height:'300px',
    enterAnimationDuration:1000,
    exitAnimationDuration:1000
  })
}
UpdateQuestion(){
  this._instructorService.UpdateQuestion(this.UpdateQuestionForm.value,this.AssessmentId);
}

CreateQuestionForm : FormGroup=new FormGroup({
  questiontext :new FormControl('',[Validators.required]),
  marks:new FormControl('',[Validators.required])
})

@ViewChild('CreateDialog')CreateQuestionDialog:any
OpenCreateDialog(){
  this.dialog.open(this.CreateQuestionDialog,{
    width:'400px',
    height:'300px',
    enterAnimationDuration:1000,
    exitAnimationDuration:1000
  })
}
CreateQuestion(){
  console.log(this.CreateQuestionForm.value)
  this._instructorService.CreateQuestion(this.CreateQuestionForm.value,this.AssessmentId);
}

goBack() {
  this.location.back();
}
}
