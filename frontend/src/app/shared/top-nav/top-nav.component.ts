import { Component, EventEmitter,  Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',

  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  @Output() sideNavToggled=new EventEmitter<boolean>();
menuStatus:boolean=false;
  public mydata:any;
name!:string;

  

isCollapsed:boolean = true;
profile :any
  temp_profile :any;
showlink=true;
showprojectlink=true;
showticketlink=true;


  constructor(private router:Router,private profileserice:ProfileService,public authService:AuthService,private toast:NgToastService,private dialog:MatDialog){
    
    router.events.subscribe((val)=>{
      if(router.url==='/project'){
        this.showprojectlink=true;
        
        this.showticketlink=false;

      }
      else if(router.url==='/project/ticket'){
        this.showprojectlink=true;
     
        this.showticketlink=true;

      }
      else if(router.url==='/drag_drop'){
        this.showticketlink=true;
    
        this.showprojectlink=true;


      }
      else if(router.url==='/login'){
        this.showprojectlink=false;
       
        this.showticketlink=false;

      }
      else if(router.url==='/dashboard'){
        this.showprojectlink=true;
       
        this.showticketlink=false;

      }
      else if(router.url==='/project/:project_id'){
        this.showprojectlink=true;
       
        this.showticketlink=true;

      }
    }
  )}
  

  logout(){
     this.dialog.closeAll();
    localStorage.removeItem('token')
    
  this.router.navigate(['login'])
  this.toast.success({detail:"Sucess Message",summary:"Logout Sucessful",duration:5000});
  }
     
  
  SideNavToggle(){
      this.menuStatus=!this.menuStatus;
      this.sideNavToggled.emit(this.menuStatus)
  }
  
}
