import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizationGuard } from './authorization.guard';

const routes: Routes = [
  {
    path:'learner',
    loadChildren:()=>import('./learner/learner.module').then(x=>x.LearnerModule),
    canActivate:[authorizationGuard]
  },
  {
    path:'instructor',
    loadChildren:()=>import('./instructor/instructor.module').then(x=>x.InstructorModule),
    canActivate:[authorizationGuard]
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(x=>x.AuthModule)
  },
  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(x=>x.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
