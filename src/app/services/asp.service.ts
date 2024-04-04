import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AspService {
  aspType!: Object;
  userAspDto: any;
  constructor(private http: HttpClient) { }
 
  postUserAsp() {
    return this.http.post(environment.baseUrl + '/business/userAsp/getAspUser', this.userAspDto);
  }

  postAspChild(aspChild: any, level: any): any {
    return this.http.post(environment.baseUrl + '/business/userAsp/getAspChild/' + level, aspChild, level);
  }

  postAspDetails(aspDetails: any) {
    return this.http.post(environment.baseUrl + '/business/userAsp/aspUserDetails', aspDetails);
  }

  getAllAspType() {
    return new Promise(
      (resolve, reject) => {
        this.http.get(environment.baseUrl + '/business/aspTypes/findAll')
          .subscribe((data) => {
            console.log('success');
            console.log(data);
            this.aspType = data;
            resolve(this.aspType);
          }
            , (error) => { console.log('error'); },
            () => {
              reject(this.aspType);
              return this.aspType;
            }

          );
      }
    );

  }


}



