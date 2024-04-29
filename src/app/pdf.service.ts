import { Injectable } from '@angular/core';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }
  generatePdf(data: any[], fileName: string): void {
    const pdf = new jsPDF();
    const headers = Object.keys(data[0]);
    pdf.autoTable({
      head: [headers],
      body: data.map((obj) => headers.map((key) => obj[key])),
    });

    // pdf.save($(fileName).pdf);
    pdf.save(fileName + '.pdf');
  }
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}
