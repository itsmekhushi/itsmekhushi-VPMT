import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { CardDetailComponent } from '../card-detail/card-detail.component'
import { MatDialog } from '@angular/material/dialog';
import { GetTicketDataService } from '../../../../service/getTicketDataForDrag_Drop/get-ticket-data.service'
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router'
import { CreateTicketComponent } from '../../create-ticket/create-ticket.component';

import { ProjectsService } from 'src/app/service/project/projects.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  length: number = 0;
  profile: any;
  name!: any
  project_name: string = ''

  constructor(private projectService: ProjectsService, private route: ActivatedRoute, private getTicketDataService: GetTicketDataService, private dialog: MatDialog, private toast: NgToastService, private router: Router) { }

  openDialogs() {
    const dialogreference = this.dialog.open(CreateTicketComponent, {
      data: {
        project_details: this.project_details,
        ticket_id: this.project_Sname + '100' + (this.length + 1),
        user_details: this.userData

      },
      width: "80%",
      height: "80%"
    });
    dialogreference.afterClosed().subscribe(result => {
      console.log("result from create ticket After", result);
      this.tickets.push(result.Data)
      this.todo.push(result.Data.ticket_title)
      // this.getDetail()
    });


  }
  //================== for drop ticket 
  targetTitle: string = ''
  status: string = "To Do"
  index: number = 0

  //===================to view ticket detail
  clickTicketTitle: string = '';
  clickTicketId: number = 0

  //=================== request data 
  details: any;

  // ===================Status Array 
  todo: any = [];
  inProgress: any = [];
  readyForQA: any = []
  done: any = [];

  //===================store data 
  data: any = [];

  project_id_data: any

  ngOnInit(): void {
    this.project_id_data = this.route.snapshot.paramMap.get('project_id')
    this.getProjectDetails()
   


  }
  project_details: any
  project_Sname: any
  userList: any
  isLoaded=false
  getProjectDetails() {
    this.projectService.getDetail({
      "_id": this.project_id_data
    })
      .subscribe({
        next: (res) => {
          this.project_details = res
          this.project_details =this.project_details.Data
          this.userData=this.project_details[0]
this.project_details.shift()
          console.log("project details response",this.project_details);
          
          this.project_details = this.project_details[0]
          console.log("response for card", this.project_details);
          this.project_title = this.project_details.project_title;
          this.isLoaded=true
          this.tickets=this.project_details.project_ticket_id
          console.log("project_title", this.tickets);
       
          this.project_Sname = this.getIntials(this.project_details.project_title)
          console.log("project data", this.project_Sname);
          this.getDetail();

        },
        error: (err) => {
          this.toast.error({ detail: "Message", summary: "Error While fecthing Details", duration: 2000 });

        }

      })
  }

  initials: string = ''
  parts: any
  getIntials(project_title: any) {
    this.parts = project_title.split(' ')
    for (const part of this.parts) {
      if (part.length > 0 && part !== '') {
        this.initials += part[0];
      }
    }
    
    return this.initials
  }


  tickets: any
  project_title: any = [];
  userData: any
  //========================Get Ticket details using API 
  getDetail() {
    console.log("ticket details", this.tickets);
    this.length = this.tickets.length
        if (this.tickets.length !== 0) {

          this.tickets.forEach((element: any) => {
           
            if (element.ticket_status === 'To Do' && !this.todo.includes(element.ticket_title)) {
              this.todo.push(element.ticket_title)
            }
            else if (element.ticket_status === 'In Progress' && !this.inProgress.includes(element.ticket_title)) {
              this.inProgress.push(element.ticket_title)
            }
            else if (element.ticket_status === 'Ready For QA' && !this.readyForQA.includes(element.ticket_title)) {
              this.readyForQA.push(element.ticket_title)
            }
            else if (element.ticket_status === 'Done' && !this.done.includes(element.ticket_title)) {
              this.done.push(element.ticket_title)
            }
          });
          console.log("to do", this.tickets);

        }
        else {
          this.toast.success({ detail: "Message", summary: "Oops!!! There is no ticket", duration: 5000 });
        }
  
  }

  //=========================drop ticket and change status
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.targetTitle = event.previousContainer.data[event.previousIndex]
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log("event data", event.container)
    console.log("detailsssssssssssssssss", this.tickets);

    this.tickets.forEach((element: any) => {
      console.log("drag and drop", element);

      if (element.ticket_title === this.targetTitle) {
        console.log(this.targetTitle);
        console.log(element.ticket_title);

        if (event.container.id == 'inProgress') {
          this.status = "In Progress"
        }
        else if (event.container.id == 'toDo') {
          this.status = "To Do"
        }
        else if (event.container.id == 'readyForQA') {
          this.status = "Ready For QA"
        }
        else if (event.container.id == 'done') {
          this.status = "Done"
        }
        this.index = element._id
      }
    });

    this.details = {
      _id: this.index,
      ticket_status: this.status
    }
    console.log(this.details);
    this.getTicketDataService.updateData(this.details).subscribe({
      next: (res) => {
        this.data = res

      },
      error: (err) => {
        console.log(err)
      }
    }
    )
  }
  statusArray: any
  target_ticket_detail:any
  //====================open card to view details
  openDialog(event: any) {
    this.clickTicketTitle = event.target.innerText
    console.log("fromOpen", this.tickets);

    this.tickets.forEach((element: any) => {
      console.log(element, element.ticket_title, this.clickTicketTitle);

      if (element.ticket_title == this.clickTicketTitle) {
        this.clickTicketId = element._id

      }
    })
    let dialogRef = this.dialog.open(CardDetailComponent, {
      data: {
        ticket_id:this.clickTicketId,
        project_details: this.project_details,
        user_details: this.userData,
        
      },
      height: "80%",
      width: "100%"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("after closed card detail", result);
if(result!=undefined){


      if (result.ticket_activity === 'delete') {
        if (result.ticket_status == 'Ready For QA') {
          const index = this.readyForQA.indexOf(result.ticket_title);
          if (index > -1) { // only splice array when item is found
            this.readyForQA.splice(index, 1); // 2nd parameter means remove one item only
            console.log(index, this.readyForQA);
          }
        }
        else if (result.ticket_status == 'To Do') {
          const index = this.todo.indexOf(result.ticket_title);
          if (index > -1) { // only splice array when item is found
            this.todo.splice(index, 1); // 2nd parameter means remove one item only
          }
        }
        else if (result.ticket_status == 'In Progress') {
          const index = this.inProgress.indexOf(result.ticket_title);
          if (index > -1) { // only splice array when item is found
            this.inProgress.splice(index, 1); // 2nd parameter means remove one item only

          }
        }
        else if (result.ticket_status == 'Done') {
          const index = this.done.indexOf(result.ticket_title);
          if (index > -1) { // only splice array when item is found
            this.done.splice(index, 1); // 2nd parameter means remove one item only

          }
        }
      }
      else {
        if (result.ticket_status == 'Ready For QA') {
          const index = this.readyForQA.indexOf(result.ticket_title);
          if (index > -1) { // only splice array when item is found
            this.readyForQA.splice(index, 1); // 2nd parameter means remove one item only
            console.log(index, this.readyForQA);
          }
        }
        else if (result.ticket_status == 'To Do') {
          const index = this.todo.indexOf(result.ticket_title);
          if (index > -1) { // only splice array when item is found
            this.todo.splice(index, 1); // 2nd parameter means remove one item only
          }
        }
        else if (result.ticket_status == 'In Progress') {
          const index = this.inProgress.indexOf(result.ticket_title);
          if (index > -1) { // only splice array when item is found
            this.inProgress.splice(index, 1); // 2nd parameter means remove one item only

          }
        }
        else if (result.ticket_status == 'Done') {
          const index = this.done.indexOf(result.ticket_title);
          if (index > -1) { // only splice array when item is found
            this.done.splice(index, 1); // 2nd parameter means remove one item only

          }
        }
    console.log("fromOpen clickid", result.ticket_title);
    let result1 = this.tickets.map((element: { ticket_title: any; })=> element.ticket_title);
    console.log("Data::::::::::::::::::::::Hiii",result1);
    
    let targetIndex=result1.indexOf(result.ticket_title)
    this.target_ticket_detail=this.tickets[result1.indexOf(result.ticket_title)];
    if (targetIndex > -1) { // only splice array when item is found
      this.tickets.splice(targetIndex, 1); // 2nd parameter means remove one item only
    }
    console.log("target ticket detail:",this.tickets);
        if (result.ticket_new_Data.ticket_status == 'To Do') {
          this.tickets.push(result.ticket_new_Data)
          this.todo.push(result.ticket_new_Data.ticket_title)
        }
        else if (result.ticket_new_Data.ticket_status == 'In Progress') {
          this.tickets.push(result.ticket_new_Data)
          this.inProgress.push(result.ticket_new_Data.ticket_title)
        }
        else if (result.ticket_new_Data.ticket_status == 'Ready For QA') {
          this.tickets.push(result.ticket_new_Data)
          this.readyForQA.push(result.ticket_new_Data.ticket_title)
        }
        else if (result.ticket_new_Data.ticket_status == 'Done') {
          this.tickets.push(result.ticket_new_Data)
          this.done.push(result.ticket_new_Data.ticket_title)
        }
      }
     
      console.log("hellloooo",this.tickets);
    }
    });
  }

}
