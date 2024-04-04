import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AspAuthGuardService implements CanActivate  {

  constructor(public router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   

      if (localStorage.getItem("token") !== null && this.router.url !="auth/asp" && this.router.url !="/auth/login") { 
        console.log("condition 1")
        this.router.navigate(["/",this.router.url]);
        return true;
      }else if(localStorage.getItem("token") !== null && this.router.url =="auth/asp" || this.router.url =="/auth/login"){
        console.log("condition 2")
        return true
      }else if(localStorage.getItem("token") === null){
        console.log("condition 3")
        this.router.navigateByUrl("/welcomePage")
      }
      return true
    }
}
