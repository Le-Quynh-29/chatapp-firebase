import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  APIS = {
    login: environment.apiURL + '/auth/login',
    register: environment.apiURL + '/auth/register',
    logout: environment.apiURL + '/auth/logout',
  };
  constructor(private _httpClient: HttpClient) { }

  login(formData: any): Observable<any> {
    return this._httpClient.post<any>(this.APIS.login, formData);
  }

  register(formData: any): Observable<any> {
    return this._httpClient.post<any>(this.APIS.register, formData);
  }

  logout(): Observable<any> {
    return this._httpClient.get<any>(this.APIS.logout);
  }
}
