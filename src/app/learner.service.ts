import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LearnerService {
courses:any =[]
courseDetails :any ={}
  constructor( private http: HttpClient) { }

  GetAllCoursesByUserId() {
    this.http.get("https://localhost:7104/api/Course/GetCoursesByUserId/1").subscribe(
      (data: any) => {
        this.courses = data; 
      },
      (error) => {
        console.log(error); 
      }
    );
  }
  GetCourseById(courseId: number){
    return this.http.get("https://localhost:7104/api/Course/GetCourseById/"+ courseId).subscribe(

    (data: any) => {
      this.courseDetails = data; 
      console.log(this.courseDetails)
    },
    (error) => {
      console.log(error); 
    }
  );
    
  }
  // GetCourseById() {
  //   this.http.get("https://localhost:7104/api/Course/GetCourseById/22").subscribe(
  //     (data: any) => {
  //       this.courses = data; 
  //     },
  //     (error) => {
  //       console.log(error); 
  //     }
  //   );
  // }
 
  // getCourseById(courseId: number): Observable<LearnerModule> {
  //   return this.http.get<Course>(`${this.apiUrl}/GetCourseById/${courseId}`);
  // }

  // GetAllCourses(){
  //   this.http.get("https://localhost:7104/api/Course/GetAllCourses").subscribe()
  //   {
  //     next : (x:any)=>{this.courses = x};
  //     error:(err:any)=>{console.log(err)};
  //   }
  // }
}
