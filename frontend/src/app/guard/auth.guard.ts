import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authservice: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authservice.loggedIn()) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
  //canActivated(
 //   next:ActivatedRouteSnapshot,
////    state:RouterStateSnapshot
 // ):boolean{
  //  const currenUrl=state.url;
    //if(currenUrl.includes('/login')){
    //  return true;
   // }else{
     // this.router.navigate(['/login']);
  //    return false;
  //  }
 // }
}

