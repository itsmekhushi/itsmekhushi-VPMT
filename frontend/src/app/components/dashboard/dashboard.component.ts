import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from 'src/app/service/project/projects.service';

import { ProfileService } from 'src/app/shared/top-nav/profile.service';


import { GetTicketDataService } from 'src/app/service/getTicketDataForDrag_Drop/get-ticket-data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  target_project_id: any
  temp_profile: any;
  user_id: any;
  user_list: any;

  constructor(private projectsService: ProjectsService, private profileService: ProfileService, private toast: NgToastService, private getTicketDataService: GetTicketDataService) { }
  ngOnInit(): void {
   
    this.getAllDetail();
  }
  project_list: any = []

  getAllDetail() {
    this.projectsService.getProjects()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.project_list = res.Data
          this.user_id = res.Data[0]
          this.project_list.shift()
          console.log("data from project list",res.Data);
            
          if (this.project_list.length == 0) {
            this.toast.success({ detail: "Message", summary: "Oops!!!There is no project for you", duration: 2000 });

          }
        },
        error: (err) => {
          this.toast.success({ detail: "Message", summary: "Error While fetching Data", duration: 2000 });

        }

      })
  }
  // ===================Status Array 
  todo: any = [];
  inProgress: any = [];
  readyForQA: any = []
  done: any = [];
  data: any
  toDoLength: number = 0
  inProgressLength: number = 0
  readyForQALength: number = 0
  doneLength: number = 0

  ticketlist:any

  getDetail() {
    this.loadValue = false
    this.todo = [];
    this.inProgress = [];
    this.readyForQA = []
    this.done = [];
   
        let result = this.project_list.map((element: { _id: any; })=> element._id);
this.ticketlist=this.project_list[result.indexOf(this.target_project_id)].project_ticket_id
console.log(this.ticketlist);

        if (this.ticketlist.length !== 0) {
          this.ticketlist.forEach((element: any) => {
            if (element.ticket_status === 'To Do') {
              this.todo.push(element.ticket_id)
            }
            else if (element.ticket_status === 'In Progress') {
              this.inProgress.push(element.ticket_id)
            }
            else if (element.ticket_status === 'Ready For QA') {
              this.readyForQA.push(element.ticket_id)
            }
            else if (element.ticket_status === 'Done') {
              this.done.push(element.ticket_id)
            }
          });
          this.toDoLength = this.todo.length
          this.inProgressLength = this.inProgress.length
          this.readyForQALength = this.readyForQA.length
          this.doneLength = this.done.length


          console.log("from componenet length", this.toDoLength);
          this.loadComponent()

        }
        else {
          this.toast.success({ detail: "Message", summary: "Oops!!! There is no ticket", duration: 5000 });
        }
   
    console.log(this.todo, this.inProgress, this.readyForQA, this.done);
  }
  loadValue = false
  loadComponent() {
   
    this.loadValue = true
    console.log("load again");

  }
}