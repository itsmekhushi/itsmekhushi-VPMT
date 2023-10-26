import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router, private authservice: AuthService,private toast:NgToastService) {
    
  }
  
  formGroup!: FormGroup;

  ngOnInit(): void {
    this.initform();

    if(this.authservice.loggedIn()){
      this.router.navigate(['dashboard'])
    }
    
  }
  initform() {
    this.formGroup = new FormGroup({
      user_email: new FormControl('', [Validators.required, Validators.email]),
      user_password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

 
  responsedata: any;


get user_email() {
    return this.formGroup.get('user_email')
  }

  get user_password() {
    return this.formGroup.get('user_password')
  }

  proceedLogin() {
    if (this.formGroup.valid) {
      this.authservice.login(this.formGroup.value).subscribe(result => {
        if (result!==null) {
          console.log(result)
          this.responsedata = result;
          this.toast.success({detail:"Success Message",summary:"Login Success",duration:6000});
          localStorage.setItem('token', this.responsedata.Data)
          this.router.navigate(['dashboard']);
        }
      },err=>{
        this.toast.error({detail:"Error Message",summary:"Invalid Username or Password",duration:6000});
      })
    }

  }

}
