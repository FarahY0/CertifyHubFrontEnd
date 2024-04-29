import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-sidebar',
  templateUrl: './instructor-sidebar.component.html',
  styleUrls: ['./instructor-sidebar.component.css']
})
export class InstructorSidebarComponent {
constructor(private router : Router){}
  Logout(){
    localStorage.clear();
   this.router.navigate(['auth/login'])
  }
}
