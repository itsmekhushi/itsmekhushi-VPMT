import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  ProjectAPI,TicketAPI} from "../../const";
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  uploadImage(project_attachment:File){
    console.log("from service",project_attachment);
    const data:FormData=new FormData()
    data.append('project_attachment',project_attachment)
    return this.http.post<any>(ProjectAPI.createProject,data)
  //  return this.http.post("http://127.0.0.1:8000/v1/ticket/uploadTicketAttachments",formData)
  }
  getImage(data:any){
    console.log(" getImage from service :",data);
    
    return this.http.post(TicketAPI.getTicketAttachments,data)
  }
}
