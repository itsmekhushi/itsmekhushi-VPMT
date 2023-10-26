import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
tokendata:any;
  constructor(private toast:NgToastService) {
    // this.tokendata=localStorage.getItem('token')
  }



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request=request.clone({
      setHeaders:{
        accesstoken: localStorage.getItem('token') || ''
      }
    })
    
    return next.handle(request).pipe(
      catchError(this.errorHandle)
    );
   
  }
  errorHandle(error:HttpErrorResponse){
    this.toast.error({detail:"Error",summary:"error while fetching token",duration:5000});
    return throwError(error.message||'server error')
   }
}
