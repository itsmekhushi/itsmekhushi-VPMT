import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { UserAPI } from "../../const";
@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  // apiurl = 'http://13.232.133.197/v1/user/login';   //insert api url

  constructor(private http: HttpClient,private router:Router) { }


  login(data: any) {
    console.log('i am server')
    return this.http.post(UserAPI.login, data)
  }

  loggedIn(){
    return !! localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

//   logoutUser(){
//     localStorage.removeItem('token')
// this.router.navigate(['login'])


}
