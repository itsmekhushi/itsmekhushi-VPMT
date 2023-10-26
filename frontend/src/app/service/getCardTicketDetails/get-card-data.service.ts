import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TicketAPI } from "../../const";
@Injectable({
  providedIn: 'root'
})
export class GetCardDataService {
  cardData(data:any){
    return this.http.post(TicketAPI.getTicketDetails,data)
  }
  constructor(private http:HttpClient) { }
  getAuthToken() {
    return localStorage.getItem('token')
  }
}
