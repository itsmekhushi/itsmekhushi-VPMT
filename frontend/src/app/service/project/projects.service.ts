import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectInterface } from 'src/app/components/dashboard/create_projects/create-project/project';
import { ProjectAPI, AdminAPI } from "../../const";
@Injectable({
  providedIn: 'root'
})
export class ProjectsService implements OnInit {
  
 ngOnInit(): void {
     this.getAuthToken()
 }
  constructor(private _http:HttpClient) { }

  createProject(data:any){
    return this._http.post<ProjectInterface[]>(ProjectAPI.createProject,data);
  }
 
 deleteProject(data:any):Observable<any>{
  console.log("<<<<><<<<<<<<<<<<<<<<<<<<<<<<<<<<",data)
  return this._http.post(ProjectAPI.deleteProject,data)
 }
 getProjects(){
  
  return this._http.get<any>(ProjectAPI.getProjects)
 }
 getUser(){
  return this._http.get<any>(AdminAPI.getUsers)
 }
 getDetail(data:any){
  console.log("from service",data);
  
  return this._http.post(ProjectAPI.getProjectDetail,data)
 }
 getAuthToken() {
  console.log("from project service: " + 'token');
  }
  getProject(page: number, pageSize: number): Observable<any> {
   
    
   const params=new HttpParams()
   .set('page',page.toString())
   .set('pageSize',pageSize.toString())
    return this._http.get<any>(ProjectAPI.getProject,{params})
  }
  searchProject(page:number,pageSize:number,searchQuery:string){
    const params=new HttpParams()
   .set('page',page.toString())
   .set('pageSize',pageSize.toString())
   .set('searchQuery',searchQuery)
   console.log("TEerterte",searchQuery)
   console.log(page)
    return this._http.get<any>(ProjectAPI.getProjectBySearch,{params})
  }
 

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    throw error;
  }
}


