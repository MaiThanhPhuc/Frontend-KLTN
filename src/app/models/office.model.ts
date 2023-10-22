export class OfficeModel {
  code?: string;
  name: string;
  address: string;
  phone?: string;
  createDate?: Date;
  _id?: string
  // constructor(name: string, address: string) {
  //   this.name = name;
  //   this.address = address
  // }
}

export class SearchOfficeResponse {
  msg: string;
  result: OfficeModel[];
  totalItems: number;
  toltalPage: number;
  limit: number;
  currentPage: number;
}
