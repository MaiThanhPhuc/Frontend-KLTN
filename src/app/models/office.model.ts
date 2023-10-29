export class OfficeModel {
  code?: string;
  name: string;
  address: string;
  phone?: string;
  createDate?: Date;
  _id?: string
  status?: number;
}

export class SearchOfficeResponse {
  msg: string;
  result: OfficeModel[];
  totalItems: number;
  toltalPage: number;
  limit: number;
  currentPage: number;
}
