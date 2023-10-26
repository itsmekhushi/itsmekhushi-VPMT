import {
  Component,
  OnInit,
  Inject
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProjectsService } from "src/app/service/project/projects.service";
import { NgToastService } from "ng-angular-popup";

import { ImageService } from "src/app/service/image/image.service";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})

export class CreateProjectComponent implements OnInit {
  projectForm: FormData = new FormData()
  requiredFileType: any;
  project_title!: any;

  getprofiledata() {
    throw new Error('Method not implemented.');
  }
  fileName = '';
  empForm !: FormGroup;

  data: any;
  name!: string
  minDate!: Date
  currentDate: any = new Date()
  constructor(private imageService: ImageService,
    private toast: NgToastService,
    private projectsService: ProjectsService,
    private fb: FormBuilder,
    private projectservice: ProjectsService,
    private DialogRef: MatDialogRef<CreateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public user_detail: {
      user_id: any;
      user_name: any;
    }) { }

  project_author_name = this.user_detail.user_name
  project_author_id = this.user_detail.user_id
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
  form = new FormGroup({
    editorContent: new FormControl(
      Validators.required()
    ),
  });



  ngOnInit(): void {
    console.log("from dialog", this.project_author_name);
    console.log("this.user_detail", this.user_detail)
    this.empForm = this.fb.group({
      project_title: ['', Validators.required],
      project_author_Name: ['', Validators.required],
      project_description: ['', Validators.required],
      project_start_date: ['', Validators.required],
      project_end_date: ['', Validators.required],
      project_team_members_id: ['', Validators.required],

    })

    this.getUserList()
  }

  project_data: any

  addDetail() {
    console.log('>>>>>>>>>>', this.empForm.value);
    this.empForm.value.project_team_members_id.push(this.project_author_id)
    this.projectForm.append("project_author_id", this.project_author_id);
    this.projectForm.append("project_title", this.empForm.value.project_title);
    this.projectForm.append("project_description", this.empForm.value.project_description);
    this.projectForm.append("project_start_date", this.empForm.value.project_start_date);
    this.projectForm.append("project_end_date", this.empForm.value.project_end_date);
    this.projectForm.append("project_team_members_id", this.empForm.value.project_team_members_id);
    this.projectForm.append("project_status", "On Going");
    this.projectsService.createProject(this.projectForm).subscribe({
      next: (res) => {
        console.log("<<<<<<<<<<<<<<<<<<<<<", res)
        this.toast.success({ detail: "Success", summary: "project added successfully", duration: 2000 });
        this.DialogRef.close(res);
        this.empForm.reset();
      },
      error: () => {
        this.toast.error({ detail: "Error", summary: "Error while adding project", duration: 2000 });
      }
    })
  }
  public myError = (controlName: string, errorName: string) => {
    return this.empForm.controls[controlName].hasError(errorName);
  };

  user_list: any = []
  getUserList() {
    this.projectsService.getUser().subscribe({
      next: (res) => {
        this.user_list = res
        console.log("userlist ", this.user_list);
      }
    })
  }
  // selectedFile!:File
  base64String: any
  onFileSelected(input: any) {
    console.log("onFileSelect : ", input);

    if ( input.files[0]) {
      this.fileData = input.files[0]
      this.projectForm.append('project_attachment', input.files[0])
      
      console.log('>><<><><><>', input.files[0])
    
    }
  }

  base64ToArrayBuffer(base64: any) {
    let binaryString = window.btoa(base64);
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