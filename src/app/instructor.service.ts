import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class InstructorService {
 

  constructor(private http: HttpClient , private toastr: ToastrService , private location: Location) { }
// token :any
sectionn : any
attendance:any =[]
users:any =[]
sectionDetails : any = [{}]
studentAttendance : any = [{}]
sections:any =[{}]
notificationDate:any =[{}]
userInSection:any = [{}]
assessments:any=[{}];
questions:any=[{}];
answer:any=[{}];
numberStudents:any;
GetNotificationsBySectionId(sectionId:any){
   this.http.get("https://localhost:7000/api/Notification/GetNotificationsBySectionId/"+sectionId).subscribe(
 {
  next:(x)=>{this.notificationDate =x},
  error:(err)=>{console.log(err)}
 }
  );
    
}

DeleteNotification(id : number , sectionId:any){
this.http.delete("https://localhost:7000/api/Notification/DeleteNotification/"+id).subscribe(

{
  next:()=>{
    this.toastr.toastrConfig.timeOut = 0; 
    this.toastr.toastrConfig.closeButton = true; 
    this.toastr.toastrConfig.tapToDismiss = false; 
    this.toastr.toastrConfig.progressBar = false; 

    this.toastr.info('Deleted', 'Success', {
      closeButton: true,
      disableTimeOut: true,
      enableHtml: true 
      
    });
    this.GetNotificationsBySectionId(sectionId);
  },
  error:(err)=>{console.log(err)}
}
)
}
CreateNotification(data: any, sectionId: any) {
  const url = `https://localhost:7000/api/Notification/CreateNotification`;
  data.sectionId = sectionId;
  this.http.post(url, data).subscribe({
    next: () => {
      this.toastr.toastrConfig.timeOut = 0;
      this.toastr.toastrConfig.closeButton = true;
      this.toastr.toastrConfig.tapToDismiss = false;
      this.toastr.toastrConfig.progressBar = false;

      this.toastr.info('Created', 'Success', {
        closeButton: true,
        disableTimeOut: true,
        enableHtml: true
      });

      this.GetNotificationsBySectionId(sectionId);
    },
    error: (err) => {
      console.log(err);
    }
  });
}

UpdateNotification(data : any , sectionId:any){
  console.log(sectionId);
  console.log(data);
  data.sectionId = sectionId;
  this.http.put("https://localhost:7000/api/Notification/UpdateNotification",data).subscribe(
    {
      
next:()=>{
  this.toastr.toastrConfig.timeOut = 0; 
  this.toastr.toastrConfig.closeButton = true; 
  this.toastr.toastrConfig.tapToDismiss = false; 
  this.toastr.toastrConfig.progressBar = false; 

  this.toastr.info('Updated', 'Success', {
    closeButton: true,
    disableTimeOut: true,
    enableHtml: true 
    
  });
  // this.toastr.success("Updated")
this.GetNotificationsBySectionId(sectionId)},

error:(err)=>{console.log(err)}
    }
  )
}
GetAllAttendance(){
  return this.http.get("https://localhost:7000/api/Attendance/GetAllUsersWithSections").subscribe(

  {
   next:(x)=>{this.attendance =x},
   error:(err)=>{console.log(err)}
  }
   ); 
}
// getAllUsers(){
//   return this.http.get("https://localhost:7000/api/Users/GetAllUsers").subscribe(
//     {
//       next:(x)=>{this.users = x},
//       error:(err)=>{console.log(err)}
//     }
//   )
// }




// getAttendanceBySection(sectionId : any) {
//   return this.http.get("https://localhost:7000/api/Attendance/GetAttendanceBySection/"+ sectionId).subscribe(

//   (data: any) => {
//     this.sectionObject = data; 
//     console.log(this.sectionObject)
//   },
//   (error) => {
//     console.log(error); 
//   }
//   )
// }


GetAllSections(){
  return this.http.get("https://localhost:7000/api/Section/GetAllSections").subscribe(

  {
   next:(x)=>{this.sectionn =x},
   error:(err)=>{console.log(err)}
  }
   );
    
}
GetSectionByINSTRUCTORID()
  {
this.http.get("https://localhost:7000/api/Section/GetSectionByINSTRUCTORID/1").subscribe( 
  {
    next:(x)=>{this.sections=x},
    error:(err)=>{console.log(err);
    }
  }
)
      
    
  }

  GetSectionById(sectionId:any){
this.http.get("https://localhost:7000/api/Section/GetSectionById/"+sectionId).subscribe(
  
    (data: any) => {
      this.sectionDetails = data; 
      console.log(this.sectionDetails)
    },
    (error) => {
      console.log(error); 
    }
  
)
  }
  userDetails: any = {};
GetUsersInSection(sectionId:any){
  this.http.get("https://localhost:7000/api/Attendance/GetStudentsInSectionAsync/"+sectionId).subscribe(
    (data: any) => {
      this.userInSection = data.map((student: any) => ({
        ...student,
        attendanceStatus: false  // Assuming the initial status is Absent
      }));
      console.log(this.userInSection);
    },
    (error) => {
      console.log(error); 
    }
  )
}
GetStdSectionsBySectionId(){
  this.http.get("https://localhost:7000/api/StdSection/GetStdSectionsBySectionId/23").subscribe(
    (data: any) => {
      this.studentAttendance = data; 
      console.log(this.studentAttendance)
    },
    (error) => {
      console.log(error); 
    }
  )
}

saveAttendanceData(formData: any) {
  
  return this.http.post("https://localhost:7000/api/Attendance/InsertAttendanceData", formData);
}

UpdateAttendance(data : any ){

  this.http.put("https://localhost:7000/api/Attendance",data).subscribe(
    {
      
next:()=>{
  this.toastr.toastrConfig.timeOut = 0; 
  this.toastr.toastrConfig.closeButton = true; 
  this.toastr.toastrConfig.tapToDismiss = false; 
  this.toastr.toastrConfig.progressBar = false; 

  this.toastr.info('Updated', 'Success', {
    closeButton: true,
    disableTimeOut: true,
    enableHtml: true 
    
  });
  // this.toastr.success("Updated")
},

error:(err)=>{console.log(err)}
    }
  )
}
// GetNotificationSectionId(sectionId: number): Observable<Notification[]> {
//   return this.http.get<Notification[]>(`${this.baseUrl}/notifications`).pipe(
//     map((notifications) =>
//       notifications.filter((notification) => notification.sectionId === sectionId)
//     )
//   );
// }

UpdateStatus(data: any , studentId:any , newStatus:any , sectionId:any){
  data.sectionId = sectionId;
  this.http.post(`https://localhost:7000/api/Attendance/UpdateStatus?studentId=${studentId}&sectionId=${sectionId}&newStatus=${newStatus}`,data).subscribe({
    next:()=>{this.toastr.success("Present")
    
   },
        error:(err)=> {this.toastr.error("Error");}
    })
}


GetAllSectionNames(){
 return this.http.get("https://localhost:7000/api/StdSection/GetAllSectionNames")
}
studentCounts: any = {};
GetStudentInsectionCount(sectionId:any){
  return this.http.get("https://localhost:7000/api/StdSection/GetNumberStudentBySectionId/"+sectionId).subscribe(
    (count: any)=>{
      this.studentCounts = count;
    },
    (error) => {
      console.error('Error fetching instructor count:', error);
    }
  )
}

GetInstructorReport(SectionId:number){
  this.http.get('https://localhost:7000/api/Report/GetInstructorReport/'+SectionId).subscribe({
    next:(x)=> {this.sections=x},
    error:(x)=> {console.log(x);
    }
  })
}

GetAssessmentsBySectionId(SectionId:number){
  this.http.get('https://localhost:7000/api/Assessment/GetAssessmentsBySectionId/'+SectionId).subscribe({
    next:(x)=> {this.assessments=x},
    error:(x)=> {console.log(x);
    }
  })
}

  DeleteAssessment(assessmentId:number,sectionId:any){
    this.http.delete('https://localhost:7000/api/Assessment/'+assessmentId).subscribe( 
      {
        next:()=>{this.toastr.success("The Assessment has been successfully deleted")
        this.GetAssessmentsBySectionId(sectionId);
      },
        error:(x)=> {this.toastr.error("Error");
      }
  })
  }

fileName:string=''
CreateAssessment(data:any,sectionId:any){
  data.sectionId=sectionId;
  data.attachfile=this.fileName
this.http.post('https://localhost:7000/api/Assessment',data).subscribe({
next:()=>{this.toastr.success("The Assessment has been successfully created")
this.GetAssessmentsBySectionId(sectionId);
},
    error:(err)=> {this.toastr.error("Error");}
})
}
UpdateAssessment(data:any,sectionId:any){
data.attachfile=this.fileName
this.http.put('https://localhost:7000/api/Assessment',data).subscribe({
  next:()=>{this.toastr.success("The Assessment has been successfully updated")
  this.GetAssessmentsBySectionId(sectionId);},
      error:(err)=> {this.toastr.error("Error");}
})
}

UploadAssessmentFile(data:any,sectionId:any){
  this.http.post('https://localhost:7000/api/Assessment/UploadAssessmentFile',data).subscribe({
    next:(result:any)=>{this.fileName=result.attachfile
  this.GetAssessmentsBySectionId(sectionId)},
        error:(err)=> {this.toastr.error("Error");}
  })
  }

GetAnswerByQuestionId(QuestionId:number){
this.http.get('https://localhost:7000/api/Answer/ListAnswersByQuestion/'+QuestionId).subscribe({
  next:(x)=> {this.answer=x},
  error:(x)=> {console.log(x);
  }
})
}
GetAnswerById(AnswerId:number){
this.http.get('https://localhost:7000/api/Answer/GetAnswerById/'+AnswerId).subscribe({
  next:(x)=> {this.answer=x},
  error:(x)=> {console.log(x);
  }
})
}

DeleteAnswer(answerId:number,questionId:any){
this.http.delete('https://localhost:7000/api/Answer/DeleteAnswer/'+answerId).subscribe( 
  {
    next:()=>{this.toastr.success("The Answer has been successfully deleted")
    this.GetAnswerByQuestionId(questionId);
  },
    error:(x)=> {this.toastr.error("Error");
  }
})
}

GetQuestionsByAssessmentId(AssessmentId:number){
this.http.get('https://localhost:7000/api/Question/ListQuestionsByAssessment/'+AssessmentId).subscribe({
  next:(x)=> {this.questions=x},
  error:(x)=> {console.log(x);
  }
})
}

CreateQuestion(data:any,assessmentId:any){
data.assessmentId=assessmentId;
this.http.post('https://localhost:7000/api/Question',data).subscribe({
  next:()=>{this.toastr.success("The question has been successfully created")
this.GetQuestionsByAssessmentId(assessmentId);},
      error:(err)=> {this.toastr.error("Error");}
})
}
UpdateQuestion(data:any,assessmentId:any){
this.http.put('https://localhost:7000/api/Question/UpdateQuestion',data).subscribe({
  next:()=>{this.toastr.success("The question has been successfully updated")
  this.GetQuestionsByAssessmentId(assessmentId);},
      error:(err)=> {this.toastr.error("Error");}
})
}

DeleteQuestion(questionId:number,assessmentId:any){
this.http.delete('https://localhost:7000/api/Question/'+questionId).subscribe( 
  {
    next:()=>{this.toastr.success("The Question has been successfully deleted")
    this.GetQuestionsByAssessmentId(assessmentId);
  },
    error:(x)=> {this.toastr.error("Error");
  }
})
}



UpdateAnswer(data:any,questionId:any){
  this.http.put( 'https://localhost:7000/api/Answer/UpdateAnswer',data).subscribe({
    next:()=>{this.toastr.success("The answer has been successfully updated")
    this.GetAnswerByQuestionId(questionId);},
        error:(err)=> {this.toastr.error("Error");}
  })
  }


  CreateAnswer(data:any,questionId:any){
    data.questionId=questionId;
    this.http.post('https://localhost:7000/api/Answer/CreateAnswer',data).subscribe({
      next:()=>{this.toastr.success("The answer has been successfully created")
      this.GetAnswerByQuestionId(questionId);},
          error:(err)=> {this.toastr.error("Error");}
    })
    }
    goBack() {
      this.location.back();
    }



    /////material from roqaya

   material:any=[{}];
   courses:any=[];
 
    GetMaterialsBySectionId(SectionId:number){
      this.http.get('https://localhost:7000/api/Material/GetMaterialsBySection/'+SectionId).subscribe({
        next:(x)=> {this.material=x},
        error:(x)=> {this.toastr.error("Error");
        }
      })
    }
  
  
    GetAllcourses(){
  
      this.http.get('https://localhost:7000/api/Course/GetAllCourses').subscribe(
      
      
      {
        next : (y)=> { this.courses = y },
          error : (err)=> {this.toastr.error("Error");
          }
        
       }
  
  
      )
      
    }
  
    Deletematerial(id: number,sectionId:any) {
      this.http.delete('https://localhost:7000/api/Material/' + id).subscribe(
        {
          next: () => {
            this.toastr.success("The Material has been successfully deleted")
            this.GetMaterialsBySectionId(sectionId);
          },
          error: (err) => {
            this.toastr.error("Error");
          },
        }
      );
    }

   
    CreateMaterial(data:any,sectionId:any)
    {
      data.sectionId=sectionId;
      data.materialpath = this.matiralPath
    this.http.post('https://localhost:7000/api/Material' , data).subscribe(
      {
        next: () => { this.toastr.success("The Material has been successfully created")
        this.GetMaterialsBySectionId(sectionId);},
  
        error: (err) => { this.toastr.error("Error") }
      }
    )
  
    }

    UpdateMaterial(data:any,sectionId:any){
      data.materialpath = this.matiralPath
   this.http.put('https://localhost:7000/api/Material' , data).subscribe(
      {
        next: () => {this.toastr.success("The Material has been successfully updated")
        this.GetMaterialsBySectionId(sectionId);},
  
        error: (err) => { this.toastr.error("Error") },
      }
   )
  
    }
    
    matiralPath :string = '' ;
    UploadImage(data:any,sectionId:any){
    
      this.http.post('https://localhost:7000/api/Material/uploadMatrialPath' , data).subscribe(
        {
          next: (result :any) => {this.matiralPath = result.materialpath
          this.GetMaterialsBySectionId(sectionId)},
      
          error: (err) => {  this.toastr.error("Error") }
        }
      )
      
    }
  



}
