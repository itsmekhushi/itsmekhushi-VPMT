import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {  TicketAPI} from "../../const";
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  addComment(data:any){
    console.log("from add comment service :::",data);
    
    return this.http.post(TicketAPI.addComment,data)
  }

  getComment(data:any){
    console.log(TicketAPI.getTicketDetails);
    
    return this.http.post(TicketAPI.getTicketDetails,data)
  }

  deleteComment(data:any){
    return this.http.post(TicketAPI.deleteComment,data)
  }

  updateComment(data:any){
    return this.http.post(TicketAPI.updateComment,data)
  }
  constructor(private http:HttpClient) { }

  // userData(){
  //   return this.http.get("http://127.0.0.1:8000/v1/user/profile")
  // }
  getAuthToken() {
    console.log('token');
    return localStorage.getItem('token')
    }
}
