import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin.service';
import { EmployeeService } from '../../../services/employee.service';
import { BaseComponent } from 'src/app/utils/base.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PayslipDataModal } from './payslip-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payslip-pdf',
  templateUrl: './payslip-pdf.component.html',
  styleUrls: ['./payslip-pdf.component.scss']
})
export class PayslipPdfComponent extends BaseComponent implements OnInit {
  componentId: string = 'payslip-pdf';
  dataSource: any;
  dataTable: any;
  time = 'Nov 2023';
  payslipData = PayslipDataModal;
  styleString: string;
  isExport = false
  constructor(private dialogRef: MatDialogRef<PayslipPdfComponent>,
    private http: HttpClient,
    private adminService: AdminService,
    private employeeService: EmployeeService) {
    super()
  }
  ngOnInit(): void {
    this.http.get('../../../../../../assets/print-styles.scss', { responseType: 'text' }).subscribe(data => {
      this.styleString = data;
    })
    this.initDataTable()
  }

  initDataTable() {
    this.time = this.dataSource.empSalary.month + '/' + this.dataSource.empSalary.year
    this.dataTable = PayslipDataModal.map(item => this.mapItem(item, this.dataSource))
    console.log(this.dataTable);
  }

  mapItem(item: any, data: any) {
    item.fields = ((item.fields || []) as Array<any>).map(item2 => this.mapItem2(item2, data));
    return item;
  }

  mapItem2(item: any, data: any) {
    if (item.isEmployeeInfo) {
      item.value = data.employeeInfo ? data.employeeInfo[item.key] : ''
    } else {
      item.value = data.empSalary ? data.empSalary[item.key] : 0
      if (!data.empSalary[item.key]) item.value = 0
    }

    return item;
  }
  print() {
    const printContent = document.getElementById(this.componentId);
    console.log(this.styleString);
    const printWindow = window.open('', 'PRINT');
    printWindow?.document.write(`<html> <head><style>${this.styleString}</style></head><body>${printContent?.innerHTML}</body> </html>`);

    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
  }
  exportPdf() {
    const content: HTMLElement = document.getElementById(this.componentId) as HTMLElement;
    html2canvas(content).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('exported-document.pdf');
    });
  }

  back() {
    this.dialogRef.close()
  }

}
