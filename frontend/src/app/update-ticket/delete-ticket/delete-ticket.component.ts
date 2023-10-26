import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from 'src/app/service/project/projects.service';


@Component({
  selector: 'app-delete-ticket',
  templateUrl: './delete-ticket.component.html',
  styleUrls: ['./delete-ticket.component.css']
})
export class DeleteTicketComponent implements  OnInit{

project_Id!:any
  data: any;
d_id : any

constructor(private projectService:ProjectsService,private toast:NgToastService,@Inject(MAT_DIALOG_DATA) public detail: {
  project_id: any,
}){}
ngOnInit(){
  console.log("esefesfsdfdrg",this.detail.project_id);
  // this.getAllDetail()
  // console.log('delete',this.d_id);
  
}
deleteProject(project_Id:number){
  this.projectService.deleteProject(project_Id).subscribe({
    next:(res)=>{
    this.toast.success({detail:"Sucess Message",summary:"Deleted Successfully",duration:2000});

      // this.getAllDetail()
    },
    error:()=>{
      this.toast.success({detail:"Error",summary:"Error while deleting",duration:2000});
    }
  })
 }
//  user_data :any =[]
//  getAllDetail() {
//   this.projectService.getProject({
//     "team_member_id" : this.user_data[0]._id
//   })
//     .subscribe({
//       next: (res) => {

//         console.log(res);
//         this.data = res.Data
//         this.d_id = this.data._id
//         console.log("delete list",this.d_id);
       
//       },
     

    // })
// }
project_id : any
projectData(element : any){
  this.project_id = element._id;
  // @Output() newItemEvent = new EventEmitter<string>();

  // addNewItem
}

}