import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppinfoService {

  constructor(private http: HttpClient) { }
 
  
  getApplicationVersion() {
    return this.http.get(environment.baseUrl + '/info/version');
  }
}
