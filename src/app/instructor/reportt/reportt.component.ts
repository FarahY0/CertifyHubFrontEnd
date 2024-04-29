import { Component } from '@angular/core';
import { InstructorService } from 'src/app/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import { PdfService } from 'src/app/pdf.service';
import 'jspdf-autotable';
@Component({
  selector: 'app-reportt',
  templateUrl: './reportt.component.html',
  styleUrls: ['./reportt.component.css']
})
export class ReporttComponent {
  constructor(public _instructorService :InstructorService,private route: ActivatedRoute,private pdfService: PdfService)
  {
   
  }
  SectionId: number = 0
ngOnInit(){
  this.route.paramMap.subscribe(param => this.SectionId = Number(param.get('SectionId'))
  )
  this._instructorService.GetInstructorReport(this.SectionId);
}

  
downloadReport(): void {
  const data = this._instructorService.sections;
  const fileName = 'report';

  this.pdfService.generatePdf(data, fileName);
}
}
