import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';
import { DataShareService } from 'src/app/services/data-share.service';

const TOKEN_HEADER_KEY = 'Authorization';  // for Spring Boot back-end

@Injectable({
  providedIn: 'root'
})
export class InterceptorServiceService implements HttpInterceptor {

  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public isRunning!: Boolean;
  pendingRequestsCount = 0;



  constructor(private router: Router, private authService: AuthServiceService, private dataShareService: DataShareService) { }


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.pendingRequestsCount++;
    console.log("pending request ++ :"+this.pendingRequestsCount)
    this.dataShareService.pendingRequest.next(this.pendingRequestsCount);
    localStorage.setItem("pendingCount", this.pendingRequestsCount.toString())





    let authReq = request;
    const token = localStorage.getItem("token");

    if (token != null) {
      authReq = this.addTokenHeader(request, token);
    }

    return next.handle(authReq).pipe(


      tap(
        event => {


          if (event instanceof HttpResponse) {
            // console.log("event :",event)
            // console.log('service running interceptor')
            this.isRunning = true
            //console.log('isRunning in interceptor true  :',this.isRunning)
            this.dataShareService.SharingData.next(this.isRunning);




          }

        },
        error => {
          if (error instanceof HttpErrorResponse) {
            //console.log('http error intercepted')
            const httpErrorCode: number = error['status'];
            // switch (httpErrorCode) {
            //   case 404:
            //     this.router.navigate(['/notfound']);
            //     this.isRunning = false;
            //     //console.log('isRunning in interceptor false  :',this.isRunning)
            //     return throwError(error);
            //   case 403:
            //     //console.log("access denied");
            //     this.isRunning = false;
            //   //console.log('isRunning in interceptor false 1  :',this.isRunning)
            //   case 401:
            //     //console.log("error 401");     
            //     this.isRunning = false;
            //     console.log('isRunning in interceptor false 2  :', this.isRunning);
            //     return this.handle401Error(authReq, next);

            //   default:
            //     console.log(
            //       'Sorry! something went wrong.',
            //       'Error!'
            //     );
            //     return throwError(error);
            // }


          }
        }), finalize(() => {
          this.pendingRequestsCount--
          console.log("pending  request final :" + this.pendingRequestsCount)
          this.dataShareService.pendingRequest.next(this.pendingRequestsCount);
          localStorage.setItem("pendingCount", this.pendingRequestsCount.toString())




        })





      // catchError((error) => {
      //     if (error instanceof HttpErrorResponse) {
      //     const httpErrorCode: number = error['status'];
      //     switch (httpErrorCode) {
      //         case 404:
      //           this.router.navigate(['/notfound']);
      //           return throwError(error);
      //           case 403:
      //         console.log("access denied");
      //         case 401:
      //           console.log("error 401");      
      //           return this.handle401Error(authReq, next);

      //         default:
      //           console.log(
      //             'Sorry! something went wrong.',
      //             'Error!'
      //           );
      //           return throwError(error);
      //        }
      //        } else {
      //          return throwError(error);
      //        }
      //    })


    );


  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      const token =JSON.parse(localStorage.getItem('refreshToken') as string);
      // localStorage.getItem("refreshToken") ;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);
      return this.authService.refreshToken(token).pipe(
        switchMap((Token: any) => {
          console.log('updating on 401');
          // Updating new token in cookie
          localStorage.setItem("token", Token.accessToken)
          this.tokenSubject.next(Token.accessToken);
          return next.handle(
            this.addTokenHeader(request, Token.accessToken)
          );
        }),
        catchError((error) => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          console.log("this.logoutUser()");
          //this.authService.logout()
          return throwError('');
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          return next.handle(this.addTokenHeader(request, token));
        })
      );
    }
  }



  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });


  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorServiceService, multi: true }
];