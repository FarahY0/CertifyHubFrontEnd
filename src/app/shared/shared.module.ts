import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHeaderComponent } from './student-header/student-header.component';
import { StudentSidebarComponent } from './student-sidebar/student-sidebar.component';
import { StudentFooterComponent } from './student-footer/student-footer.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { InstructorHeaderComponent } from './instructor-header/instructor-header.component';
import { InstructorFooterComponent } from './instructor-footer/instructor-footer.component';
import { InstructorSidebarComponent } from './instructor-sidebar/instructor-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    StudentHeaderComponent,
    StudentSidebarComponent,
    StudentFooterComponent,
    InstructorHeaderComponent,
    InstructorFooterComponent,
    InstructorSidebarComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule ,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports:[
    StudentHeaderComponent,
    StudentSidebarComponent,
    StudentFooterComponent,
    InstructorFooterComponent,
    InstructorHeaderComponent,
    InstructorSidebarComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
  AdminFooterComponent,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatInputModule, MatTableModule ,MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,NgChartsModule , MatMenuModule , MatIconModule 
  ]
})
export class SharedModule { }
