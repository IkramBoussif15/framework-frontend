import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  test: any;


  url1 = environment.baseUrl + '/business/scan/entities';
  url2 = environment.baseUrl + '/business/scan/services';
  url3 = environment.baseUrl + '/business/scan/composants';
  url4 = environment.baseUrl + '/business/scan/menus';
  url5=environment.baseUrl+'/business/update/entity';
  url6= environment.baseUrl+'/generator/historyTaskByprefileGenerator'
  url7 = environment.baseUrl + '/business/scan/dtos';
  url8 = environment.baseUrl + '/business/scan/methods';
  url9 = environment.baseUrl + '/business/scan/composantDashboard'
  url10 =environment.baseUrl + '/business/abanca/getNotification';
  url11 =environment.baseUrl +'/business/scan/scanAccounting'

  url12 =environment.baseUrl +''

  constructor(private http: HttpClient) {
    
   }

  ScanEntities() {
    return this.http.get<any[]>(this.url1);

  }
  ScanServices() {
    return this.http.get<any[]>(this.url2);

  }
  ScanComposants() {
    return this.http.get<any[]>(this.url3);

  }
  ScanMenus() {
    return this.http.get<any[]>(this.url4);

  }
  UpdateEntity()
  {
    return this.http.get(this.url5);
  }
  generateHistory(date:any)
  {
    return this.http.get(this.url6+"/"+date);


  }

  ScanDtos() {
    return this.http.get<any[]>(this.url7);

  }
  ScanMethods() {
    return this.http.get<any[]>(this.url8);

  }
  ScanComposantDashboard() {
    return this.http.get<any[]>(this.url9);

  }
  
  getNotificationTeste(){
   
    return this.http.get<any[]>(this.url10);


  }
  getAccref(){
    return this.http.get<any[]>(this.url11);

  }
  genICompta(){
    return this.http.get<any[]>(this.url12);

  }
}
