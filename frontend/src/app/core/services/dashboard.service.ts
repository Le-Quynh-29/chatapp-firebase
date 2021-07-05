import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  APIS = {
    2: environment.apiURL + '/khai-son-lap-huong',
    3: environment.apiURL + '/khai-son-lap-huong/{id}',
    4: environment.apiURL + '/activation-principles',
    5: environment.apiURL + '/activation-principles/{id}',
    6: environment.apiURL + '/activation-items',
    7: environment.apiURL + '/activation-items/{id}',
    8: environment.apiURL + '/intro',
    11: environment.apiURL + '/notifications'
  };

  constructor(
    private _httpClient: HttpClient
  ) { }

  getActivationItems(): Observable<any> {
    return this._httpClient.get<any>(this.APIS[6]);
  }

  updateActivationItem(formData: any, itemID: any): Observable<any> {
    let url = this.APIS[7].replace('{id}', itemID);
    return this._httpClient.post<any>(url, formData);
  }

  getKhaiSonLapHuong(attr: string = 'xây mới'): Observable<any> {
    return this._httpClient.get<any>(this.APIS[2], {
      params: new HttpParams().set('attr', attr)
    });
  }

  updateKhaiSonLapHuong(formData: any, id: any): Observable<any> {
    let url = this.APIS[3].replace('{id}', id);
    return this._httpClient.post<any>(url, formData);
  }

  getIntroduction(): Observable<any> {
    return this._httpClient.get<any>(this.APIS[8]);
  }

  updateIntroduction(formData: any): Observable<any> {
    return this._httpClient.post<any>(this.APIS[8], formData);
  }

  getActivationPrinciples(): Observable<any> {
    return this._httpClient.get<any>(this.APIS[4]);
  }

  updateActivationPrinciple(formData: any, pID: any): Observable<any> {
    let url = this.APIS[5].replace('{id}', pID);
    return this._httpClient.post<any>(url, formData);
  }

  sendNotification(formData: any): Observable<any> {
    return this._httpClient.post<any>(this.APIS[11], formData);
  }
}
