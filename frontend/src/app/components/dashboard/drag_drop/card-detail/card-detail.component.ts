import { Component, Inject, OnInit} from '@angular/core';
import { GetCardDataService } from '../../../../service/getCardTicketDetails/get-card-data.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { TicketsService } from 'src/app/service/ticket/tickets.service';
import { UpdateTicketComponent } from 'src/app/update-ticket/update-ticket.component';
import {ImageService} from 'src/app/service/image/image.service'
import { ConfirmationPopupComponent } from '../../confirmation-popup/confirmation-popup.component';

import { ImageComponent } from "../../image/image.component";

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
  
})
export class CardDetailComponent implements OnInit{

  temp_ticket: any;
  constructor(
    public dialog:MatDialog,
    private ticketService:TicketsService,
    private toast:NgToastService,
    private getCardDataService:GetCardDataService,
    private dialogreference: MatDialogRef<CardDetailComponent, any>,
    @Inject(MAT_DIALOG_DATA) public data: {ticket_id:any,project_details:any,user_details:any},
    private Imageservice:ImageService) {}
  //=====================to send ticket id in api
  
  body={
    _id : this.data.ticket_id
  }
  isLoaded=false
  ngOnInit(): void{
    console.log("ticket_id",this.data);
    this.getDetail()

  }
  cartitems:any
  ticket_details:any | []
  boxColor: string = ''
  item:any
  userData=this.data.user_details
  imgAvailable:any
  //===================================Get Detail API Handling======================================
  getDetail(){
    console.log("ticket id from drag and drop ",this.body);
    this.getCardDataService.cardData(this.body).subscribe({
      next:(res)=>{
        this.ticket_details=res
        this.ticket_details=this.ticket_details.Data[0]
        this.isLoaded=true
        console.log('========',this.ticket_details);  
        console.log("Data",this.ticket_details.ticket_attachment[0]);
        
           if(this.ticket_details.ticket_status=='To Do') {
            this.boxColor ='orange'
          }else if(this.ticket_details.ticket_status=='In Progress'){
            this.boxColor ='red'
          }else if(this.ticket_details.ticket_status=='Ready For QA'){
            this.boxColor ='blue'
          }else if(this.ticket_details.ticket_status=='Done'){
            this.boxColor ='green'
          }
          this.imgAvailable =this.ticket_details.ticket_attachment[0].data
          if(this.imgAvailable!=null){

        
          this.ticket_details.ticket_attachment.map((data: any) => {
            data = `data:images/png;base64, ${window.btoa(new Uint8Array( this.ticket_details.ticket_attachment[0].data.data).reduce(function (base64,byte)
                 {
                  
                  return base64 + String.fromCharCode(byte);
                },
                '')
                )}`;
                this.item=data
                console.log("getticket data : ",data)

              });
              this.cartitems =this.ticket_details.ticket_attachment;
            } 
             
   },
   error:()=>{
    this.toast.error({detail:"Error",summary:"while deleting",duration:5000});
  }
   
  })
}
zoomImage(){
   this.dialog.open(ImageComponent, {
    data: {
      image: this.item,
    },
    height: "80%",
    width: "80%"
  });
}
    updated:any
    editTicket(ticket_id:any){
  console.log("inside diALOG STARTING",this.ticket_details);
  
      const dialogref= this.dialog.open(UpdateTicketComponent, {
        data: {
          ticket_Detail: this.ticket_details,
          project_details: this.data.project_details,
          user_details:this.userData
        }
      });
       console.log("edit ",this.data)
       dialogref.afterClosed().subscribe({
         next:(val)=>{
          this.updated=val
           this.dialogreference.close(this.updated)
         }     
       })
       
      }
      
      
       oldData:any
       openDialog(ticket_id:number,ticket_title:any,ticket_status:any) {
        const dialogRef = this.dialog.open(ConfirmationPopupComponent,{
          data:{
            message: 'Are you sure? You want to delete?',
            buttonText: {
              ok: 'Delete',
              cancel: 'Cancel'
            }
          },
          
        });
        
        this.oldData ={
          ticket_activity:'update',
          ticket_title: ticket_title,
          ticket_status: ticket_status
        }

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed) {
            console.log("from delete popup",ticket_id);
            
            this.ticketService.deleteTicket({_id : ticket_id}).subscribe({
              next:(res)=>{
                this.toast.success({detail:"Deleted",summary:"Deleted data",duration:5000});
                   this.updated=this.oldData
                    this.dialogreference.close(this.updated)
              },
              error:()=>{
                this.toast.error({detail:"Error",summary:"while deleting",duration:5000});
              }
            })
            
          }
        });
      }

}
