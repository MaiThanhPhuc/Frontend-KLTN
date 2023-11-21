import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable()
export class ExportCSVSerice {
  generateExcel(data: Array<any>, filename = 'data.xlsx') {
    const fn = filename.endsWith('.xlsx') ? filename : filename + '.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, fn);
  }

  downloadFile(data: Array<any>, filename = 'data', type = 'text/csv;charset=utf-8;') {
    const csvData = this.convertToCSV(data, Object.keys(data[0]));
    const blob = new Blob(['\ufeff' + csvData], { type: type });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    if (!filename.includes('.'))
      dwldLink.setAttribute('download', filename + '.csv');
    else
      dwldLink.setAttribute('download', filename);
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  convertToCSV(objArray: any, headerList: any) {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'No,';

    for (const index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (const index in headerList) {
        const head = headerList[index];

        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }
}
