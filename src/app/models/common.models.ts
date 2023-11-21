export class LoginRequest {
  email: string;
  password: string;
}

export class EmployeeImportField {
  fieldName: string;
  mapTo: any;
}


export class AttachFileModel {
  id: string;
  relateId: string;
  fileName: string;
  fileContentBase64: string;
}

export class FileUploadByKey {
  key: string;
  fileType: string;
  fileName: string;
  fileBase64Prefix: string;
  fileBase64: string;
  updatedTime?: Date;
}
