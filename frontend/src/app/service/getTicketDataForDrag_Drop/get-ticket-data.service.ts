import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TicketAPI } from "../../const";
@Injectable({
  providedIn: 'root'
})
export class GetTicketDataService {

  constructor(private http:HttpClient) { }

  getData(data:any){
    console.log("from service",data);
    return this.http.post(TicketAPI.getTickets,data)
  }

  updateData(data:any){
    console.log("from service",TicketAPI.updateStatus);
  
    return this.http.post(TicketAPI.updateStatus,data)
  }
  getAuthToken() {
    return localStorage.getItem('token')
  }
}
