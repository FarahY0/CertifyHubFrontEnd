import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  instructorCount : any
  studentCount : any 
  students:any =[{}]
  courses:any=[{}];
  programs:any=[{}];
  constructor(private http: HttpClient , private toastr: ToastrService , private router :Router) { }


token:any
Login(data:any){
let headerOptions ={
  'Content-Type' : 'application/json',
      'Accept':'application/json'
     
}

let options = {
  headers: new HttpHeaders( headerOptions)
}

  this.http.post('https://localhost:7000/api/Login/UserLogin',data , options).subscribe(

  {
    next:(result)=>{this.token = result ;
      this.toastr.toastrConfig.timeOut = 0; 
      this.toastr.toastrConfig.closeButton = true; 
      this.toastr.toastrConfig.tapToDismiss = false; 
      this.toastr.toastrConfig.progressBar = false; 
  
      this.toastr.info('Logged successfully', 'Success', {
        closeButton: true,
        disableTimeOut: true,
        enableHtml: true 
        
      });
      // this.toastr.success('Logged successfully') ;
      console.log(this.token);
      localStorage.setItem("token",this.token);
      let user:any = jwtDecode(this.token)
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user))
if(user.RoleId == "1"){
this.router.navigate(['admin/index'])
}
else if(user.RoleId == "2"){
  this.router.navigate(['instructor/index'])
}
else if(user.RoleId == "3"){
  this.router.navigate(['learner/course'])
}
else{
  this.toastr.error('Unauthorized Else');
}
    },
    error:(err)=>{
      this.toastr.error('Unauthorized');
        console.error('Error: ', err);
    }
  }
  )
}



GetInstructorCount(){
  return this.http.get("https://localhost:7000/api/Login/GetInstructorCount").subscribe(
    (count: any)=>{
      this.instructorCount = count;
    },
    (error) => {
      console.error('Error fetching instructor count:', error);
    }
  )
}
GetStudentCount(){
  return this.http.get("https://localhost:7000/api/Login/GetStudentCount").subscribe(
    (count: any)=>{
      this.studentCount = count;
    },
    (error) => {
      console.error('Error fetching instructor count:', error);
    }
  )
}

GetStdSectionsInfo(){
 return this.http.get("https://localhost:7000/api/StdSection/GetStdSectionsInfo");
}


GetAllCourses(){
  this.http.get('https://localhost:7000/api/Course/GetAllCourses').subscribe({
    next:(x)=> {this.courses=x},
    error:(x)=> {console.log(x);
    }
  })
}

GetAllPrograms(){
  this.http.get('https://localhost:7000/api/Program').subscribe({
    next:(x)=> {this.programs=x},
    error:(x)=> {console.log(x);
    }
  })
}

 CreateCourse(data:any){
  data.Imagepath=this.imageName || '';
  
this.http.post('https://localhost:7000/api/Course/CreateCourse',data).subscribe({
next:()=>{this.toastr.success("The course has been successfully created")
this.GetAllCourses()},
    error:(err)=> {this.toastr.error("Error");}
})
}

UpdateCourse(data:any){
data.imagepath=this.imageName || '';
this.http.put('https://localhost:7000/api/Course/UpdateCourse',data).subscribe({
  next:()=>{this.toastr.success("The course has been successfully updated")
this.GetAllCourses()},
      error:(err)=> {this.toastr.error("Error");}
})
}
imageName:string=''
UploadImage(data:any){
  this.http.post('https://localhost:7000/api/Course/uploadCourseImage',data).subscribe({
    next:(result:any)=>{this.imageName=result.imagepath
  this.GetAllCourses()},
        error:(err)=> {this.toastr.error("Error");}
  })
  }
  
DeleteCourse(courseId:number){
  
  this.http.delete('https://localhost:7000/api/Course/DeleteCourse/'+courseId).subscribe( 
    {
      next:()=>{this.toastr.success("The course has been successfully deleted")
    this.GetAllCourses()},
      error:(x)=> {this.toastr.error("Error");
    }
})



}

CreateProgram(data:any)
{
  data.imagepath = this.imagePath

  this.http.post('https://localhost:7000/api/Program' , data).subscribe(
  
  
  {
    next : ()=>{this.toastr.success("The program  has been successfully created")

      this.GetAllPrograms() },
      error : (err)=> {console.log(err);
      }    
   }


  )

}


DeletProgram(id : number){

this.http.delete('https://localhost:7000/api/Program/' + id).subscribe(

  {
    next : ()=> {this.toastr.success("deleted sucssefully")

    this.GetAllPrograms() },
    error : (err)=> {console.log(err);
    }

  }

  )
}

UpdateProgram(data:any){
data.imagepath = this.imagePath


this.http.put('https://localhost:7000/api/Program' , data).subscribe(
{
  next: () => {this.toastr.success("updaed sucssefully")
   this.GetAllPrograms()},

  error: (err) => {  console.log(err)  },
}
)

}

imagePath :string = ''
UploadProgramImage(data:any){

  this.http.post('https://localhost:7000/api/Program/uploadImagePath' , data).subscribe(
    {
      next: (result :any) => (this.imagePath = result.imagepath),
  
      error: (err) => {  console.log(err)  },
    }
  )
  
}






// CreateUser(data: any){
//   this.http.post("https://localhost:7000/api/Users/CreateUser",data).subscribe(
// {
//   next: () => {
//     this.toastr.toastrConfig.timeOut = 0;
//     this.toastr.toastrConfig.closeButton = true;
//     this.toastr.toastrConfig.tapToDismiss = false;
//     this.toastr.toastrConfig.progressBar = false;

//     this.toastr.info('Created', 'Success', {
//       closeButton: true,
//       disableTimeOut: true,
//       enableHtml: true
//     });


//   },
//   error: (err) => {
//     console.log(err);
//   }})}

CreateUser(data: any) {
  return this.http.post("https://localhost:7000/api/Users/CreateUser", data);
}

  users:any=[{}];

  // GetAllUsers(){
  //   this.http.get("https://localhost:7000/api/Users/GetAllUsers").subscribe({
  //     next:(x)=> {this.users=x},
  //     error:(x)=> {console.log(x);
  //     }
  //   })
  // }
  GetAllUsers(){
    return this.http.get("https://localhost:7000/api/Users/GetAllUsers");
  }
  UpdateUser(data:any){
    this.http.put("https://localhost:7000/api/Users/UpdateUser" , data).subscribe(
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
this.GetAllUsers()
},
error:(err)=>{console.log(err)}
})}
  DeleteUser(userId:any){
this.http.delete("https://localhost:7000/api/Users/DeleteUser/"+userId).subscribe(

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
    this.GetAllUsers();
  },
  error: (err) => {
    console.log(err);
  }
})}

GetAdminReport(){
  this.http.get('https://localhost:7000/api/Report/GetAdminReport').subscribe({
    next:(x)=> {this.courses=x},
    error:(x)=> {console.log(x);
    }
  })
}


}
