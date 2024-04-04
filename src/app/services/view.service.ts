import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import Swal from 'sweetalert2'
import {Location} from '@angular/common';
import { MessageService } from 'primeng/api';
import { IncidenceMonitoring } from '../models/viewFormat/IncidenceMonitoring.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  jsonFormat: any;
  searchFormat: any;
  updateFormat: any;
  defaults: any;
  constructor(private service: MessageService, private http: HttpClient, private location: Location, private utilsService :UtilsService) {
  }


  getJsonFile(id: any) {

    return new Promise(
      (resolve, reject) => {

        this.http.post(environment.baseUrl + '/business/view/allView/' +id, null)
          .subscribe((data) => {
            console.log('success');
            console.log(data);
            this.jsonFormat = data;
            resolve(this.jsonFormat);
          }
            , (error) => { 
              console.log('error');
              

              ////////////////
              
              if(error.error.status!=401){
              Swal.fire({
                icon: 'error',
                title: 'Status Code : '+ error.error.status,
                text: error.error.message,
                denyButtonText: `Cancel`,
                confirmButtonText: 'Claim',
                showDenyButton: true,
            
              }).then((result) => {
                if (result.isConfirmed) {

                    Swal.fire({
                        icon: 'info',
                        title: 'Incidence Claim',
                        text: error.error.message,
                        denyButtonText: `Cancel`,
                        confirmButtonText: 'Send Email',
                        showDenyButton: true,
                        html: `
                        <input type="text" id="swal-contact"  class="form-control" placeholder="Contact Email"><br>
                        <input type="text" id="swal-subject"  class="form-control" placeholder="Subject">
                        <br>
                        <textarea id="swal-description" class="form-control" placeholder= "Description">`,     
                      }).then((result) => {
                        if (result.isConfirmed) {
                            let emailmsg =  "<br>"
                            + "<h3>Incident Content</h3>\r\n"
                            + "<ul>\r\n"
                            + "  <li><b>Status Code :</b>"+error.error.status+"</li>\r\n"
                            + "  <li><b>Message : </b>"+error.error.message+"</li>\r\n"
                //            + "  <li><b>Description : </b>"+document.getElementById('swal-description')['value']+"</li>\r\n"
                            + "</ul>\r\n";     
                           
                            let incidentMsg = new IncidenceMonitoring()
                            // incidentMsg.name = document.getElementById('swal-subject')['value']
                            // incidentMsg.description = document.getElementById('swal-description')['value']
                            // incidentMsg.contactEmail = document.getElementById('swal-contact')['value']
                            incidentMsg.content = emailmsg

                    this.utilsService.sendSupportEmail(incidentMsg).subscribe(
                        (response: any) => {
                           // console.log('im here testing email****')
                            Swal.fire(
                                'Sent Successfully!',
                                'Email Reference: '+response['reference'],
                                'success'
                              ).then((result) => {
                                this.location.back();
                              })
                        });
                          } else if (result.isDenied) {
                            this.location.back();
                          }
                      })
                  }  else if (result.isDenied) {
                    this.location.back();
                  }
              })
          
              ////////////

              Swal.fire({
                icon: 'error',
                title: 'Status Code : '+ error.error.status,
                text: error.error.message,
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                    this.location.back();
                } 
              })
            } 
              
            },
            () => {
              reject(this.jsonFormat);
              return this.jsonFormat;
            }

          );
      }
    );

  }
  getJsonEntityFile(id: any, contextCreateEntitieData: any) {

    return new Promise(
      (resolve, reject) => {

        this.http.post(environment.baseUrl + '/business/view/allView/' + id, contextCreateEntitieData)
          .subscribe((data) => {
            console.log('success');
            console.log(data);
            this.jsonFormat = data;
            resolve(this.jsonFormat);
          }
            , (error) => { 
              console.log('error'); 
      

              ////////////////

              if(error.error.status!=401){
              Swal.fire({
                icon: 'error',
                title: 'Status Code : '+ error.error.status,
                text: error.error.message,
                denyButtonText: `Cancel`,
                confirmButtonText: 'Claim',
                showDenyButton: true,
            
              }).then((result) => {
                if (result.isConfirmed) {

                    Swal.fire({
                        icon: 'info',
                        title: 'Incidence Claim',
                        text: error.error.message,
                        denyButtonText: `Cancel`,
                        confirmButtonText: 'Send Email',
                        showDenyButton: true,
                        html: `
                        <input type="text" id="swal-contact"  class="form-control" placeholder="Contact Email"><br>
                        <input type="text" id="swal-subject"  class="form-control" placeholder="Subject">
                        <br>
                        <textarea id="swal-description" class="form-control" placeholder= "Description">`,     
                      }).then((result) => {
                        if (result.isConfirmed) {
                            let emailmsg =  "<br>"
                            + "<h3>Incident Content</h3>\r\n"
                            + "<ul>\r\n"
                            + "  <li><b>Status Code :</b>"+error.error.status+"</li>\r\n"
                            + "  <li><b>Message : </b>"+error.error.message+"</li>\r\n"
                            // + "  <li><b>Description : </b>"+document.getElementById('swal-description')['value']+"</li>\r\n"
                            + "</ul>\r\n";     
                           
                            let incidentMsg = new IncidenceMonitoring()
                            // incidentMsg.name = document.getElementById('swal-subject')['value']
                            // incidentMsg.description = document.getElementById('swal-description')['value']
                            // incidentMsg.contactEmail = document.getElementById('swal-contact')['value']
                             incidentMsg.content = emailmsg

                    this.utilsService.sendSupportEmail(incidentMsg).subscribe(
                        (response: { [x: string]: string; }) => {
                           // console.log('im here testing email****')
                            Swal.fire(
                                'Sent Successfully!',
                                'Email Reference: '+response['reference'],
                                'success'
                              ).then((result) => {
                                this.location.back();
                              })
                        });
                          } else if (result.isDenied) {
                            this.location.back();
                          }
                      })
                  }  else if (result.isDenied) {
                    this.location.back();
                  }
              })
              ////////////

            }

            
            },
            () => {
              reject(this.jsonFormat);
              return this.jsonFormat;
            }

          );
      }
    );

  }
  getSearchFormatSpecific(id: any, contextDto: any) {

    return new Promise(
      (resolve, reject) => {

        this.http.post(environment.baseUrl + '/business/view/searchView/' + id, contextDto)
          .subscribe((data) => {
            console.log('success');
            console.log(data);
            this.searchFormat = data;
            resolve(this.searchFormat);
          }
            , (error) => { 
              console.log('error');
             
   
              ////////////////
              if(error.error.status!=401){
              Swal.fire({
                icon: 'error',
                title: 'Status Code : '+ error.error.status,
                text: error.error.message,
                denyButtonText: `Cancel`,
                confirmButtonText: 'Claim',
                showDenyButton: true,
            
              }).then((result) => {
                if (result.isConfirmed) {

                    Swal.fire({
                        icon: 'info',
                        title: 'Incidence Claim',
                        text: error.error.message,
                        denyButtonText: `Cancel`,
                        confirmButtonText: 'Send Email',
                        showDenyButton: true,
                        html: `
                        <input type="text" id="swal-contact"  class="form-control" placeholder="Contact Email"><br>
                        <input type="text" id="swal-subject"  class="form-control" placeholder="Subject">
                        <br>
                        <textarea id="swal-description" class="form-control" placeholder= "Description">`,     
                      }).then((result) => {
                        if (result.isConfirmed) {
                            let emailmsg =  "<br>"
                            + "<h3>Incident Content</h3>\r\n"
                            + "<ul>\r\n"
                            + "  <li><b>Status Code :</b>"+error.error.status+"</li>\r\n"
                            + "  <li><b>Message : </b>"+error.error.message+"</li>\r\n"
                            // + "  <li><b>Description : </b>"+document.getElementById('swal-description')['value']+"</li>\r\n"
                            + "</ul>\r\n";     
                           
                            let incidentMsg = new IncidenceMonitoring()
                            // incidentMsg.name = document.getElementById('swal-subject')['value']
                            // incidentMsg.description = document.getElementById('swal-description')['value']
                            // incidentMsg.contactEmail = document.getElementById('swal-contact')['value']
                            incidentMsg.content = emailmsg

                    this.utilsService.sendSupportEmail(incidentMsg).subscribe(
                        (response: { [x: string]: string; }) => {
                           // console.log('im here testing email****')
                            Swal.fire(
                                'Sent Successfully!',
                                'Email Reference: '+response['reference'],
                                'success'
                              ).then((result) => {
                                this.location.back();
                              })
                        });
                          } else if (result.isDenied) {
                            this.location.back();
                          }
                      })
                  }  else if (result.isDenied) {
                    this.location.back();
                  }
              })
              ////////////

              }
            },
            () => {
              reject(this.searchFormat);
              return this.searchFormat;
            }

          );
      }
    );
  }

  getSearchFormat(id: any) {

    return new Promise(
      (resolve, reject) => {

        this.http.get(environment.baseUrl + '/business/view/searchView/' + id)
          .subscribe((data) => {
            console.log('success');
            console.log(data);
            this.searchFormat = data;
            resolve(this.searchFormat);
          }
            , (error) => { 
              console.log('error');
              
              
              ////////////////
              if(error.error.status!=401){
              
              Swal.fire({
                icon: 'error',
                title: 'Status Code : '+ error.error.status,
                text: error.error.message,
                denyButtonText: `Cancel`,
                confirmButtonText: 'Claim',
                showDenyButton: true,
            
              }).then((result) => {
                if (result.isConfirmed) {

                    Swal.fire({
                        icon: 'info',
                        title: 'Incidence Claim',
                        text: error.error.message,
                        denyButtonText: `Cancel`,
                        confirmButtonText: 'Send Email',
                        showDenyButton: true,
                        html: `
                        <input type="text" id="swal-contact"  class="form-control" placeholder="Contact Email"><br>
                        <input type="text" id="swal-subject"  class="form-control" placeholder="Subject">
                        <br>
                        <textarea id="swal-description" class="form-control" placeholder= "Description">`,     
                      }).then((result) => {
                        if (result.isConfirmed) {
                            let emailmsg =  "<br>"
                            + "<h3>Incident Content</h3>\r\n"
                            + "<ul>\r\n"
                            + "  <li><b>Status Code :</b>"+error.error.status+"</li>\r\n"
                            + "  <li><b>Message : </b>"+error.error.message+"</li>\r\n"
                            // + "  <li><b>Description : </b>"+document.getElementById('swal-description')['value']+"</li>\r\n"
                            + "</ul>\r\n";     
                           
                            let incidentMsg = new IncidenceMonitoring();
                            // incidentMsg.name = document.getElementById('swal-subject')['value']
                            // incidentMsg.description = document.getElementById('swal-description')['value']
                            // incidentMsg.contactEmail = document.getElementById('swal-contact')['value']
                            incidentMsg.content = emailmsg

                    this.utilsService.sendSupportEmail(incidentMsg).subscribe(
                        (response: any) => {
                           // console.log('im here testing email****')
                            Swal.fire(
                                'Sent Successfully!',
                                'Email Reference: '+response['reference'],
                                'success'
                              ).then((result) => {
                                this.location.back();
                              })
                        });
                          } else if (result.isDenied) {
                            this.location.back();
                          }
                      })
                  }  else if (result.isDenied) {
                    this.location.back();
                  }
              })
              ////////////
            }
               
            },
            () => {
              reject(this.searchFormat);
              return this.searchFormat;
            }

          );
      }
    );

  }

  getUpdateFormat(idService: any, idObject: any, contextDto: any) {


    return new Promise(
      (resolve, reject) => {
        console.log(contextDto);

        this.http.post(environment.baseUrl + '/business/view/updateView/' + idService + '/' + idObject, contextDto)
          .subscribe((data) => {
            console.log('success');
            console.log(data);
            this.updateFormat = data;
            resolve(this.updateFormat);
          }
            , (error) => {
              console.log('error'); 

             
              
              ////////////////


              if(error.error.status!=401){
              Swal.fire({
                icon: 'error',
                title: 'Status Code : '+ error.error.status,
                text: error.error.message,
                denyButtonText: `Cancel`,
                confirmButtonText: 'Claim',
                showDenyButton: true,
            
              }).then((result) => {
                if (result.isConfirmed) {

                    Swal.fire({
                        icon: 'info',
                        title: 'Incidence Claim',
                        text: error.error.message,
                        denyButtonText: `Cancel`,
                        confirmButtonText: 'Send Email',
                        showDenyButton: true,
                        html: `
                        <input type="text" id="swal-contact"  class="form-control" placeholder="Contact Email"><br>
                        <input type="text" id="swal-subject"  class="form-control" placeholder="Subject">
                        <br>
                        <textarea id="swal-description" class="form-control" placeholder= "Description">`,     
                      }).then((result) => {
                        if (result.isConfirmed) {
                            let emailmsg =  "<br>"
                            + "<h3>Incident Content</h3>\r\n"
                            + "<ul>\r\n"
                            + "  <li><b>Status Code :</b>"+error.error.status+"</li>\r\n"
                            + "  <li><b>Message : </b>"+error.error.message+"</li>\r\n"
                            // + "  <li><b>Description : </b>"+document.getElementById('swal-description')['value']+"</li>\r\n"
                            + "</ul>\r\n";     
                           
                            let incidentMsg = new IncidenceMonitoring()
                           // incidentMsg.name = document.getElementById('swal-subject')['value']
                           // incidentMsg.description = document.getElementById('swal-description')['value']
                           // incidentMsg.contactEmail = document.getElementById('swal-contact')['value']
                            incidentMsg.content = emailmsg

                    this.utilsService.sendSupportEmail(incidentMsg).subscribe(
                        (response : any) => {
                           // console.log('im here testing email****')
                            Swal.fire(
                                'Sent Successfully!',
                                'Email Reference: '+response['reference'],
                                'success'
                              ).then((result) => {
                                this.location.back();
                              })
                        });
                          } else if (result.isDenied) {
                            this.location.back();
                          }
                      })
                  }  else if (result.isDenied) {
                    this.location.back();
                  }
              })
              ////////////

            }

                  },
              
            () => {
              reject(this.updateFormat);
              return this.updateFormat;
            }

          );
      }
    );
  }

  postJsonFile(url: any, entity: any): Observable<any> {
    console.log(entity)
    return this.http.post(environment.baseUrl + url, entity);
    // return this.http.post('http://localhost:8080/algebraSystem-v1.1/business/view/postJsonFormat',entity);
  }

  putJsonFile(url: any, entity: any): Observable<any> {
    console.log(entity)
    return this.http.put(environment.baseUrl + url, entity);
    // return this.http.post('http://localhost:8080/algebraSystem-v1.1/business/view/postJsonFormat',entity);
  }

  putJsonFile1(url: any, entity: any[]): Observable<any> {
    console.log(entity)
    return this.http.put(environment.baseUrl + url, entity);
    // return this.http.post('http://localhost:8080/algebraSystem-v1.1/business/view/postJsonFormat',entity);
  }

  putJsonFileCaseAnnulation(url: any, entity: any): Observable<any> {
    console.log(entity)
    return this.http.put(environment.baseUrl + url, entity);
    // return this.http.post('http://localhost:8080/algebraSystem-v1.1/business/view/postJsonFormat',entity);
  }


  configs() {
    return new Promise(
      (resolve, reject) => {
        this.http.get(environment.baseUrl + "/business/menu/getmenus")
          .subscribe((data) => {
            console.log('success');
            console.log(data);
            this.defaults = data;

            resolve(this.defaults)
          }
            , (error) => { console.log('error') },
            () => {
              console.log('test')
              reject(this.defaults)
              return this.defaults;
            }

          )
      }
    );
  }
  postDocuent(body: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/business/document/saveGlobal", body);
  }

  uploadFiles(files: File[], document: any): Observable<any> {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
      formData.append("document", new Blob([JSON.stringify(document)], { type: "application/json" }));
    }
    console.log("form data");
    console.log(formData);

    return this.http.post(environment.baseUrl + "/document/uploadFile", formData);
  }
  downloadFile(filename: string) {
    const httpOptions = {
      'responseType': 'blob' as 'json',
    }
    return this.http.get(environment.baseUrl + "/document/download/" + filename, httpOptions)


  }

  downloadBillingExcel(filename: string) {
    const httpOptions = {
      'responseType': 'blob' as 'json',
    }
    return this.http.get(environment.baseUrl + "/document/downloadBillingExcel/" + filename, httpOptions)


  }
  SaveFile(file: File, document: any): Observable<any>{


    const formData = new FormData();
    

   
      formData.append('files', file);
      formData.append("document", new Blob([JSON.stringify(document)], { type: "application/json" }));
    
 
   

    return this.http.post(environment.baseUrl + "/document/savefile", formData);
  }
  findOperationTypeByPrefile(loanNumber: string , appReference: string){
    return this.http.get(environment.baseUrl +'/business/SlaSearchCustom/findOperationTypeByPrefile/'+loanNumber+'/'+appReference);
  }
  getSpecificationCriteriaSla(idObject: string){
    return this.http.get(environment.baseUrl +'/business/SlaProvisionCustom/getSpecificationCriteriaSla/'+idObject);
  }



  postBilling( formData: FormData): Observable<any> {

    return this.http.post(environment.baseUrl +'/business/maper/SaveBilling', formData);
  }



  getSimulationBill(listOperationTypeByPrefile: any){
    return this.http.post(environment.baseUrl +'/business/SimulationBill/GetOperationPerStatus',listOperationTypeByPrefile);

  }
  getBILLFACTURA(listBillToGenerate: any){
    return this.http.post(environment.baseUrl +'/business/SimulationBill/getListBillTOFACTURADO', listBillToGenerate);

  }
   getBILLFACTURACANCELD(listBillToCancel: any){
    return this.http.post(environment.baseUrl +'/business/SimulationBill/getListFacturadoToCanceled', listBillToCancel);

  }

  /*postSimulationBillReport(mouvments) {
    const httpOptions = {
      'responseType': 'blob' as 'json',
    }

    return this.http.post(environment.baseUrl+'/business/SimulationBill/Simulate/'+'PDF'+'/REPORT-SIMUALTION-MIG',mouvments,httpOptions).subscribe((data:any)=>{
      var reportName = "PDF-REPORT-SIMULATION";
      var blob = new Blob([data], { type: "application/pdf" });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = reportName+".pdf";
      link.click();
      console.log("successBlaise ",data)
      return(data);
      }, (error) => {   
         console.log('error',error);
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error.error.message });
    });
      
  }*/



  postSimulationBillReport(listOperationTypeByPrefile: any, idBill: string) {
    return this.http.post(environment.baseUrl+'/business/SimulationBill/Simulate/'+idBill,listOperationTypeByPrefile)
  }
  downloadSimulationBillReport(datosCliente: any) {
    const httpOptions = {
      'responseType': 'blob' as 'json',
    }

    return this.http.post(environment.baseUrl+'/business/SimulationBill/Simulate/generateReport/'+'PDF'+'/REPORT-SIMUALTION-MIG',datosCliente,httpOptions).subscribe((data:any)=>{
      var reportName = "PDF-REPORT-SIMULATION";
      var blob = new Blob([data], { type: "application/pdf" });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = reportName+".pdf";
      link.click();
      console.log("successBlaise ",data)
      return(data);
      }, (error) => {   
         console.log('error',error);
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error.error.message });
    });
      
  }


  // postSimulationBillReport(mouvments, idBill) {
  //   const httpOptions = {
  //     'responseType': 'blob' as 'json',
  //   }

  //   return this.http.post(environment.baseUrl+'/business/SimulationBill/Simulate/'+idBill+'/PDF'+'/REPORT-SIMUALTION-MIG',mouvments,httpOptions).subscribe((data:any)=>{
  //     var reportName = "PDF-REPORT-SIMULATION";
  //     var blob = new Blob([data], { type: "application/pdf" });
  //     var link = document.createElement('a');
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = reportName+".pdf";
  //     link.click();
  //     console.log("successBlaise ",data)
  //     return(data);
  //     }, (error) => {   
  //        console.log('error',error);
  //       this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error.error.message });
  //   });
      
  // }


  // postGenerationBillReport(mouvments){
  //   const httpOptions = {
  //     'responseType': 'blob' as 'json',
  //   }

  //    this.http.post(environment.baseUrl+'/business/SimulationBill/GenerateFacturaBill/'+'PDF'+'/REPORT-GENERATION-MIG',mouvments,httpOptions).subscribe((data:any)=>{
 
  //   var reportName = "PDF-REPORT-GENERATION";
  //   var blob = new Blob([data], { type: "application/pdf" });
  //   var link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = reportName+".pdf";
  //   link.click();
  //   console.log("successBlaise ",data)
  //   return(data);
  //   }, (error) => {
  //     console.log('error',error);
  //     this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error.error.message });
  // });
  // }


  postGenerationBillReport(datosCliente: any, billId: string){
    return this.http.post(environment.baseUrl+'/business/SimulationBill/GenerateFacturaBill/'+billId,datosCliente)
  }


  downloadGeneratedBillReport(datosCliente: any) {
    const httpOptions = {
      'responseType': 'blob' as 'json',
    }

     this.http.post(environment.baseUrl+'/business/SimulationBill/GenerateFacturaBill/generateReport/'+'PDF'+'/REPORT-GENERATION-MIG',datosCliente,httpOptions).subscribe((data:any)=>{
 
    var reportName = "PDF-REPORT-GENERATION";
    var blob = new Blob([data], { type: "application/pdf" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = reportName+".pdf";
    link.click();
    console.log("successBlaise ",data)
    return(data);
    }, (error) => {
      console.log('error',error);
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error.error.message });
  });
  }



  postCancelBillReport(datosCliente: any, billId: string){
    return this.http.post(environment.baseUrl+'/business/SimulationBill/CanceledBill/'+billId,datosCliente)
  }


  downloadCancellationBillReport(datosCliente: any) {
    const httpOptions = {
      'responseType': 'blob' as 'json',
    }

     this.http.post(environment.baseUrl+'/business/SimulationBill/CanceledBill/generateReport/'+'PDF'+'/REPORT-GENERATION-MIG',datosCliente,httpOptions).subscribe((data:any)=>{

      var reportName = "PDF-REPORT-CANCELATION";
      var blob = new Blob([data], { type: "application/pdf" });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = reportName+".pdf";
      link.click();
      console.log("successBlaise ",data)
      return(data);
    }, (error) => {
      console.log('error',error);
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: error.error.message });
  });
  }

  cloneSection(sectionToClone: any): Observable<any> {
    return this.http.post(environment.baseUrl + '/business/section/cloneSection' ,sectionToClone);

  }



  
  postCanceledBillReport(mouvments: any){
    const httpOptions = {
      'responseType': 'blob' as 'json',
    }

    return this.http.post(environment.baseUrl+'/business/SimulationBill/CanceledBill/'+'PDF'+'/REPORT-GENERATION-MIG',mouvments,httpOptions).subscribe((data:any)=>{
 
      var reportName = "PDF-REPORT-CANCELATION";
      var blob = new Blob([data], { type: "application/pdf" });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = reportName+".pdf";
      link.click();
      console.log("successBlaise ",data)
      return(data);
      ;});
    }
  
 

 

 
}