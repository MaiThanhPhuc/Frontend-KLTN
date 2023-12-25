import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AttachFileModel, EmployeeImportField, FileUploadByKey } from 'src/app/models/common.models';
import { Employee, SearchEmployeeResponse, SearchModal } from 'src/app/models/employee.model';
import { BaseComponent } from 'src/app/utils/base.component';
import { EmployeeService } from '../../services/employee.service';
import { PageEvent } from '@angular/material/paginator';
import { takeUntil } from 'rxjs';
import { OptionModel } from 'src/app/models/optionsModel';
import { ToastService } from 'src/app/modules/common/toast/toast.service';
import * as XLSX from 'xlsx';
import { FormGroup } from '@angular/forms';
import { ExportCSVSerice } from 'src/app/services/exportCSV.service';
type AOA = Array<Array<[]>>;

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent extends BaseComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  displayedColumns: string[] = ['firstName', 'lastName', 'birthday', 'email', 'gender', 'phone', 'startedDate', 'address', 'salary', 'office', 'bankName', 'bankNo'];
  dataSource: MatTableDataSource<Employee>;
  private _fields: EmployeeImportField[] = [
    {
      fieldName: 'firstName',
      mapTo: 'firstName'
    },
    {
      fieldName: 'lastName',
      mapTo: 'lastName'
    },
    {
      fieldName: 'birthday',
      mapTo: 'birthday'
    },
    {
      fieldName: 'email',
      mapTo: 'email'
    },
    {
      fieldName: 'gender',
      mapTo: 'gender'
    },
    {
      fieldName: 'phone',
      mapTo: 'phone'
    },
    {
      fieldName: 'startedDate',
      mapTo: 'startedDate'
    },
    {
      fieldName: 'address',
      mapTo: 'address'
    },
    {
      fieldName: 'bankName',
      mapTo: 'bankName'
    },
    {
      fieldName: 'bankNo',
      mapTo: 'bankNo'
    },
    {
      fieldName: 'salary',
      mapTo: 'salary'
    },
    {
      fieldName: 'office',
      mapTo: 'office'
    }
  ];

  procedureFiles: AttachFileModel[] = [];
  selectedLocalUploadDocuments: OptionModel[] = [];
  allSelectedDocumentFileChecked: boolean;
  allSelectedDocumentFileIndeterminate: boolean;
  formData: FormGroup;
  rawDataExcels: AOA
  fileUpload: FileUploadByKey
  excelRowInfo: string;
  employeeData: Employee[] = [];
  exampleData: any[] = [{
    firstName: 'Nguyen',
    lastName: 'Thanh',
    birthday: new Date('12/11/1998'),
    email: 'employee@example.com',
    gender: 'Nam',
    phone: '0123456789',
    startedDate: new Date('01/21/2022'),
    address: 'Tp Hcm',
    bankName: 'Vietcombank',
    bankNo: '123456789',
  }];
  isExample = true
  paramSearch: SearchModal = {};
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''
  isLoading = false
  constructor(private router: Router,
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private exportCSVService: ExportCSVSerice) {
    super()
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.exampleData);
  }
  clearInput() {
    this.fileInput.nativeElement.value = '';
  }

  public onFileChange(evt: { target: DataTransfer }): void {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    this.onUploadExcelFile(target.files[0]);
    this.fileInput.nativeElement.value = '';
  }
  onReset() {

  }
  onUploadExcelFile(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    try {
      reader.onload = (event: any): void => {
        const fileContent = event.target.result as string;
        const contents = fileContent.split(',');

        const fileUpload: FileUploadByKey = {
          key: '',
          fileName: file.name,
          fileBase64Prefix: contents[0],
          fileBase64: contents[1],
          fileType: file.type
        };

        this.selectedLocalUploadDocuments = []
        this.selectedLocalUploadDocuments.push(new OptionModel(fileUpload.fileName, fileUpload.key));

        this.fileUpload = fileUpload
        this.rawDataExcels = this._getDataFromOriginalFile(fileUpload);
        let employeeCraws = this._mapWithDynamicFields(this.rawDataExcels);
        this.employeeData = employeeCraws;
        this.pageIndex = 0
        this.getDataEmployee();
        if (!this._headersIsValid(this.rawDataExcels)) {
          this.selectedLocalUploadDocuments = []
        }
      };
    } catch (error) {
      ToastService.error("Invalid file type. Please re-upload file");
    }

  }

  private _getDataFromOriginalFile(fileUploadByKey: FileUploadByKey, sheetRows = -1): AOA {
    if (!fileUploadByKey) {
      return null as any;
    }

    const byteCharacters = atob(fileUploadByKey.fileBase64);

    const bstr: string = byteCharacters;
    const option = (sheetRows === -1 ? { type: 'binary' } : { type: 'binary', sheetRows: sheetRows }) as XLSX.ParsingOptions;
    const wb: XLSX.WorkBook = XLSX.read(bstr, option);
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    const rawExcelData = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

    return rawExcelData;
  }

  private _headersIsValid(rawDataExcels: AOA): boolean {
    let valid = true;
    const headers = this._formatHeader(<string[]><unknown>rawDataExcels[0]);

    this._fields.forEach((requiredField) => {
      if (!headers.some(fieldNameInExcel => fieldNameInExcel.toLocaleLowerCase() === requiredField.fieldName.toLocaleLowerCase())) {
        ToastService.error(`${requiredField.fieldName} collum not found in file`);
        valid = false;
      }
    });

    return valid;
  }

  private _formatHeader(headers: string[]): string[] {
    return headers.map(header => {
      if (!header) {
        return '';
      }

      return header.trim();
    });
  }

  private _validRow(employeeCraw: Employee): boolean {
    return Boolean(employeeCraw.firstName && employeeCraw.phone && employeeCraw.address && employeeCraw.bankName && employeeCraw.bankNo && employeeCraw.role);
  }

  private _mapWithDynamicFields(lines: AOA): Employee[] {
    if (!lines || lines.length == 0) return [];

    const headers = this._formatHeader(<string[]><unknown>lines[0]);
    const data = lines.slice(1);

    const results = data.map(d => {
      const ret = {} as any;
      this._fields.forEach(field => {
        const index = headers.findIndex((h: string): boolean => h.toLocaleLowerCase() == field.fieldName.toLocaleLowerCase());
        if (index > -1) {
          ret[field.mapTo as keyof Employee] = d[index];
        }
      });

      return ret;
    });

    return results;
  }

  submit() {
    this.isLoading = true
    this.employeeService.importDataEmployee(this.employeeData).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) {
        ToastService.success("Import employee success")
        this.isLoading = false
      }
    })
  }


  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex
    this.getDataEmployee();
  }

  getDataEmployee() {
    this.isExample = false;
    this.countAllData = this.employeeData.length;
    var tempTable: Employee[] = [];
    let index = 0;

    if (this.pageIndex == 0) {
      index = 0
    } else if (this.pageIndex == 1) {
      index = this.pageSize
    } else {
      index = this.pageSize * this.pageIndex
    }
    for (let i = index; i < (this.pageIndex == 0 ? this.pageSize : this.pageSize * (this.pageIndex + 1)); i++) {
      if (this.employeeData[i])
        tempTable.push(this.employeeData[i]);
    }

    this.dataSource = new MatTableDataSource(tempTable);
  }
  downloadExample() {
    const excelUrl = '../../../../../assets/example_format.xlsx'; // Replace with your actual URL
    this.exportCSVService.downloadExcelFile(excelUrl).subscribe((data) => {
      this.saveFile(data, 'example-format.xlsx');
    });
  }
  private saveFile(data: Blob, filename: string): void {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}
