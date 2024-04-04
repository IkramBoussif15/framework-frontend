import {Injectable} from '@angular/core';
import {environment} from '../../../src/environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { ContextDto } from '../models/context/ContextDto.model';
import { ComboboxFormat } from '../models/viewFormat/ComboboxFormat.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
nifHolder:any
    public static REMOTE_ADDRESS = environment.baseUrl;
    public static API_STRUCTURE = DataService.REMOTE_ADDRESS + '/business/viewTab';
    public static API_LIST_TABS_PREFILE = DataService.REMOTE_ADDRESS + '/business/prefile/UpdateViewProduct';
    private addressDataSubject = new BehaviorSubject<any>(null);
    addressData$ = this.addressDataSubject.asObservable();

    private valueNotEmptyOfParent :  BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    data: any;
    comboboxFormat: ComboboxFormat = new ComboboxFormat;

    constructor(private http: HttpClient) {
    }

    setValueNotEmptyOfParent(value: boolean) {
        this.valueNotEmptyOfParent.next(value);
     }

     getValueNotEmptyOfParent(){
        return this.valueNotEmptyOfParent.asObservable();
     }
  
   setAddressData(dataAddres: any): void {
    this.addressDataSubject.next(dataAddres);
   }

    getAddress(url :any) {
        return new Promise(
            (resolve, reject) => {
                this.http.get(environment.baseUrl + url)
                    .subscribe((data) => {
                            console.log('success');
                            console.log(data);
                            this.data = data;
                            resolve(this.data);
                        }
                        , (error) => {
                            console.log('error');
                        },
                        () => {
                            reject(this.data);
                            return this.data;
                        }
                    );
            });
    }

    getDataspecific(url: any) {

        return new Promise(
            (resolve, reject) => {


                this.http.post(environment.baseUrl + url, null)
                    .subscribe((data) => {
                            console.log('success');
                            console.log(data);
                            this.data = data;
                            resolve(this.data);
                        }
                        , (error) => {
                            console.log('error');
                        },
                        () => {
                            reject(this.data);
                            return this.data;
                        }
                    );
            });
    }

    getDataspecificDoc() {

        return new Promise(
            (resolve, reject) => {


                this.http.post(environment.baseUrl + '/business/document/saveGlobal', null)
                    .subscribe((data) => {
                            console.log('success');
                            console.log(data);
                            this.data = data;
                            resolve(this.data);
                        }
                        , (error) => {
                            console.log('error');
                        },
                        () => {
                            reject(this.data);
                            return this.data;
                        }
                    );
            });
    }

    getData(url: any) {

        return new Promise(
            (resolve, reject) => {


                this.http.get(environment.baseUrl + url)
                    .subscribe((data) => {
                            console.log('success');
                            console.log(data);
                            this.data = data;
                            resolve(this.data);
                        }
                        , (error) => {
                            console.log('error');
                        },
                        () => {
                            reject(this.data);
                            return this.data;
                        }
                    );
            });
    }

    getSearchData(url: any, pathVariable: any) {
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
                this.http.put(urlfinal, this.comboboxFormat)
                    .subscribe((data) => {
                            console.log('success');
                            console.log(data);
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

    getGridSearchCombobox(id: any, pathVariable: any) {

        return new Promise(
            (resolve, reject) => {
                var critarias = '';
                if (pathVariable != null) {
                    critarias = pathVariable;
                }

                console.log(pathVariable);
                console.log('criterias');
                console.log(critarias);

                let urlfinal = environment.baseUrl + '/business/view/allViewList/' + id + '?specs=' + critarias;
                console.log('url');
                console.log(urlfinal);
                this.comboboxFormat = new ComboboxFormat();
                this.http.put(urlfinal, this.comboboxFormat)
                    .subscribe((data) => {
                            console.log('success');
                            console.log(data);
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


    getCorruptedDocumentList(id: any, pathVariable: any) {

        return new Promise(
            (resolve, reject) => {
                var critarias = '';
                if (pathVariable != null) {
                    critarias = pathVariable;
                }

                console.log(pathVariable);
                console.log('criterias');
                console.log(critarias);

                let urlfinal = environment.baseUrl + '/business/document/getCorruptedDocuments/' + id + '?specs=' + critarias;
                console.log('url');
                console.log(urlfinal);
                this.comboboxFormat = new ComboboxFormat();
                this.http.put(urlfinal, this.comboboxFormat)
                    .subscribe((data) => {
                            console.log('success');
                            console.log(data);
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

    getGridSearchComboboxCustom(id: any, idGraphe: any, date: any) {
        return new Promise(
            (resolve, reject) => {


                let urlfinal = environment.baseUrl + '/business/view/allViewListCustom/' + id + '/' + idGraphe + '?date=' + date;
                console.log('----url-----');
                console.log(urlfinal);
                this.http.put(urlfinal, null)
                    .subscribe((data) => {
                            console.log('success');
                            console.log(data);
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

    deleteEntity(url: any, idObject: any) {
        return this.http.put(environment.baseUrl + url + '/' + idObject, null);
    }

    public post(url: string, context: any): Observable<any> {

        return this.http.post(url, context);
    }

    public get(url: string): Observable<any> {

        return this.http.get(url);
    }

    public getProvision(line : any): Observable<any> {

        return this.http.get(environment.baseUrl +'/business/SlaProvisionCustom/getProv/'+line);
    }










    getAllMassiveUpdate(id: any,contextDto:any, pathVariable: any) {

        return new Promise(
            (resolve, reject) => {
                var critarias = '';
                if (pathVariable != null) {
                    critarias = pathVariable;
                }

                console.log(pathVariable);
                console.log('criterias');
                console.log(critarias);
                let urlfinal = environment.baseUrl + '/business/view/allMassifView/' + id + '?specs=' + critarias;
                console.log('url');
                console.log(urlfinal);
                this.comboboxFormat = new ComboboxFormat();
                this.comboboxFormat.contextDto=contextDto;
                console.log('combobox',this.comboboxFormat);
                this.http.put(urlfinal, this.comboboxFormat)
                    .subscribe((data) => {
                            console.log('success');
                            console.log(data);
                            // ikram
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

    deleteMassiveUpdate(url: any, idObject: any) {
        return this.http.put(environment.baseUrl + url + '/' + idObject, null);
    }

    deleteEntityy(url: any, idObject: any) {
        return this.http.put(environment.baseUrl + url + '/' + idObject, null);
    }

    public  SaveMassiveUpdate(url : string , dataa: any): Observable<any> {
        return  this.http.post(environment.baseUrl + url, dataa);
      }

      

      getGridSearchPageable(id: any, pathVariable: any, currentPage : number,filter : string , sort?:any) {

        return new Promise(
            (resolve, reject) => {
                var critarias = '';
                if (pathVariable != null) {
                    critarias = pathVariable;
                }

                console.log(pathVariable);
                console.log('criterias');
                console.log(critarias);

                let urlfinal = environment.baseUrl + '/business/view/allViewList/' + id + '?specs=' + critarias;
                console.log('url');
                console.log(urlfinal); 
                this.comboboxFormat = new ComboboxFormat();
                this.comboboxFormat.currentPage= currentPage;
                if (filter){
                this.comboboxFormat.filter= filter;
                }
                if (sort!==undefined && sort!=null){
                    this.comboboxFormat.sortField = sort.sortField;
                    this.comboboxFormat.sortOrder = sort.sortOrder;
                    }
                this.http.put(urlfinal, this.comboboxFormat)
                    .subscribe((data) => {
                            console.log('success');
                            console.log(data);
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

}