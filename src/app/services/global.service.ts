import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
// import helper from 'qms-js';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
// import { CommonPagingTableRequest } from 'src/app/models/paging';
// import { environment } from 'src/environments/environment';
// import { SelectChemicalRequestModel } from '../common-module/select-chemical-popup/select-chemical-popup.model';
// import { Constants } from '../constant';
// import { BlobFileModel } from '../models/blob-file.model';
// import { EchaSubstanceModel } from '../models/echa-substance.model';
// import { EnumrablePage } from '../models/Enumrable-page';
// import { GetExposureRequest } from '../models/getExposureRequest';
// import { NotificationActionModel } from '../models/notification-action.model';
// import { ChemicalDBConfigurationModel } from '../modules/admin/config/config.model';
// import { EmployeeModel } from '../modules/admin/manage-role/models/employee.model';
// import { CompanyModel } from '../modules/admin/organization/models/company.model';
// import { ChemicalSubstanceLocationModel, ChemicalSubstanceModel } from '../modules/chemicals/model/chemicalSubstance.model';
// import { SDSLanguageVersionModel } from '../modules/chemicals/model/sds-language-version.model';
// import { StatementSignalWord } from '../modules/chemicals/model/statementSignalWord.model';
// import { GetRelateChemicalInLocationForExcelRequest, GetRelateChemicalInLocationRequest } from '../modules/chemicals/request/getRelateChemicalInLocationRequest.model';
// import { TreeNodeModel } from '../modules/common/models/treeNode.model';
// import commonFunction from '../modules/common/utils/common';
// import { ExposureModelRequest } from '../modules/exposure/models/exposure.model';
// import { TotalSubstancesInLocationResponse } from '../modules/exposure/models/total-substances-in-location-response.model';
// import { ChemicalDetailsRequestModel } from '../modules/home/models/chemicals-detail-request.model';
// import { ChemicalSubstanceLastVisitedType } from '../modules/home/models/home.enum';
// import { ChemicalSubstanceLastVisitedModel } from '../modules/home/models/home.model';
// import { ChemicalSubstanceDangerSourceModel } from '../modules/location/models/chemicalSubstanceDangerSource.model';
// import { LocationStoreModel } from '../modules/location/models/location-store.model';
// import { Chemical, ChemicalSubstance, ChemicalSubstanceByProjectEntityIdRes, ChemicalSubstanceRes, ConflictData, LocationGetAllRequest, LocationModel, SubstanceConflictType } from '../modules/location/models/location.model';
// import { SupplierModel } from '../modules/report/models/supplier.model';
// import { MergeRiskAssessmentModel } from '../modules/risk/risk-rate/models/merge-risk-assessment.model';
// import { SubstitutionCopyRightModel } from '../modules/substitution/model/common.model';
// import { WorkAssignmentEmailModel } from '../modules/work-assignment/models/work-assignment-email.model';
// import { WorkAssignmentFilter } from '../modules/work-assignment/models/work-assignment-filter';
// import { WorkAssignmentModel } from '../modules/work-assignment/models/work-assignment.model';
import { BaseService } from './base.service';

@Injectable()
export class GlobalService extends BaseService {

  // /**
  //  * The initial location id when user pasted in browser address bar to keep tracking
  //  * when user clicks Home icon again.
  //  * If not saving, when user clicks other routes, we dont know first location is.
  //  * NOTES: this is not "lastLocationId" that being stored locationid.
  //  */
  // firstAnonymousLocationId: string;

  private toggleIconSubject = new Subject<boolean>();
  // private reloadRiskModuleWithParamSubject = new Subject<boolean>();
  // private changeLocationsSubject = new Subject<boolean>();
  // private activeNodeLocation = new Subject<string[]>();
  // private getTasksAssignNotification = new Subject<boolean>();
  // private getParentLocationIds = new Subject<any>();
  // private initBindingParamsSearch = new Subject<any>();
  // private onsScrollSubject = new Subject<number>();

  // private hideMenuLocation = new Subject<boolean>();
  // private locations$: BehaviorSubject<LocationModel[]>;
  // private employeeProfile$: BehaviorSubject<EmployeeModel>;
  // private ECHA_PIC_ListSubtance$: BehaviorSubject<SubstitutionCopyRightModel[]>;
  // private chemicalSubstanceDangerSource$: BehaviorSubject<ChemicalSubstanceDangerSourceModel[]>;
  // private tenantTree$: BehaviorSubject<TreeNodeModel[]> = new BehaviorSubject<TreeNodeModel[]>([]);
  // private companyProfile$: BehaviorSubject<CompanyModel>;
  // private menuItemClick = new Subject<any>();
  // private displayToggle = new Subject<boolean>();
  // private hideSidebarMenuSubject = new Subject<boolean>();
  // private openExposurePopupSubject = new Subject<boolean>();
  // private changeInfoSubject = new Subject<boolean>();
  // private isRegisteredIdNumberSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // private isRegisterUserInfoExposureSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // private detailAPIUrl: Subject<string> = new BehaviorSubject<string>('');
  // private activeLocationSubject = new Subject<string>();
  // private changeLocationTree = new Subject<boolean>();
  // private openTaskSubject = new Subject<{ taskId, taskType }>();

  // public locationsContent$ = new BehaviorSubject<LocationStoreModel>(null);

  // subscription = new Subject<{ message: string, action: string }>();
  toggleIconSubject$ = this.toggleIconSubject.asObservable();
  // activeNodeLocation$ = this.activeNodeLocation.asObservable();
  // changeLocationSubject$ = this.changeLocationsSubject.asObservable();
  // hideMenuLocationSubject$ = this.hideMenuLocation.asObservable();
  // getTasksAssignNotificationSubject$ = this.getTasksAssignNotification.asObservable();
  // getParentLocationIdsSubject$ = this.getParentLocationIds.asObservable();
  // initBindingParamsSearchSubject$ = this.initBindingParamsSearch.asObservable();
  // menuItemClick$ = this.menuItemClick.asObservable();
  // onsScrollSubject$ = this.onsScrollSubject.asObservable();
  // hideToggleSubject$ = this.displayToggle.asObservable();
  // hideSidebarMenuSubject$ = this.hideSidebarMenuSubject.asObservable();
  // openExposurePopupSubject$ = this.openExposurePopupSubject.asObservable();
  // changeInfoSubject$ = this.changeInfoSubject.asObservable();
  // isFirstTab: any;
  // activeLocationId$ = this.activeLocationSubject.asObservable();
  // changeLocationTree$ = this.changeLocationTree.asObservable();
  // openTaskSubject$ = this.openTaskSubject.asObservable();

  // isReloadRiskModuleWithParamSubject$ = this.reloadRiskModuleWithParamSubject.asObservable();

  // selectAnonymousSubTree<T extends { id: string, children?: T[], }>(currentSegment: ActivatedRouteSnapshot, items: T[], isAnomynous?: boolean, locationId?: string): T[] {
  //   // const cookie = this.getCookie(environment.server.cookieName);
  //   if (!locationId) locationId = commonFunction.getLocationIdBySegments(currentSegment);
  //   // incase of not logged and not found locationId, we try to get location
  //   if (isAnomynous && !locationId) {
  //     locationId = this.firstAnonymousLocationId;
  //   }
  //   if (isAnomynous && locationId && items && items.length > 0) {
  //     this.firstAnonymousLocationId = locationId;
  //     const location = commonFunction.lookupSubTree<T, string>(items, locationId);
  //     return [location];
  //   }

  //   return items;
  // }

  // getIsRegisteredIdNumber(): Observable<boolean> {
  //   return this.isRegisteredIdNumberSubject.asObservable();
  // }

  // setIsRegisteredIdNumber(state: boolean): void {
  //   this.isRegisteredIdNumberSubject.next(state);
  // }

  // getIsRegisterUserInfoExposure(): Observable<boolean> {
  //   return this.isRegisterUserInfoExposureSubject.asObservable();
  // }

  // setIsRegisterUserInfoExposure(state: boolean): void {
  //   this.isRegisterUserInfoExposureSubject.next(state);
  // }

  // getDetailAPIUrl(): Observable<string> {
  //   return this.detailAPIUrl.asObservable();
  // }

  // setDetailAPIUrl(state: string): void {
  //   this.detailAPIUrl.next(state);
  // }

  // getTenantTree(): Observable<TreeNodeModel[]> {
  //   return this.tenantTree$.asObservable();
  // }

  // setTenantTree(state: TreeNodeModel[]): void {
  //   this.tenantTree$.next(state);
  // }

  // announceOpenTask(taskId: string, taskType: number): void {
  //   this.openTaskSubject.next({ taskId, taskType });
  // }

  // announceScroll(height: number): void {
  //   this.onsScrollSubject.next(height);
  // }

  announceToggleIconClicked(forceExpand = false): void {
    this.toggleIconSubject.next(forceExpand);
  }

  // announceReloadRiskModuleWithParamSubject(val = false): void {
  //   this.reloadRiskModuleWithParamSubject.next(val);
  // }

  // announceMenuItemClicked(item: any): void {
  //   this.menuItemClick.next(item);
  // }

  // getTasksAssign(item: boolean): void {
  //   this.getTasksAssignNotification.next(item);
  // }

  // announceLocationChanged(expandTree: boolean): void {
  //   this.changeLocationsSubject.next(expandTree);
  // }

  // announceSidebarMenuClosed(forceCollapse = false): void {
  //   this.hideSidebarMenuSubject.next(forceCollapse);
  // }

  // announceOpenExposurePopup(state: boolean): void {
  //   this.openExposurePopupSubject.next(state);
  // }
  // submitActiveNodeLocation(locationId: string[]): void {
  //   this.activeNodeLocation.next(locationId);
  // }

  // submitActiveLocation(locationId: string): void {
  //   this.activeLocationSubject.next(locationId);
  // }

  // annouceChangeInfo(state: boolean): void {
  //   this.changeInfoSubject.next(state);
  // }

  // submitHideMenuLocation(value: boolean): void {
  //   this.hideMenuLocation.next(value);
  // }

  // submitDisplayToggle(value: boolean): void {
  //   this.displayToggle.next(value);
  // }

  // announceChangeLocationTree(value: boolean): void {
  //   this.changeLocationTree.next(value);
  // }

  // subLocations(reload?: boolean, ignoreLoading?: boolean, locationFilterMoel?: LocationGetAllRequest): Observable<LocationModel[]> {
  //   if (!this.locations$) {
  //     this.locations$ = (new BehaviorSubject(new Array<LocationModel>()) as BehaviorSubject<LocationModel[]>);
  //     reload = true;
  //   }
  //   if (reload) {
  //     const url = 'CDBLocation' + (ignoreLoading ? '?ignoreLoading=true' : '');
  //     this.get(url, {
  //       getForSetup: false,
  //       isFilterHavingWa: locationFilterMoel?.isFilterHavingWa,
  //       isFilterHavingSubstance: locationFilterMoel?.isFilterHavingSubstance
  //     }).toPromise().then(response => {
  //       this.locations$.next(response);
  //       return response;
  //     });
  //   }

  //   return this.locations$.asObservable();
  // }

  // containSubLocation(reload?: boolean, dataObject?: LocationStoreModel): Observable<LocationStoreModel> {

  //   if (!this.locationsContent$) {
  //     this.locationsContent$ = new BehaviorSubject(null);
  //     reload = true;
  //   }

  //   if (reload) {
  //     this.locationsContent$.next(dataObject);
  //   }

  //   return this.locationsContent$.asObservable();
  // }

  // subUserProfile(reload?: boolean): Observable<EmployeeModel> {
  //   if (!this.employeeProfile$) {
  //     this.employeeProfile$ = (new BehaviorSubject(new EmployeeModel()) as BehaviorSubject<EmployeeModel>);
  //     reload = true;
  //   }
  //   if (reload) {
  //     this.get('admin/employeeInfo').toPromise().then(response => {
  //       this.employeeProfile$.next(response);
  //       return response;
  //     });
  //   }

  //   return this.employeeProfile$.asObservable();
  // }

  // getCurrentUserInfo(): Observable<EmployeeModel> {
  //   return this.get('admin/employeeInfo');
  // }

  // getParentLocationIdsList(item: any): void {
  //   this.getParentLocationIds.next(item);
  // }

  // subChemicalSubstanceDangerSources(reload?: boolean): Observable<ChemicalSubstanceDangerSourceModel[]> {
  //   if (!this.chemicalSubstanceDangerSource$) {
  //     this.chemicalSubstanceDangerSource$ = (new BehaviorSubject(new Array<ChemicalSubstanceDangerSourceModel>()) as BehaviorSubject<ChemicalSubstanceDangerSourceModel[]>);
  //     reload = true;
  //   }

  //   if (reload) {
  //     this.get('chemicalSubstance/chemicalSubstanceDangerSource').toPromise().then(response => {
  //       this.chemicalSubstanceDangerSource$.next(response);
  //       return response;
  //     });
  //   }

  //   return this.chemicalSubstanceDangerSource$.asObservable();
  // }

  // subCompanyProfile(reload?: boolean): Observable<CompanyModel> {
  //   if (!this.companyProfile$) {
  //     this.companyProfile$ = (new BehaviorSubject(new CompanyModel()) as BehaviorSubject<CompanyModel>);
  //     reload = true;
  //   }

  //   if (reload) {
  //     this.get('admin/company').toPromise().then(response => {
  //       this.companyProfile$.next(response);
  //       return response;
  //     });
  //   }

  //   return this.companyProfile$.asObservable();
  // }

  // bindingParamsSearch(item: boolean): void {
  //   this.initBindingParamsSearch.next(item);
  // }

  // print(): void {
  //   const mainContainers = document.getElementsByClassName('main-container');
  //   if (mainContainers && mainContainers[0]) {
  //     const mainContainer = mainContainers[0];
  //     mainContainer.classList.add('opacity-0');
  //     window.print();
  //     mainContainer.classList.remove('opacity-0');
  //   }
  // }

  // public getAllExposure(request: GetExposureRequest, ignoreLoading = false): Observable<any> {
  //   return this.get(`CDBWorkAssignment?ignoreLoading=${ignoreLoading}`, request);
  // }

  // shouldIgnoreThisDanger(dangerOId: number): boolean {
  //   if (!dangerOId) {
  //     return true;
  //   }

  //   if (dangerOId > 16) { // temporary ignore 4 last picktogram 32 64 128 256
  //     return true;
  //   }

  //   return false;
  // }

  // isChemicalConflictWithLocation(codes: string[] = [], attrs: ChemicalSubstanceDangerSourceModel[] = [], locationAttrs: string[] = []): boolean {
  //   if (!codes || !codes.length) {
  //     return false;
  //   }

  //   // IF skipLocationAttributeIfNone = 1 => Location not have attributes => do not conflict with any subs
  //   // IF skipLocationAttributeIfNone = 0 => Location not have attributes => confict with subs have attributes
  //   if (environment.skipLocationAttributeIfNone && (!locationAttrs || !locationAttrs.length)) {
  //     return false;
  //   }

  //   for (let index = 0; index < codes.length; index++) {
  //     const code = codes[index];
  //     const item = attrs.find(item => item.code == code);
  //     if (item && !this.shouldIgnoreThisDanger(item.dangerSourceOId)) {
  //       const result = !locationAttrs || !locationAttrs.length || !locationAttrs.some(la => la == item.locationAttributeId);
  //       if (result) {
  //         return true;
  //       }
  //     }
  //   }

  //   return false;
  // }

  // isChemicalConflictEverything(codes: string[] = [], attrs: ChemicalSubstanceDangerSourceModel[] = [], locationAttrs: string[] = [], relatedChemicals: Chemical[]): boolean {
  //   const result = this.isChemicalConflictWithLocation(codes, attrs, locationAttrs);
  //   if (result) {
  //     return result;
  //   }

  //   const dangerPoints = this.calculateDangerPoint(codes, attrs);

  //   if (!dangerPoints) {
  //     return false;
  //   }

  //   for (let index = 0; index < relatedChemicals.length; index++) {
  //     const element = relatedChemicals[index];
  //     const point = this.calculateDangerPoint(element.codes, attrs);
  //     if (point && point !== dangerPoints) {
  //       return true;
  //     }
  //   }

  //   return false;
  // }

  // checkConflictChemical(codes: string[] = [], attrs: ChemicalSubstanceDangerSourceModel[] = [], locationAttrs: string[] = [], relatedChemicals: Chemical[]): any {
  //   const result = this.isChemicalConflictWithLocation(codes, attrs, locationAttrs);
  //   if (result) {
  //     return {
  //       data: true,
  //       from: SubstanceConflictType.Location
  //     };
  //   }

  //   const dangerPoints = this.calculateDangerPoint(codes, attrs);

  //   if (!dangerPoints) {
  //     return {
  //       data: false,
  //       from: SubstanceConflictType.Substance
  //     };
  //   }

  //   for (let index = 0; index < relatedChemicals.length; index++) {
  //     const element = relatedChemicals[index];
  //     const point = this.calculateDangerPoint(element.codes, attrs);
  //     if (point && point !== dangerPoints) {
  //       return {
  //         data: true,
  //         from: SubstanceConflictType.Substance
  //       };
  //     }
  //   }
  //   return {
  //     data: false,
  //     from: undefined
  //   };
  // }

  // calculateDangerPoint(codes: string[] = [], attrs: ChemicalSubstanceDangerSourceModel[] = []) {
  //   if (!codes || !codes.length) {
  //     return 0;
  //   }

  //   const dangerSources = codes.reduce((accumulatedResult, code) => {
  //     const item = attrs.find(item => item.code == code);
  //     if (item && !this.shouldIgnoreThisDanger(item.dangerSourceOId)) {
  //       accumulatedResult.push(item.dangerSourceOId);
  //     }
  //     return accumulatedResult;

  //   }, []);

  //   const sumDangerSources = [...new Set(dangerSources)].reduce((accumulatedResult, dangerSourceOId) => {
  //     accumulatedResult += dangerSourceOId;
  //     return accumulatedResult;

  //   }, 0);
  //   return sumDangerSources;
  // }

  // setLocationIdToLocalStorage(locationId: string): void {
  //   const userId = localStorage.getItem('userId');
  //   localStorage.setItem(`${userId}${Constants.localStorageKey.LAST_LOCATION_ID}`, locationId);
  // }

  // getFileContentByFileId(id: string, sSdsPortal?: boolean, ignoreLoading = false): Observable<BlobFileModel> {
  //   return this.get(`CDBBlobFile/FileContent/${id}?ignoreLoading=${ignoreLoading}`, undefined, sSdsPortal);
  // }

  // public openFile(fileId: string, isSdsPortal?: boolean): void {
  //   window.open(`${isSdsPortal ? environment.sdsPortalUrl : environment.apiUrl}CDBBlobFile/${fileId}`, '_blank');
  // }

  // getWorkAssignments(filter: WorkAssignmentFilter, isDynamicURL?: boolean, detailAPIUrl?: string, ignoreLoading = false): Observable<EnumrablePage<WorkAssignmentModel>> {
  //   const d = new Date();
  //   const timeOffset = d.getTimezoneOffset();
  //   if (!isDynamicURL) {
  //     return this.get(`CDBWorkAssignment/search?offset=${timeOffset}&ignoreLoading=${ignoreLoading}&hideLoader=${ignoreLoading}`, filter);
  //   }
  //   else {
  //     return this.getDynamicUrl(detailAPIUrl + `CDBWorkAssignment/search?offset=${timeOffset}&ignoreLoading=${ignoreLoading}&hideLoader=${ignoreLoading}`, filter);
  //   }
  // }

  // markNotificationAsRead(request: NotificationActionModel): Observable<boolean> {
  //   return this.post('common/markAsReadNotification', request);
  // }

  // hiddenNotification(request: NotificationActionModel): Observable<boolean> {
  //   return this.post('common/hiddenNotification', request);
  // }

  // getCookie(name: string): string {
  //   const ca: Array<string> = document.cookie.split(';');
  //   const caLen: number = ca.length;
  //   const cookieName = `${name}=`;
  //   let c: string;

  //   for (let i = 0; i < caLen; i += 1) {
  //     c = ca[i].replace(/^\s+/g, '');
  //     if (c.indexOf(cookieName) == 0) {
  //       return c.substring(cookieName.length, c.length);
  //     }
  //   }
  //   return '';
  // }

  // getAllSupplier(request: CommonPagingTableRequest): Observable<EnumrablePage<SupplierModel>> {
  //   return this.get('CDBSupplier/GetAll', request);
  // }

  // public getRiskAssessmentById(riskEntityId: string, ignoreLoading = false, getDraftStatements = false, isDynamicURL?: boolean, detailAPIUrl?: string): Observable<MergeRiskAssessmentModel> {
  //   if (!isDynamicURL) {
  //     return this.get(`CDBRiskAssessment/${riskEntityId}`, { ignoreLoading, getDraftStatements });
  //   }
  //   else {
  //     return this.getDynamicUrl(detailAPIUrl + `CDBRiskAssessment/${riskEntityId}`, { ignoreLoading, getDraftStatements });
  //   }
  // }

  // getSDSRelateToLocation(request: GetRelateChemicalInLocationRequest, ignoreLoading = false): Observable<ChemicalSubstance[]> {
  //   const url = `chemicalSubstance/relateToLocation?ignoreLoading=${ignoreLoading}&hideLoader=${ignoreLoading}`;
  //   return this.get(url, request);
  // }

  // getSDSRelateToLocationForExcel(request: GetRelateChemicalInLocationForExcelRequest): Observable<ChemicalSubstance[]> {
  //   const url = 'chemicalSubstance/relateToLocationForExcel';
  //   return this.post(url, request);
  // }

  // getChemicalFileContentByEntityId(entityId: string, ignoreLoading = false, isSdsPortalSecond?: boolean): string {
  //   const url = `CDBBlobFile/GetSDSFile/${entityId}?ignoreLoading=${ignoreLoading}&hideLoader=${ignoreLoading}`;
  //   const fileUrl = this.resolveBaseUrl(false, isSdsPortalSecond) + url;
  //   return fileUrl;
  // }

  // getChemicalFilePathByEntityId(entityId: string, ignoreLoading = false, isSdsPortalSecond?: boolean): Observable<string> {
  //   const url = `CDBBlobFile/GetSDSFilePath/${entityId}`;
  //   return this.get(url);
  // }

  // getChemicalDataSearchAdvanced(formData: any, ignoreLoading?: boolean, isDynamicURL?: boolean, detailAPIUrl?: string): Observable<ChemicalSubstanceRes> {
  //   if (!isDynamicURL) {
  //     const url = `chemicalSubstance/searchAdvanced?ignoreLoading=${ignoreLoading}&hideLoader=${ignoreLoading}`;
  //     return this.post(url, formData);
  //   }
  //   else {
  //     const url = detailAPIUrl + `chemicalSubstance/searchAdvanced?ignoreLoading=${ignoreLoading}&hideLoader=${ignoreLoading}`;
  //     return this.postDynamicUrl(url, formData);
  //   }
  // }

  // getbyProjectEntityId(formData: any, isDynamicURL?: boolean, detailAPIUrl?: string): Observable<ChemicalSubstanceByProjectEntityIdRes> {
  //   if (!isDynamicURL) {
  //     const url = 'chemicalSubstance/getbyProjectEntityId';
  //     return this.post(url, formData);
  //   }
  //   else {
  //     const url = detailAPIUrl + 'chemicalSubstance/getbyProjectEntityId';
  //     return this.postDynamicUrl(url, formData);
  //   }
  // }

  // getChemicalOtherVersion(id: string, isSdsPortal?: boolean, ignoreLoading = false): Observable<ChemicalSubstanceModel[]> {
  //   const url = `chemicalSubstance/otherVersion?id=${id}&ignoreLoading=${ignoreLoading}`;
  //   return this.get(url, undefined, isSdsPortal);
  // }

  // getSDSLanguageVersion(chemicalId: string, versions: string[] = [], language?: string, onlylastedVersion?: boolean, isSdsPortal?: boolean, ignoreLoading = false): Observable<SDSLanguageVersionModel[]> {
  //   const url = 'chemicalSubstance/SDSLanguageVersion';
  //   return this.get(url, {
  //     chemicalId,
  //     versions,
  //     language,
  //     onlylastedVersion,
  //     ignoreLoading
  //   }, isSdsPortal);
  // }

  // public getLocationByIdNotIncludeChemicals(locationId: string, ignoreLoading = false): Observable<LocationModel> {
  //   return this.get(`CDBLocation/${locationId}?getChemicals=false&ignoreLoading=${ignoreLoading}&hideLoader=${ignoreLoading}`);
  // }

  // getShortenUrlByNetpower(longUrl: string, domain: string): Observable<any> {
  //   const data = {
  //     link: longUrl,
  //     domainTenant: domain
  //   };

  //   return this.http.post(`${environment.apiNetpowerTinyUrl}`, helper.removeInvalidFields(data));
  // }

  // getChemicalStoreInLocation(request: ChemicalDetailsRequestModel, ignoreLoading = false): Observable<ChemicalSubstance[]> {
  //   const url = `chemicalSubstance/storeInLocation?ignoreLoading=${ignoreLoading}`;
  //   const substanceId = request.substanceId;
  //   const includeSubstituted = request.includeSubstituted;
  //   const includeArchived = request.includeArchived;
  //   return this.get(url, { substanceId, includeSubstituted, includeArchived });
  // }

  // public getAllLocationAttribute(ignoreLoading = false): Observable<any> {
  //   return this.get(`CDBLocation/attribute?ignoreLoading=${ignoreLoading}`);
  // }

  // public getChemicalDBConfiguration(): Observable<ChemicalDBConfigurationModel[]> {
  //   return this.get('admin/get-chemicaldb-config');
  // }

  // public getLanguageJSON(language: string): Observable<any> {
  //   return this.http.get(`${environment.assetsPath}/i18n/${language}.json`);
  // }

  // public getChemicalDBConfigurationByNames(names: string[], dynamicURL?: string): Observable<ChemicalDBConfigurationModel[]> {
  //   let url = 'admin/get-chemicaldb-config-by-names?hideLoader=true';
  //   if (names && names.length > 0) {
  //     names.map(x => url += `&names=${x}`)
  //   }
  //   if (!dynamicURL)
  //     return this.get(url);
  //   else
  //     return this.getDynamicUrl(dynamicURL + url);
  // }

  // subECHA_PIC_ListSubstance(reload?: boolean, ignoreLoading = false): Observable<SubstitutionCopyRightModel[]> {
  //   this.ECHA_PIC_ListSubtance$ = (new BehaviorSubject(new Array<SubstitutionCopyRightModel>()) as BehaviorSubject<SubstitutionCopyRightModel[]>);
  //   const blackListConfigs = [Constants.ApplyGlobalBlacklist];
  //   //TODO: Check unsub
  //   this.getChemicalDBConfigurationByNames(blackListConfigs).subscribe((chemicalDBConfigs) => {
  //     const emptyOb: Observable<SubstitutionCopyRightModel[]> = Observable.create((ob) => {
  //       ob.next([]);
  //       ob.complete();
  //     });

  //     const isAppliedGlobalBacklist = this._getConfigStatusByKey(chemicalDBConfigs, Constants.ApplyGlobalBlacklist);
  //     combineLatest(
  //       (environment.sdsPortalEnable || environment.sdsPortalSIKTEnable) && isAppliedGlobalBacklist ? this.getAllBlackListSDS(true, ignoreLoading, environment.sdsPortalSIKTEnable) : emptyOb,
  //       this.getAllBlackListSDS(false, ignoreLoading)
  //     ).toPromise().then(response => {
  //       const dataGlobal = response[0] || [];
  //       const dataLocal = response[1] || [];
  //       this.ECHA_PIC_ListSubtance$.next(dataGlobal.concat(dataLocal));

  //       return response;
  //     });
  //   });

  //   return this.ECHA_PIC_ListSubtance$.asObservable();

  // }

  // public getAllBlackListSDS(isPortal: boolean, ignoreLoading: boolean, isSIKTPortal = false): Observable<SubstitutionCopyRightModel[]> {
  //   return this.get(`chemicalSubstance/GetAllBlackListSDS?hideLoader=${ignoreLoading}`, {}, isPortal, null, isSIKTPortal);
  // }

  // private _getConfigStatusByKey(data: ChemicalDBConfigurationModel[], configKey: string): boolean {
  //   const config = data.find(x => x.name === configKey);
  //   if (config) {
  //     return config.status;
  //   }

  //   return false;
  // }

  // private _initEmptyECHA_PIC_ListSubtance(): Observable<SubstitutionCopyRightModel[]> {
  //   this.ECHA_PIC_ListSubtance$ = (new BehaviorSubject(new Array<SubstitutionCopyRightModel>()) as BehaviorSubject<SubstitutionCopyRightModel[]>);
  //   return this.ECHA_PIC_ListSubtance$.asObservable();
  // }

  // getListSubstanceMapWithECHA(echaSubstance: EchaSubstanceModel[]): Observable<SubstitutionCopyRightModel[]> {
  //   const url = 'chemicalSubstance/substanceMapWithEcha';
  //   return this.post(url, echaSubstance);
  // }

  // public insertSimpleExposure(request: ExposureModelRequest): Observable<string> {
  //   return this.post('CDBWorkAssignment/upsert', request);
  // }

  // getChemicalInSimpleExposure(request: SelectChemicalRequestModel): Observable<EnumrablePage<ChemicalSubstanceLocationModel>> {
  //   const url = 'chemicalSubstance/GetChemicalInSimpleExposure';
  //   return this.get(url, request);
  // }

  // public getPictogramData(locationId: string): Observable<ConflictData> {
  //   return this.get('CDBLocation/GetPictogramData?ignoreLoading=true', {
  //     locationId
  //   });
  // }

  // public countTotalSubstancesInLocations(locationIds: string[]): Observable<TotalSubstancesInLocationResponse[]> {
  //   return this.get('CDBLocation/total-substances/count', { locationIds });
  // }
  // public getStatementSignalWord(): Observable<StatementSignalWord[]> {
  //   return this.get('common/getStatementSignalWord');
  // }

  // public getChemicalSubstanceLastVisited(type: ChemicalSubstanceLastVisitedType): Observable<ChemicalSubstanceLastVisitedModel> {
  //   return this.get(`chemicalSubstance/getChemicalSubstanceLastVisited/${type}`);
  // }

  // getChemicalInLocationWithoutVersion(request: SelectChemicalRequestModel): Observable<EnumrablePage<ChemicalSubstanceLocationModel>> {
  //   const url = 'chemicalSubstance/getChemicalInLocationWithoutVersion';
  //   return this.post(url, request);
  // }

  // public sendWorkAssignmentEmail(workAssignmentId: string, request: WorkAssignmentEmailModel, ignoreLoading = true): Observable<boolean> {
  //   return this.post(`CDBWorkAssignment/assign-email/${workAssignmentId}?ignoreLoading=${ignoreLoading}`, request);
  // }
}

