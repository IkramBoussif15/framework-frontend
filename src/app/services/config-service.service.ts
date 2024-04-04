import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComboboxFormat } from '../models/viewFormat/ComboboxFormat.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  comboboxFormat :any
  constructor(private http : HttpClient) { }

  getListEntitiesBusniss(id : any  ):  Observable<any> {

    this.comboboxFormat = new ComboboxFormat();
    this.comboboxFormat.isCombobox = false;
    this.comboboxFormat.seuil = 50;
    this.comboboxFormat.contextDto=null;
return    this.http.put<any>(environment.baseUrl + '/business/entitiesBusiness/deleteCascade/'+id,this.comboboxFormat);
  }


  deleteEntityDataBase(id:any) {
    return this.http.put(environment.baseUrl+ '/business/entitiesBusiness/delete'+'/'+id,id);
  
  }

  deleteField (id :  any ){

    return this.http.put(environment.baseUrl+ '/business/entitiesBusiness/deleteField'+'/'+id,{});
  }
}
