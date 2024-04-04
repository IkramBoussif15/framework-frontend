import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { LoginRequest } from '../ModelsAuth/login-request'
import { JwtResponse } from '../ModelsAuth/jwt-response'
import { Router } from '@angular/router';
const API_USERS_SPRING_URL = environment.baseUrl + '/authAlgebra/loginUserAlgebra/';
const API_REFRESH_TOKEN_URL = environment.baseUrl + '/authAlgebra/refreshtoken/';
const API_TIMER_URL = environment.baseUrl + '/authAlgebra/timer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient,private router: Router
    ) { }



  login(loginRequest: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(API_USERS_SPRING_URL, loginRequest);

  }

  refreshToken(token: string) {
    return this.http.post(API_REFRESH_TOKEN_URL, {
      refreshToken: token
    }, httpOptions);
  }


  TimerSession(): Observable<any>{
    return this.http.get(API_TIMER_URL)
  }
 

  
}
