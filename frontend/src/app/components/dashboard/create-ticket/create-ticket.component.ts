import { Component, Inject,  OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketsService } from '../../../service/ticket/tickets.service';
import { NgToastService } from 'ng-angular-popup';
import { ProfileService } from 'src/app/shared/top-nav/profile.service';
import { ProjectsService } from 'src/app/service/project/projects.service';
import { ImageService } from 'src/app/service/image/image.service';
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})

export class CreateTicketComponent implements OnInit {
  empProject!: FormGroup;
  ticketForm: FormData = new FormData()
  currentDate: any = new Date()
  minDate!: Date;
  requiredFileType: any;
  event: any;

  constructor(
    private toast: NgToastService,
    private fb: FormBuilder,
    private ticketservice: TicketsService,
    private DialogRef: MatDialogRef<CreateTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      project_details: any,
      ticket_id: any,
      user_details:any
    },
    private profileService: ProfileService,
    private projectsService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public datas: any,
    private imageService: ImageService
  ) { }

 
  reporter_name: string = ''
  
        
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
        
        ticket_id = this.data.ticket_id
        user_list: any = []
  ngOnInit(): void {
    // this.reporter_id = this.data.user_details._id
        this.reporter_name = this.data.user_details.user_name
  
    this.project_data=this.data.project_details

    this.user_list=this.project_data.project_team_members_id
    console.log("project_Data:::::::::::::",this.user_list);

    this.empProject = this.fb.group({
      ticket_title: ['', Validators.required],
      ticket_id: ['', Validators.required],
      ticket_assignee_id: ['', Validators.required],
      ticket_description: ['', Validators.required],
      ticket_start_date: ['', Validators.required],
      ticket_end_date: ['', Validators.required],
      // ticket_file: ['',Validators.required]
    })
    this.empProject.patchValue(this.data);

    if (this.data) {
      this.empProject.controls['ticket_id'].setValue(this.ticket_id);


    }
    // this.project_id =  this.route.snapshot.paramMap.get('project_id')
    this.empProject.patchValue(this.datas)

  }

  ticketData: any = {}

 
  addTicket() {
    console.log('>>>>>>>>>>', this.empProject.value)
    this.ticketForm.append("ticket_id", this.empProject.value.ticket_id);
    this.ticketForm.append("ticket_project_id", this.project_data._id);
    this.ticketForm.append("ticket_status", "To Do");
    this.ticketForm.append("ticket_title", this.empProject.value.ticket_title);
    this.ticketForm.append("ticket_assignee_id", this.empProject.value.ticket_assignee_id);
    this.ticketForm.append("ticket_description", this.empProject.value.ticket_description);
    this.ticketForm.append("ticket_start_date", this.empProject.value.ticket_start_date);
    this.ticketForm.append("ticket_end_date", this.empProject.value.ticket_end_date);
    console.log("ticketForm from add Ticket",this.ticketForm);
    
    this.ticketservice.createTicket(this.ticketForm).subscribe({
      next: (res) => {
        console.log("<<<<<<<<<<<<<<<<<<<<<", res)
        this.toast.success({ detail: "Success", summary: "ticket added successfully", duration: 2000 });
        this.empProject.reset();
        this.DialogRef.close(res);
      },
      error: () => {
        this.toast.error({ detail: "Error", summary: "Error while adding tickets", duration: 2000 });
      }
    })


  }
  public myError = (controlName: string, errorName: string) => {
    return this.empProject.controls[controlName].hasError(errorName);
  };
  base64String: any
  onFileSelect(input: any) {
    console.log("onFileSelect : ", input);

    if ( input.files[0]) {
      this.fileData = input.files[0]
      this.ticketForm.append('ticket_attachment', input.files[0])
    }
  }

  base64ToArrayBuffer(base64: any) {
    let binaryString = window.atob(base64);
    let bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
  onStartDate(selectedDate: Date) {
    this.minDate = selectedDate;
  }
  fileData: any = ''


}


