import { Component, Inject } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

import { ProfileService } from 'src/app/shared/top-nav/profile.service';
import { ProjectsService } from 'src/app/service/project/projects.service';
import { TicketsService } from '../service/ticket/tickets.service';



@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent {
  empProject!: FormGroup;
  ticketForm: FormData = new FormData()
  currentDate: any = new Date()
  minDate!: Date;
  requiredFileType: any;

  constructor(
    //   @Inject(MAT_DIALOG_DATA) public datas: {
    //   project_id: any,
    //   ticket_id: any
    // },
    private DialogRef: MatDialogRef<UpdateTicketComponent>,
    private toast: NgToastService,
    private ticketService: TicketsService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private projectsService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: { ticket_Detail: any, project_details: any, user_details: any }) { }
  reporter_id: any
  reporter_name: string = ''
  temp_profile: any = []
  selected = this.data.ticket_Detail.ticket_assignee_id._id
  // getUser() {

  //   this.profileService.getUser().subscribe((res) => {
  //     this.temp_profile = res
  //     console.log("temp profile", this.temp_profile);

 
  //     console.log("from create ticket", this.reporter_name)
  //   })
  // }
  user_list: any = []


  // getUserList() {
  //   this.projectsService.getUser().subscribe({
  //     next: (res) => {
  //       this.user_list = res
  //       console.log("userlist ", this.user_list);
  //     }
  //   })
  // }

  editor: Editor = new Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
 
  project_data: any
  // sdate:any
  ngOnInit(): void {
    console.log("ticket Data from update ::::::", this.data);
    // this.getUser()
    this.reporter_id = this.data.user_details._id
    this.reporter_name = this.data.user_details.user_name
   

    this.user_list = this.data.project_details.project_team_members_id
    console.log("project_Data:::::::::::::", this.user_list);

    console.log("empProject Value", this.empProject);

    this.empProject = this.fb.group({
      ticket_title: ['', Validators.required],
      ticket_id: ['', Validators.required],
      ticket_assignee_id: ['', Validators.required],
      ticket_description: ['', Validators.required],
      ticket_status: ['', Validators.required],
      ticket_start_date: ['', Validators.required],
      ticket_end_date: ['', Validators.required]
    })
    this.empProject.patchValue(this.data.ticket_Detail);

  }
  oldData: any = {
    ticket_activity: 'update',
    ticket_title: this.data.ticket_Detail.ticket_title,
    ticket_status: this.data.ticket_Detail.ticket_status,
  
  }

  ticketData: any = {}
  updateTicket() {
    // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>', this.empProject.value)
    this.empProject.value._id = this.data.ticket_Detail._id;
    if (this.empProject.valid) {
      this.ticketService.updateTicket(this.empProject.value)
        .subscribe({
          next: (res) => {
            this.toast.success({ detail: "Success", summary: "ticket updated successfully", duration: 3000 });
            this.oldData.ticket_new_Data = res
            this.oldData.ticket_new_Data = this.oldData.ticket_new_Data.Data[0]

            this.DialogRef.close(this.oldData)
            this.empProject.reset()

          },
          error: () => {
            this.toast.error({ detail: "Error", summary: "Error while updating ticket", duration: 5000 });
          }
        })
    }

  }

  onStartDate(selectedDate: Date) {
    this.minDate = selectedDate;
  }

}
