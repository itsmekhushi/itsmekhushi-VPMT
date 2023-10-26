import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { ImageService } from 'src/app/service/image/image.service';
import { ProjectsService } from 'src/app/service/project/projects.service';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-view-project-detail',
  templateUrl: './view-project-detail.component.html',
  styleUrls: ['./view-project-detail.component.css']
})
export class ViewProjectDetailComponent implements OnInit {


  @ViewChild('imageElement') imageElement: any;
  imageData: any;
  public imageSrc!: string;
  imageUrls!: string;
  imageToShow!: any
  public snippet!: ArrayBuffer
  image!: ArrayBuffer;
  length: any;

  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer, private imageService: ImageService, private toast: NgToastService, private projectService: ProjectsService, @Inject(MAT_DIALOG_DATA) public data: {
    project_id: any,

  }) { }

  ngOnInit(): void {

    console.log(this.data.project_id);
    this.getProjectDetails();

  }
  project_details: any
  logo: any
  team_member: any
  item: any
  isLoaded = false
  getProjectDetails() {
    this.projectService.getDetail({
      "_id": this.data.project_id
    })
      .subscribe({
        next: (res) => {
          this.project_details = res
          console.log("from view project", res);
          this.project_details.Data.shift()
          this.project_details = this.project_details.Data[0]
          this.isLoaded = true
          this.team_member = this.project_details.project_team_members_id
          this.getIntials(this.team_member)
          console.log("this.project_details", this.project_details);
          console.log("project_attachments :", this.project_details.project_attachment);


          this.project_details.project_attachment.map((data: any) => {
            data = `data:images/png;base64, ${window.btoa(new Uint8Array(this.project_details.project_attachment[0].data.data).reduce(function (base64, byte) {
           
              return base64 + String.fromCharCode(byte);
            },
              '')
            )}`;
            this.item = data
            console.log("getproject attachment data : ", this.item)

          });


          if (this.project_details.length == 0) {
            this.toast.info({ detail: "Message", summary: "Oops!!!There is no project for you", duration: 2000 });

          }
        },
        error: (err) => {
          this.toast.error({ detail: "Message", summary: "Error While fecthing Details", duration: 2000 });

        }

      })
  }

  zoomImage() {
    this.dialog.open(ImageComponent, {
      data: {
        image: this.item,
      },
      height: "80%",
      width: "80%"
    });
  }

  TYPED_ARRAY: any
  STRING_CHAR: any
  base64String: any
  imageurl: any
  getImage() {
    this.imageService.getImage({ data: 67890 }).subscribe({
      next: (res: any) => {
        console.log("image", res);

        this.TYPED_ARRAY = new Uint8Array(res);
        this.STRING_CHAR = String.fromCharCode.apply(null, this.TYPED_ARRAY);
        this.base64String = window.btoa(this.STRING_CHAR);
     this.imageurl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ` + this.base64String);
        console.log('image:::::::::::::::::::', this.imageurl);

      }, error: (err: any) => {
        console.log(err);

      }
    }
    )
  } images: any


  teamLetters: any = []
  initials: string = ''
  parts: any
  getIntials(team_member: any) {
    console.log("team members::::::", team_member);

    for (let arr = 0; arr < team_member.length; arr++) {
      this.parts = (team_member[arr].user_name).split(' ')
      for (const part of this.parts) {
        console.log("parts:::::::", this.parts);
      
        if (part.length > 0 && part !== '') {
          this.initials += part[0];
        }
      }
      
      
      console.log("initals:::::::::::::", this.initials);
      this.team_member[arr].initals = this.initials
      this.teamLetters.push(this.initials)
      this.initials = ''
    }
    console.log("teamletters:::::::::", this.team_member);

  }


}


