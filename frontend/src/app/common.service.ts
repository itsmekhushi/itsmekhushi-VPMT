import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

  export class CommonService {
    
constructor(private _http:HttpClient){}
postDetail(data:any){
  return this._http.post<any>("http://127.0.0.1:8000/v1/project/createProject/",data);
}
getDetail(){
  return this._http.get<any>("http://127.0.0.1:8000/v1/project/getProjects/");
}
postTicket(data:any){
  return this._http.post<any>("http://127.0.0.1:8000/v1/ticket/createTicket/",data)
}
getTicket(){
  return this._http.get<any>("http://localhost:3000/ticketList/");
}

  }
