import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {

  constructor(public router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem("token") !== null && this.router.url !== "/abstractdashboard") {
        console.log("condition 1")
        this.router.navigate(["/abstractdashboard"]);
        return false;
      }else if(localStorage.getItem("token") !== null && this.router.url === "/abstractdashboard"){
        console.log("condition 2 url")
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
        return false
      }
        return true
      
    }
}
