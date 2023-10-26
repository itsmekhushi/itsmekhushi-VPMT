import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { UserAPI } from 'src/app/const';
import { UserProfile } from '../profile/profile.model';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http:HttpClient) { }
  getUser(){
    return this._http.get<UserProfile>(UserAPI.profile)
  }
 getAuthToken() {
  return localStorage.getItem('token')
  }
}
