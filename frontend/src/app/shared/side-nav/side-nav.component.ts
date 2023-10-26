import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth/auth.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  @Input() sideNavStatus:boolean=false;

  profile: any;
name: any;
constructor(private dialog:MatDialog,private router:Router,private toast:NgToastService,public authService:AuthService,){
  
}

openDialog() {
  console.log("from dailog",this.profile);

 this.dialog.open(ProfileComponent, {
    height: "60%",
    width: "25%"
  });
}
logout(){
   this.dialog.closeAll();
  localStorage.removeItem('token')
  
this.router.navigate(['login'])
this.toast.success({detail:"Sucess Message",summary:"Logout Successful",duration:5000});
}
loggedIn(){
  return !! localStorage.getItem('token')
}
}
