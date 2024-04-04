import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../src/environments/environment';
import { ComboboxFormat } from '../models/viewFormat/ComboboxFormat.model';

@Injectable({
    providedIn: 'root'
})
export class ComboBoxService {
    comboboxFormat!: ComboboxFormat;
    data: any;

    constructor(private http: HttpClient) {
    }

    getSearchCombobox(url: any, pathVariable: any,combobox: any) {

        return new Promise(
            (resolve, reject) => {
                var critarias = '';
                if (pathVariable != null) {
                    critarias = pathVariable;
                }

                console.log(pathVariable);
                console.log('criterias');
                console.log(critarias);
                let urlfinal = environment.baseUrl + url + '?specs=' + critarias;
                console.log('url');
                console.log(urlfinal);
                this.comboboxFormat = new ComboboxFormat();
                this.comboboxFormat.isCombobox = false;
                this.comboboxFormat.seuil = 50;
                this.comboboxFormat.contextDto=combobox
                this.http.put(urlfinal, this.comboboxFormat)
                    .subscribe((data) => {
                            console.log('success');
                            //  console.log("success",data);
                            this.data = data;
                            resolve(this.data);
                        }
                        , (error) => {
                            console.log('error');
                            console.log(error);
                        },
                        () => {
                            reject(this.data);
                            return this.data;
                        }
                    );
            });


    }


    getSearchComboboxConcept(url: any, pathVariable: any, combobox :any) {

        return new Promise(
            (resolve, reject) => {
                var critarias = '';
                if (pathVariable != null) {
                    critarias = pathVariable;
                }

                console.log(pathVariable);
                console.log('criterias');
                console.log(critarias);
                let urlfinal = environment.baseUrl + url + '?specs=' + critarias;
                console.log('url');
                console.log(urlfinal);
                this.comboboxFormat = new ComboboxFormat();
                this.comboboxFormat.isCombobox = false;
                this.comboboxFormat.seuil = 50;
                this.comboboxFormat.contextDto=combobox
                this.http.put(urlfinal, this.comboboxFormat)
                    .subscribe((data) => {
                            console.log('success');
                            //  console.log("success",data);
                            this.data = data;
                            resolve(this.data);
                        }
                        , (error) => {
                            console.log('error');
                            console.log(error);
                        },
                        () => {
                            reject(this.data);
                            return this.data;
                        }
                    );
            });


    }



    verifyProvionMovement (url : any  , listProvision :any ) :  Observable<any >{


      return     this.http.post<any>(environment.baseUrl+url ,listProvision )  
    }

}
