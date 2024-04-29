import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { ActivatedRoute } from '@angular/router';
import { PdfService } from 'src/app/pdf.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  constructor(public _adminService :AdminService,private route: ActivatedRoute,private pdfService: PdfService)
  {
   
  }
  SectionId: number = 0
ngOnInit(){
  
  this._adminService.GetAdminReport();
}

  
downloadReport(): void {
  const data = this._adminService.courses;
  const fileName = 'report';

  this.pdfService.generatePdf(data, fileName);
}
}
