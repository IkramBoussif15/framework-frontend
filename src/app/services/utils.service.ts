import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) {
  }


  postData(data : any,url:any): Observable<any> {
    return this.http.post(environment.baseUrl +url,data);
  }

  
  sendSupportEmail(incidenceMsg : any): Observable<any> {
    return this.http.post(environment.baseUrl +'/business/utilities/sendSupportEmail',incidenceMsg);
  }

}
