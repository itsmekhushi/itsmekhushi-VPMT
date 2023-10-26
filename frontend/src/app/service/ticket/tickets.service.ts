import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { TicketInterface } from 'src/app/components/dashboard/create-ticket/ticket';
import { TicketAPI } from 'src/app/const';
@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private _http:HttpClient) { }
  createTicket(data:any){
    console.log("from create ticket",data);
    
    return this._http.post<TicketInterface[]>(TicketAPI.createTicket,data)
  }
  // getTicket(){
  //   return this._http.get<any>(TicketAPI.,"http://127.0.0.1:8000/v1/ticket/ticket");
    
  // }
  
  updateTicket(data:any){
    console.log("from update ticket service:",data); 
    return this._http.post<any>(TicketAPI.updateTicket,data)
  }

  deleteTicket(data:any):Observable<any>{
    console.log(data);
    
    return this._http.post(TicketAPI.deleteTicket,data)
   }
  getAuthToken() {
    return localStorage.getItem('token')
  }
}
