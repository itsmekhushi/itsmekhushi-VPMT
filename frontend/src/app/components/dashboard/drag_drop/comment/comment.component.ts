import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ProfileService } from '../../../../shared/top-nav/profile.service';
import { CommentService } from '../../../../service/comment/comment.service'


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  constructor(private toast: NgToastService, private commentService: CommentService, private profileService: ProfileService) { }

//   //  date = new Date().toISOString();
//   //  isoDate = new Date(this.date);
//   // createdAt.toDateString()
//   //==================Dummy Data====================
  user_name: string = ""
  user_id: any

//   // ===================get ticket_id from drag-drop component==========================
  @Input() ticket_details: any
  @Input() ticket_id: any
@Input() user_details:any

  ngOnInit() {
    console.log("ticket id from comment"); 
    this.user_id = this.user_details._id
    this.user_name = this.user_details.user_name
    console.log("qwerdtfygjhgfdwsadfgh", this.user_id,this.user_name)

    // this.getUser(),
      this.getInitalComment()
  }
  //result.Data[0].attachment.data.data
//   //=====================temp Array=====================
  comment: any = []
  tempComment: any = []

//   // ===============================Array fro maincomment and reply comment=============================
  mainComment: any = []
  reply: any = []

//   // =================request body for add comment====================
  body: {
    "comment_body": string,
    "user_id": string,
    "parent_id": string,
    "ticket_id": any
  } = {
      "comment_body": "",
      "user_id": "",
      "parent_id": "",
      "ticket_id": ''
    }
// //===============================By default Value for edit box==============================
  editValue: string = ""
  replyValue: string = ``
//   //=================================Display handling=====================
  editCommentStatus = "none"
  replyStatus = "none"
  commentStatus = "none"
  status = "block"
init(){
  this.editCommentStatus = "none"
  this.replyStatus = "none"
  this.commentStatus = "none"
  this.status = "block"
}
  changeStatus() {
    if (this.status == "block" || this.commentStatus == "block") {
      this.status = "none";
      this.commentStatus = "none"
      this.replyStatus = "block"
      this.editCommentStatus = "none"
    }
    else {
      this.status = "block";
      this.commentStatus = "none"
      this.replyStatus = "none"
      this.editCommentStatus = "none"
    }

  }
  commentStatusChange() {
    this.status == "block" ? this.status = "none" : this.status = "block";
    this.commentStatus === "block" ? this.commentStatus = "none" : this.commentStatus = "block";
  }
  editStatusChange() {
    if (this.status == "block" || this.commentStatus == "block") {
      this.status = "none";
      this.commentStatus = "none"
      this.editCommentStatus = "block"
      this.replyStatus = "none"
    }
    else {
      this.status = "block";
      this.commentStatus = "none"
      this.editCommentStatus = "none"
      this.replyStatus = "none"

    }
  }
// //============================Add Comment API handling===================================
  addComment(data: any) {
    this.body = {
      "comment_body": data,
      "user_id": this.user_id,
      "parent_id": "000000000000000000000000",
      "ticket_id": this.ticket_id
    }
    this.commentService.addComment(this.body).subscribe({
      next: (res) => {
        this.init()
        this.getComment()
      },
      error: (err) => {
        this.toast.error({ detail: "Error", summary: "Error while adding comment", duration: 5000 });
      }
    }
    )
  }

//   // ==========================Delete Comment API handling ===========================
  deleteComment(data: any) {
    this.commentService.deleteComment({ id: data._id }).subscribe({
      next: (res) => {
        this.getComment()
      },
      error: (err) => {
        this.toast.success({ detail: "Error", summary: "Error while deleting comment", duration: 5000 });
      }
    }
    )
  }

//   //===========================get Target Comment Data==========================
  targetCommentData: any
  getTargetCommentData(data: any) {
    this.editValue = data.comment_body
    this.replyValue = "@" + data.user_id.user_name + " "
    // this.replyValue = `<b>${this.replyValue}</b> `
    this.targetCommentData = data
    console.log("target comment", this.targetCommentData.user_id.user_name);

  }


//   //=======================================update Comment API handling================
  updateComment(data: any) {
    this.targetCommentData.comment_body = data
    this.commentService.updateComment(this.targetCommentData).subscribe({
      next: (res) => {
        this.init()
        this.getComment()
      },
      error: (err) => {
        this.toast.error({ detail: "Error", summary: "error while updating comment", duration: 5000 });
      }
    })
  }
// //=============================================Add reply =======================
  addReply(data: any) {
    this.body = {
      "comment_body": data,
      "user_id": this.user_id,
      "parent_id": this.targetCommentData._id,
      "ticket_id": this.ticket_id
    }
    console.log("body from reply",this.body);
    
    this.commentService.addComment(this.body).subscribe({
      next: (res) => {
        this.init()
        this.getComment()
      
      },
      error: (err) => {
        this.toast.error({ detail: "Error", summary: "error while getting comment", duration: 5000 });
      }
    }
    )
  }

//   // ===================================Get Comment API==============================
getComment() {
  this.mainComment = []
  this.reply = []
  this.commentService.getComment({
    _id: this.ticket_id
  }).subscribe({
    next: (res) => {
      this.tempComment = res;
      this.comment = this.tempComment.Data[0].ticket_comment_id
      this.comment.forEach((element: any) => {

        let date = new Date(element.createdAt);
        const event = new Date(date.toUTCString())
        element.createdAt = ((date.toDateString().substring(0, 20)) + ',' + (event.toLocaleTimeString('en-US')));


        if (element.parent_id == "000000000000000000000000") {
          this.mainComment.unshift(element)
        }
        else {
          this.reply.push(element)
        }
      })
      console.log("Comments", this.mainComment);
      console.log("Replies", this.reply);
    },
    error: (err) => {
      this.toast.error({ detail: "Error", summary: "Fetching data", duration: 5000 });
    }
  }
  )
}


  getInitalComment() {
    this.mainComment = []
    this.reply = []
    // this.commentService.getComment({
    //   _id: this.ticket_id
    // }).subscribe({
      // next: (res) => {
        this.tempComment = this.ticket_details;
        console.log("from comment",this.tempComment);
        
        this.comment = this.tempComment.ticket_comment_id
        this.comment.forEach((element: any) => {

          let date = new Date(element.createdAt);
          const event = new Date(date.toUTCString())
          element.createdAt = ((date.toDateString().substring(0, 20)) + ',' + (event.toLocaleTimeString('en-US')));


          if (element.parent_id == "000000000000000000000000") {
            this.mainComment.unshift(element)
          }
          else {
            this.reply.push(element)
          }
        })
        console.log("Comments", this.mainComment);
        console.log("Replies", this.reply);
      // },
      // error: (err) => {
      //   this.toast.error({ detail: "Error", summary: "Fetching data", duration: 5000 });
      // }
    }
    // )
  // }

  temp_profile: any


  // getUser() {

  //   this.profileService.getUser().subscribe((res) => {
  //     this.temp_profile = res
  //     console.log("temp profile", this.temp_profile);

 

  //   })
  // }
}
