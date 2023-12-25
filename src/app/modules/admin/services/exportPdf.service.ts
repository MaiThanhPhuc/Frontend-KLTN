import { Injectable } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class PdfService extends BaseService {
  generatePdf(content: HTMLElement, filename: string) {
    const options = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(content.innerHTML).set(options).outputPdf((pdf: any) => {
      // Save or open the PDF
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
