import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  APIS = {
    1: environment.apiURL + '/user/list',
  };
  constructor(private _httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    return this._httpClient.get<any>(this.APIS[1]);
  }
}
